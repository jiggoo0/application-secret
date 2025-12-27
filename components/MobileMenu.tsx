/** @format */
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { X, ShieldCheck, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"

interface NavLink {
  name?: string
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  navLinks?: NavLink[]
}

/**
 * 🛰️ MOBILE_MENU_INTERFACE
 * ----------------------------------------------------------------
 * ส่วนควบคุมการนำทางบนอุปกรณ์พกพา พร้อมระบบป้องกัน Body Scroll Lock
 * ✅ FIXED: Unused 'status' warning
 * ✅ FIXED: React 19 cascading render warning
 */
export default function MobileMenu({
  isOpen,
  setIsOpen,
  navLinks = [],
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  // 🛡️ HYDRATION_&_SCROLL_LOCK_PROTOCOL
  useEffect(() => {
    // ⚡ ปรับปรุงเพื่อเลี่ยง Cascading Renders ใน React 19
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
    })

    // จัดการ Scroll Lock เมื่อเปิด Menu
    const originalOverflow = document.body.style.overflow
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      cancelAnimationFrame(frameId)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

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
          <div className="relative z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-slate-900 text-white shadow-lg">
                <ShieldCheck size={22} />
              </div>
              <span className="text-base font-black uppercase tracking-tighter text-slate-900">
                {siteConfig.shortName}
                <span className="text-blue-600">.</span>DOCS
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* 🔗 02. LINK_REGISTRY_SYSTEM */}
          <nav className="flex-1 overflow-y-auto bg-white p-8">
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col border-b border-slate-100 pb-6"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                      {link.label}
                    </span>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-4xl font-black uppercase tracking-tighter text-slate-900 transition-colors group-hover:text-blue-800">
                        {link.name || link.label}
                      </span>
                      <ArrowRight
                        className="text-slate-400 transition-transform group-hover:translate-x-2 group-hover:text-blue-600"
                        size={28}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* 📊 03. SYSTEM_STATUS_FOOTER */}
          <div className="border-t border-slate-800 bg-slate-900 p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                  CORE_ENGINE_V{siteConfig.system.version}
                  <span className="ml-2 uppercase text-slate-500">
                    {" // STATUS: ACTIVE"}
                  </span>
                </span>
              </div>
              <p className="font-mono text-[8px] uppercase leading-loose text-slate-500">
                Secure_Execution_Environment_Enabled
                <br />
                All_Systems_Operational_Within_Standard_Parameters
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
