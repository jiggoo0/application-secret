/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.774Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: layout          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/**
 * @format
 * @description ROOT_LAYOUT: Master Architecture — JP-VISUALDOCS
 * ✅ CORE_SYSTEM: โครงสร้างพื้นฐาน + ฟอนต์
 * ✅ ENTERPRISE_CALM: สุภาพ น่าเชื่อถือ เน้นเอกสาร
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
        alt: `${siteConfig.name} – ศูนย์บริหารจัดการเอกสารและการอนุมัติ`,
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
  themeColor: '#FAFAF9', // Stone-50
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
        ibmPlexSansThai.variable,
        inter.variable,
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>

      <body className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)]">
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* CONTENT */}
            <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
