/** @format */

'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileMenu } from '@/components/MobileMenu'
// 🗑️ REMOVED: ถอด FloatingSearchButton ออกตามคำสั่งตรวจสอบ
import { navigationConfig } from '@/config/navigation'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 🛰️ COMPONENT: MainLayout (REFINE_MODE)
 * PURPOSE: โครงสร้างหลักที่เน้นความคลีนและระบบนำทางมาตรฐาน
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navigationConfig.mainNav}
      />

      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="relative flex flex-1 flex-col pt-20">
        {children}
      </main>

      <Footer />
    </div>
  )
}
