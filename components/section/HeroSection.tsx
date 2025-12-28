/** @format */
"use client"

import React from "react"
import { serviceList, trustStats } from "@/components/hero/heroData"
import { CapabilityItem } from "@/components/hero/CapabilityItem"
import { StatsCard } from "@/components/hero/StatsCard"
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react"

/**
 * 🛰️ COMPONENT: HeroSection
 * ส่วนหน้าแรกของเว็บไซต์ ออกแบบเน้นความแม่นยำ (Precision) และความทันสมัยแบบอุตสาหกรรม
 * แก้ไข: ลบ Unused Import 'cn' เพื่อให้ผ่านการตรวจสอบ Lint
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[95vh] items-center overflow-hidden bg-white py-24 selection:bg-brand selection:text-slate-950 lg:py-0">
      {/* 🧩 INTEGRATED BACKGROUND ARCHITECTURE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Layer 01: Subtle Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

        {/* Layer 02: Industrial Side Panel */}
        <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/4 -skew-x-12 border-l border-slate-100 bg-slate-50/40" />

        {/* Layer 03: Precision Guide Lines */}
        <div className="absolute left-[8%] top-0 h-full w-px bg-slate-100" />
        <div className="absolute left-[8.5%] top-0 h-full w-px bg-slate-50" />

        {/* Layer 04: Soft Brand Glow */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand/5 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 📝 CONTENT_MANIFEST (LEFT) */}
          <div className="pt-10 lg:col-span-7 lg:pt-0">
            <header className="relative mb-12">
              {/* Badge: Verified Status */}
              <div className="mb-10 inline-flex cursor-default items-center gap-3 border border-slate-200 bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5">
                <ShieldCheck size={14} className="text-brand" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                  Verified_Service_Provider_2025
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mb-10 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-950 md:text-8xl lg:text-[110px]">
                Simplifying <br />
                <span className="pr-2 italic text-brand drop-shadow-[4px_4px_0px_#020617]">
                  Global
                </span>{" "}
                <br />
                Mobility.
              </h1>

              {/* Description */}
              <p className="max-w-2xl font-thai text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
                ยกระดับการจัดการเอกสารและวีซ่าของคุณด้วยมาตรฐานระดับพรีเมียม
                แม่นยำ รวดเร็ว และเป็นความลับสูงสุด
                เพื่อให้คุณโฟกัสกับก้าวสำคัญของธุรกิจ
              </p>
            </header>

            {/* ACTION_REGISTRY: Call to Action Buttons */}
            <div className="mb-16 flex flex-col gap-5 sm:flex-row">
              <button className="group flex items-center justify-center gap-4 bg-slate-950 px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-brand transition-all hover:bg-brand hover:text-slate-950 hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,0.15)] active:scale-95">
                CONSULT_EXPERT
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </button>
              <button className="flex items-center justify-center gap-4 border-2 border-slate-950 bg-white px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-slate-950 transition-all hover:bg-slate-50 active:scale-95">
                SERVICE_CATALOG <ChevronRight size={18} />
              </button>
            </div>

            {/* TRUST_METRICS: Counter / Stats */}
            <div className="flex flex-wrap gap-10 border-t border-slate-100 pt-12 md:gap-16">
              {trustStats.map((stat, i) => (
                <StatsCard key={i} {...stat} />
              ))}
            </div>
          </div>

          {/* 🛰️ SERVICE_INTERFACE (RIGHT) */}
          <div className="relative lg:col-span-5">
            <div className="relative z-10 grid grid-cols-1 gap-4">
              {/* Individual Capability Items */}
              {serviceList.map((service, i) => (
                <CapabilityItem key={i} {...service} />
              ))}

              {/* ⚡ PROTOCOL_CARD: Big CTA Card */}
              <div className="group relative mt-6 cursor-pointer overflow-hidden bg-brand p-10 shadow-[15px_15px_0px_0px_#020617] transition-all hover:-translate-y-1 hover:translate-x-1">
                <div className="relative z-10 text-slate-950">
                  <h3 className="mb-4 text-3xl font-black uppercase italic leading-none tracking-tighter">
                    Start Your <br /> Process Now
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-950" />
                    <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
                      Begin_Digital_Assessment
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={160}
                  className="absolute -bottom-10 -right-10 -rotate-12 text-slate-950/10 transition-all duration-700 group-hover:translate-x-6 group-hover:scale-110"
                />
              </div>
            </div>

            {/* 📏 GEOMETRIC_ACCENTS */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 border-r-4 border-t-4 border-slate-50" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-32 w-32 rounded-full bg-brand/5 blur-2xl" />
          </div>
        </div>
      </div>

      {/* 🏁 BOTTOM_ANCHOR: Scroll Indicator */}
      <div className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-default flex-col items-center gap-3 opacity-30 lg:flex">
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 transition-all group-hover:text-slate-600">
          Scroll_To_Explore
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-slate-400 via-slate-200 to-transparent" />
      </div>
    </section>
  )
}
