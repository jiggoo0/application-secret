/** @format */
'use client'

import React from 'react'
import { services } from '@/components/services/serviceData'
import { Box, ArrowUpRight } from 'lucide-react'
import { ServiceCard } from '@/components/services/ServiceCard'

export const ServicesSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48" id="services">
      {/* 🧩 UI_INFRA: Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />
      <div className="absolute left-[5%] top-0 hidden h-full w-[1px] bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- SYSTEM_HEADER --- */}
        <header className="mb-24 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-[1px] w-16 bg-[#FCDE09]" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                Service_Capability_Matrix_V2
              </span>
            </div>
            <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-slate-950 md:text-9xl lg:text-[140px]">
              Operational <br />
              <span className="relative inline-block italic text-[#FCDE09]">
                Excellence.
                <span className="absolute -bottom-2 left-0 -z-10 h-[15%] w-full bg-slate-950 md:-bottom-4" />
              </span>
            </h2>
          </div>

          <div className="max-w-sm border-l-8 border-[#FCDE09] py-4 pl-10 shadow-[20px_0px_60px_-15px_rgba(0,0,0,0.05)]">
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-600">
              วิศวกรรมงานเอกสารและกลยุทธ์วีซ่า <br />
              <span className="font-mono text-sm font-black uppercase tracking-widest text-slate-400">
                Verified_System_Output
              </span>
            </p>
          </div>
        </header>

        {/* --- GRID_INTERFACE --- */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border-2 border-slate-950 bg-slate-950 shadow-[30px_30px_0px_#f8fafc] md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}

          {/* ⚡ CUSTOM_PROTOCOL_NODE */}
          <div className="group relative flex min-h-[500px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center transition-all duration-700">
            <div className="relative z-10">
              <div className="relative mx-auto mb-10 flex h-24 w-24 items-center justify-center border-2 border-slate-800 bg-[#020617] transition-all duration-500 group-hover:border-[#FCDE09] group-hover:shadow-[0_0_30px_rgba(252,222,9,0.2)]">
                <Box className="animate-pulse text-[#FCDE09]" size={36} strokeWidth={1} />
                <ArrowUpRight
                  className="absolute right-2 top-2 text-slate-800 transition-colors group-hover:text-[#FCDE09]"
                  size={16}
                />
              </div>

              <h3 className="mb-6 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white">
                Custom <br /> <span className="text-[#FCDE09]">Protocol</span>
              </h3>

              <p className="mx-auto mb-12 max-w-[260px] font-thai text-[16px] font-bold leading-relaxed text-slate-500">
                โซลูชันเอกสารเชิงยุทธศาสตร์ <br /> สำหรับธุรกิจและกลุ่มทุนระดับสากล
              </p>

              <button className="group/btn relative h-14 overflow-hidden rounded-none border-2 border-[#FCDE09] bg-transparent px-10 transition-all active:scale-95">
                <span className="relative z-10 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-[#FCDE09] group-hover/btn:text-slate-950">
                  Execute_Consult
                </span>
                <div className="absolute inset-0 -translate-x-full bg-[#FCDE09] transition-transform duration-500 group-hover/btn:translate-x-0" />
              </button>
            </div>

            {/* Ambient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCDE09]/10 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#FCDE09]/5 blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
