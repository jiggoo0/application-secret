/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T08:58:12.000Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: HeroSection
- Role: Brand Gateway & Engagement Hub
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: แสดงจุดขายหลักและสร้างความมั่นใจด้วยหลัก Digital Integrity
*/

/** @format */

'use client'

import { useRouter } from 'next/navigation'
import { serviceList, trustStats } from '@/components/hero/heroData'
import { CapabilityItem } from '@/components/hero/CapabilityItem'
import { StatsCard } from '@/components/hero/StatsCard'
import { ChevronRight, ArrowRight, Zap, Terminal } from 'lucide-react'

/**
 * 🛰️ COMPONENT: HeroSection
 * ✅ Role: Strategic Gateway
 * ✅ Concept: Seamless Process with High-End Professionalism
 */
export function HeroSection() {
  const router = useRouter()

  const startAssessment = () => {
    const target = document.getElementById('assessment-form-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      return
    }
    // Seamless Redirection หากไม่พบ Element ในหน้าปัจจุบัน
    router.push('/contact')
  }

  return (
    <section className="relative flex min-h-[98vh] items-center overflow-hidden bg-white py-24 selection:bg-[#FCDE09] selection:text-slate-950 lg:py-0">
      {/* 🧩 UI_DECOR: Blueprint Grid (Digital Integrity Visual) */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          }}
        />
        <div className="absolute right-0 top-0 h-full w-1/4 translate-x-1/3 -skew-x-12 border-l-2 border-slate-950 bg-slate-50/50" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* CONTENT: Information Architecture */}
          <div className="pt-10 lg:col-span-7 lg:pt-0">
            <header className="relative mb-12">
              <div className="shadow-sharp mb-12 inline-flex items-center gap-4 border-2 border-slate-950 bg-white px-5 py-2.5">
                <Terminal size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                  Status: <span className="animate-pulse text-emerald-500">Verified_By_JP</span>
                </span>
              </div>

              <h1 className="mb-12 text-7xl font-black uppercase leading-[0.8] tracking-[-0.05em] text-slate-950 md:text-9xl lg:text-[124px]">
                BUILDING <br />
                <span className="bg-[#FCDE09] px-4 italic text-slate-950 drop-shadow-[6px_6px_0px_#020617]">
                  TRUST
                </span>
                <br />
                REALITY.
              </h1>

              <p className="font-thai max-w-2xl border-l-8 border-[#FCDE09] pl-8 text-2xl font-black leading-tight text-slate-900">
                ยกระดับงานเอกสารสู่มาตรฐานมืออาชีพ
                <span className="font-thai mt-3 block text-lg font-bold text-slate-500">
                  ประสบการณ์มากกว่า 8 ปี ภายใต้หลัก Evidence-Based
                </span>
              </p>
            </header>

            {/* ACTION_PANE: CTA Configuration */}
            <div className="mb-20 flex flex-col gap-6 sm:flex-row">
              {/* Primary CTA: Contact Team */}
              <button
                onClick={() => router.push('/contact')}
                className="shadow-sharp group flex items-center justify-center gap-6 bg-[#020617] px-12 py-6 text-[13px] font-black uppercase tracking-[0.3em] text-[#FCDE09] transition-all hover:bg-slate-800 active:scale-95"
              >
                ติดต่อทีมงาน
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </button>

              {/* Secondary CTA: Showcase */}
              <button
                onClick={() => router.push('/showcase')}
                className="shadow-sharp flex items-center justify-center gap-4 border-4 border-slate-950 bg-white px-12 py-6 text-[13px] font-black uppercase tracking-[0.3em] text-slate-950 transition-all hover:bg-slate-50 active:scale-95"
              >
                ดูผลงาน <ChevronRight size={20} />
              </button>
            </div>

            {/* METRICS: Evidence-Based Stats */}
            <div className="flex flex-wrap gap-12 border-t-2 border-slate-950 pt-14">
              {trustStats.map((stat, idx) => (
                <StatsCard key={`hero-stat-${idx}`} {...stat} />
              ))}
            </div>
          </div>

          {/* SERVICES_CAPABILITY_PANEL */}
          <div className="relative lg:col-span-5">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[#FCDE09]/5 blur-[120px]" />

            <div className="relative z-10 grid gap-5">
              {serviceList.map((service, idx) => (
                <CapabilityItem key={`capability-${idx}`} {...service} />
              ))}

              {/* Assessment Trigger: Trust by Design */}
              <button
                onClick={startAssessment}
                className="shadow-sharp group relative mt-10 w-full border-4 border-slate-950 bg-[#FCDE09] p-12 text-left transition-all hover:-translate-y-2 active:scale-[0.98]"
              >
                <div className="relative z-10 text-slate-950">
                  <h3 className="mb-6 text-4xl font-black uppercase italic leading-[0.8] tracking-tighter">
                    พร้อมให้เรา <br /> ดูแลหรือยัง?
                  </h3>
                  <div className="flex items-center gap-3 border-t-2 border-slate-950 pt-6">
                    <Zap size={16} className="animate-pulse" />
                    <p className="font-mono text-[12px] font-black uppercase tracking-[0.3em]">
                      Check_Case_Status
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={180}
                  className="absolute -bottom-12 -right-12 -rotate-12 text-slate-950/5 transition-all duration-700 group-hover:rotate-0 group-hover:opacity-10"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
