/** @format */

import React from "react"
import type { Metadata, Viewport } from "next"
import { Kanit } from "next/font/google"
import { siteConfig } from "@/config/site"
import Providers from "./providers"
import "./globals.css"

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-kanit",
  display: "swap",
})

const siteUrl = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  // ✅ แก้ไข: แปลง Readonly Array เป็น Mutable Array เพื่อให้ผ่าน Type-check
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Professional Document Architecture`,
        type: "image/webp",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a", // Slate 900
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans antialiased selection:bg-blue-600/10 selection:text-blue-600">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
