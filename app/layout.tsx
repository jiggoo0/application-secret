/** @format */
import React from "react"
import type { Metadata, Viewport } from "next"
import { Kanit } from "next/font/google"
import { siteConfig } from "@/config/site"
import { Providers } from "./providers" // ✅ FIXED: เปลี่ยนเป็น Named Import { Providers }
import { cn } from "@/lib/utils"
import "./globals.css"

/**
 * 🖋️ FONT_STRATEGY: Kanit (Standard for Thai Industrial Design)
 * ใช้ระบบ Variable เพื่อเรียกใช้งานผ่าน Tailwind CSS
 */
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-kanit",
  display: "swap",
})

/**
 * 🛰️ METADATA_PROTOCOL: SEO & OpenGraph Configuration
 */
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
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Protocol Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: siteConfig.assets.favicon,
    apple: siteConfig.assets.appleTouch,
  },
}

/**
 * 🖥️ VIEWPORT_STRATEGY: Mobile Optimization
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a", // Slate 900 (Industrial Dark)
}

/**
 * 🏗️ ROOT_LAYOUT_ARCHITECT
 * โครงสร้างพื้นฐานระดับรากของ JP Visual Docs
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          kanit.variable,
          "selection:bg-blue-600/20 selection:text-blue-600"
        )}
      >
        {/* 🛠️ EXECUTE_PROVIDERS: จัดการ Theme และ State ทั่วทั้งแอป */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
