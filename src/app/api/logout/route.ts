import { cookies } from 'next/headers';

export async function POST() {
  try {
    // cookies() is synchronous in App Router; call delete directly
    cookies().delete('strapi-jwt');
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[app/api/logout] error', e);
    return new Response(JSON.stringify({ error: 'Logout failed' }), { status: 500 });
  }
}
