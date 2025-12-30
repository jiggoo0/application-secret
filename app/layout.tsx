/**
 * @format
 * @description ROOT_LAYOUT: Master Architecture (V5.1.0 - High Visibility)
 * ✅ MASTER_REFACTOR: ปรับปรุง Contrast และลำดับ Font เพื่อแก้ปัญหาตัวหนังสือจาง
 * ✅ INDUSTRIAL_SHARP: บังคับใช้ระบบ High-Contrast (White on Deep Slate)
 */

import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { Providers } from './providers'
import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/utils'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'

import './globals.css'

/* -------------------------------------------------------------------------- */
/* METADATA_ENGINE */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: Array.isArray(siteConfig.seo.keywords) ? [...siteConfig.seo.keywords] : [],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'th_TH',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Technical Document Specialist`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* -------------------------------------------------------------------------- */
/* VIEWPORT_PROTOCOL */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020617', // Slate-950
}

/* -------------------------------------------------------------------------- */
/* MAIN_ARCHITECTURE */
/* -------------------------------------------------------------------------- */

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="th"
      className={cn(
        'scroll-smooth antialiased',
        // นำ Variable ของ Font ทั้งหมดมาใส่ที่ html เพื่อให้เรียกใช้ได้ทั่วถึง
        ibmPlexSansThai.variable,
        inter.variable,
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>

      <body
        className={cn(
          // เปลี่ยน text-white เป็น text-slate-100 (ขาวนวลที่คมชัด) เพื่อลดความล้าของสายตาแต่ยัง Contrast สูง
          'min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-[#FCDE09] selection:text-slate-950',
          'scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-[#FCDE09]',
        )}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* 📐 Blueprint Grid Overlay: ปรับลดความเข้มเส้นตารางลงอีกเพื่อให้ตัวหนังสือเด้งออกมา */}
            <div
              className="pointer-events-none fixed inset-0 z-[-1] bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.015]"
              aria-hidden="true"
            />

            {/* เลเยอร์ป้องกันตัวหนังสือจม: ใช้ Gradient จางๆ ทับหน้า Grid อีกที */}
            <div className="pointer-events-none fixed inset-0 z-[-1] bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

            <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
