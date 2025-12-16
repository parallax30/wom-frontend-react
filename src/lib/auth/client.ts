import type { User } from '@/types/user';

export async function getUserClient(): Promise<User | null> {
  const res = await fetch('/api/me');
  if (!res.ok) return null;
  return res.json();
}
