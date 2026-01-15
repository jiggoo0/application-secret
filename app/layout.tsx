// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AppProvider } from "@/providers/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

/**
 * Font configuration
 * - Headings: IBM Plex Sans Thai
 * - Body: Inter
 */
const ibmPlexThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Global metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://jpvisouldocs.online"),
  title: {
    default: "JP-VISOUL | เพื่อนคู่คิดด้านเอกสารและการวางแผนที่ปรึกษาคุณ",
    template: "%s | JP-VISOUL",
  },
  description:
    "ช่วยจัดการเอกสารที่ยุ่งยากให้เป็นเรื่องง่าย พร้อมดูแลทุกขั้นตอนอย่างใส่ใจ",
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://jpvisouldocs.online",
    siteName: "JP-VISOUL Intelligence",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JP-VISOUL – Document & Advisory Services",
      },
    ],
  },
};

/**
 * Viewport configuration
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A192F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-[#FAFAFA] text-[#1A1A1A] antialiased",
          ibmPlexThai.variable,
          inter.variable,
          "font-body selection:bg-blue-600/20 selection:text-[#0A192F]",
        )}
      >
        <AppProvider>
          {/* Noise texture overlay */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[9999] bg-[url('/images/noise.png')] opacity-[0.015]"
          />

          <Navbar />

          {/* Main content */}
          <main className="relative flex-grow pt-[80px] lg:pt-[90px]">
            {/* Decorative gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-[500px] w-full bg-gradient-to-b from-blue-50/50 to-transparent"
            />
            <div className="relative z-10">{children}</div>
          </main>

          <Footer />

          {/* Global toaster */}
          <Toaster
            position="bottom-right"
            richColors
            expand
            closeButton
            toastOptions={{
              className:
                "rounded-2xl border-none bg-white/95 font-heading text-[#0A192F] shadow-2xl backdrop-blur-md",
              style: {
                borderRadius: "16px",
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
