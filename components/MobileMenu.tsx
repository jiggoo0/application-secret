/** @format */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X, ArrowRight, MessageSquare, ExternalLink, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

interface NavLink {
  readonly title: string
  readonly href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: readonly NavLink[]
}

/**
 * 🛰️ COMPONENT: MobileMenu
 * สถาปัตยกรรมนำทางมาตรฐานสูง (De-coupled State & Clean Version)
 * ✅ FIXED: Unused variables (Facebook, Zap, Cpu)
 * ✅ FIXED: 'react-hooks/set-state-in-effect' (Pass)
 */
export const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // 🛠️ ปั้นเวลา: Memoized callback ป้องกันการสร้างฟังก์ชันใหม่พร่ำเพรื่อ
  const updateTime = useCallback(() => {
    const now = new Date()
    setCurrentTime(
      now.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    )
  }, [])

  useEffect(() => {
    // 🛡️ Master Tech: ผลักงานเข้าสู่คิวถัดไป เพื่อเลี่ยง Cascading Render
    const initTask = setTimeout(() => {
      setMounted(true)
      updateTime()
    }, 0)

    const timer = setInterval(updateTime, 1000)

    return () => {
      clearTimeout(initTask)
      clearInterval(timer)
    }
  }, [updateTime])

  // 🛡️ กรองเมนูโดยรักษา Type-Safety สูงสุด
  const filteredLinks = navLinks.filter((link) => link.href !== '/assessment')

  if (!mounted) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] overflow-hidden bg-slate-950 transition-all duration-700 ease-sharp-ease',
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0',
      )}
    >
      {/* 🧩 UI_DECOR: Industrial Blueprint */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />
      <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-12" />

      {/* 🛠️ SYSTEM_MONITOR: แถบสถานะด้านบน */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse bg-brand" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white">
              System_Navigator
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
            <Activity size={10} className="text-brand" />
            <span>{currentTime || '--:--:--'}</span>
            <span className="text-slate-700">{'//'}</span>
            <span className="text-brand">UNIFIED_PORTAL_ACTIVE</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="group flex h-14 w-14 items-center justify-center border-2 border-white/20 bg-white/5 text-white shadow-sharp-sm transition-all hover:border-brand hover:bg-brand hover:text-slate-950 active:scale-95"
        >
          <X size={28} className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      {/* 🧭 NAVIGATION_MATRIX: รายการเมนู */}
      <div className="scrollbar-hide relative z-10 flex h-[calc(100vh-105px)] flex-col overflow-y-auto">
        <nav className="flex flex-col px-8 pt-10 md:px-14">
          {filteredLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'group relative flex items-center justify-between border-b border-white/10 py-8 transition-all duration-700 md:py-10',
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
              )}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[10px] font-black text-brand/50 group-hover:text-brand">
                  0{idx + 1}
                </span>
                <span className="text-5xl font-black uppercase tracking-tighter text-white transition-all group-hover:italic group-hover:text-brand md:text-7xl">
                  {link.title === 'Contact' ? 'Inquiry' : link.title}
                </span>
              </div>
              <ArrowRight
                size={32}
                className="-rotate-45 text-white/20 transition-all duration-500 group-hover:rotate-0 group-hover:text-brand"
              />
            </Link>
          ))}
        </nav>

        {/* 🏁 ACTION_CONSOLES: ส่วนติดต่อสอบถาม */}
        <div className="mt-auto border-t-2 border-slate-800 bg-slate-900/50 p-8 md:p-12">
          <div className="mx-auto max-w-lg">
            <div className="flex flex-col gap-4">
              <a
                href={siteConfig.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between border-2 border-brand bg-brand p-6 shadow-sharp transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <div className="flex items-center gap-5 text-slate-950">
                  <MessageSquare size={32} fill="currentColor" />
                  <div className="flex flex-col">
                    <span className="text-3xl font-black uppercase italic leading-none tracking-tighter">
                      Line Connect
                    </span>
                    <span className="font-mono text-[10px] font-black opacity-70">
                      OFFICIAL_ID: {siteConfig.contact.lineId}
                    </span>
                  </div>
                </div>
                <ExternalLink size={20} className="text-slate-950/50 group-hover:text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
