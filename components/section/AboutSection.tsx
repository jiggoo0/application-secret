/** @format */

'use client'

import React from 'react'
import { ShieldCheck, Target, Lock } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ABOUT_SECTION_PROTOCOL
 * @version 3.2.3 (Industrial Sharp Edition)
 * PURPOSE: แสดงจุดแข็งและวิสัยทัศน์ขององค์กรในรูปแบบ Value Matrix
 */

const values = [
  {
    icon: ShieldCheck,
    title: 'Professional Standard',
    desc: 'โครงสร้างงานถูกออกแบบให้ดูเป็นระบบ มีมาตรฐาน และตรวจสอบได้ในระดับสากล',
  },
  {
    icon: Lock,
    title: 'Client Confidentiality',
    desc: 'กฎข้อแรกคือความลับของลูกค้า ข้อมูลทุกอย่างถูกเข้ารหัสและควบคุมการเข้าถึงอย่างเข้มงวด',
  },
  {
    icon: Target,
    title: 'Result Orientation',
    desc: 'ทำงานโดยยึดผลลัพธ์ที่จับต้องได้จริงเป็นหลัก ตัดทอนทฤษฎีที่ไม่จำเป็นเพื่อความรวดเร็ว',
  },
]

export const AboutSection = () => {
  return (
    <section className="relative bg-white py-32 text-[#020617] selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 BLUEPRINT_INTEGRATION: Blueprint Grid (MODE B) */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 🏗️ HEADER_TERMINAL */}
        <div className="mb-24 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#FCDE09]" />
            <span className="font-mono text-xs font-black uppercase tracking-[0.4em] text-[#FCDE09]">
              JP_VISOUL_&_DOCS
            </span>
          </div>

          <h2 className="mb-8 text-5xl font-black uppercase italic leading-[1.1] tracking-tighter lg:text-6xl">
            ยกระดับธุรกิจ
            <br />
            <span className="text-[#FCDE09] drop-shadow-[2px_2px_0px_#020617]">
              ให้ดูเป็นมืออาชีพ
            </span>
          </h2>

          <p className="max-w-2xl font-sans text-lg font-bold leading-relaxed text-slate-500">
            เราออกแบบโครงสร้าง เอกสาร และระบบภาพลักษณ์
            เพื่อทำให้งานที่อยู่นอกกรอบทั่วไปดูน่าเชื่อถือ ปลอดภัย
            และสามารถใช้งานในระบบเศรษฐกิจกระแสหลักได้อย่างไร้รอยต่อ
          </p>
        </div>

        {/* 🧱 VALUE_MATRIX: Industrial Grid Layout */}
        <div className="grid grid-cols-1 gap-px border-2 border-slate-100 bg-slate-100 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="group relative bg-white p-12 transition-all duration-500 hover:bg-slate-50"
            >
              {/* Icon Node */}
              <div className="mb-10 flex h-14 w-14 items-center justify-center border border-slate-200 bg-white text-[#020617] shadow-sharp transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-[#020617] group-hover:bg-[#FCDE09]">
                <v.icon size={24} strokeWidth={2} />
              </div>

              <h3 className="mb-5 font-mono text-xl font-black uppercase tracking-tight text-[#020617]">
                {v.title}
              </h3>

              <p className="font-sans text-sm font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-700">
                {v.desc}
              </p>

              {/* Functional Decorative Element */}
              <div className="absolute right-8 top-8 font-mono text-xs font-black text-slate-100 transition-colors group-hover:text-[#FCDE09]/40">
                0{i + 1}
              </div>

              {/* Bottom Accent Line */}
              <span className="absolute inset-x-0 bottom-0 h-1 translate-y-full bg-[#FCDE09] transition-transform duration-500 group-hover:translate-y-0" />
            </div>
          ))}
        </div>

        {/* 🏁 FOOTER_STATEMENT: Authenticated Identity */}
        <div className="mt-32 flex flex-col justify-between gap-10 border-t-2 border-slate-100 pt-12 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
              EXP_8+_YEARS // CONFIDENTIAL_PROTOCOL // SYSTEM_DRIVEN
            </p>
            <p className="max-w-2xl font-sans text-[15px] font-bold leading-relaxed text-slate-500">
              เราไม่ได้เพียงแค่ทำงาน แต่เราสร้างระบบที่ช่วยลดความเสี่ยง เพิ่มความน่าเชื่อถือ
              และทำให้ธุรกิจของคุณเติบโตได้อย่างมั่นคง
              โดยยึดถือผลลัพธ์ที่จับต้องได้จริงเป็นบรรทัดฐานสูงสุด
            </p>
          </div>

          {/* Signature Label */}
          <div className="border-l-8 border-[#020617] pl-8">
            <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
              VERIFIED_AGENT_SECURE
            </span>
            <span className="block text-2xl font-black uppercase italic tracking-tighter text-[#020617]">
              JP_VISOUL_TERMINAL
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
