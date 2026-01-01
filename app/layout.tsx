/**
 * @format
 * @description ROOT_LAYOUT: Master Architecture (V5.1.0)
 * ✅ CORE_SYSTEM: จัดการโครงสร้างพื้นฐานและลำดับฟอนต์
 * ✅ INDUSTRIAL_SHARP: ดีไซน์เน้นความคมชัดสูง (High-Contrast)
 */

import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { Providers } from './providers'
import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/utils'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'

import './globals.css'

/* -------------------------------------------------------------------------- */
/* METADATA_ENGINE (ระบบจัดการข้อมูล SEO) */
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
        alt: `${siteConfig.name} - ที่ปรึกษาด้านการจัดการเอกสารวีซ่าและสินเชื่อ`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* -------------------------------------------------------------------------- */
/* VIEWPORT_PROTOCOL (การแสดงผลบนอุปกรณ์) */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020617', // Slate-950 (สีหลักของระบบ)
}

/* -------------------------------------------------------------------------- */
/* MAIN_ARCHITECTURE (โครงสร้างเว็บหลัก) */
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
          'min-h-screen bg-[#020617] font-sans text-slate-100 selection:bg-[#FCDE09] selection:text-slate-950',
          'scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-[#FCDE09]',
        )}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* 🧩 UI_DECOR: Blueprint Grid Background */}
            <div
              className="pointer-events-none fixed inset-0 z-[-1] bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.015]"
              aria-hidden="true"
            />

            {/* 🎨 UI_DECOR: Depth Gradient Overlay */}
            <div className="pointer-events-none fixed inset-0 z-[-1] bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

            <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
