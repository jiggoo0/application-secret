/** @format */
"use client"

import React, { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MobileMenu from "@/components/MobileMenu"
import { navigationConfig } from "@/config/navigation"
import { inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 🏗️ MAIN_LAYOUT_PROTOCOL
 * ----------------------------------------------------------------
 * โครงสร้างพื้นฐานระดับรากฐาน (Root Infrastructure)
 * ทำหน้าที่ควบคุม Navigation State และรักษาความสมบูรณ์ของ Visual Flow
 */
export default function MainLayout({ children }: MainLayoutProps) {
  // 🧭 NAVIGATION_STATE: ควบคุมสถานะ Mobile Menu จากระดับ Layout
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div
      className={cn(
        inter.variable,
        "relative flex min-h-screen flex-col bg-white font-sans text-industrial-dark antialiased"
      )}
    >
      {/* 📱 MOBILE_OVERRIDE_INTERFACE: แสดงผลเมื่อมีการสั่งเปิดจาก Header */}
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        navLinks={[...navigationConfig.mainNav]}
      />

      {/* 🏗️ HEADER_SYSTEM: ยึดไว้ที่ด้านบนพร้อมคำสั่งเปิดเมนู */}
      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      {/* 🚀 EXECUTION_LAYER: พื้นที่สำหรับการเรนเดอร์เนื้อหาหลัก
          ✅ ปรับให้เป็น Full-bleed รองรับ HeroSection ที่ต้องการความกว้างเต็มจอ
          ✅ ใช้ overflow-x-hidden เพื่อป้องกันปัญหา Layout Shift จาก Animation
      */}
      <main className="relative flex-1 overflow-x-hidden pt-16 lg:pt-20">
        {children}
      </main>

      {/* 🏁 TERMINAL_FOOTER: ส่วนท้ายของระบบข้อมูล */}
      <Footer />
    </div>
  )
}
