/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T09:05:45.000Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: AboutSection
- Role: Core Philosophy & Methodology Hub
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: แสดงวิสัยทัศน์และกระบวนการทำงานภายใต้หลัก Digital Integrity
*/

/** @format */

'use client'

import React from 'react'
import { ShieldCheck, Target, Lock, ArrowUpRight, Activity } from 'lucide-react'

/**
 * 🛰️ COMPONENT: AboutSection
 * ✅ Role: Strategic Value Proposition
 * ✅ Concept: Evidence-Based Logic & Professional Standards
 */

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'มาตรฐาน Digital Integrity',
    desc: 'อ้างอิงเกณฑ์จริง ตรวจสอบซ้ำทุกจุดภายใต้หลัก Evidence-Based เพื่อลดความคลาดเคลื่อนของข้อมูล',
  },
  {
    icon: Lock,
    title: 'ความปลอดภัย Trust by Design',
    desc: 'โครงสร้างการจัดการข้อมูลที่เป็นระบบ แยกสิทธิ์และชั้นความลับอย่างชัดเจนในทุกขั้นตอน',
  },
  {
    icon: Target,
    title: 'Seamless Process Workflow',
    desc: 'การวางแผนและส่งมอบงานที่ลื่นไหล พร้อมตัวชี้วัดความคืบหน้าที่โปร่งใสและตรวจสอบได้จริง',
  },
] as const

export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 text-[#020617] selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_DECOR: Blueprint Grid (Digital Integrity Visual) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#FCDE09]/10 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* HEADER: Strategic Narrative */}
        <div className="mb-24 max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <Activity size={12} className="text-[#FCDE09]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              TRUST_SYSTEM_ONLINE
            </span>
          </div>

          <h2 className="mb-12 text-6xl font-black uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            Built for <br />
            <span className="italic text-[#FCDE09] drop-shadow-[6px_6px_0px_#020617]">
              Approval Logic
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <p className="font-thai border-l-8 border-[#FCDE09] pl-8 text-2xl font-black leading-tight">
              โครงสร้างงานเอกสารที่คิดแบบผู้พิจารณา <br />
              <span className="italic text-slate-500">Evidence-Based Methodology</span>
            </p>
            <p className="font-thai text-lg font-bold leading-relaxed text-slate-500">
              ทุกข้อมูลถูกจัดวางตามลำดับความสำคัญภายใต้หลัก Digital Integrity เพื่อระบุจุดเสี่ยง
              และควบคุมคุณภาพให้เป็นไปตามมาตรฐานสูงสุดก่อนการส่งมอบ
            </p>
          </div>
        </div>

        {/* VALUE GRID: Core Values Presentation */}
        <div className="shadow-sharp grid grid-cols-1 gap-px border-4 border-[#020617] bg-[#020617] md:grid-cols-3">
          {VALUES.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-white p-12 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50"
            >
              <div className="mb-12 flex h-16 w-16 items-center justify-center border-4 border-[#020617] bg-white transition-colors group-hover:bg-[#FCDE09]">
                <item.icon size={28} strokeWidth={3} />
              </div>

              <h3 className="font-thai mb-4 text-2xl font-black uppercase tracking-tight">
                {item.title}
              </h3>

              <p className="font-thai text-base font-bold leading-relaxed text-slate-500 group-hover:text-[#020617]">
                {item.desc}
              </p>

              <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-7xl font-black text-slate-100 opacity-[0.12] transition-colors group-hover:text-[#FCDE09]">
                0{index + 1}
              </div>

              <ArrowUpRight
                size={28}
                className="absolute right-6 top-6 text-[#020617] opacity-0 transition-opacity group-hover:opacity-20"
              />
            </div>
          ))}
        </div>

        {/* TRUST FOOTER: Final Verification */}
        <div className="mt-32 grid grid-cols-1 gap-12 border-t-8 border-[#020617] pt-14 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">
                PROCESS_VERIFIED
              </span>
            </div>
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-700">
              ความเชื่อมั่นเกิดจากผลลัพธ์ที่พิสูจน์ได้ ทุกเคสใช้ Seamless Process
              ในการควบคุมความเสี่ยง เพื่อสร้างรากฐานที่มั่นคงในการยื่นเอกสาร
            </p>
          </div>

          <div className="shadow-sharp flex items-center justify-between border-4 border-[#FCDE09] bg-[#020617] p-10 text-white">
            <div>
              <span className="block font-mono text-[12px] font-black uppercase tracking-[0.45em] text-[#FCDE09]">
                SYSTEM_SIGNATURE
              </span>
              <span className="font-thai mt-2 block text-lg font-black uppercase">
                JP Visual & Docs
              </span>
            </div>
            <span className="font-mono text-sm font-black text-[#FCDE09]">VERSION_2026.1</span>
          </div>
        </div>
      </div>
    </section>
  )
}
