// app/providers.jsx
'use client'; // <-- ต้องมี 'use client'

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes'; // สมมติว่าใช้ next-themes สำหรับ Dark Mode

/**
 * 💡 Providers Component (Client Side)
 * ใช้สำหรับห่อหุ้ม Context/Theme/Auth Providers ทั้งหมด
 * เพื่อให้สามารถใช้งาน Hooks เช่น useSession() หรือ useTheme() ได้
 */
export default function Providers({ children }) {
  return (
    // 1. SessionProvider สำหรับ NextAuth
    <SessionProvider>
      {/* 2. ThemeProvider (ถ้ามี) */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
