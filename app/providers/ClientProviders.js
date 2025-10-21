'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
// ถ้าคุณใช้ Zustand หรือ Toast ให้ import เพิ่มตรงนี้
// import { Toaster } from 'react-hot-toast';
// import { ZustandProvider } from '@/lib/store/ZustandProvider';

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* <ZustandProvider> */}
        {/* <Toaster position="top-right" /> */}
        {children}
        {/* </ZustandProvider> */}
      </ThemeProvider>
    </SessionProvider>
  );
}
