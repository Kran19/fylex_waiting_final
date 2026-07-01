'use server'

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validPassword) {
    return { error: 'Admin password not configured on server' };
  }

  if (username !== validUsername || password !== validPassword) {
    return { error: 'Invalid username or password' };
  }

  // Create token
  const secret = new TextEncoder().encode(validPassword);
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  cookies().set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect('/admin');
}

export async function logout() {
  cookies().delete('admin_token');
  redirect('/admin/login');
}
