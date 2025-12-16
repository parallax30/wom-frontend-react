import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = body.identifier ?? body.email;
    const password = body.password;

    if (!identifier || !password) {
      return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!base) {
      console.error('[api/login] NEXT_PUBLIC_STRAPI_URL not set');
      return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500 });
    }

    const url = new URL('/api/auth/local', base).toString();
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
      console.error('[api/login] Non-JSON response from Strapi:', txt);
      return new Response(JSON.stringify({ error: 'Authentication service error' }), { status: 502 });
    }

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message ?? 'Invalid credentials' }), { status: 401 });
    }

    try {
      cookies().set('strapi-jwt', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // maxAge: 60 * 60 * 24 * 7,
      });
    } catch (e) {
      console.error('[api/login] Failed to set cookie', e);
      return new Response(JSON.stringify({ error: 'Failed to set auth cookie' }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: data.user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('[api/login] error', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  }
}
