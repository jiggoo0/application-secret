/** @format */

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

/**
 * 🛰️ COMPONENT: MainLayout
 * PURPOSE: โครงสร้างหลักของเว็บไซต์ (Unified Architecture)
 * ✅ FIXED: แก้ไข Path การ Import ให้ตรงกับ Folder Structure จริง
 * ✅ FIXED: ตัดการทำ Double Export เพื่อแก้ปัญหา Knip Duplicate Exports
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 🔒 SCROLL_LOCK_PROTOCOL: ป้องกันการเลื่อนหน้าจอเมื่อเปิดเมนู Mobile
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
        'min-h-screen bg-white font-sans selection:bg-[#FCDE09] selection:text-[#020617]',
      )}
    >
      {/* 🧭 NAVIGATION_SYSTEM */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navigationConfig.mainNav}
      />

      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      {/* 🏗️ CONTENT_STRATA: ปรับ Padding-top ให้พอดีกับ Header ความสูง 20 unit */}
      <main className="relative flex flex-1 flex-col pt-20">{children}</main>

      {/* 🏁 FOOTER_SYSTEM */}
      <Footer />
    </div>
  )
}
