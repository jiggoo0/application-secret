// app/layout.tsx
// Server Component (RSC) - Root Layout

import './globals.css';
import React from 'react';
import type { Metadata } from 'next';

// Providers & Utilities
import RootProvider from './providers/RootProvider';
import ChunkErrorBoundary from '@/components/utils/ChunkErrorBoundary';
import CleanUrl from '@/components/utils/CleanUrl';

// Components
import { inter } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Widget from '@/components/Widget';
import { Toaster } from '@/components/ui/sonner';

// ----------------------------------------------------
// 1. Metadata (SEO & Social)
// ----------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL('https://www.jpvisouldocs.online'),

  title: {
    default: 'Dev Jp - Visoul&Docs | บริการเอกสารครบวงจร',
    template: '%s | Dev Jp',
  },

  description:
    'บริการที่ปรึกษายื่นกู้สินเชื่อ เอกสารยื่นวีซ่า เอกสารดิจิทัล และการตลาด สำหรับทุกสายอาชีพ',

  keywords: [
    'สินเชื่อ',
    'วีซ่า',
    'เอกสารดิจิทัล',
    'การตลาด',
    'ออกแบบ',
    'Dev Jp',
    'Visoul&Docs',
  ],

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Dev Jp - Visoul&Docs',
    description: 'แพลตฟอร์มเอกสารและบริการด้านการเงิน วีซ่า และการตลาด',
    url: '/',
    siteName: 'JP Visoul&Docs',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // ใช้ relative + metadataBase
        width: 1200,
        height: 630,
        alt: 'JP Visoul&Docs Official Logo and Banner',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dev Jp - Visoul&Docs',
    description: 'แพลตฟอร์มเอกสารและบริการด้านการเงิน วีซ่า และการตลาด',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  // ✅ FIX: Facebook App ID (สำคัญ)
  other: {
    'fb:app_id': '1051070927146698',
  },
};

// ----------------------------------------------------
// 2. Root Layout Component
// ----------------------------------------------------
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
        <ChunkErrorBoundary>
          <RootProvider>
            {/* Utility */}
            <CleanUrl />

            {/* Header */}
            <header
              role="banner"
              className="sticky top-0 z-40 w-full border-b border-border bg-white/70 backdrop-blur dark:bg-gray-900/70"
            >
              <Header />
            </header>

            {/* Main */}
            <main
              id="main-content"
              role="main"
              className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8"
            >
              {children}
            </main>

            {/* Footer */}
            <footer
              role="contentinfo"
              className="border-t border-border bg-white/60 backdrop-blur dark:bg-gray-950/60"
            >
              <Footer />
            </footer>

            {/* Global UI */}
            <Toaster position="top-right" richColors />
            <div className="fixed bottom-6 right-6 z-50">
              <Widget />
            </div>
          </RootProvider>
        </ChunkErrorBoundary>
      </body>
    </html>
  );
}