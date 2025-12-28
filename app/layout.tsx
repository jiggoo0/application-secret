/** @format */
import type { Metadata, Viewport } from "next"
import { siteConfig } from "@/config/site"
import { Providers } from "./providers"
import { JsonLd } from "@/components/seo/JsonLd"
import { cn } from "@/lib/utils"
import { inter, ibmPlexSansThai, jetbrainsMono } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
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
        alt: "JP Visual Docs Infrastructure",
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FCDE09",
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang={siteConfig.language[0]}
      className={cn(
        "scroll-smooth",
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white font-thai text-slate-950 antialiased selection:bg-[#FCDE09] selection:text-slate-950"
        )}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-[-1] bg-blueprint-grid opacity-[0.02]" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
