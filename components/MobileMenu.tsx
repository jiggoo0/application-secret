/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.749Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: MobileMenu          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const [currentTime, setCurrentTime] = useState('--:--:--')
  const mountedRef = useRef(false)

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

  // interval update
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      // initial update outside synchronous effect
      requestAnimationFrame(updateTime)
    }
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [updateTime])

  const links = navLinks.filter((link) => link.href !== '/assessment')

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'ease-sharp-ease fixed inset-0 z-[999] bg-slate-950 transition-opacity transition-transform duration-700',
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0',
      )}
    >
      {/* BACKDROP GRID */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-12" />

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="bg-brand h-2 w-2 animate-pulse" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white">
              SYSTEM_NAVIGATOR
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
            <Activity size={10} className="text-brand" />
            <span>{currentTime}</span>
            <span className="text-slate-700">{'//'}</span>
            <span className="text-brand">PORTAL_ACTIVE</span>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close menu"
          className="shadow-sharp-sm hover:border-brand hover:bg-brand group flex h-14 w-14 items-center justify-center border-2 border-white/20 bg-white/5 text-white transition-all hover:text-slate-950 active:scale-95"
        >
          <X size={28} className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      {/* NAV */}
      <div className="relative z-10 flex h-[calc(100vh-105px)] flex-col overflow-y-auto">
        <nav className="flex flex-col px-8 pt-10 md:px-14">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'group flex items-center justify-between border-b border-white/10 py-8 transition-all duration-700 md:py-10',
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-brand/50 group-hover:text-brand font-mono text-[10px] font-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="group-hover:text-brand text-5xl font-black uppercase tracking-tighter text-white transition-all group-hover:italic md:text-7xl">
                  {link.title === 'Contact' ? 'Inquiry' : link.title}
                </span>
              </div>
              <ArrowRight
                size={32}
                className="group-hover:text-brand -rotate-45 text-white/20 transition-all duration-500 group-hover:rotate-0"
              />
            </Link>
          ))}
        </nav>

        {/* ACTION */}
        <div className="mt-auto border-t-2 border-slate-800 bg-slate-900/50 p-8 md:p-12">
          <a
            href={siteConfig.social.line}
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand bg-brand shadow-sharp group mx-auto flex max-w-lg items-center justify-between border-2 p-6 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <div className="flex items-center gap-5 text-slate-950">
              <MessageSquare size={32} fill="currentColor" />
              <div>
                <span className="block text-3xl font-black uppercase italic leading-none tracking-tighter">
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
  )
}
