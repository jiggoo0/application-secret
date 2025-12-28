/** @format */
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { X, ShieldCheck, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"

interface MobileMenuProps {
  isOpen: boolean
  // ✅ FIXED: ลบพารามิเตอร์ออกเพื่อให้เหลือแค่ Type ป้องกัน no-unused-vars
  setIsOpen: (status: boolean) => void 
  navLinks?: { name?: string; label: string; href: string }[]
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks = [] }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 🛡️ Bypass cascading render warning for hydration purposes
    setMounted(true)  
  }, [])

  useEffect(() => {
    if (!mounted) return
    const original = document.body.style.overflow
    document.body.style.overflow = isOpen ? "hidden" : original
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen, mounted])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] flex flex-col bg-white"
        >
          {/* 🧩 01. NAVIGATION_HEADER */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-slate-900 text-white">
                <ShieldCheck size={22} />
              </div>
              <span className="font-black uppercase tracking-tighter text-slate-900">
                {siteConfig.shortName}.DOCS
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <X size={24} />
            </button>
          </div>

          {/* 📋 02. LINK_LIST */}
          <nav className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex flex-col border-b border-slate-100 pb-6"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                    {link.label}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-4xl font-black uppercase tracking-tighter text-slate-900">
                      {link.name || link.label}
                    </span>
                    <ArrowRight size={28} className="text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
