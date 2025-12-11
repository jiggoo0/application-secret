// app/providers/RootProvider.jsx

'use client';

// สมมติว่านี่คือ Providers ที่เคยแยกกัน เช่น SessionProviderClient, ThemeProvider, ReduxProvider
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
// import { ReduxProvider } from '@/lib/redux/provider'; // ตัวอย่าง

// รับ children เป็น props และทำการ Wrap providers ทั้งหมด
export default function RootProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* สมมติว่าใช้ NextAuth หรือ Provider อื่นๆ ที่ต้องอยู่ใน 'use client' */}
      <SessionProvider>
        {/* <ReduxProvider> */}
        {children}
        {/* </ReduxProvider> */}
      </SessionProvider>
    </ThemeProvider>
  );
}
