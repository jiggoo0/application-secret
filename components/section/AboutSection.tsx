/** @format */

'use client'

import React from 'react'
import { ShieldCheck, Target, Lock, ArrowUpRight } from 'lucide-react'

/**
 * 🛰️ COMPONENT: AboutSection
 * @version 3.3.0 (Authority & Reliability Protocol)
 */

const values = [
  {
    icon: ShieldCheck,
    title: 'Professional Compliance',
    desc: 'ยกระดับโครงสร้างเอกสารและโปรไฟล์ให้สอดคล้องกับมาตรฐานสากล เพื่อการยอมรับในระบบเศรษฐกิจกระแสหลัก',
  },
  {
    icon: Lock,
    title: 'Information Sovereignty',
    desc: 'ระบบบริหารจัดการข้อมูลส่วนบุคคลขั้นสูง ข้อมูลของคุณจะถูกจัดเก็บและทำลายตามโปรโตคอลความปลอดภัยที่เข้มงวด',
  },
  {
    icon: Target,
    title: 'Strategic Execution',
    desc: 'เน้นการปฏิบัติงานเชิงรุกที่มุ่งผลลัพธ์ (KPI Driven) ลดขั้นตอนที่ซับซ้อนเพื่อให้ภารกิจบรรลุเป้าหมายในเวลาที่กำหนด',
  },
]

export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 text-[#020617] selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_INFRA: Blueprint Grid & Ambient Shadow */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#FCDE09]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* HEADER: กลยุทธ์การสื่อสารแบบ Problem-Solution */}
        <div className="mb-24 max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-[#020617]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              OPERATIONAL_FRAMEWORK_V2026
            </span>
          </div>

          <h2 className="mb-8 text-6xl font-black uppercase italic leading-[0.9] tracking-tighter lg:text-8xl">
            Bridging <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
              Professionalism.
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <p className="text-xl font-bold leading-tight text-[#020617]">
              เราเปลี่ยน "ศักยภาพที่มองไม่เห็น" ให้กลายเป็น "ความน่าเชื่อถือที่ตรวจสอบได้"
              ผ่านระบบการจัดการเอกสารและภาพลักษณ์เชิงยุทธศาสตร์
            </p>
            <p className="font-sans text-sm font-medium leading-relaxed text-slate-500">
              JP Visual & Docs ออกแบบโครงสร้างระบบเพื่อรองรับเคสที่มีความซับซ้อนสูง
              โดยการเชื่อมโยงข้อมูลและหลักฐานให้สอดคล้องกับระเบียบปฏิบัติของสถาบันและหน่วยงานรัฐ
              เพื่อสร้างโอกาสและความได้เปรียบในการดำเนินงานทุกระดับ
            </p>
          </div>
        </div>

        {/* VALUE_MATRIX: การจัดวางแบบ Industrial Grid */}
        <div className="grid grid-cols-1 gap-px border-2 border-slate-950 bg-slate-950 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-white p-12 transition-all duration-500 hover:bg-slate-50"
            >
              <div className="relative z-10">
                <div className="mb-12 flex h-14 w-14 items-center justify-center border-2 border-slate-950 bg-white text-slate-950 shadow-sharp transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#FCDE09] group-hover:shadow-[8px_8px_0px_#020617]">
                  <v.icon size={26} strokeWidth={2.5} />
                </div>

                <h3 className="mb-4 font-mono text-2xl font-black uppercase tracking-tighter text-slate-950">
                  {v.title}
                </h3>

                <p className="font-thai text-base font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-900">
                  {v.desc}
                </p>
              </div>

              {/* Decorative Index */}
              <div className="absolute bottom-6 right-6 font-mono text-6xl font-black text-slate-50 opacity-[0.03] transition-all duration-500 group-hover:bottom-8 group-hover:text-[#FCDE09] group-hover:opacity-10">
                0{i + 1}
              </div>

              {/* Hover Accent */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-slate-950 transition-all duration-500 group-hover:w-full" />
              <ArrowUpRight
                className="absolute right-8 top-8 opacity-0 transition-all group-hover:opacity-20"
                size={32}
              />
            </div>
          ))}
        </div>

        {/* 📊 SYSTEM_OVERVIEW_DIAGRAM */}

        {/* FOOTER: Trust Bar */}
        <div className="mt-32 flex flex-col justify-between gap-12 border-t-4 border-slate-950 pt-12 lg:flex-row lg:items-start">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Established_2018 // Secure_Channel_Active
              </p>
            </div>
            <p className="font-thai text-lg font-bold leading-relaxed text-slate-600">
              ความสำเร็จของภารกิจไม่ได้ขึ้นอยู่กับ "ปริมาณ" ของข้อมูล แต่ขึ้นอยู่กับ
              "ความถูกต้องของตรรกะ" ในการนำเสนอ
              เราจึงยึดมั่นในการสร้างโครงสร้างที่แข็งแกร่งที่สุดให้กับทุกเคสที่ไว้วางใจเรา
            </p>
          </div>

          <div className="bg-slate-950 p-8 text-white shadow-sharp">
            <span className="mb-2 block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
              Authentication_Node
            </span>
            <span className="block text-3xl font-black uppercase italic tracking-tighter text-white">
              JP_CORE_SYSTEM
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
