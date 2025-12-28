/** @format */

"use client"

import React from "react"
import { Shield, Globe, Award, Users } from "lucide-react"

/**
 * 📊 DATA: Performance Metrics
 */
const stats = [
  {
    label: "Success_Rate",
    value: "98.7%",
    icon: Shield,
    detail: "Embassy-Grade Verified",
  },
  {
    label: "Cases_Processed",
    value: "4,500+",
    icon: Globe,
    detail: "Global Distribution",
  },
  {
    label: "Expert_Engineers",
    value: "12",
    icon: Award,
    detail: "Verified Specialists",
  },
  {
    label: "Corporate_Clients",
    value: "120+",
    icon: Users,
    detail: "Infrastructure Partners",
  },
]

/**
 * 🤝 DATA: Partner Registry
 */
const partners = [
  { name: "Partner_01", logo: "VFS_GLOBAL" },
  { name: "Partner_02", logo: "TLS_CONTACT" },
  { name: "Partner_03", logo: "GOV_GATEWAY" },
  { name: "Partner_04", logo: "INTER_LEGAL" },
  { name: "Partner_05", logo: "AMCHAM_TH" },
]

/**
 * 🛰️ COMPONENT: TrustPartner
 * ระบบตรวจสอบความน่าเชื่อถือและเครือข่ายพันธมิตร (Industrial_Sharp_V1)
 */
export const TrustPartner = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-28 selection:bg-brand selection:text-slate-950">
      {/* 🧩 Technical Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* --- PART 01: PERFORMANCE COUNTERS --- */}
        <div className="mb-28 grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={`stat-${idx}`}
              className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="mb-5 flex items-center gap-3">
                {/* Enforced rounded-none for industrial look */}
                <div className="flex h-8 w-8 items-center justify-center rounded-none bg-slate-50 transition-colors group-hover:bg-brand">
                  <stat.icon
                    size={14}
                    className="text-slate-400 transition-colors group-hover:text-slate-950"
                  />
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-5xl font-black tracking-tighter text-slate-950 transition-transform group-hover:translate-x-1 md:text-6xl">
                  {stat.value}
                </h3>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-300">
                  {/* Corrected Comment Syntax */}
                  {`// ${stat.detail}`}
                </p>
              </div>
              <div className="mt-6 h-[1px] w-12 bg-slate-100 transition-all duration-700 group-hover:w-full group-hover:bg-brand" />
            </div>
          ))}
        </div>

        {/* --- PART 02: PARTNER REGISTRY --- */}
        <div className="border-t border-slate-100 pt-24">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:justify-between">
            <div className="shrink-0 text-center lg:text-left">
              <span className="mb-3 block font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-900">
                Strategic_Network
              </span>
              <p className="font-thai text-[13px] font-bold leading-relaxed text-slate-400">
                เครือข่ายความร่วมมือเชิงกลยุทธ์ <br />
                กับหน่วยงานรับคำร้องระดับสากล
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 opacity-25 grayscale transition-all duration-1000 hover:opacity-100 lg:gap-x-20">
              {partners.map((p) => (
                <div key={p.name} className="group relative">
                  <span className="font-mono text-xl font-black uppercase italic tracking-tighter text-slate-400 transition-all group-hover:tracking-normal group-hover:text-slate-950 md:text-3xl">
                    {p.logo}
                  </span>
                  <div className="absolute -bottom-4 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📐 Industrial Edge Decorations */}
      <div className="absolute left-0 top-0 h-2 w-[1px] bg-brand" />
      <div className="absolute bottom-0 right-0 h-2 w-[1px] bg-brand shadow-sharp" />
    </section>
  )
}
