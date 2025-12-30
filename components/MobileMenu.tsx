/** * @format
 * @description MOBILE_MENU: Refactored for Runtime Safety & Industrial Design Consistency
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowRight, Facebook, MessageSquare, ExternalLink, Globe, Zap, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: readonly { readonly title: string; readonly href: string }[]
}

export const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  // 🛡️ Data Extraction Safety
  const social = siteConfig.social
  const contact = siteConfig.contact

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] overflow-hidden bg-slate-950 transition-all duration-700 ease-in-out',
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0',
      )}
    >
      {/* 🧩 BLUEPRINT_INFRASTRUCTURE */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="absolute left-6 top-0 h-full w-px bg-white/5 md:left-12" />

      {/* 🛠️ TOP_BAR: SYSTEM_MONITOR */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-none bg-brand" />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-white">
              System_Navigator
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
            <Cpu size={10} className="text-brand/50" />
            <span>{currentTime}</span>
            <span className="text-slate-800">{'//'}</span>
            <span>SECURE_ACCESS_GRANTED</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="group flex h-14 w-14 items-center justify-center rounded-none border-2 border-white/10 bg-white/5 text-white transition-all hover:border-brand hover:bg-brand hover:text-slate-950 active:scale-95"
        >
          <X size={28} className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      {/* 🧭 NAVIGATION_MATRIX */}
      <div className="scrollbar-hide relative z-10 flex h-[calc(100vh-105px)] flex-col overflow-y-auto">
        <nav className="flex flex-col px-8 pt-10 md:px-14">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'group relative flex items-center justify-between border-b border-white/5 py-8 transition-all duration-700 md:py-10',
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
              )}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[10px] font-black text-brand/30 group-hover:text-brand">
                  [ 0{idx + 1} ]
                </span>
                <span className="text-5xl font-black uppercase tracking-tighter text-white transition-all group-hover:italic group-hover:text-brand md:text-7xl">
                  {link.title}
                </span>
              </div>
              <div className="relative flex h-10 w-10 items-center justify-center">
                <ArrowRight
                  size={32}
                  className="-rotate-45 text-white/20 transition-all duration-500 group-hover:rotate-0 group-hover:text-brand"
                />
              </div>
            </Link>
          ))}
        </nav>

        {/* 🏁 ACTION_CONSOLES */}
        <div className="mt-auto border-t-2 border-slate-900 bg-slate-900/50 p-8 md:p-12">
          <div className="mx-auto max-w-lg">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand">
                <Zap size={12} fill="currentColor" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
                  Instant_Link_Interface
                </span>
              </div>
              <span className="font-mono text-[8px] font-bold uppercase text-slate-600">
                V_{siteConfig.system.version}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* ✅ SAFE_LINK: LINE_CONNECT */}
              {social?.line && (
                <a
                  href={social.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-sharp group relative flex items-center justify-between rounded-none border-2 border-slate-950 bg-brand p-6 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  <div className="flex items-center gap-5 text-slate-950">
                    <MessageSquare size={32} fill="currentColor" />
                    <div className="flex flex-col">
                      <span className="text-3xl font-black uppercase leading-none tracking-tighter">
                        LINE_CONNECT
                      </span>
                      <span className="mt-1 font-mono text-[11px] font-black opacity-60">
                        ID_NODE: {contact?.lineId}
                      </span>
                    </div>
                  </div>
                  <ExternalLink
                    size={20}
                    className="text-slate-950/40 group-hover:text-slate-950"
                  />
                </a>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* ✅ SAFE_LINK: FACEBOOK */}
                {social?.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-3 rounded-none border-2 border-white/5 bg-slate-900/80 py-6 text-white transition-all hover:border-brand hover:text-brand"
                  >
                    <Facebook size={24} />
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                      FACEBOOK
                    </span>
                  </a>
                )}
                <div className="flex flex-col items-center justify-center gap-3 rounded-none border-2 border-white/5 bg-slate-900/80 py-6 text-slate-500">
                  <Globe size={24} className="opacity-40" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                    HQ_NETWORK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
