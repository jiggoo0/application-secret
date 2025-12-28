/** @format */
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cpu } from "lucide-react"
import { navigationConfig } from "@/config/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onMenuOpen: () => void
}

/**
 * 🛰️ COMPONENT: Header
 * ส่วนหัวของระบบพร้อมระบบตรวจจับการ Scroll และ Active Path
 * แก้ไข: ลบ siteConfig ที่ไม่ได้ใช้ และจัดการ pathname เพื่อรองรับ Active State
 */
export function Header({ onMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
        isScrolled
          ? "border-b border-slate-100 bg-white/80 py-3 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* --- LOGO_NODE --- */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center bg-slate-950 transition-transform group-hover:rotate-90">
            <Cpu className="text-brand" size={20} />
            <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse bg-brand" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-slate-950">
              JP Visual<span className="text-brand">.Docs</span>
            </span>
          </div>
        </Link>

        {/* --- DESKTOP_NAVIGATION --- */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navigationConfig.mainNav.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase italic transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-slate-400 hover:text-slate-950"
                )}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>

        {/* --- MOBILE_TRIGGER --- */}
        <button
          onClick={onMenuOpen}
          aria-label="Toggle Menu"
          className="flex h-12 w-12 items-center justify-center bg-slate-950 text-white transition-all hover:bg-brand hover:text-slate-950"
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-[2px] w-5 bg-current" />
            <span className="h-[2px] w-5 bg-current" />
            <span className="h-[2px] w-5 bg-current" />
          </div>
        </button>
      </div>
    </header>
  )
}
