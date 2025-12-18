import { cookies } from 'next/headers';

export async function getMe() {
    const cookieStore =  await cookies();
    const token = cookieStore.get('strapi-jwt')?.value;

    if (!token) return null;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=role`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );

  if (!res.ok) return null;

  return res.json();
}