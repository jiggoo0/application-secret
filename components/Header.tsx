/** @format */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cpu, Activity } from 'lucide-react'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuOpen: () => void
}

/**
 * 🛰️ COMPONENT: Header
 * Refactored for Unified Portal (Contact & Assessment)
 * ✅ FIXED: TypeScript Type-check mismatch (href comparison)
 * ✅ IMPROVED: Contrast visibility for Dark/Light mode transitions
 */
export function Header({ onMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * 🛡️ SAFE_FILTER: กรองเมนูโดยใช้การหลีกเลี่ยง Type Error
   * ใช้ (link.href as unknown as string) เพื่อแก้ปัญหา No Overlap Type Error ใน tsc
   */
  const filteredNav = navigationConfig.mainNav.filter(
    (link) => (link.href as unknown as string) !== '/assessment',
  )

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[100] transition-all duration-500',
        isScrolled
          ? 'border-b border-slate-800 bg-[#020617]/90 py-3 shadow-lg backdrop-blur-xl'
          : 'bg-transparent py-6',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* --- LOGO_NODE: Industrial Identity --- */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center bg-[#020617] ring-1 ring-slate-800 transition-all duration-500 group-hover:rotate-90 group-hover:bg-[#FCDE09] group-hover:ring-[#FCDE09]">
            <Cpu
              className={cn(
                'transition-colors duration-500',
                isScrolled ? 'text-[#FCDE09] group-hover:text-[#020617]' : 'text-[#FCDE09]',
              )}
              size={20}
            />
            <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse bg-[#FCDE09]" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                'text-xl font-black uppercase italic leading-none tracking-tighter transition-colors',
                isScrolled ? 'text-white' : 'text-white', // ปรับให้เป็นสีขาวเสมอเพื่อสู้กับพื้นหลังใส/ดำ
              )}
            >
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

        {/* --- DESKTOP_NAVIGATION: High Contrast & Sharp --- */}
        <nav className="hidden items-center gap-10 lg:flex">
          {filteredNav.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                  isActive
                    ? 'text-[#FCDE09] before:absolute before:-bottom-2 before:left-0 before:h-0.5 before:w-full before:bg-[#FCDE09]'
                    : 'text-slate-300 hover:text-[#FCDE09]',
                )}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>

        {/* --- ACTION_TRIGGER: Mobile Menu & Portal Access --- */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuOpen}
            aria-label="Toggle Menu"
            className="flex h-12 w-12 items-center justify-center bg-[#FCDE09] text-[#020617] shadow-sharp-brand transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:scale-95"
          >
            <div className="flex flex-col gap-1.5">
              <span className="h-[2px] w-6 bg-[#020617]" />
              <span className="h-[2px] w-6 bg-[#020617]" />
              <span className="h-[2px] w-4 self-end bg-[#020617]" />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
