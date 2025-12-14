'use client';

import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

/**
 * Client Provider สำหรับ NextAuth
 * ใช้ครอบ App เพื่อให้ useSession() ใช้งานได้
 */
export default function NextAuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
