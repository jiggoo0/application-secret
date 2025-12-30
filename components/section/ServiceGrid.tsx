/** * @format
 * @description SERVICE_GRID: Matrix Control Hub (Industrial Sharp V2.6.1 Zero-Error)
 * ✅ FIXED: Removed unused 'Activity' and 'cn' imports
 * ✅ REFINED: Typography system mapping to font-sans
 */

'use client'

import React, { useState, useMemo } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { Box, ShieldCheck } from 'lucide-react'

export const ServiceGrid = () => {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  // 🔍 Performance Optimization: กรองข้อมูลบริการแบบสมบูรณ์
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      activeTab === 'ALL_SERVICES' ? true : service.category === activeTab,
    )
  }, [activeTab])

  return (
    <section
      className="relative overflow-hidden bg-white py-32 selection:bg-brand selection:text-slate-950 lg:py-48"
      id="services"
    >
      {/* 🧩 BLUEPRINT_INFRASTRUCTURE */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 01: HEADER_SYSTEM --- */}
        <ServiceHeader />

        {/* --- 02: CONTROL_INTERFACE --- */}
        <div className="mb-20">
          <ServiceFilter active={activeTab} onChange={setActiveTab} />
        </div>

        {/* --- 03: GRID_MATRIX_SYSTEM --- */}
        <div className="relative min-h-[600px]">
          <div className="shadow-sharp relative z-10 grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 transition-all duration-700 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}

            {/* ⚡ ENTERPRISE_NODE: โมดูลพิเศษสำหรับการ Upsell */}
            <div className="group relative flex min-h-[500px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center transition-all duration-700">
              <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

              <div className="relative z-10">
                <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center border-2 border-slate-800 transition-all duration-700 group-hover:rotate-[360deg] group-hover:border-brand group-hover:bg-brand/5">
                  <Box className="animate-pulse text-brand" size={40} strokeWidth={1} />
                </div>

                <h3 className="mb-6 text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                  Enterprise <br />
                  <span className="italic text-brand">Architecture</span>
                </h3>

                <p className="mx-auto mb-14 max-w-[280px] font-sans text-[15px] font-bold leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                  สำหรับการวางโครงสร้างเอกสารระดับองค์กร หรือเคสที่มีความซับซ้อนระดับ High-Net-Worth
                </p>

                <button className="group/btn relative overflow-hidden border-2 border-brand/20 px-10 py-5 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-brand transition-all hover:border-brand hover:bg-brand hover:text-slate-950 active:scale-95">
                  <span className="relative z-10">EXECUTE_CUSTOM_STACK</span>
                  <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* --- 04: STATUS_FOOTER --- */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-10 md:flex-row">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-slate-900">
                STATUS: <span className="text-emerald-500">SYSTEM_OPERATIONAL</span>
              </span>
            </div>

            <div className="hidden h-4 w-px bg-slate-200 sm:block" />

            <span className="font-mono text-[11px] font-black uppercase tracking-tighter text-slate-400">
              GRID_RECORDS:{' '}
              <span className="ml-2 border border-slate-200 bg-slate-100 px-2 py-0.5 font-bold text-slate-950">
                {filteredServices.length.toString().padStart(2, '0')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-5 border-l border-slate-100 pl-8">
            <ShieldCheck size={18} className="text-brand" />
            <div className="flex flex-col">
              <p className="font-mono text-[10px] font-black uppercase leading-none tracking-[0.2em] text-slate-950">
                Security_Protocol_Active
              </p>
              <p className="mt-1.5 font-mono text-[9px] font-bold uppercase text-slate-400">
                Auth: RSA_4096_Validated
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
