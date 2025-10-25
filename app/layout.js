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
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = stored === 'dark' || (!stored && prefersDark);

      const root = document.documentElement;
      root.classList.toggle('dark', isDark);
      root.style.colorScheme = isDark ? 'dark' : 'light';
      root.style.backgroundColor = isDark ? '#0f172a' : '#ffffff';

      requestAnimationFrame(() => setThemeReady(true));
    } catch (error) {
      console.error('[RootLayout] Theme init error:', error);
      setThemeReady(true);
    }
  }, []);

  if (!themeReady) {
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
        className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <Providers>
          {/* 🔝 Header */}
          <header
            role="banner"
            className="sticky top-0 z-40 w-full border-b border-border bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70"
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
            className="border-t border-border bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-gray-950/60"
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
