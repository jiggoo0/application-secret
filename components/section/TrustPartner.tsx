/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.878Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: TrustPartner          // ตัวอย่าง: ShowcasePage, ServicesPage
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
import { Shield, Globe, Award, Activity, Database } from 'lucide-react'

/**
 * 🛰️ COMPONENT: TrustPartner
 * @version 2026.1.0
 * ROLE: Authority & Trust Validation Layer (JP-VisualDocs Standard)
 */
export const TrustPartner = () => {
  const stats = [
    {
      label: 'Success_Protocol',
      value: '98.7',
      unit: '%',
      icon: Shield,
      detail: 'Verified Document Architecture',
    },
    {
      label: 'Registry_Count',
      value: '4.5k',
      unit: '+',
      icon: Database,
      detail: 'Live Case Management System',
    },
    {
      label: 'Architecture_EXP',
      value: '12',
      unit: 'YRS',
      icon: Award,
      detail: 'Senior Document Architects',
    },
    {
      label: 'Global_Gateway',
      value: '120',
      unit: '+',
      icon: Globe,
      detail: 'Inter-Agency Connection Network',
    },
  ]

  return (
    <section className="relative overflow-hidden border-y-2 border-slate-950 bg-white py-32 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* GRID BACKDROP */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.04]" />
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-slate-100/60 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ================= METRIC MATRIX ================= */}
        <div className="mb-40 grid grid-cols-2 gap-y-20 md:grid-cols-4 md:gap-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative">
              {/* ICON NODE */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#020617] text-[#FCDE09] shadow-[6px_6px_0px_#e5e7eb] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#FCDE09] group-hover:text-[#020617] group-hover:shadow-none">
                  <stat.icon size={18} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                    {stat.label}
                  </span>
                  <div className="h-[2px] w-10 bg-[#FCDE09]/60" />
                </div>
              </div>

              {/* VALUE */}
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black italic tracking-tighter text-[#020617] transition-transform duration-700 group-hover:scale-105 md:text-8xl">
                  {stat.value}
                </span>
                <span className="text-2xl font-black text-[#FCDE09]">{stat.unit}</span>
              </div>

              {/* META */}
              <p className="mt-4 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-950">
                <span className="text-[#FCDE09]">LOG_ID:</span> {stat.detail}
              </p>

              {/* PROGRESS LINE */}
              <div className="mt-8 h-[3px] w-full bg-slate-100">
                <div className="h-full w-0 bg-[#020617] transition-all duration-1000 ease-out group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= NETWORK REGISTRY ================= */}
        <div className="relative border-t-2 border-slate-950 pt-24">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
            {/* LEFT INFO */}
            <div className="max-w-md space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#020617] px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-[#FCDE09]">
                <Activity size={10} className="animate-pulse" />
                NETWORK_RELIABILITY_V.26
              </div>
              <p className="font-thai text-lg font-bold leading-relaxed text-slate-600">
                เราสร้างความเชื่อมั่นผ่านเครือข่ายที่ได้รับการรับรองสากล
                <span className="mt-1 block text-2xl italic tracking-tight text-[#020617]">
                  OPERATIONAL ACCURACY.
                </span>
              </p>
            </div>

            {/* PARTNER GRID */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-12 opacity-30 grayscale transition-all duration-1000 hover:opacity-100 hover:grayscale-0 md:grid-cols-4 lg:gap-x-20">
              {['VFS_GLOBAL', 'TLS_CONTACT', 'GOV_GATEWAY', 'INTER_LEGAL'].map((name) => (
                <div key={name} className="group flex cursor-crosshair flex-col items-center gap-4">
                  <div className="font-mono text-xl font-black uppercase tracking-tighter text-slate-950 transition-all duration-300 group-hover:scale-110 group-hover:italic">
                    {name}
                  </div>
                  <div className="h-1 w-0 bg-[#FCDE09] shadow-[0_0_10px_#FCDE09] transition-all duration-500 group-hover:w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ARCHITECTURAL MARKERS */}
      <div className="absolute left-0 top-0 h-16 w-[3px] bg-[#FCDE09]" />
      <div className="absolute bottom-0 right-0 h-16 w-[3px] bg-[#FCDE09]" />
    </section>
  )
}
