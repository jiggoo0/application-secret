'use client';

import './globals.css';
import { inter } from '@/lib/fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Widget from '@/components/Widget';
import Providers from './providers';
import { useEffect, useState } from 'react';

/**
 * 🌙 Layout หลักของแอป JP Visual & Docs
 * - ป้องกัน hydration mismatch
 * - รองรับ dark mode อย่างปลอดภัยสำหรับ SSR
 */
export default function RootLayout({ children }) {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // โหลดโหมดจาก localStorage (ถ้ามี)
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    setThemeLoaded(true);
  }, []);

  // ป้องกันการ flash ระหว่างโหลด theme
  if (!themeLoaded) {
    return (
      <html lang="th" dir="ltr" suppressHydrationWarning>
        <body className={`${inter.className} bg-base-100 text-base-content`} />
      </html>
    );
  }

  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-base-100 text-base-content antialiased`}
      >
        <Providers>
          <Header />
          <main id="main-content" role="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <div className="fixed bottom-6 right-6 z-50">
            <Widget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
