/** @format */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { serviceList, trustStats } from '@/components/hero/heroData'
import { CapabilityItem } from '@/components/hero/CapabilityItem'
import { StatsCard } from '@/components/hero/StatsCard'
import { ChevronRight, ArrowRight, Zap, Terminal } from 'lucide-react'

/**
 * 🛠️ COMPONENT: HERO_SECTION_PROTOCOL
 * @version 2026.0.4 (JP-Standard-Compliance)
 * ✅ ตรวจสอบแล้ว: ไม่ใช้คำต้องห้าม, ภาษาอ่านง่าย, มั่นใจ, จริงใจ
 */
export const HeroSection = () => {
  const router = useRouter()

  const handleStartProcess = () => {
    const element = document.getElementById('assessment-form-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/assessment')
    }
  }

  return (
    <section className="relative flex min-h-[98vh] items-center overflow-hidden bg-white py-24 selection:bg-[#FCDE09] selection:text-[#020617] lg:py-0">
      {/* 🧩 UI_INFRA: Engineering Grid (โครงสร้างแบบมืออาชีพ) */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          }}
        />
        <div className="absolute right-0 top-0 h-full w-1/4 translate-x-1/3 -skew-x-12 border-l-2 border-slate-950 bg-slate-50/50" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 📝 CONTENT_MANIFEST: หัวใจสำคัญของความน่าเชื่อถือ */}
          <div className="pt-10 lg:col-span-7 lg:pt-0">
            <header className="relative mb-12">
              {/* Status Badge (สถานะระบบตรวจสอบ) */}
              <div className="group mb-12 inline-flex items-center gap-4 border-2 border-[#020617] bg-white px-5 py-2.5 shadow-sharp transition-all">
                <Terminal size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                  Status: <span className="animate-pulse text-emerald-500">Verified_By_JP</span>
                </span>
              </div>

              {/* Headline (ดุดัน คมชัด) */}
              <h1 className="mb-12 text-7xl font-black uppercase leading-[0.8] tracking-[calc(-0.05em)] text-[#020617] md:text-9xl lg:text-[124px]">
                BUILDING <br />
                <span className="italic text-[#FCDE09] drop-shadow-[6px_6px_0px_#020617] transition-all">
                  TRUST
                </span>{' '}
                <br />
                REALITY.
              </h1>

              {/* ภาษาที่ถูกจริตคนไทย: จริงใจ มั่นใจ ไม่ใช้ศัพท์เทคนิค */}
              <p className="max-w-2xl border-l-8 border-[#FCDE09] pl-8 font-thai text-2xl font-black leading-tight text-slate-900">
                ยกระดับงานเอกสารสู่มาตรฐานมืออาชีพ
                <span className="mt-3 block font-thai text-lg font-bold text-slate-500">
                  ประสบการณ์มากกว่า 8 ปี การันตีผลงานจริง ตรวจสอบได้ทุกขั้นตอน
                  เปลี่ยนความยุ่งยากให้กลายเป็นความมั่นใจ
                </span>
              </p>
            </header>

            {/* ACTION_REGISTRY (CTA ที่ชัดเจน) */}
            <div className="mb-20 flex flex-col gap-6 sm:flex-row">
              <button
                onClick={() => router.push('/contact')}
                className="group relative flex items-center justify-center gap-6 overflow-hidden bg-[#020617] px-12 py-6 text-[13px] font-black uppercase tracking-[0.3em] text-[#FCDE09] shadow-sharp transition-all active:scale-95"
              >
                ติดต่อทีมงานมืออาชีพ
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </button>

              <button
                onClick={() => router.push('/#services')}
                className="flex items-center justify-center gap-4 border-4 border-[#020617] bg-white px-12 py-6 text-[13px] font-black uppercase tracking-[0.3em] text-[#020617] shadow-sharp transition-all hover:bg-slate-50 active:scale-95"
              >
                ดูผลงานจริง <ChevronRight size={20} />
              </button>
            </div>

            {/* Trust Statistics (แสดงความน่าเชื่อถือ) */}
            <div className="flex flex-wrap gap-12 border-t-2 border-slate-950 pt-14">
              {trustStats.map((stat, i) => (
                <StatsCard key={`hero-stat-${i}`} {...stat} />
              ))}
            </div>
          </div>

          {/* 🛰️ SERVICE_INTERFACE (รายการบริการ) */}
          <div className="relative lg:col-span-5">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[#FCDE09]/5 blur-[120px]" />

            <div className="relative z-10 grid grid-cols-1 gap-5">
              {serviceList.map((service, i) => (
                <CapabilityItem key={`capability-${i}`} {...service} />
              ))}

              {/* ⚡ บัตรประเมินเบื้องต้น: สร้างความมั่นใจ */}
              <button
                onClick={handleStartProcess}
                className="group relative mt-10 w-full border-4 border-[#020617] bg-[#FCDE09] p-12 text-left shadow-sharp transition-all hover:-translate-y-2 hover:shadow-[16px_16px_0px_#020617] active:scale-[0.98]"
              >
                <div className="relative z-10 text-[#020617]">
                  <h3 className="mb-6 text-4xl font-black uppercase italic leading-[0.8] tracking-tighter">
                    พร้อมให้เรา <br /> ดูแลหรือยัง?
                  </h3>
                  <div className="flex items-center gap-3 border-t-2 border-[#020617] pt-6">
                    <Zap size={16} className="animate-pulse fill-[#020617]" />
                    <p className="font-mono text-[12px] font-black uppercase tracking-[0.3em]">
                      Check_Case_Status
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={180}
                  className="absolute -bottom-12 -right-12 -rotate-12 text-[#020617]/5 transition-all duration-700 group-hover:rotate-0 group-hover:opacity-10"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
