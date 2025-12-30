/** * @format
 * @description MAIN_LAYOUT: Seamless Blueprint Edition (V2.6)
 * ✅ ENFORCEMENT: Global White Base with Persistent Blueprint Grid
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileMenu } from '@/components/MobileMenu'
import { navigationConfig } from '@/config/navigation'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 🛡️ PROTOCOL: Body Scroll Locking
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div
      className={cn(
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable,
        'relative flex min-h-screen flex-col bg-white font-sans antialiased selection:bg-brand selection:text-slate-950',
      )}
    >
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navigationConfig.mainNav}
      />

      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      {/* 🚀 CORE_INFRASTRUCTURE: พื้นที่แสดงผลหลักพร้อมลายกริตต่อเนื่อง */}
      <main className="relative flex-grow pt-20 outline-none">
        {/* 🧩 GLOBAL_BLUEPRINT: ลายกริตที่จะปรากฏอยู่เบื้องหลังทุก Section */}
        <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.03]" />

        {/* Content Container: อยู่เหนือ Blueprint */}
        <div className="relative z-10">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
