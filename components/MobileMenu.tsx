/** @format */
"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  navLinks?: NavLink[] // ปรับเป็น optional เพื่อป้องกัน undefined
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  navLinks = [], // default เป็น array ว่าง
}: MobileMenuProps) {
  // ปิด scroll หน้าเบื้องหลังเมื่อเมนูเปิด
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex translate-x-0 transform flex-col bg-white p-6 transition-transform duration-300"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="mb-6 flex items-center justify-center border-2 border-slate-900 p-2"
        aria-label="Close menu"
      >
        <X size={24} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 text-lg font-black uppercase">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-primary text-slate-900"
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
