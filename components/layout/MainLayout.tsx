/** @format */
"use client"

import React, { useState, useEffect } from "react"
// 🏗️ PROTOCOL_SYNC: นำเข้าแบบ Named Import ทั้งหมด
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MobileMenu } from "@/components/MobileMenu"
import { navigationConfig } from "@/config/navigation"
import { inter, ibmPlexSansThai, jetbrainsMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <div
      className={cn(
        inter.variable,
        ibmPlexSansThai.variable,
        jetbrainsMono.variable,
        "min-h-screen bg-white"
      )}
    >
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navigationConfig.mainNav}
      />

      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="relative flex flex-1 flex-col pt-20">{children}</main>

      <Footer />
    </div>
  )
}

export default MainLayout
