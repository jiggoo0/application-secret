// app/layout.jsx
// 💡 Server Component - ไม่มี 'use client'

// 1. Local/Context Imports (Styles & Providers)
import './globals.css';
import Providers from './providers';

// 2. Project Libraries/Utilities
import { inter } from '@/lib/fonts';

// ✅ FIX IMPORT: เปลี่ยน Header และ Footer ให้ชี้ไปยัง components/layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// 3. Project Components (UI, General)
import Widget from '@/components/Widget';
import { Toaster } from '@/components/ui/sonner';

/**
 * 🌐 Root Layout - Standard Next.js App Router (RSC)
 * ----------------------------------------------------
 * ✅ โครงสร้างหลัก (HTML, Body)
 * ✅ ห่อหุ้มด้วย Providers สำหรับ Theme/Context
 */
export default function RootLayout({ children }) {
  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <Providers>
          {/* 🔝 Header */}
          <header
            role="banner"
            className="sticky top-0 z-40 w-full border-b border-border bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70"
          >
            {/* Component ที่ถูก Import ใหม่ */}
            <Header />
          </header>

          {/* 📦 Main Content */}
          <main
            id="main-content"
            role="main"
            className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 transition-all duration-300 sm:px-6 lg:px-8"
          >
            {children}
          </main>

          {/* 🔚 Footer */}
          <footer
            role="contentinfo"
            className="border-t border-border bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-gray-950/60"
          >
            {/* Component ที่ถูก Import ใหม่ */}
            <Footer />
          </footer>

          {/* 🔔 Global Toasts */}
          <Toaster position="top-right" richColors />

          {/* ⚙️ Floating Widget */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
            <Widget />
          </div>
        </Providers>
      </body>
    </html>
  );
}

// 💡 Default Metadata + SEO + OG + Twitter
export const metadata = {
  title: {
    default: 'Dev Jp - Visoul&Docs | บริการเอกสาร การเงิน และการตลาดครบวงจร',
    template: '%s | Dev Jp',
  },
  description:
    'บริการที่ปรึกษายื่นกู้สินเชื่อ, เอกสารยื่นวีซ่า, สลิปโอนเงินดิจิทัล, และงานออกแบบ/การตลาด สำหรับทุกสายอาชีพ',
  keywords: ['สินเชื่อ', 'วีซ่า', 'ตั๋วเครื่องบิน', 'เอกสารดิจิทัล', 'การตลาด', 'ออกแบบ'],
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://www.jpvisouldocs.online/'),
  openGraph: {
    title: 'Dev Jp - Visoul&Docs',
    description:
      'บริการที่ปรึกษายื่นกู้สินเชื่อ, เอกสารยื่นวีซ่า, สลิปโอนเงินดิจิทัล, และงานออกแบบ/การตลาด สำหรับทุกสายอาชีพ',
    url: 'https://www.jpvisouldocs.online/',
    siteName: 'JP Visoul&Docs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jpvisouldocs', // ถ้ามี Twitter
    title: 'Dev Jp - Visoul&Docs',
    description:
      'บริการที่ปรึกษายื่นกู้สินเชื่อ, เอกสารยื่นวีซ่า, สลิปโอนเงินดิจิทัล, และงานออกแบบ/การตลาด สำหรับทุกสายอาชีพ',
    images: ['/og-image.png'],
  },
};
