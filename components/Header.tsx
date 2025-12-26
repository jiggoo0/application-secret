/** @format */
"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, ArrowUpRight, Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { SystemStatus } from "./ui/SystemStatus"
import MobileMenu from "./MobileMenu"

interface NavLink {
  name: string
  href: string
  label: string
}

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // ✅ ใช้ requestAnimationFrame เพื่อเลี่ยง cascading renders ตามกฎ Lint
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
    })

    const handleScroll = () => {
      const offset = window.scrollY > 20
      setIsScrolled((prev) => (prev !== offset ? offset : prev))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // ✅ ตรวจสอบสถานะก่อน และใช้ requestAnimationFrame เพื่อความปลอดภัย
    if (isMobileMenuOpen) {
      const closeMenuFrame = requestAnimationFrame(() => {
        setIsMobileMenuOpen(false)
        if (typeof document !== "undefined") {
          document.body.style.overflow = "unset"
        }
      })
      return () => cancelAnimationFrame(closeMenuFrame)
    }
  }, [pathname, isMobileMenuOpen]) // เพิ่ม isMobileMenuOpen เข้ามาตามคำแนะนำของ exhaustive-deps

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const navLinks: NavLink[] = [
    { name: "หน้าหลัก", href: "/", label: "HOME_BASE" },
    { name: "บริการ", href: "/#services-index", label: "SOLUTIONS" },
    { name: "รีวิว", href: "/#success-logs", label: "SUCCESS_LOG" },
    { name: "คำถาม", href: "/#faq-registry", label: "FAQ_DATABASE" },
    { name: "ติดต่อ", href: "/contact", label: "INQUIRY" },
  ]

  if (!mounted) return null

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "border-b border-slate-900/10 bg-white/95 py-4 shadow-sm backdrop-blur-md"
            : "bg-transparent py-7"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3 outline-none">
            <div className="relative flex h-11 w-11 items-center justify-center bg-slate-900 text-white transition-all group-hover:bg-blue-600">
              <ShieldCheck size={26} className="relative z-10" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 border border-slate-900/20 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:border-white/30" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase leading-none tracking-tighter text-slate-900">
                JP VISUAL<span className="text-blue-600">.</span>DOCS
              </span>
              <span className="mt-1 font-mono text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
                {siteConfig.author.role.replace(/ /g, "_")}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.href.startsWith("/#"))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex flex-col items-start outline-none"
                >
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`text-[12px] font-bold uppercase transition-colors ${
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 group-hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <div className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-blue-600" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:block">
              <SystemStatus />
            </div>

            <Link
              href="/contact"
              className="hidden items-center gap-4 bg-slate-900 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-blue-600 md:flex"
            >
              Order_Inquiry <ArrowUpRight size={14} className="text-blue-400" />
            </Link>

            <button
              aria-label="Toggle Menu"
              className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white transition-all hover:bg-blue-600 lg:hidden"
              onClick={toggleMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={navLinks}
      />
    </>
  )
}
