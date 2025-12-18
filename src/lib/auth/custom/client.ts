'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}



const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async  signInWithPassword({
    email,
    password,
  }: SignInWithPasswordParams): Promise<{ error?: string }> 
  {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch (e) {
        console.error('Login returned non-JSON response');
        return { error: 'Login failed' };
      }

      if (!res.ok) {
        return { error: data?.error ?? 'Invalid credentials' };
      }

      // Server set httpOnly cookie; optionally cache user locally
      try {
        localStorage.setItem('strapi-user', JSON.stringify(data.user));
      } catch (e) {}

      return {};
    } catch (e) {
      console.error(e);
      return { error: 'Login failed' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('strapi-jwt');

    return {};
  }
}

export const authClient = new AuthClient();
