/** @format */
"use client"

import React from "react"
import { Shield, Globe, Award, Users } from "lucide-react"

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
    detail: "Across 24 Countries",
  },
  {
    label: "Expert_Engineers",
    value: "12",
    icon: Award,
    detail: "In-house Specialists",
  },
  {
    label: "Corporate_Clients",
    value: "120+",
    icon: Users,
    detail: "B2B Infrastructure",
  },
]

const partners = [
  { name: "Partner_01", logo: "VFS_GLOBAL" },
  { name: "Partner_02", logo: "TLS_CONTACT" },
  { name: "Partner_03", logo: "GOV_GATEWAY" },
  { name: "Partner_04", logo: "INTER_LEGAL" },
  { name: "Partner_05", logo: "AMCHAM_TH" },
]

export default function TrustPartner() {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-24">
      {/* 🧩 Technical Background */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.02]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- PART 01: PERFORMANCE COUNTERS --- */}
        <div className="mb-24 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className="mb-4 flex items-center gap-3">
                <stat.icon
                  size={16}
                  className="text-brand transition-transform group-hover:scale-110"
                />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {stat.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-black tracking-tighter text-slate-950 md:text-5xl">
                  {stat.value}
                </h3>
                <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-300">
                  [{stat.detail}]
                </p>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 left-0 h-1 w-8 bg-slate-100 transition-all duration-500 group-hover:w-full group-hover:bg-brand" />
            </div>
          ))}
        </div>

        {/* --- PART 02: PARTNER REGISTRY (Logo Cloud) --- */}
        <div className="border-t border-slate-100 pt-20">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
            {/* Heading for Partners */}
            <div className="shrink-0 text-center lg:w-48 lg:text-left">
              <span className="mb-2 block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                Trusted_By
              </span>
              <p className="font-thai text-[11px] font-bold leading-relaxed text-slate-400">
                เครือข่ายความร่วมมือ <br /> ระดับสากลและองค์กรชั้นนำ
              </p>
            </div>

            {/* Logo Grid - Monochrome & Industrial Style */}
            <div className="flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale transition-opacity duration-700 hover:opacity-100 md:gap-16">
              {partners.map((p) => (
                <div key={p.name} className="group relative cursor-crosshair">
                  <span className="font-mono text-xl font-black uppercase italic tracking-tighter text-slate-300 transition-colors group-hover:text-slate-950 md:text-2xl">
                    {p.logo}
                  </span>
                  {/* Tooltip-like label */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 px-2 py-0.5 font-mono text-[7px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    VERIFIED_NODE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📐 Decorative vertical bars on the side */}
      <div className="absolute right-0 top-1/4 h-32 w-1 bg-slate-50" />
      <div className="absolute right-0 top-1/4 mt-4 h-8 w-1 bg-brand" />
    </section>
  )
}
