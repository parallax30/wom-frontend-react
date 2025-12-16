import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = (await cookies()).get('strapi-jwt')?.value;
    if (!token) return new Response(null, { status: 401 });

    const base = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!base) return new Response(null, { status: 500 });

    const url = new URL('/api/users/me', base).toString();
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return new Response(null, { status: 401 });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[api/me] error', e);
    return new Response(null, { status: 500 });
  }
}
