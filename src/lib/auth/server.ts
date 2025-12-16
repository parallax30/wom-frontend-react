import { cookies } from 'next/headers';
import type { User } from '@/types/user';

export async function getUserFromCookie(): Promise<User | null> {
  const token = (await cookies()).get('strapi-jwt')?.value;
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}
