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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || `https://${siteConfig.domain}`),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: [
    "รับทำวีซ่า",
    "แปลเอกสาร",
    "JP Visual Docs",
    "Visa Thailand",
    "จดทะเบียนบริษัท",
  ],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    url: siteConfig.url || `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JP Visual Docs - Professional Document Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans antialiased selection:bg-blue-600/10 selection:text-blue-600">
        <Providers>
          {children} {/* Nested Layouts render Header/Footer */}
        </Providers>
      </body>
    </html>
  )
}
