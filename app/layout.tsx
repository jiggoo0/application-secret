// app/layout.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: The Core Structure (เจ้าป่า Edition)
// ----------------------------------------------------

import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';

// Providers & Utilities
import RootProvider from './providers/RootProvider';
import ChunkErrorBoundary from '@/components/utils/ChunkErrorBoundary';
import CleanUrl from '@/components/utils/CleanUrl';

// Fonts Config
import { inter, prompt } from '@/lib/fonts';

// Components
import Widget from '@/components/Widget';
import { Toaster } from '@/components/ui/sonner';

/**
 * 🛰️ 1. Viewport Configuration
 */
export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * 🌎 2. Global Metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://www.jpvisouldocs.online'),
  title: {
    default: 'JP-VISOUL | จบงานเอกสารแบบตัวจริง โดย เจ้าป่า',
    template: '%s | JP-VISOUL',
  },
  description:
    'ที่ปรึกษาการจัดการเอกสารและโปรไฟล์เฉพาะทาง งานกริบ ตรวจสอบได้จริง รักษาความลับลูกค้าคือกฎข้อแรกที่ยึดถือ โดยทีมงานเจ้าป่า',
  keywords: ['เจ้าป่า', 'JP-VISOUL', 'ที่ปรึกษาวีซ่า', 'ปั้นเคสสินเชื่อ'],
  authors: [{ name: 'JP-VISOUL (JAO-PA)' }],
  robots: { index: true, follow: true },
};

/**
 * 🏗️ 3. Root Layout Component
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="th"
      dir="ltr"
      className={`${inter.variable} ${prompt.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased selection:bg-primary selection:text-white">
        <ChunkErrorBoundary>
          <RootProvider>
            {/* ระบบจัดการ URL */}
            <CleanUrl />

            {/* 🚀 Main Workspace: พื้นที่ปฏิบัติงานหลัก (หุ้มด้วย Main/Business Layout อีกชั้น) */}
            <main id="main-content" role="main" className="mx-auto w-full flex-1">
              {children}
            </main>

            {/* 🧩 Toaster: แจ้งเตือนสไตล์ Neobrutalist */}
            <Toaster
              position="bottom-center"
              richColors
              closeButton
              toastOptions={{
                className:
                  'neo-border !rounded-none !shadow-neo !font-sans !border-4 !border-slate-900 !bg-white !text-slate-900',
                style: {
                  borderRadius: '0px',
                  boxShadow: '8px 8px 0px 0px #0f172a',
                },
              }}
            />

            {/* Widget ติดต่อ: สายตรงเจ้าป่า */}
            <div className="fixed bottom-8 right-8 z-50">
              <Widget />
            </div>
          </RootProvider>
        </ChunkErrorBoundary>
      </body>
    </html>
  );
}
