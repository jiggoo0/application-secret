/** @format */

"use client"

import React from "react"
import {
  CheckCircle2,
  Search,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"

/**
 * 🛰️ DATA: workFlowSteps
 * ปรับปรุงเนื้อหา: สื่อสารถึงความเป็นมืออาชีพและความใส่ใจในทุกขั้นตอน (Trust-Centric)
 */
const workFlowSteps = [
  {
    no: "01",
    title: "Analysis & Strategy",
    description:
      "วิเคราะห์ข้อมูลและประเมินโอกาสสำเร็จโดยผู้เชี่ยวชาญ เพื่อวางแผนกลยุทธ์ที่เหมาะสมกับโปรไฟล์ของคุณที่สุด",
    icon: Search,
    status: "READY",
  },
  {
    no: "02",
    title: "Document Refinement",
    description:
      "ตรวจสอบและจัดเตรียมเอกสารอย่างประณีต เพื่อปิดทุกช่องโหว่และยกระดับความน่าเชื่อถือตามมาตรฐานสากล",
    icon: FileText,
    status: "PROCESSING",
  },
  {
    no: "03",
    title: "Secure Processing",
    description:
      "ดำเนินการผ่านระบบที่ปลอดภัยและตรวจสอบได้จริง พร้อมการรายงานสถานะให้คุณทราบอย่างต่อเนื่อง",
    icon: ShieldCheck,
    status: "SUBMITTED",
  },
  {
    no: "04",
    title: "Success Handover",
    description:
      "ส่งมอบผลดำเนินการที่สำเร็จ พร้อมให้คำแนะนำเชิงลึกสำหรับการเดินทางหรือการใช้เอกสารในอนาคต",
    icon: CheckCircle2,
    status: "COMPLETED",
  },
]

/**
 * 🏛️ COMPONENT: ProcessStep
 * ส่วนแสดงขั้นตอนการทำงานแบบ Linear Flow ออกแบบด้วยสไตล์ Industrial-Grid
 * 🛡️ ENFORCEMENT: Named Export & Zero Unused Vars
 */
export const ProcessStep = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32 selection:bg-brand selection:text-slate-950 lg:py-48">
      {/* 🧩 Blueprint Grid Overlay & Border Accent */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.05]" />
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- HEADER_SECTION --- */}
        <header className="mb-24 text-center lg:mb-32">
          <div className="mb-6 inline-flex items-center gap-4">
            <span className="h-[1px] w-12 bg-slate-800" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
              Operational_Sequence_V2
            </span>
            <span className="h-[1px] w-12 bg-slate-800" />
          </div>
          <h2 className="mb-8 text-6xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
            Our <span className="italic text-brand">Workflow.</span>
          </h2>
          <p className="mx-auto max-w-xl font-thai text-sm leading-relaxed text-slate-500 md:text-base">
            ระบบการทำงานที่เน้นความโปร่งใส ความปลอดภัยของข้อมูล
            และการตรวจสอบทุกขั้นตอนอย่างเข้มงวด เพื่อผลลัพธ์ที่ดีที่สุดสำหรับคุณ
          </p>
        </header>

        {/* --- STEPS_GRID_INTERACTION --- */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Desktop Connector Path (Progressive Line) */}
          <div className="absolute left-0 top-8 z-0 hidden h-[1px] w-full bg-slate-900 md:block">
            <div
              className="h-full w-1/4 animate-[shimmer_3s_infinite_linear] bg-gradient-to-r from-brand/50 to-transparent"
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>

          {workFlowSteps.map((step, index) => (
            <div key={step.no} className="group relative z-10">
              {/* Number & Icon Block */}
              <div className="mb-8 flex flex-col items-center md:items-start">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-none border-2 border-slate-800 bg-slate-950 shadow-sharp transition-all duration-500 group-hover:border-brand group-hover:bg-slate-900">
                  <step.icon
                    className="text-slate-600 transition-colors duration-300 group-hover:text-brand"
                    size={24}
                    strokeWidth={1.5}
                  />
                  {/* Floating Step Number */}
                  <div className="absolute -right-2 -top-2 rounded-none bg-brand px-2 py-0.5 font-mono text-[10px] font-black text-slate-950 shadow-sm">
                    {step.no}
                  </div>
                </div>
              </div>

              {/* Content Block */}
              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <div className="h-2 w-2 rounded-none bg-brand group-hover:animate-ping" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 transition-colors group-hover:text-brand">
                    Status_Code::{step.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-brand">
                  {step.title}
                </h3>
                <p className="font-thai text-[14px] font-medium leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-400 lg:text-[15px]">
                  {step.description}
                </p>
              </div>

              {/* Mobile Directional Arrow */}
              {index !== workFlowSteps.length - 1 && (
                <div className="mt-12 flex justify-center md:hidden">
                  <ArrowRight
                    className="rotate-90 animate-bounce text-slate-800"
                    size={20}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- DYNAMIC_FOOTER_ACTION_BAR --- */}
        <div className="mt-28 rounded-none border-2 border-slate-900 bg-slate-950/50 p-2">
          <div className="flex flex-col items-center justify-between gap-8 rounded-none border border-slate-800 bg-slate-900/40 p-10 backdrop-blur-xl md:flex-row">
            <div className="flex items-center gap-6">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-none border-2 border-slate-800 bg-slate-950">
                <div className="absolute h-2 w-2 animate-ping rounded-none bg-brand/40" />
                <div className="relative h-2 w-2 rounded-none bg-brand" />
              </div>
              <div>
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  Service_Availability_Status
                </p>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                  Average_Lead_Time:{" "}
                  <span className="text-brand">5-14_Business_Days</span>
                </p>
              </div>
            </div>

            <button className="group relative overflow-hidden rounded-none border-2 border-slate-950 bg-brand px-12 py-5 shadow-[10px_10px_0px_0px_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
              <span className="relative z-10 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-950">
                Execute_Initial_Audit
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 ease-out group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
