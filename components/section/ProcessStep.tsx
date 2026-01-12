/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.896Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: ProcessStep          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import React from 'react'
import { CheckCircle2, Search, FileText, ShieldCheck, ArrowRight, Cpu } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ProcessStep_PROTOCOL_REFINED
 * VERSION: 2026.1.0
 * STYLE: Industrial / System-Driven / High-Contrast
 */

const workflow = [
  {
    no: '01',
    title: 'Diagnostic Audit',
    description:
      'วิเคราะห์โครงสร้างข้อมูลและระบุจุดเสี่ยงเชิงระบบ เพื่อกำหนดทิศทางการดำเนินงานที่แม่นยำ',
    icon: Search,
    status: 'READY',
  },
  {
    no: '02',
    title: 'Data Reconstruction',
    description: 'ปรับโครงสร้างและจัดเรียงเอกสารใหม่ตามเกณฑ์สากล ลดช่องว่างในการพิจารณา',
    icon: FileText,
    status: 'OPTIMIZING',
  },
  {
    no: '03',
    title: 'Secure Deployment',
    description: 'นำส่งข้อมูลผ่านกระบวนการควบคุมความปลอดภัย พร้อมติดตามสถานะแบบเป็นระบบ',
    icon: ShieldCheck,
    status: 'DEPLOYED',
  },
  {
    no: '04',
    title: 'Final Resolution',
    description: 'สรุปผลลัพธ์และจัดทำรายงานหลังปฏิบัติการ เพื่อรองรับการใช้งานหรืออ้างอิงต่อ',
    icon: CheckCircle2,
    status: 'SUCCESS',
  },
] as const

export const ProcessStep = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-32 text-white selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#FCDE09 1px, transparent 1px), linear-gradient(90deg, #FCDE09 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <header className="mb-28 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <Cpu size={16} className="text-[#FCDE09]" />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.45em] text-[#FCDE09]">
              SYSTEM_WORKFLOW
            </span>
          </div>

          <h2 className="mb-8 text-6xl font-black uppercase tracking-tighter md:text-8xl">
            The{' '}
            <span className="italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#000]">Protocol.</span>
          </h2>

          <p className="font-thai mx-auto max-w-2xl text-lg font-bold leading-relaxed text-slate-400">
            กระบวนการที่ออกแบบจากข้อมูลจริง ลดความซับซ้อน และควบคุมผลลัพธ์ได้ทุกขั้นตอน
          </p>
        </header>

        {/* STEPS GRID */}
        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-10">
          <div className="absolute left-0 top-12 hidden h-[2px] w-full bg-slate-800 md:block" />

          {workflow.map((step, i) => (
            <div key={step.no} className="group relative">
              {/* NODE */}
              <div className="mb-10 flex justify-center md:justify-start">
                <div className="relative flex h-24 w-24 items-center justify-center border-2 border-slate-800 bg-[#020617] shadow-[10px_10px_0px_#000] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#FCDE09] group-hover:shadow-[10px_10px_0px_#FCDE09]">
                  <step.icon
                    size={30}
                    strokeWidth={1.5}
                    className="text-slate-600 transition-colors group-hover:text-[#FCDE09]"
                  />
                  <span className="absolute -left-2 -top-2 bg-white px-3 py-1 font-mono text-xs font-black text-[#020617] group-hover:bg-[#FCDE09]">
                    {step.no}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-5 text-center md:text-left">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <span className="h-2 w-2 rounded-full bg-[#FCDE09] shadow-[0_0_8px_#FCDE09]" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                    STATUS_{step.status}
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-[#FCDE09]">
                  {step.title}
                </h3>

                <p className="font-thai text-base font-medium leading-relaxed text-slate-500 group-hover:text-slate-300">
                  {step.description}
                </p>
              </div>

              {i !== workflow.length - 1 && (
                <div className="mt-12 flex justify-center md:hidden">
                  <ArrowRight size={32} className="rotate-90 text-[#FCDE09]/20" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-32 border-4 border-slate-900 bg-slate-950 p-2">
          <div className="flex flex-col items-center justify-between gap-10 border-2 border-slate-800 bg-slate-900/20 p-12 md:flex-row">
            <div className="flex items-center gap-8">
              <div className="flex h-20 w-20 items-center justify-center border-2 border-[#FCDE09] bg-slate-950">
                <Cpu size={30} className="text-[#FCDE09]" />
              </div>
              <div>
                <span className="block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                  PERFORMANCE_METRIC
                </span>
                <span className="block font-mono text-xl font-black">
                  AVG_LEAD_TIME: <span className="text-[#FCDE09]">7.4_DAYS</span>
                </span>
              </div>
            </div>

            <button className="group relative h-20 overflow-hidden bg-[#FCDE09] px-16 font-mono text-sm font-black uppercase tracking-[0.4em] text-[#020617] shadow-[10px_10px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              <span className="relative z-10 flex items-center gap-4">
                Initialize_Audit <ArrowRight size={18} />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
