/**
 * @format
 * @description ROOT_LAYOUT: Protocol V4.6.0 (Strict Sharp Edition)
 * ✅ FIXED: Import Paths, Metadata Type Consistency, Theme Synchronization
 */

import type { Metadata, Viewport } from 'next'
// 🛡️ FIX: เปลี่ยน Path ให้ตรงกับโครงสร้างไฟล์จริงของคุณ
import { siteConfig } from '@/config/site'
import { Providers } from './providers'
import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/utils'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'

import './globals.css'

/* -------------------------------------------------------------------------- */
/* METADATA_ENGINE                           */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  // 🛡️ FIX: บังคับให้เป็น Mutable Array เพื่อรองรับ Next.js 15 Metadata Type
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
        alt: `${siteConfig.name} - Infrastructure`,
      },
    ],
  },
}

/* -------------------------------------------------------------------------- */
/* VIEWPORT_PROTOCOL                         */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#05080A', // Rich Black เพื่อความหรูหราแบบ Industrial
}

/* -------------------------------------------------------------------------- */
/* MAIN_ARCHITECTURE                        */
/* -------------------------------------------------------------------------- */

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang={siteConfig.language?.[0] || 'th'}
      className={cn(
        'scroll-smooth',
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>

      <body
        className={cn(
          'min-h-screen antialiased',
          'bg-base-bg text-base-text font-sans', // ใช้ CSS Variables ที่แมปกับ Tailwind config
          'selection:bg-brand-accent selection:text-brand-primary',
        )}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* 📐 Blueprint Grid Overlay: ความแม่นยำระดับ 0.015 Opacity */}
            <div
              className="bg-blueprint-grid pointer-events-none fixed inset-0 z-[-1] opacity-[0.015]"
              aria-hidden="true"
            />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
