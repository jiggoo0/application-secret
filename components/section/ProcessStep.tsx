/** @format */

'use client'

import React from 'react'
import { CheckCircle2, Search, FileText, ShieldCheck, ArrowRight, Cpu } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ProcessStep_Protocol
 * @version 2026.0.3 (Cleanup & Logic Optimization)
 * ✅ FIXED: Removed unused 'cn' import to resolve ESLint error 7:10.
 */

const workFlowSteps = [
  {
    no: '01',
    title: 'Diagnostic Audit',
    description:
      'วิเคราะห์โครงสร้างข้อมูลและระบุจุดบอดเชิงเทคนิค เพื่อกำหนดทิศทางยุทธศาสตร์ที่แม่นยำที่สุด',
    icon: Search,
    status: 'READY',
  },
  {
    no: '02',
    title: 'Data Reconstruction',
    description:
      'ดำเนินการปรับจูนและสังเคราะห์เอกสารใหม่ตามมาตรฐานสากล เพื่อปิดช่องโหว่การพิจารณาทุกมิติ',
    icon: FileText,
    status: 'OPTIMIZING',
  },
  {
    no: '03',
    title: 'Secure Deployment',
    description:
      'นำส่งข้อมูลผ่านโปรโตคอลความปลอดภัย พร้อมระบบตรวจสอบสถานะแบบเรียลไทม์ (Live Tracking)',
    icon: ShieldCheck,
    status: 'DEPLOYED',
  },
  {
    no: '04',
    title: 'Final Resolution',
    description:
      'บรรลุเป้าหมายตามภารกิจ พร้อมสรุปรายงานวิเคราะห์ผล (Post-Action Report) สำหรับการใช้งานต่อ',
    icon: CheckCircle2,
    status: 'SUCCESS',
  },
]

export const ProcessStep = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-32 selection:bg-[#FCDE09] selection:text-[#020617] lg:py-48">
      {/* 🧩 UI_INFRA: Blueprint Grid & Ambient Effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#FCDE09 1px, transparent 1px), linear-gradient(90deg, #FCDE09 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-[#FCDE09]/10 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- HEADER: Logic Focused --- */}
        <header className="mb-24 text-center lg:mb-40">
          <div className="mb-8 inline-flex items-center gap-6">
            <div className="h-[2px] w-12 bg-slate-800" />
            <div className="flex items-center gap-3">
              <Cpu size={16} className="text-[#FCDE09]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-[#FCDE09]">
                System_Workflow_V.2.0
              </span>
            </div>
            <div className="h-[2px] w-12 bg-slate-800" />
          </div>
          <h2 className="mb-10 text-6xl font-black uppercase tracking-tighter text-white md:text-8xl lg:text-9xl">
            The{' '}
            <span className="italic text-[#FCDE09] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Protocol.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl font-thai text-lg font-bold leading-relaxed text-slate-400">
            กระบวนการทำงานที่ขับเคลื่อนด้วยชุดข้อมูลและการวิเคราะห์เชิงลึก
            เปลี่ยนความซับซ้อนให้เป็นระบบระเบียบที่จับต้องได้จริง
          </p>
        </header>

        {/* --- STEPS_MATRIX --- */}

        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8">
          {/* Connector Line: Industrial Style */}
          <div className="absolute left-0 top-12 z-0 hidden h-[2px] w-full bg-slate-900 md:block" />

          {workFlowSteps.map((step, index) => (
            <div key={step.no} className="group relative z-10">
              {/* Node Indicator */}
              <div className="mb-10 flex flex-col items-center md:items-start">
                <div className="relative flex h-24 w-24 items-center justify-center border-2 border-slate-800 bg-[#020617] shadow-[10px_10px_0px_0px_#000] transition-all duration-700 group-hover:-translate-y-2 group-hover:border-[#FCDE09] group-hover:bg-slate-900 group-hover:shadow-[10px_10px_0px_0px_#FCDE09]">
                  <step.icon
                    className="text-slate-600 transition-all duration-500 group-hover:scale-110 group-hover:text-[#FCDE09]"
                    size={32}
                    strokeWidth={1.5}
                  />
                  {/* Step ID Badge */}
                  <div className="absolute -left-2 -top-2 bg-white px-3 py-1 font-mono text-xs font-black text-[#020617] transition-colors group-hover:bg-[#FCDE09]">
                    {step.no}
                  </div>
                </div>
              </div>

              {/* Data Content */}
              <div className="space-y-6 text-center md:text-left">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <div className="h-2 w-2 rounded-full bg-[#FCDE09] shadow-[0_0_10px_#FCDE09] group-hover:animate-pulse" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white">
                    Status: {step.status}
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#FCDE09]">
                  {step.title}
                </h3>
                <p className="font-thai text-base font-medium leading-relaxed text-slate-500 transition-colors group-hover:text-slate-300">
                  {step.description}
                </p>
              </div>

              {/* Mobile Connector */}
              {index !== workFlowSteps.length - 1 && (
                <div className="mt-12 flex justify-center md:hidden">
                  <ArrowRight className="rotate-90 text-[#FCDE09]/20" size={32} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- SYSTEM_FOOTER_ACTION --- */}
        <div className="mt-32 border-4 border-slate-900 bg-slate-950 p-2 shadow-2xl">
          <div className="flex flex-col items-center justify-between gap-10 border-2 border-slate-800 bg-slate-900/20 p-12 backdrop-blur-3xl md:flex-row">
            <div className="flex items-center gap-8">
              <div className="relative flex h-20 w-20 items-center justify-center border-2 border-[#FCDE09] bg-slate-950 shadow-[5px_5px_20px_rgba(252,222,9,0.1)]">
                <div className="absolute inset-0 animate-pulse bg-[#FCDE09]/5" />
                <Cpu className="text-[#FCDE09]" size={32} />
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                  Protocol_Efficiency_Ready
                </p>
                <h4 className="font-mono text-xl font-black text-white">
                  AVG_LEAD_TIME: <span className="text-[#FCDE09]">7.4_DAYS</span>
                </h4>
              </div>
            </div>

            <button className="group relative h-20 overflow-hidden bg-[#FCDE09] px-16 shadow-[10px_10px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
              <span className="relative z-10 flex items-center gap-4 font-mono text-sm font-black uppercase tracking-[0.5em] text-[#020617]">
                Initialize_Audit <ArrowRight size={20} />
              </span>
              <div className="absolute inset-0 z-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
