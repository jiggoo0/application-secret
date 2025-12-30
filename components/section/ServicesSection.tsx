/** * @format
 * @description SERVICES_SECTION: Matrix Grid Infrastructure (Clean Production Edition)
 * ✅ FIXED: Removed unused 'cn' to eliminate lint errors
 * ✅ OPTIMIZED: Thai typography rendering protocol
 */

'use client'

import React from 'react'
import { services } from '@/components/services/serviceData'
import { Box, ArrowUpRight } from 'lucide-react'
import { ServiceCard } from '@/components/services/ServiceCard'
// 🛡️ REMOVED: import { cn } from '@/lib/utils' (เพื่อลบ Error: 'cn' is defined but never used)

export const ServicesSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-white py-32 selection:bg-brand selection:text-slate-950 lg:py-48"
      id="services-matrix"
    >
      {/* 🧩 BLUEPRINT_DECOR */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* 📏 STRUCTURAL_GUIDE */}
      <div className="absolute left-[5%] top-0 hidden h-full w-[1px] bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 🛰️ SECTION_HEADER */}
        <header className="mb-32 flex flex-col justify-between gap-16 lg:flex-row lg:items-end">
          <div className="max-w-5xl">
            <div className="mb-10 flex items-center gap-6">
              <span className="h-[2px] w-20 bg-brand" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                SERVICE_CAPABILITY_MATRIX_V2.5
              </span>
            </div>

            <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-slate-950 md:text-9xl lg:text-[10rem]">
              Operational <br />
              <span className="relative inline-block italic text-brand">
                Excellence.
                <span className="absolute -bottom-2 left-0 -z-10 h-[22%] w-full bg-slate-950 md:-bottom-4" />
              </span>
            </h2>
          </div>

          <div className="max-w-md border-l-[8px] border-brand py-6 pl-12">
            <p className="font-sans text-2xl font-black leading-snug text-slate-800">
              ยกระดับมาตรฐานงานเอกสาร <br />
              ด้วยระบบปฏิบัติการ{' '}
              <span className="font-black text-brand shadow-[inset_0_-8px_0_0_rgba(200,164,93,0.15)]">
                ที่ตรวจสอบได้จริง
              </span>
            </p>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Protocol_ID: 00-749-X // Precision_Docs
            </p>
          </div>
        </header>

        {/* 🏁 SERVICE_GRID_MATRIX */}
        <div className="shadow-sharp grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}

          {/* 🛠️ SPECIAL_MODULE: CUSTOM_PROTOCOL_NODE */}
          <div className="group relative flex min-h-[600px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center transition-all duration-700">
            <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

            <div className="relative z-10">
              <div className="relative mx-auto mb-12 flex h-28 w-28 items-center justify-center border-2 border-slate-800 transition-all duration-700 group-hover:rotate-[360deg] group-hover:border-brand group-hover:bg-brand/5">
                <Box className="animate-pulse text-brand" size={48} strokeWidth={1} />
                <ArrowUpRight
                  className="absolute -right-3 -top-3 text-brand opacity-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  size={28}
                />
              </div>

              <h3 className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                Custom <br /> <span className="italic text-brand">Protocol</span>
              </h3>

              <p className="mx-auto mb-16 max-w-[300px] font-sans text-[17px] font-bold leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200">
                โซลูชันเอกสารเฉพาะทางสำหรับธุรกิจระดับองค์กร และเคสที่มีความซับซ้อนระดับสูงสุด
              </p>

              <button className="group/btn relative inline-flex items-center gap-6 overflow-hidden border-2 border-brand/30 px-12 py-6 font-mono text-[12px] font-black uppercase tracking-[0.4em] text-brand transition-all hover:border-brand hover:bg-brand hover:text-slate-950 active:scale-90">
                <span className="relative z-10">EXECUTE_CONSULT</span>
                <div className="relative z-10 flex gap-1.5">
                  <span className="h-2 w-2 bg-brand group-hover/btn:bg-slate-950" />
                  <span className="h-2 w-2 bg-brand/40 group-hover/btn:bg-slate-950/40" />
                </div>
                <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />

            <div className="absolute bottom-8 font-mono text-[9px] font-black tracking-[0.5em] text-slate-700 opacity-0 transition-all duration-700 group-hover:tracking-[0.8em] group-hover:opacity-100">
              CONFIDENTIAL_PROTOCOL_ACTIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
