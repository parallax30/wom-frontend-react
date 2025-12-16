import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Use the same behavior as the App Router route: delete cookie synchronously
    try {
      (await cookies()).delete('strapi-jwt');
    } catch (err) {
      // Fallback if cookies() isn't available as expected
      console.error('[api/logout] cookie delete fallback', err);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('[api/logout] error', e);
    return new Response(JSON.stringify({ error: 'Logout failed' }), { status: 500 });
  }
}
