/** @format */
import React from "react"
import type { Metadata, Viewport } from "next"
import { Kanit } from "next/font/google"
import { siteConfig } from "@/config/site"
import { Providers } from "./providers"
import { JsonLd } from "@/components/seo/JsonLd" // ✅ Import ที่แยกออกมา
import { cn } from "@/lib/utils"
import "./globals.css"

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-kanit",
  display: "swap",
})

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
    locale: siteConfig.locale.replace("-", "_"),
    type: "website",
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
  },
  icons: {
    icon: siteConfig.assets.favicon,
    apple: siteConfig.assets.appleTouch,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={siteConfig.language[0]}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* 🛰️ Injection Protocol: ฝังข้อมูล SEO ก่อน Render */}
        <JsonLd />
      </head>
      <body
        className={cn(
          "font-kanit min-h-screen bg-industrial-surface antialiased selection:bg-blue-500/30",
          kanit.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
