/** * @format
 * @description PROCESS_STEP: Operational Sequence Module (Industrial Dark V2.6.1 Zero-Error)
 * ✅ FIXED: Unused 'index' variable in mapping
 * ✅ REFINED: Typography system mapping (font-sans)
 */

'use client'

import React from 'react'
import { CheckCircle2, Search, FileText, ShieldCheck, ArrowRight, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const workFlowSteps = [
  {
    no: '01',
    title: 'Analysis & Strategy',
    description:
      'วิเคราะห์ข้อมูลและประเมินโอกาสสำเร็จโดยผู้เชี่ยวชาญ เพื่อวางแผนกลยุทธ์ที่เหมาะสมกับโปรไฟล์ของคุณที่สุด',
    icon: Search,
    status: 'READY',
  },
  {
    no: '02',
    title: 'Document Refinement',
    description:
      'ตรวจสอบและจัดเตรียมเอกสารอย่างประณีต เพื่อปิดทุกช่องโหว่และยกระดับความน่าเชื่อถือตามมาตรฐานสากล',
    icon: FileText,
    status: 'PROCESSING',
  },
  {
    no: '03',
    title: 'Secure Processing',
    description:
      'ดำเนินการผ่านระบบที่ปลอดภัยและตรวจสอบได้จริง พร้อมการรายงานสถานะให้คุณทราบอย่างต่อเนื่อง',
    icon: ShieldCheck,
    status: 'SUBMITTED',
  },
  {
    no: '04',
    title: 'Success Handover',
    description:
      'ส่งมอบผลดำเนินการที่สำเร็จ พร้อมให้คำแนะนำเชิงลึกสำหรับการเดินทางหรือการใช้เอกสารในอนาคต',
    icon: CheckCircle2,
    status: 'COMPLETED',
  },
]

export const ProcessStep = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32 selection:bg-brand selection:text-slate-950 lg:py-48">
      {/* 🧩 BLUEPRINT_OVERLAY */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* ⚡ TOP_BEAM */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 📟 HEADER_TERMINAL --- */}
        <header className="mb-24 lg:mb-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-slate-800" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
              Operational_Sequence_V2.6.1
            </span>
          </div>
          <h2 className="mb-10 text-7xl font-black uppercase leading-[0.8] tracking-tighter text-white md:text-8xl lg:text-9xl">
            Our <br />
            <span className="italic text-brand">Workflow.</span>
          </h2>
          <p className="max-w-xl font-sans text-lg font-bold leading-relaxed text-slate-500">
            ระบบการทำงานที่เน้นความโปร่งใส ความปลอดภัยของข้อมูล และการตรวจสอบทุกขั้นตอนอย่างเข้มงวด
          </p>
        </header>

        {/* --- 🏗️ STEPS_GRID_MATRIX --- */}
        <div className="relative grid grid-cols-1 gap-1 px-0 md:grid-cols-4 md:bg-slate-900/50">
          {/* ✅ FIXED: Changed 'index' to '_index' to satisfy linting */}
          {workFlowSteps.map((step, _index) => (
            <div
              key={step.no}
              className="group relative bg-slate-950 p-8 transition-all duration-500 hover:bg-slate-900/40 lg:p-12"
            >
              <div className="mb-12 flex items-start justify-between">
                <div className="group-hover:shadow-brand-glow relative flex h-20 w-20 items-center justify-center border-2 border-slate-800 bg-slate-950 transition-all duration-500 group-hover:border-brand">
                  <step.icon
                    className="text-slate-600 transition-colors duration-500 group-hover:text-brand"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <div className="absolute -right-3 -top-3 bg-brand px-3 py-1 font-mono text-[10px] font-black text-slate-950 shadow-sharp-sm">
                    {step.no}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-1.5 w-1.5 animate-pulse rounded-full',
                      step.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-brand',
                    )}
                  />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400">
                    {step.status}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white transition-colors group-hover:text-brand">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] font-bold leading-relaxed text-slate-500 group-hover:text-slate-400">
                  {step.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* --- 📊 DYNAMIC_CONTROL_PANEL --- */}
        <div className="mt-32 border border-slate-800 bg-slate-900/20 p-2 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-10 border border-slate-800 bg-slate-950/40 p-10 md:flex-row">
            <div className="flex items-center gap-8">
              <div className="relative flex h-20 w-20 items-center justify-center border-2 border-slate-800 bg-slate-900 shadow-sharp-sm">
                <Activity size={32} className="animate-pulse text-brand" />
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                  System_Latency_Metrics
                </p>
                <p className="font-mono text-xl font-black uppercase italic text-white md:text-2xl">
                  Average_Lead_Time: <span className="text-brand">5-14_Days</span>
                </p>
              </div>
            </div>

            <button className="hover:shadow-brand-glow group relative h-20 overflow-hidden bg-brand px-12 transition-all active:scale-95">
              <div className="relative z-10 flex items-center gap-6 font-mono text-[13px] font-black uppercase tracking-[0.3em] text-slate-950">
                Execute_Initial_Audit
                <ArrowRight
                  size={20}
                  strokeWidth={3}
                  className="transition-transform group-hover:translate-x-2"
                />
              </div>
              <div className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
