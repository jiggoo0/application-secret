/** @format */

'use client'

import React from 'react'
import { CheckCircle2, Search, FileText, ShieldCheck, ArrowRight } from 'lucide-react'

const workFlowSteps = [
  {
    no: '01',
    title: 'Profile Analysis',
    description:
      'เช็กข้อมูลและจุดบอดของคุณอย่างละเอียด เพื่อวางแนวทางที่ช่วยให้ผ่านฉลุยตั้งแต่วันแรก',
    icon: Search,
    status: 'READY',
  },
  {
    no: '02',
    title: 'Document Polish',
    description:
      'ปรับแต่งและจัดเตรียมเอกสารให้เนี้ยบที่สุด ปิดช่องโหว่ให้ตรงตามมาตรฐานที่ปลายทางต้องการ',
    icon: FileText,
    status: 'PROCESSING',
  },
  {
    no: '03',
    title: 'Secure Submission',
    description: 'ส่งเรื่องผ่านระบบที่แม่นยำ ปลอดภัย และคุณสามารถเช็กสถานะการทำงานได้ตลอดเวลา',
    icon: ShieldCheck,
    status: 'SUBMITTED',
  },
  {
    no: '04',
    title: 'Case Success',
    description: 'ส่งมอบงานที่สำเร็จเรียบร้อย พร้อมสรุปคำแนะนำสำหรับการนำไปใช้งานต่อในอนาคต',
    icon: CheckCircle2,
    status: 'COMPLETED',
  },
]

export const ProcessStep = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-32 selection:bg-[#FCDE09] selection:text-[#020617] lg:py-48">
      {/* 🧩 Blueprint Grid (เขียนสด) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#FCDE09 1px, transparent 1px), linear-gradient(90deg, #FCDE09 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FCDE09]/40 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- HEADER --- */}
        <header className="mb-24 text-center lg:mb-32">
          <div className="mb-6 inline-flex items-center gap-4">
            <span className="h-[1px] w-12 bg-slate-800" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
              Work_Flow_Sequence
            </span>
            <span className="h-[1px] w-12 bg-slate-800" />
          </div>
          <h2 className="mb-8 text-6xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
            How We <span className="italic text-[#FCDE09]">Work.</span>
          </h2>
          <p className="mx-auto max-w-xl font-thai text-sm leading-relaxed text-slate-500 md:text-base">
            ทุกขั้นตอนถูกออกแบบมาเพื่อความแม่นยำ เราดูแลให้คุณตั้งแต่จุดเริ่มจนถึงความสำเร็จ
            เพื่อให้งานของคุณผ่านไปได้อย่างราบรื่น
          </p>
        </header>

        {/* --- STEPS_GRID --- */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Connector Line (Desktop) */}
          <div className="absolute left-0 top-8 z-0 hidden h-[1px] w-full bg-slate-900 md:block" />

          {workFlowSteps.map((step, index) => (
            <div key={step.no} className="group relative z-10">
              {/* Number & Icon Block */}
              <div className="mb-8 flex flex-col items-center md:items-start">
                <div className="relative flex h-16 w-16 items-center justify-center border-2 border-slate-800 bg-[#020617] shadow-[6px_6px_0px_0px_#000] transition-all duration-500 group-hover:border-[#FCDE09] group-hover:bg-slate-900">
                  <step.icon
                    className="text-slate-600 transition-colors duration-300 group-hover:text-[#FCDE09]"
                    size={24}
                    strokeWidth={1.5}
                  />
                  <div className="absolute -right-2 -top-2 bg-[#FCDE09] px-2 py-0.5 font-mono text-[10px] font-black text-[#020617]">
                    {step.no}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <div className="h-2 w-2 bg-[#FCDE09] group-hover:animate-ping" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#FCDE09]">
                    {step.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FCDE09]">
                  {step.title}
                </h3>
                <p className="font-thai text-[14px] font-medium leading-relaxed text-slate-500 transition-colors group-hover:text-slate-400">
                  {step.description}
                </p>
              </div>

              {index !== workFlowSteps.length - 1 && (
                <div className="mt-12 flex justify-center md:hidden">
                  <ArrowRight className="rotate-90 text-slate-800" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- ACTION_BAR --- */}
        <div className="mt-28 border-2 border-slate-900 bg-slate-950/50 p-2">
          <div className="flex flex-col items-center justify-between gap-8 border border-slate-800 bg-slate-900/40 p-10 backdrop-blur-xl md:flex-row">
            <div className="flex items-center gap-6">
              <div className="relative flex h-14 w-14 items-center justify-center border-2 border-slate-800 bg-[#020617]">
                <div className="absolute h-2 w-2 animate-ping bg-[#FCDE09]/40" />
                <div className="h-2 w-2 bg-[#FCDE09]" />
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  System_Ready
                </p>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Lead_Time: <span className="text-[#FCDE09]">5-14_Days</span>
                </p>
              </div>
            </div>

            <button className="group relative overflow-hidden bg-[#FCDE09] px-10 py-4 shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
              <span className="relative z-10 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-[#020617]">
                Start_Case_Audit
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
