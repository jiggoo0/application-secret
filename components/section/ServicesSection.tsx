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
  /** * ✅ FIXED: เปลี่ยนเป็น (_service: ServiceItem) เพื่อบอก Linter ว่านี่คือ Definition 
   * ป้องกันปัญหา Unused Variable ในระดับ Interface
   */
  onSelect?: (_service: ServiceItem) => void
}

/**
 * 🛰️ SERVICES_SECTION_PROTOCOL (STABLE_BUILD_2.8.5)
 * ----------------------------------------------------------------
 * ส่วนแสดงผลบริการหลักพร้อมระบบป้องกัน Runtime Error
 * ✅ RESOLVED: Zero Warnings (Lint-safe version)
 * ✅ IMPROVED: Technical UI layout with Blueprint grid
 */
export default function ServicesSection({ onSelect }: ServicesSectionProps) {
  // 🛡️ DATA_VALIDATION: ตรวจสอบ Registry ข้อมูล
  const displayServices = servicesData || []

  return (
    <section
      id="services-index"
      className="relative overflow-hidden bg-industrial-black py-24 selection:bg-brand/30"
    >
      {/* 🧩 BLUEPRINT_GRID_OVERLAY: ลายตารางพิมพ์เขียว (Visual Identity) */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-grid-md opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 01. HEADER_UNIT: ส่วนหัวแสดงสถานะภาพรวม */}
        <ServiceHeader />

        {/* 🛠️ 02. SERVICES_GRID_SYSTEM: Adaptive Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.length > 0 ? (
            <>
              {displayServices.map((item, index) => (
                <div
                  key={item.id}
                  className="group duration-500 animate-in fade-in slide-in-from-bottom-5 fill-mode-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* ✅ LOGIC: ส่ง item เข้า onSelect เมื่อมีการ Execute */}
                  <ServiceCard 
                    item={item} 
                    onExecute={() => onSelect?.(item)} 
                  />
                </div>
              ))}

              {/* 03. CUSTOM_LOGIC_TERMINAL: ช่องควบคุมสไตล์ Terminal */}
              <div
                className="group duration-700 animate-in fade-in slide-in-from-bottom-5 fill-mode-both sm:col-span-2 lg:col-span-1"
                style={{ animationDelay: `${displayServices.length * 100}ms` }}
              >
                <ServiceTerminal />
              </div>
            </>
          ) : (
            /* ⚠️ EMPTY_STATE_UI: กรณีไม่พบข้อมูลใน Registry */
            <div className="col-span-full border border-dashed border-industrial-border bg-industrial-dark/20 py-20 text-center backdrop-blur-sm">
              <span className="animate-pulse font-mono text-xs font-bold uppercase tracking-[0.3em] text-industrial-gray">
                [!] CRITICAL_ERROR: Registry_Data_Not_Found
              </span>
            </div>
          )}
        </div>

        {/* 📊 04. STATUS_BAR_FOOTER: รายงานสถานะระบบเรียลไทม์ */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-industrial-border/30 pt-8 font-mono text-[9px] font-bold uppercase tracking-widest text-industrial-gray/50 sm:flex-row">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="animate-pulse text-brand" />
            <span>
              Registry_Sync: <span className="text-status-success">STABLE</span>
            </span>
          </div>
          <span className="hidden opacity-30 sm:inline">|</span>
          <div className="flex gap-x-6">
            <span>
              Active_Modules:{" "}
              {displayServices.length.toString().padStart(2, "0")}
            </span>
            <span>
              Environment: <span className="text-white">Production</span>
            </span>
          </div>
          <span className="opacity-40 sm:ml-auto">
            Build_ID: JPVD_2.8.5_REL
          </span>
        </div>
      </div>

      {/* 📐 DECORATIVE_ELEMENTS: แสง Ambient */}
      <div className="absolute right-0 top-0 h-32 w-32 bg-brand/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-500/5 blur-[100px]" />
    </section>
  )
}
