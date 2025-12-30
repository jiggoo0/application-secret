/** @format */

'use client'

import React, { useState, useMemo } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { Box, ShieldCheck } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ServiceGrid
 * ศูนย์กลางการควบคุม Matrix Grid ของบริการทั้งหมด
 * 🛡️ ENFORCEMENT: Named Export, Rounded-None, Zero Unused Vars
 */
export const ServiceGrid = () => {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  // 🔍 Performance Optimization: กรองข้อมูลบริการตามหมวดหมู่ที่เลือก
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      activeTab === 'ALL_SERVICES' ? true : service.category === activeTab,
    )
  }, [activeTab])

  return (
    <section
      className="relative overflow-hidden bg-white py-32 selection:bg-brand selection:text-slate-950 lg:py-40"
      id="services"
    >
      {/* 🧩 Blueprint Grid Overlay - สร้าง Texture ระดับวิศวกรรมเอกสาร */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 01: HEADER_SYSTEM --- */}
        <ServiceHeader />

        {/* --- 02: CONTROL_INTERFACE --- */}
        <div className="mb-16">
          <ServiceFilter active={activeTab} onChange={setActiveTab} />
        </div>

        {/* --- 03: GRID_MATRIX_SYSTEM --- */}
        <div className="relative min-h-[600px]">
          {/* Grid Background Line (Decorative) */}
          <div className="pointer-events-none absolute inset-0 z-0 grid grid-cols-1 opacity-50 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-full border-r border-slate-100" />
            <div className="hidden h-full border-r border-slate-100 md:block" />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-px rounded-none border-l-2 border-t-2 border-slate-950 bg-slate-950 shadow-sharp transition-all duration-500 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}

            {/* ⚡ ENTERPRISE_NODE: ส่วนปิดท้ายเพื่อ Upsell บริการระดับองค์กร */}
            <div className="group relative flex min-h-[450px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-none bg-slate-950 p-12 text-center transition-all duration-500">
              <div className="relative z-10">
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-none border-2 border-slate-800 transition-colors group-hover:border-brand">
                  <Box className="animate-pulse text-brand" size={32} strokeWidth={1} />
                </div>

                <h3 className="mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                  Enterprise <br />
                  <span className="text-brand">Architecture</span>
                </h3>

                <p className="mx-auto mb-12 max-w-[240px] font-thai text-[15px] font-medium leading-relaxed text-slate-400">
                  สำหรับการวางโครงสร้างเอกสารระดับองค์กร หรือกรณีที่มีความซับซ้อนระดับ
                  High-Net-Worth
                </p>

                <button className="group/btn relative overflow-hidden rounded-none border-2 border-brand/20 px-8 py-4 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand transition-all hover:bg-brand hover:text-slate-950">
                  EXECUTE_CUSTOM_STACK
                </button>
              </div>

              {/* Ambient Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* --- 04: STATUS_FOOTER --- */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-none bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-slate-900">
                System_Online
              </span>
            </div>

            <div className="hidden h-px w-16 bg-slate-100 sm:block" />

            <span className="font-mono text-[11px] font-bold text-slate-400">
              REGISTRY_COUNT:{' '}
              <span className="text-slate-950">
                {filteredServices.length.toString().padStart(2, '0')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-slate-300" />
            <p className="font-mono text-[9px] uppercase italic tracking-[0.2em] text-slate-300">
              End-to-End_Encryption_Protocol_Active
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
