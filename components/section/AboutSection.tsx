/** @format */

'use client'

import React from 'react'
import { ShieldCheck, Target, Lock, ArrowUpRight } from 'lucide-react'

/**
 * 🛰️ COMPONENT: AboutSection
 * @version 2026.0.7 (JP-Professional Standard)
 * ✅ ปรับปรุง: ใช้ภาษาไทยที่จริงใจ ดุดัน และสร้างความมั่นใจสูงสุด
 */

const values = [
  {
    icon: ShieldCheck,
    title: 'มาตรฐานมืออาชีพ',
    desc: 'ยกระดับชุดเอกสารและโปรไฟล์ของคุณให้ถูกต้องตามเกณฑ์สากล เพื่อให้ระบบธนาคารและหน่วยงานหลักยอมรับเคสของคุณได้อย่างไม่มีข้อกังขา',
  },
  {
    icon: Lock,
    title: 'ความลับคือหัวใจ',
    desc: 'ข้อมูลของคุณคือสิทธิ์ขาดของคุณเพียงคนเดียว เรามีระบบจัดเก็บและทำลายข้อมูลที่เข้มงวดที่สุด เพื่อให้แน่ใจว่าความลับจะไม่รั่วไหล',
  },
  {
    icon: Target,
    title: 'เน้นผลลัพธ์จริง',
    desc: 'เราไม่ทำงานแบบลองผิดลองถูก แต่ทำงานด้วยแผนที่ชัดเจน ตรวจสอบได้ทุกขั้นตอน เพื่อให้งานเสร็จทันเวลาและปิดงานได้จริง',
  },
]

export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 text-[#020617] selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_INFRA: Blueprint Grid (สื่อถึงความเป็นระบบ) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#020617_1px,transparent_1px)] opacity-[0.03] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#FCDE09]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* HEADER: กลยุทธ์การสื่อสารแบบ จริงใจ และ ดุดัน */}
        <div className="mb-24 max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[3px] w-12 bg-[#020617]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              ESTABLISHED_SINCE_2018
            </span>
          </div>

          <h2 className="mb-8 text-6xl font-black uppercase italic leading-[0.9] tracking-tighter lg:text-8xl">
            Building <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[6px_6px_0px_#020617]">
              Real Trust.
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <p className="font-thai text-2xl font-black leading-tight text-[#020617]">
              เราเปลี่ยน "งานที่ดูยาก" ให้กลายเป็น "ความน่าเชื่อถือที่ตรวจสอบได้จริง"
              ด้วยประสบการณ์หน้างานมากกว่า 8 ปี
            </p>
            <p className="font-thai text-lg font-bold leading-relaxed text-slate-500">
              JP Visual & Docs ออกแบบชุดข้อมูลเพื่อแก้ปัญหาเคสที่ติดขัดหรือถูกปฏิเสธ
              เราเชื่อมโยงความต้องการของลูกค้าให้ตรงตามเกณฑ์ของธนาคารและสถาบันต่างๆ
              เพื่อให้คุณได้รับโอกาสที่ควรจะได้ โดยไม่ต้องกังวลเรื่องความยุ่งยากอีกต่อไป
            </p>
          </div>
        </div>

        {/* VALUE_MATRIX: การจัดวางแบบ Industrial Grid (ดุดัน คมชัด) */}
        <div className="grid grid-cols-1 gap-px border-4 border-[#020617] bg-[#020617] shadow-sharp md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-white p-12 transition-all duration-500 hover:bg-slate-50"
            >
              <div className="relative z-10">
                {/* Sharp Shadow System */}
                <div className="mb-12 flex h-16 w-16 items-center justify-center border-4 border-[#020617] bg-white text-[#020617] shadow-sharp transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#FCDE09]">
                  <v.icon size={30} strokeWidth={3} />
                </div>

                <h3 className="mb-4 font-thai text-2xl font-black uppercase tracking-tight text-[#020617]">
                  {v.title}
                </h3>

                <p className="font-thai text-base font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-[#020617]">
                  {v.desc}
                </p>
              </div>

              {/* Decorative Index */}
              <div className="absolute bottom-6 right-6 font-mono text-7xl font-black text-slate-100 opacity-[0.1] transition-all duration-500 group-hover:text-[#FCDE09] group-hover:opacity-20">
                0{i + 1}
              </div>

              <ArrowUpRight
                className="absolute right-8 top-8 text-[#020617] opacity-0 transition-all group-hover:opacity-20"
                size={32}
              />
            </div>
          ))}
        </div>

        {/* 📊 SYSTEM_OVERVIEW_DIAGRAM: โครงสร้างการทำงานของ JP */}

        {/* FOOTER: Trust Bar (สร้างความมั่นใจขั้นสุดท้าย) */}
        <div className="mt-32 flex flex-col justify-between gap-12 border-t-8 border-[#020617] pt-12 lg:flex-row lg:items-start">
          <div className="max-w-xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                JP_PROTOCOL_ACTIVE // ความลับลูกค้าคือสิ่งสูงสุด
              </p>
            </div>
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-700">
              "ผมไม่ใช่คนเก่ง แต่ทีมงานผมเก่งมาก" ความสำเร็จของเราไม่ได้วัดที่คำพูด
              แต่วัดที่ผลอนุมัติและรอยยิ้มของลูกค้าที่ได้รับงานจริง
              เรายึดมั่นในการสร้างฐานที่แข็งแกร่งที่สุดให้กับทุกเคสที่เดินเข้ามาหาเรา
            </p>
          </div>

          <div className="border-4 border-[#FCDE09] bg-[#020617] p-10 text-white shadow-sharp">
            <span className="mb-2 block font-mono text-[12px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
              Authentication_Verified
            </span>
            <span className="block text-4xl font-black uppercase italic tracking-tighter text-white">
              JP_CORE_2026
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
