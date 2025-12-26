/** @format */
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, ArrowUpRight, Menu, X } from "lucide-react"
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
    queueMicrotask(() => setMounted(true))
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    queueMicrotask(() => setIsMobileMenuOpen(false))
    if (typeof document !== "undefined") document.body.style.overflow = "unset"
  }, [pathname])

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
            ? "border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur-md"
            : "bg-transparent py-7"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3 outline-none">
            <div className="relative flex h-11 w-11 items-center justify-center bg-slate-900 text-white transition-all group-hover:bg-blue-600">
              <ShieldCheck size={26} className="relative z-10" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 border border-slate-900 opacity-0 transition-all group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase leading-none tracking-tighter text-slate-900">
                JP VISUAL<span className="text-blue-600">.</span>DOCS
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">
                System_Security_Specialist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                  <div
                    className={`absolute -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden items-center gap-4 bg-slate-900 px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-blue-600 md:flex"
            >
              Order_Inquiry <ArrowUpRight size={14} className="text-blue-400" />
            </Link>

            {/* Hamburger Toggle */}
            <button
              aria-label="Toggle Menu"
              className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white transition-all hover:bg-blue-600 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navLinks={navLinks} // ส่ง array ชัดเจน ป้องกัน undefined
      />
    </>
  )
}
