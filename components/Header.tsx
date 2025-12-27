/** @format */
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, ArrowUpRight, Menu, Zap } from "lucide-react"
import { siteConfig } from "@/config/site"
import { navigationConfig } from "@/config/navigation"
import { SystemStatus } from "./ui/SystemStatus"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onMenuOpen: () => void
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // ✅ แก้ไข: ใช้ requestAnimationFrame เพื่อป้องกัน Cascading Renders
    // และลดปัญหา Hydration Mismatch ในโปรเจกต์ Next.js
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
    })

    const handleScroll = () => {
      // ✅ ใช้ค่า Offset 50 ตามมาตรฐาน UI UX
      const offset = window.scrollY > 50
      setIsScrolled(offset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // 🔒 PRE-RENDER_LOCK
  if (!mounted) return null

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
        isScrolled
          ? "border-b-2 border-industrial-border bg-white/95 py-3 shadow-blueprint backdrop-blur-md"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6">
        {/* 🦁 BRAND_IDENTITY (INDUSTRIAL_SHARP) */}
        <Link
          href="/"
          className="group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="relative flex h-10 w-10 items-center justify-center bg-industrial-black text-white transition-all group-hover:bg-brand">
            <ShieldCheck size={22} className="relative z-10" />
            <div className="absolute inset-0 translate-x-1 translate-y-1 border border-industrial-border transition-all group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase leading-none tracking-tighter text-industrial-black">
              JP VISUAL<span className="text-brand">.</span>DOCS
            </span>
            <div className="mt-1 flex items-center gap-1">
              <span className="font-mono text-[7px] font-black uppercase tracking-[0.3em] text-industrial-gray">
                {siteConfig.author.role.replace(/ /g, "_")}
              </span>
              <Zap size={8} className="fill-brand text-brand" />
            </div>
          </div>
        </Link>

        {/* 💻 DESKTOP_MENU */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main Navigation"
        >
          {navigationConfig.mainNav.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href.includes("#"))

            return (
              <Link
                key={link.name}
                href={link.href}
                className="group relative flex flex-col items-center outline-none"
              >
                <span
                  className={cn(
                    "text-[8px] font-black uppercase tracking-[0.3em]",
                    isActive
                      ? "text-brand"
                      : "text-industrial-gray group-hover:text-brand"
                  )}
                >
                  {link.label}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-black uppercase",
                    isActive
                      ? "text-industrial-black"
                      : "text-slate-600 group-hover:text-industrial-black"
                  )}
                >
                  {link.name}
                </span>
                <div
                  className={cn(
                    "mt-1 h-[2px] bg-brand transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )
          })}
        </nav>

        {/* 🛠️ ACTIONS & STATUS */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <SystemStatus />
          </div>

          <Link
            href={navigationConfig.actions.primary.href}
            className="hidden items-center gap-3 bg-industrial-black px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-blueprint transition-all hover:bg-brand hover:shadow-none active:translate-x-1 active:translate-y-1 md:flex"
          >
            {navigationConfig.actions.primary.label}{" "}
            <ArrowUpRight size={14} className="text-blue-400" />
          </Link>

          <button
            onClick={onMenuOpen}
            className="flex h-11 w-11 items-center justify-center border-2 border-industrial-black bg-white text-industrial-black shadow-sharp transition-all hover:bg-industrial-black hover:text-white lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
