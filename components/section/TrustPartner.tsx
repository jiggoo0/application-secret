/** @format */

'use client'

import React from 'react'
import { Shield, Globe, Award, Activity, Database } from 'lucide-react'

/**
 * 🛰️ COMPONENT: TrustPartner_Protocol
 * @version 2026.0.5
 * PURPOSE: ยืนยันอำนาจความน่าเชื่อถือผ่าน Data Visualization และ Partner Registry
 */
export const TrustPartner = () => {
  return (
    <section className="relative overflow-hidden border-y-2 border-[#020617] bg-white py-32 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_INFRA: Engineering Grid & Ambient Nodes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-slate-100/50 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* --- SECTION 01: PERFORMANCE_MANIFEST --- */}
        <div className="mb-40 grid grid-cols-2 gap-y-20 lg:grid-cols-4 lg:gap-12">
          {[
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
          ].map((stat, idx) => (
            <div key={`stat-${idx}`} className="group relative">
              {/* Node Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center bg-[#020617] text-[#FCDE09] shadow-[6px_6px_0px_#f1f5f9] transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#FCDE09] group-hover:text-[#020617] group-hover:shadow-none">
                  <stat.icon size={18} strokeWidth={2.5} />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                    {stat.label}
                  </span>
                  <div className="h-0.5 w-8 bg-[#FCDE09]/50" />
                </div>
              </div>

              {/* Data Display */}
              <div className="relative">
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black italic tracking-tighter text-[#020617] transition-all duration-700 group-hover:scale-105 md:text-8xl">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-black text-[#FCDE09]">{stat.unit}</span>
                </div>

                {/* Technical Meta Data */}
                <p className="mt-4 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 transition-colors group-hover:text-[#020617]">
                  <span className="text-[#FCDE09]">LOG_ID:</span> {stat.detail}
                </p>

                {/* System Progress Bar */}
                <div className="mt-8 h-[3px] w-full bg-slate-50">
                  <div className="h-full w-0 bg-[#020617] transition-all duration-1000 ease-out group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 02: NETWORK_REGISTRY (Industrial Logos) --- */}
        <div className="relative border-t-2 border-slate-950 pt-24">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
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

            {/* Partner Node Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-12 opacity-30 grayscale transition-all duration-1000 hover:opacity-100 hover:grayscale-0 md:grid-cols-4 lg:gap-x-20">
              {['VFS_GLOBAL', 'TLS_CONTACT', 'GOV_GATEWAY', 'INTER_LEGAL'].map((logo) => (
                <div key={logo} className="group flex cursor-crosshair flex-col items-center gap-4">
                  <div className="text-center font-mono text-xl font-black uppercase tracking-tighter text-slate-950 transition-all duration-300 group-hover:scale-110 group-hover:italic group-hover:text-[#020617]">
                    {logo}
                  </div>
                  <div className="h-1 w-0 bg-[#FCDE09] shadow-[0_0_10px_#FCDE09] transition-all duration-500 group-hover:w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Architecture Elements */}
      <div className="absolute left-0 top-0 h-16 w-[3px] bg-[#FCDE09]" />
      <div className="absolute bottom-0 right-0 h-16 w-[3px] bg-[#FCDE09]" />
    </section>
  )
}
