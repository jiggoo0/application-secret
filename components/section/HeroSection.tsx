/** @format */

"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { serviceList, trustStats } from "@/components/hero/heroData"
import { CapabilityItem } from "@/components/hero/CapabilityItem"
import { StatsCard } from "@/components/hero/StatsCard"
import { ChevronRight, ArrowRight, ShieldCheck, Zap } from "lucide-react"

/**
 * 🛰️ COMPONENT: HeroSection (v2025 Optimized)
 * PURPOSE: ส่วนแสดงผลหลักพร้อมระบบการนำทางเชิงกลยุทธ์ (Industrial Sharp Design)
 */
export const HeroSection = () => {
  const router = useRouter()

  // 🎯 FUNCTION: จัดการการเลื่อนหน้าหรือการนำทางไปยังส่วนการประเมิน
  const handleStartProcess = () => {
    const element = document.getElementById("assessment-form-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/assessment")
    }
  }

  return (
    <section className="relative flex min-h-[95vh] items-center overflow-hidden bg-white py-24 selection:bg-[#FCDE09] selection:text-slate-950 lg:py-0">
      {/* 🧩 INTEGRATED BACKGROUND ARCHITECTURE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03]" />
        <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/4 -skew-x-12 border-l border-slate-100 bg-slate-50/40" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 📝 CONTENT_MANIFEST (LEFT) */}
          <div className="pt-10 lg:col-span-7 lg:pt-0">
            <header className="relative mb-12">
              <div className="mb-10 inline-flex cursor-default items-center gap-3 border-2 border-[#020617] bg-white px-4 py-2 shadow-sharp">
                <ShieldCheck size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#020617]">
                  Verified_Service_Provider_2025
                </span>
              </div>

              <h1 className="mb-10 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-[#020617] md:text-8xl lg:text-[110px]">
                Simplifying <br />
                <span className="pr-2 italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
                  Global
                </span>{" "}
                <br />
                Mobility.
              </h1>

              <p className="max-w-2xl font-thai text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
                ยกระดับการจัดการเอกสารและวีซ่าของคุณด้วยมาตรฐานระดับพรีเมียม
                แม่นยำ และเป็นความลับสูงสุด
                เพื่อให้คุณโฟกัสกับก้าวสำคัญของธุรกิจและการเดินทาง
              </p>
            </header>

            {/* ACTION_REGISTRY: เชื่อมต่อปุ่มใช้งานจริง */}
            <div className="mb-16 flex flex-col gap-5 sm:flex-row">
              {/* ปุ่มหลัก: ติดต่อผู้เชี่ยวชาญ */}
              <button
                onClick={() => router.push("/contact")}
                className="group flex items-center justify-center gap-4 bg-[#020617] px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-[#FCDE09] transition-all hover:shadow-sharp active:scale-95"
              >
                CONSULT_EXPERT
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </button>

              {/* ปุ่มรอง: รายการบริการ */}
              <button
                onClick={() => router.push("/#services")}
                className="flex items-center justify-center gap-4 border-2 border-[#020617] bg-white px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-[#020617] transition-all hover:bg-slate-50 active:scale-95"
              >
                SERVICE_CATALOG <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-10 border-t border-slate-100 pt-12 md:gap-16">
              {trustStats.map((stat, i) => (
                <StatsCard key={`hero-stat-${i}`} {...stat} />
              ))}
            </div>
          </div>

          {/* 🛰️ SERVICE_INTERFACE (RIGHT) */}
          <div className="relative lg:col-span-5">
            <div className="relative z-10 grid grid-cols-1 gap-4">
              {serviceList.map((service, i) => (
                <CapabilityItem key={`capability-${i}`} {...service} />
              ))}

              {/* ⚡ PROTOCOL_CARD: ปุ่มประเมินผลดิจิทัล (ใช้งานจริง) */}
              <button
                onClick={handleStartProcess}
                className="group relative mt-6 w-full border-2 border-[#020617] bg-[#FCDE09] p-10 text-left shadow-sharp transition-all hover:-translate-y-1 hover:translate-x-1 active:scale-[0.98]"
              >
                <div className="relative z-10 text-[#020617]">
                  <h3 className="mb-4 text-3xl font-black uppercase italic leading-none tracking-tighter">
                    Start Your <br /> Process Now
                  </h3>
                  <div className="flex items-center gap-3">
                    <Zap size={14} className="animate-pulse fill-[#020617]" />
                    <p className="font-mono text-[11px] font-black uppercase tracking-[0.2em]">
                      Begin_Digital_Assessment
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={160}
                  className="absolute -bottom-10 -right-10 -rotate-12 text-[#020617]/10 transition-all duration-700 group-hover:translate-x-6 group-hover:scale-110"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
