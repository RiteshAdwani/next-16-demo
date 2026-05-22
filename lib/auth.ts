import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { CookieKeys } from '@/constants/cookies.constants';

export interface SessionUser {
  id: number;
  email: string;
  name: string;
}

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(CookieKeys.USER);
  
  if (!userCookie) {
    return null;
  }
  
  try {
    return JSON.parse(userCookie.value) as SessionUser;
  } catch {
    return null;
  }
}

// Set user session
export async function setUserSession(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(CookieKeys.USER, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Clear user session
export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CookieKeys.USER);
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Create user
export async function createUser(data: { email: string; password: string; name: string }) {
  const hashedPassword = await hashPassword(data.password);
  
  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });
}

// Authenticate user
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) {
    return null;
  }
  
  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
