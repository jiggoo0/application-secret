// app/layout.js (Refactored to Server Component)
// 💡 ลบ 'use client' ออก

import './globals.css';
import { inter } from '@/lib/fonts'; // สมมติว่า inter เป็น font object ที่ถูกต้อง
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Widget from '@/components/Widget';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';

/**
 * 🌐 Root Layout - Standard Next.js App Router (RSC)
 * ----------------------------------------------------
 * ✅ โครงสร้างหลัก (HTML, Body)
 * ✅ ห่อหุ้มด้วย Providers สำหรับ Theme/Context
 */
export default function RootLayout({ children }) {
  // 💡 ใน RSC เราไม่สามารถใช้ useState/useEffect ได้
  // การจัดการ Theme จะถูกย้ายไปที่ Providers.js

  return (
    // 💡 การใช้ suppressHydrationWarning ใน <html> เป็นมาตรฐานในการจัดการ Theme/Class
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <body
        // กำหนด class พื้นฐานสำหรับการจัดการ Theme
        className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <Providers>
          {/* 🔝 Header */}
          <header
            role="banner"
            className="sticky top-0 z-40 w-full border-b border-border bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70"
          >
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

// 💡 Bonus: เพิ่ม Default Metadata เพื่อช่วย SEO
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
};
