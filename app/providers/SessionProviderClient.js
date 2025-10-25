'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * SessionProviderClient
 * Wrapper สำหรับ NextAuth SessionProvider
 * ใช้รอบๆ application หรือหน้า client component ที่ต้องการ access session
 */
export default function SessionProviderClient({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
