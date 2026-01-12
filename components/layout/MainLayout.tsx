/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.917Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: MainLayout          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileMenu } from '@/components/MobileMenu'
import { navigationConfig } from '@/config/navigation'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  readonly children: React.ReactNode
}

/**
 * MAIN_LAYOUT — JP_VISUALDOCS
 * -------------------------------------------------------
 * - คุม scroll lock ด้วย state เดียว
 * - ไม่มี side effect แฝง
 * - โครงสร้างนิ่ง predictable
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div
      className={cn(
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable,
        'selection:bg-brand flex min-h-screen flex-col bg-white font-sans selection:text-slate-950',
      )}
    >
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navigationConfig.mainNav}
      />

      <Header onMenuOpen={() => setMenuOpen(true)} />

      <main className="relative flex flex-1 flex-col pt-20">{children}</main>

      <Footer />
    </div>
  )
}
