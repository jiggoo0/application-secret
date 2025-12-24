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
 * ตั้งค่าการแสดงผลบนอุปกรณ์พกพาและธีมสีระบบ
 */
export const viewport: Viewport = {
  themeColor: '#0f172a', // Slate-900 (Industrial Base)
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * 🌎 2. Global Metadata (SEO Engine)
 * จัดการข้อมูลสำหรับการทำอันดับและพรีวิวบน Social Media
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://www.jpvisouldocs.online'),
  title: {
    default: 'JP-VISOUL | จบงานเอกสารแบบตัวจริง โดย เจ้าป่า',
    template: '%s | JP-VISOUL',
  },
  description:
    'ที่ปรึกษาการจัดการเอกสารและโปรไฟล์เฉพาะทาง งานกริบ ตรวจสอบได้จริง รักษาความลับลูกค้าคือกฎข้อแรกที่ยึดถือ โดยทีมงานเจ้าป่า',
  keywords: [
    'เจ้าป่า',
    'JP-VISOUL',
    'ทำเอกสารด่วน',
    'จัดการโปรไฟล์',
    'ที่ปรึกษาวีซ่า',
    'ปั้นเคสสินเชื่อ',
    'Industrial Neobrutalism',
  ],
  authors: [{ name: 'JP-VISOUL (JAO-PA)' }],
  openGraph: {
    title: 'JP-VISOUL | จบงานเอกสารแบบตัวจริง โดย เจ้าป่า',
    description:
      'เปลี่ยนเรื่องยากให้เป็นเรื่องง่าย ด้วยระบบจัดการเอกสารที่แม่นยำที่สุด จบงานคือลบทิ้ง ปลอดภัย 100%',
    url: 'https://www.jpvisouldocs.online',
    siteName: 'JP-VISOUL OFFICIAL',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'JP-VISOUL Industrial Document Factory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JP-VISOUL | ดีลงานตรงกับเจ้าป่า',
    description: 'จัดการเอกสารความละเอียดสูง เน้นผลลัพธ์ ไม่ต้องอธิบายเยอะ',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: { 'fb:app_id': '1051070927146698' },
};

/**
 * 🏗️ 3. Root Layout Component
 * โครงสร้างหลักที่หุ้มทุกหน้าในแอปพลิเคชัน
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
        {/* ส่วนป้องกัน Error ระดับ Chunk */}
        <ChunkErrorBoundary>
          {/* ระบบ Global State & Context */}
          <RootProvider>
            {/* ระบบจัดการ URL ให้สะอาด (SEO Friendly) */}
            <CleanUrl />

            {/* 🚀 Main Workspace: 
               พื้นที่นี้จะถูกหุ้มด้วย (main)/layout.tsx หรือ (business)/layout.tsx 
               ตามโครงสร้าง Route Group ที่เราแยกไว้
            */}
            <main id="main-content" role="main" className="mx-auto w-full flex-1">
              {children}
            </main>

            {/* 🧩 Toaster: ระบบแจ้งเตือนสไตล์ Neobrutalist (ขอบหนา เงาคม) */}
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

            {/* 💬 Widget สายตรง: ติดต่อเจ้าป่า (Fixed Position) */}
            <div className="fixed bottom-8 right-8 z-50">
              <Widget />
            </div>
          </RootProvider>
        </ChunkErrorBoundary>
      </body>
    </html>
  );
}
