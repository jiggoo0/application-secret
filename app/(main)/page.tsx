/** @format */
"use client"

import React, { useState, useCallback, useMemo } from "react"
import HeroSection from "@/components/section/HeroSection"
import AboutSection from "@/components/section/AboutSection"
import ServicesSection from "@/components/section/ServicesSection"
import GuaranteeSection from "@/components/section/GuaranteeSection"
import FAQSection from "@/components/section/FAQSection"
import ReviewsSection from "@/components/section/ReviewsSection"
import CartSection from "@/components/section/CartSection"
import { ServiceItem } from "@/components/services/types"

/**
 * 🛰️ CART_ITEM_INTERFACE
 * โครงสร้างข้อมูลสำหรับระบบตะกร้าบริการ
 */
interface CartItem {
  id: string
  name: string
  price: string
}

/**
 * 🏗️ MAIN_PAGE_COMPONENT
 * ศูนย์กลางการควบคุมสถานะ (State Control Center) ของระบบ JP Visual Docs
 */
export default function MainPage() {
  // 📦 SYSTEM_STATE: เก็บรายการบริการที่ถูกเลือก
  const [selectedServices, setSelectedServices] = useState<CartItem[]>([])

  /**
   * 🛠️ SELECT_SERVICE_PROTOCOL
   * บันทึกบริการที่เลือกเข้าสู่ Manifest (Cart)
   * ใช้ useCallback เพื่อป้องกันการสร้าง Function ใหม่โดยไม่จำเป็นเมื่อ Render
   */
  const handleSelectService = useCallback((service: ServiceItem) => {
    setSelectedServices((prev) => {
      const isExist = prev.some((item) => item.id === service.id)
      if (isExist) return prev // ป้องกันการเพิ่มซ้ำ (Duplicate Prevention)

      const newCartItem: CartItem = {
        id: service.id,
        name: service.title,
        price: service.price.base,
      }
      return [...prev, newCartItem]
    })
  }, [])

  /**
   * 🛠️ REMOVE_SERVICE_PROTOCOL
   * ถอนรายการออกจาก Manifest (Cart)
   */
  const handleRemoveService = useCallback((id: string) => {
    setSelectedServices((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // 🔒 MEMOIZED_CART: ป้องกันการ Re-render ส่วนตะกร้าถ้า selectedServices ไม่เปลี่ยน
  const cartUI = useMemo(
    () => (
      <CartSection
        selectedServices={selectedServices}
        onRemove={handleRemoveService}
      />
    ),
    [selectedServices, handleRemoveService]
  )

  return (
    <main className="relative flex w-full flex-col overflow-x-hidden bg-white">
      {/* 01. HERO_UNIT: ข้อมูลนำเสนอแรกของระบบ */}
      <HeroSection />

      {/* 02. IDENTITY_LOG_UNIT: ประวัติและเป้าหมายองค์กร */}
      <section id="about-section" className="scroll-mt-24">
        <AboutSection />
      </section>

      {/* 03. SOLUTIONS_REGISTRY: ส่วนเลือกบริการหลัก (หัวใจของระบบ) */}
      <section id="services-index" className="scroll-mt-24">
        <ServicesSection onSelect={handleSelectService} />
      </section>

      {/* 04. QUALITY_ASSURANCE: ความน่าเชื่อถือและการรับประกัน */}
      <GuaranteeSection />

      {/* 05. SUCCESS_LOGS: บันทึกความสำเร็จและรีวิวจากผู้ใช้ */}
      <section id="success-logs" className="scroll-mt-24">
        <ReviewsSection />
      </section>

      {/* 06. KNOWLEDGE_BASE: ฐานข้อมูลคำถามที่พบบ่อย */}
      <section id="faq-registry" className="scroll-mt-24">
        <FAQSection />
      </section>

      {/* 07. SYSTEM_ACTIONS: ส่วนแสดงตะกร้าลอย (Floating Cart/Summary) */}
      {cartUI}

      {/* 🧩 BLUEPRINT_OVERLAY: ลายตารางพิมพ์เขียวพื้นหลังระดับ Global */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>
    </main>
  )
}
