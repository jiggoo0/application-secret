/** @format */
"use client"

import React from "react"
import { services as servicesData } from "@/components/services/data"
import { ServiceHeader } from "@/components/services/ServiceHeader"
import { ServiceTerminal } from "@/components/services/ServiceTerminal"
import ServiceCard from "@/components/services/ServiceCard"
import { ServiceItem } from "@/components/services/types"
import { Terminal } from "lucide-react"

interface ServicesSectionProps {
  /** ✅ รับ Callback สำหรับการเลือกบริการ */
  onSelect?: (service: ServiceItem) => void
}

/**
 * 🛰️ SERVICES_SECTION_PROTOCOL
 * ส่วนแสดงผลบริการหลักพร้อมระบบป้องกัน Runtime Error
 * ออกแบบตามสไตล์ Industrial Sharp ที่เน้นความโปร่งใสของข้อมูล
 */
export default function ServicesSection({ onSelect }: ServicesSectionProps) {
  // 🛡️ DATA_VALIDATION: ตรวจสอบข้อมูลก่อนเรนเดอร์
  const displayServices = servicesData || []

  return (
    <section
      id="services-index"
      className="relative overflow-hidden bg-industrial-black py-24"
    >
      {/* 🧩 BLUEPRINT_GRID_OVERLAY: ลายตารางพิมพ์เขียวพื้นหลัง */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-grid-md opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 01. HEADER_UNIT: ส่วนหัวและสถานะภาพรวม */}
        <ServiceHeader />

        {/* 🛠️ 02. SERVICES_GRID_SYSTEM: ระบบตารางจัดการคอมโพเนนต์ */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.length > 0 ? (
            <>
              {displayServices.map((item) => (
                <div key={item.id} className="group animate-fade-in-up">
                  {/* ✅ FIX: ส่งพารามิเตอร์ item เข้าไปใน callback onSelect ตรงๆ 
                      ช่วยให้ Type Safety ทำงานได้สมบูรณ์และลดโอกาส Unused Variable Warning
                  */}
                  <ServiceCard item={item} onExecute={() => onSelect?.(item)} />
                </div>
              ))}

              {/* 03. CUSTOM_LOGIC_TERMINAL: แสดงต่อจากรายการสุดท้าย (Layout 1:1) */}
              <div className="sm:col-span-2 lg:col-span-1">
                <ServiceTerminal />
              </div>
            </>
          ) : (
            /* ⚠️ EMPTY_STATE_UI: แสดงเมื่อไม่พบข้อมูลในระบบ Registry */
            <div className="col-span-full border border-dashed border-industrial-border bg-industrial-dark/20 py-20 text-center">
              <span className="animate-pulse font-mono text-xs font-bold uppercase tracking-[0.3em] text-industrial-gray">
                [!] Registry_Data_Not_Found
              </span>
            </div>
          )}
        </div>

        {/* 📊 04. STATUS_BAR_FOOTER: ส่วนแสดงสถานะเชิงระบบ (System Log Style) */}
        <div className="mt-16 flex items-center gap-4 border-t border-industrial-border/30 pt-8 font-mono text-[9px] font-bold uppercase tracking-widest text-industrial-gray/50">
          <Terminal size={12} className="text-brand" />
          <div className="flex flex-wrap gap-x-6">
            <span>
              Registry_Sync: <span className="text-status-success">STABLE</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              Active_Modules:{" "}
              {displayServices.length.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="ml-auto opacity-40">System_V2_Stable_Build</span>
        </div>
      </div>
    </section>
  )
}
