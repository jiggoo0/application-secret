/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.887Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: ServicesSection          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import React from 'react'
import { services } from '@/components/services/serviceData'
import { Cpu, ArrowUpRight } from 'lucide-react'
import { ServiceCard } from '@/components/services/ServiceCard'

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-32 selection:bg-[#FCDE09] selection:text-slate-950 lg:py-48"
    >
      {/* GRID PATTERN BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.04]" />
      <div className="absolute left-[5%] top-0 hidden h-full w-[1px] bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        {/* HEADER */}
        <header className="mb-24 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-[1px] w-16 bg-[#FCDE09]" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                Service_Capability_Matrix
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

          <div className="max-w-sm border-l-8 border-[#FCDE09] py-4 pl-10">
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-600">
              วิศวกรรมงานเอกสารและกลยุทธ์วีซ่า
              <br />
              <span className="font-mono text-sm font-black uppercase tracking-widest text-slate-400">
                Verified_System_Output
              </span>
            </p>
          </div>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border-2 border-slate-950 bg-slate-950 shadow-[30px_30px_0px_#f8fafc] md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}

          {/* CUSTOM NODE */}
          <div className="group relative flex min-h-[500px] flex-col items-center justify-center bg-[#020617] p-12 text-center transition-all duration-700">
            <div className="relative z-10">
              <div className="relative mx-auto mb-12 h-24 w-24">
                <div className="animate-spin-slow absolute inset-0 border border-dashed border-[#FCDE09]/30" />
                <div className="flex h-full w-full items-center justify-center border-2 border-[#FCDE09] bg-slate-950 text-[#FCDE09] shadow-[0_0_30px_rgba(252,222,9,0.3)]">
                  <Cpu size={40} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="mb-6 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white">
                Custom <br />
                <span className="text-[#FCDE09]">Protocol</span>
              </h3>

              <p className="font-thai mx-auto mb-14 max-w-[260px] text-[16px] font-bold leading-relaxed text-slate-500">
                โซลูชันเอกสารเชิงยุทธศาสตร์
                <br />
                สำหรับธุรกิจและกลุ่มทุนระดับสากล
              </p>

              <button className="group/btn relative h-14 overflow-hidden border-2 border-[#FCDE09] transition-all hover:bg-[#FCDE09] active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-3 px-10 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-[#FCDE09] group-hover/btn:text-slate-950">
                  Execute_Consult <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover/btn:translate-x-0" />
              </button>
            </div>

            {/* NODE GRID OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.06]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
