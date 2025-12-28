/** @format */
"use client"

import React from "react"
import { services } from "@/components/services/serviceData"
import { Box } from "lucide-react"
import { ServiceCard } from "@/components/services/ServiceCard"

/**
 * 🛰️ COMPONENT: ServicesSection
 * ✅ FIXED: Removed unused 'cn' and 'Image' imports
 * ✅ SYSTEM: Matrix Grid Infrastructure
 */
export const ServicesSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="absolute left-[5%] top-0 hidden h-full w-[1px] bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        <header className="mb-24 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-[1px] w-16 bg-[#FCDE09]" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                Service_Capability_Matrix_V2
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-950 md:text-8xl lg:text-9xl">
              Operational <br />
              <span className="relative inline-block italic text-[#FCDE09]">
                Excellence.
                <span className="absolute -bottom-2 left-0 -z-10 h-[20%] w-full bg-slate-950 md:-bottom-4" />
              </span>
            </h2>
          </div>

          <div className="max-w-sm border-l-4 border-[#FCDE09] py-3 pl-8">
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-500">
              ยกระดับมาตรฐานงานเอกสารและกลยุทธ์วีซ่าด้วยระบบปฏิบัติการที่ตรวจสอบได้จริงทุกขั้นตอน
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 shadow-sharp md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}

          <div className="group relative flex min-h-[500px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center transition-all">
            <div className="relative z-10">
              <div className="relative mx-auto mb-10 flex h-20 w-20 items-center justify-center border border-slate-800 transition-colors group-hover:border-[#FCDE09]">
                <Box
                  className="animate-pulse text-[#FCDE09]"
                  size={32}
                  strokeWidth={1}
                />
              </div>
              <h3 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter text-white">
                Custom <br /> <span className="text-[#FCDE09]">Protocol</span>
              </h3>
              <p className="mx-auto mb-12 max-w-[240px] font-thai text-[15px] font-medium leading-relaxed text-slate-400">
                โซลูชันเอกสารเฉพาะทางสำหรับธุรกิจระดับองค์กรและครอบครัวขนาดใหญ่
              </p>
              <button className="group/btn relative overflow-hidden rounded-none border border-[#FCDE09]/30 px-8 py-4 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09] transition-all hover:border-[#FCDE09] hover:bg-[#FCDE09] hover:text-slate-950 active:scale-95">
                REQUEST_CONSULT
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCDE09]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
