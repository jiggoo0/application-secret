'use client';

import './globals.css';
import { inter } from '@/lib/fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Widget from '@/components/Widget';
import Providers from './providers';
import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';

/**
 * 🌐 Root Layout - Production Optimized
 * ----------------------------------------------------
 * ✅ ป้องกัน hydration mismatch
 * ✅ รองรับ dark mode (SSR + system + localStorage)
 * ✅ Responsive + smooth transition
 * ✅ Semantic structure & accessibility ready
 */
export default function RootLayout({ children }) {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      document.documentElement.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';

      // ลด flash effect โดยรอ frame แรกก่อน render
      requestAnimationFrame(() => setThemeLoaded(true));
    } catch (err) {
      console.error('[RootLayout:theme-init]', err);
      setThemeLoaded(true);
    }
  }, []);

  if (!themeLoaded) {
    return (
      <html lang="th" dir="ltr" suppressHydrationWarning>
        <body
          className={`${inter.className} flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-300`}
        >
          <div role="status" aria-live="polite" className="animate-pulse text-sm opacity-70">
            กำลังโหลด...
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-base-100 text-base-content antialiased transition-colors duration-300`}
      >
        <Providers>
          {/* 🔝 Header */}
          <header
            role="banner"
            className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/70"
          >
            <Header />
          </header>

          {/* 📦 Main Content */}
          <main
            id="main-content"
            role="main"
            className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 transition-all duration-300 sm:px-6 lg:px-8"
          >
            {children}
          </main>

          {/* 🔚 Footer */}
          <footer
            role="contentinfo"
            className="border-t border-gray-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-gray-800 dark:bg-gray-950/60"
          >
            <Footer />
          </footer>

          {/* 🔔 Global Toasts */}
          <Toaster position="top-right" richColors />

          {/* ⚙️ Floating Widget */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
            <Widget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
