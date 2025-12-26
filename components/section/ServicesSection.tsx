/** @format */
"use client"

import React from "react"
import { siteConfig } from "@/config/site"

// ✅ ใช้ Absolute Path เพื่อป้องกัน Error Module not found
import { ServiceHeader } from "@/components/services/ServiceHeader"
import { ServiceCard } from "@/components/services/ServiceCard"
import { ServiceTerminal } from "@/components/services/ServiceTerminal"

// ✅ ข้อมูลรายการบริการ
import { servicesData } from "@/components/services/data"

/**
 * ServicesSection
 * ----------------------------------------------------------------
 * ส่วนแสดงผลบริการหลักที่ใช้โครงสร้าง Grid แบบ gap-px
 * เพื่อสร้างเส้นแบ่ง Hairline ที่คมชัดสไตล์งานเขียนแบบ (Architectural Drawing)
 */
export default function ServicesSection() {
  const currentYear = new Date().getFullYear()

  return (
    <section id="services-index" className="bg-white py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* 🛠️ HEADER_UNIT: แสดง Manifesto และสถานะระบบ */}
        <ServiceHeader />

        {/* 🏗️ ASSET_GRID_SYSTEM: 
            การใช้ gap-px ร่วมกับ bg-slate-200 จะสร้างเส้นแบ่ง Grid ที่สม่ำเสมอ 
        */}
        <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}

          {/* 🏁 TERMINAL_UNIT: ช่องรับงาน Custom Logic (เซลล์สุดท้าย) */}
          <ServiceTerminal />
        </div>

        {/* 📐 SYSTEM_FOOTER: รายละเอียดทางเทคนิคและลิขสิทธิ์ */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 opacity-25 md:flex-row">
          <div className="flex flex-col items-start font-mono text-[9px] uppercase leading-relaxed tracking-[0.3em]">
            <span>
              {siteConfig.shortName}_SERVICE_MANIFEST_REV_
              {siteConfig.system.version}
            </span>
            <span className="font-black text-blue-600">
              STABLE_BUILD_RELEASE
            </span>
          </div>

          <div className="mx-10 hidden h-[1px] flex-1 bg-slate-900 md:block" />

          <div className="flex flex-col items-end text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.3em]">
            <span>
              (C) {currentYear}_CORE_SYSTEM // {siteConfig.domain}
            </span>
            <span>ENCRYPTED_ACCESS_ONLY</span>
          </div>
        </div>
      </div>
    </section>
  )
}
