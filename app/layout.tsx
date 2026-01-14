import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, Sarabun } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AppProvider } from "@/providers/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

// 1. Font Configuration
const ibmPlexThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-heading",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-body",
  display: "swap",
});

// 2. Metadata & SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://jpvisouldocs.online"),
  title: {
    default: "JP-VISOUL.DOCS | บริการเอกสารและวีซ่าครบวงจร",
    template: "%s | JP-VISOUL.DOCS",
  },
  description:
    "สะพานเชื่อมโอกาส ผ่านงานเอกสารที่โปร่งใสและเข้าถึงง่าย ทั้งบริการวีซ่า แปลเอกสาร และจดทะเบียนธุรกิจ ทั่วประเทศไทย",
  keywords: [
    "ขอวีซ่า",
    "จดทะเบียนบริษัท",
    "แปลเอกสาร",
    "JP-VISOUL",
    "Legal Documents Thailand",
  ],
  authors: [{ name: "JP-VISOUL Team" }],
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://jpvisouldocs.online",
    siteName: "JP-VISOUL.DOCS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JP-VISOUL Services",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A192F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
          "min-h-screen flex flex-col font-body antialiased bg-white text-slate-900 selection:bg-secondary/20 selection:text-secondary",
          ibmPlexThai.variable,
          sarabun.variable,
        )}
      >
        <AppProvider>
          {/* --- TOP FIXED NAVIGATION ---
              เราเก็บไว้เฉพาะ Navbar เพื่อให้แถบเมนูกะทัดรัด (Slim) 
              และมีพื้นที่สำหรับอ่านเนื้อหามากขึ้น
          */}
          <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col shadow-sm bg-white/95 backdrop-blur-md">
            {/* นำ <Header /> ออกเพื่อให้ไปเรียกใช้ในรายหน้าแทน */}
            <Navbar />
          </div>

          {/* --- MAIN CONTENT AREA ---
              - pt-[64px]: เว้นระยะให้เท่ากับความสูงมาตรฐานของ Navbar
              - lg:pt-[72px]: ปรับขนาดตามหน้าจอ Desktop
          */}

          <main className="flex-grow pt-[64px] lg:pt-[72px] overflow-x-hidden animate-entry">
            {children}
          </main>

          <Footer />

          <Toaster
            position="top-center"
            richColors
            expand={false}
            closeButton
          />
        </AppProvider>
      </body>
    </html>
  );
}
