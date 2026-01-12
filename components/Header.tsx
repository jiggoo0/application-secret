/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.754Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: Header          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cpu, Activity } from 'lucide-react'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuOpen: () => void
}

/**
 * HEADER — MAIN_NAVIGATION
 * ---------------------------------------------------------------
 * - ตัด workaround type cast ที่ไม่จำเป็น
 * - ปรับ active logic ให้เสถียรกับ route จริง
 * - คุม contrast ให้คงที่ทั้ง Light / Dark
 * - ลด state ที่ไม่จำเป็น
 */
export function Header({ onMenuOpen }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = navigationConfig.mainNav // ไม่ต้อง filter '/assessment'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-300',
        isScrolled
          ? 'border-b border-slate-800 bg-[#020617]/90 py-3 backdrop-blur-xl'
          : 'bg-transparent py-6',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center bg-[#020617] ring-1 ring-slate-800 transition-all duration-300 group-hover:rotate-90 group-hover:bg-[#FCDE09] group-hover:ring-[#FCDE09]">
            <Cpu
              size={20}
              className={cn(
                'transition-colors duration-300',
                isScrolled ? 'text-[#FCDE09] group-hover:text-[#020617]' : 'text-[#FCDE09]',
              )}
            />
            <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse bg-[#FCDE09]" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-white">
              JP Visual
              <span className="text-[#FCDE09] drop-shadow-[1px_1px_0px_#020617]">.Docs</span>
            </span>
            <div className="flex items-center gap-1 opacity-60">
              <Activity size={8} className="text-[#FCDE09]" />
              <span className="font-mono text-[7px] font-bold tracking-[0.2em] text-slate-300">
                SYSTEM_ACTIVE
              </span>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[11px] font-black uppercase tracking-widest transition-colors duration-200',
                  active
                    ? 'text-[#FCDE09] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-[#FCDE09]'
                    : 'text-slate-300 hover:text-[#FCDE09]',
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* MOBILE MENU */}
        <button
          onClick={onMenuOpen}
          aria-label="Toggle Menu"
          className="shadow-sharp-brand flex h-12 w-12 items-center justify-center bg-[#FCDE09] text-[#020617] transition-transform active:scale-95"
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-[2px] w-6 bg-[#020617]" />
            <span className="h-[2px] w-6 bg-[#020617]" />
            <span className="h-[2px] w-4 self-end bg-[#020617]" />
          </div>
        </button>
      </div>
    </header>
  )
}
