/** @format */

import type { Metadata, Viewport } from "next"
import { siteConfig } from "@/config/site"
import { Providers } from "./providers"
// 🛠️ FIX: นำเข้าแบบ Named Import เพื่อป้องกัน Runtime Error 500
import { JsonLd } from "@/components/seo/JsonLd"
import { cn } from "@/lib/utils"
// 🏗️ SOURCE_OF_TRUTH: ใช้ฟอนต์จาก lib/fonts.ts เท่านั้น
import { inter, ibmPlexSansThai, jetbrainsMono } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "th_TH",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [siteConfig.assets.ogImage],
    creator: "@JPVisualDocs",
  },
  icons: {
    icon: siteConfig.assets.favicon,
    apple: siteConfig.assets.appleTouch,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FCDE09", // Brand Yellow
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={siteConfig.language[0]}
      className={cn(
        "scroll-smooth",
        // 🖋️ ฉีด Font Variables เข้าสู่ระบบ
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        {/* 🚀 SCHEMA_ENGINE: สำหรับ Rich Snippets (SEO) */}
        <JsonLd />
      </head>

      <body
        className={cn(
          "min-h-screen bg-white font-thai text-slate-950 antialiased",
          "selection:bg-brand selection:text-slate-950"
        )}
      >
        <Providers>
          {/* Senior Consultant Note: 
            โครงสร้างหลักจะถูกจัดการต่อใน MainLayout 
            เพื่อให้การควบคุม Header/Footer เป็นไปตามมาตรฐานวิศวกรรม
          */}
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
