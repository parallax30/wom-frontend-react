import { cookies } from 'next/headers';
import { decryptPayload } from '@/lib/crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support encrypted payloads from the client: { iv, data }
    let identifier: string | undefined;
    let password: string | undefined;

    if (body && body.iv && body.data) {
      try {
        const dec = await decryptPayload({ iv: body.iv, data: body.data });
        // decrypted payload expected to contain email/password or identifier/password
        identifier = (dec as any).identifier ?? (dec as any).email;
        password = (dec as any).password;
      } catch (e) {
        console.error('[app/api/login] decrypt error', e);
        return new Response(JSON.stringify({ error: 'Invalid encrypted payload' }), { status: 400 });
      }
    } else {
      identifier = body.identifier ?? body.email;
      password = body.password;
    }

    if (!identifier || !password) {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    
    if (!base) {
      console.error('[app/api/login] NEXT_PUBLIC_STRAPI_URL not set');
      return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500 });
    }

    
    const url = `${base}/api/auth/local`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (e) {
      const txt = await res.text();
      console.error('[app/api/login] Non-JSON response from Strapi:', txt);
      return new Response(JSON.stringify({ error: 'Authentication service error' }), { status: 502 });
    }

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message ?? 'Invalid credentials' }), { status: 401 });
    }

    try {
      (await cookies()).set('strapi-jwt', data.jwt, {
        httpOnly: true,
        secure: false, // temporal
        sameSite: 'lax',
        path: '/',
      });
    } catch (e) {
      console.error('[app/api/login] Failed to set cookie', e);
      return new Response(JSON.stringify({ error: 'Failed to set auth cookie' }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: data.user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('[app/api/login] error', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  }
}
