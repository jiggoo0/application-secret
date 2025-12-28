/** @format */

"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  X,
  ArrowRight,
  Facebook,
  MessageSquare,
  ExternalLink,
  Globe,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: readonly { readonly title: string; readonly href: string }[]
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour12: false }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "ease-[cubic-bezier(0.85,0,0.15,1)] fixed inset-0 z-[999] bg-slate-950 transition-all duration-700",
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.05]" />

      {/* 🛠️ TOP_BAR: Industrial Sharp Design */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 p-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-brand" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white">
              OPERATIONAL_MENU
            </span>
          </div>
          <span className="mt-0.5 font-mono text-[7px] uppercase text-slate-500">
            {/* ✅ FIXED: Wrapping comment-like text in braces */}
            {currentTime} {"// SYSTEM_READY"}
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white transition-all hover:bg-brand hover:text-slate-950"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative z-10 flex h-[calc(100vh-97px)] flex-col overflow-y-auto">
        <nav className="flex flex-col px-8 pt-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "group flex items-center justify-between border-b border-white/5 py-8 transition-all duration-500",
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs font-bold text-brand/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-5xl font-black uppercase tracking-[-0.05em] text-white transition-all group-hover:italic group-hover:text-brand">
                  {link.title}
                </span>
              </div>
              <ArrowRight
                size={24}
                className="-rotate-45 text-white transition-all group-hover:rotate-0 group-hover:text-brand"
              />
            </Link>
          ))}
        </nav>

        {/* 🏁 ACTION_ZONE */}
        <div className="mt-auto border-t border-brand/20 bg-brand/5 p-8">
          <div className="mb-6 flex items-center gap-2 text-brand">
            <Zap size={14} fill="currentColor" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest">
              INSTANT_INQUIRY
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <a
              href={siteConfig.social.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-slate-950 bg-brand p-6 shadow-sharp transition-all hover:-translate-y-1 active:translate-y-0"
            >
              <div className="flex items-center gap-4 text-slate-950">
                <MessageSquare size={28} fill="currentColor" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black uppercase leading-none tracking-tighter">
                    LINE_OFFICIAL
                  </span>
                  <span className="mt-1 font-mono text-[10px] font-bold opacity-70">
                    ID: {siteConfig.contact.lineId}
                  </span>
                </div>
              </div>
              <ExternalLink size={20} className="text-slate-950" />
            </a>

            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-slate-900 p-4 text-white transition-colors hover:bg-brand hover:text-slate-950"
              >
                <Facebook size={18} />
                <span className="font-mono text-[10px] font-black uppercase">
                  FACEBOOK
                </span>
              </a>
              <div className="flex items-center justify-center gap-3 bg-slate-900 p-4 text-slate-400">
                <Globe size={18} />
                <span className="font-mono text-[10px] font-black uppercase">
                  TH_GLOBAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
