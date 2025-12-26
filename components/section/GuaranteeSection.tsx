/** @format */
"use client"

import React from "react"
import { ShieldCheck, Award, Lock, RotateCcw, CheckCircle2 } from "lucide-react"

/**
 * GuaranteeSection Component
 * ----------------------------------------------------------------
 * ส่วนแสดงการรับประกัน (Quality Assurance) เพื่อสร้างความเชื่อมั่นให้กับลูกค้า
 * ใช้โทนสี Dark Industrial เพื่อเน้นความปลอดภัยและความเป็นมืออาชีพ
 */
export default function GuaranteeSection() {
  const guarantees = [
    {
      icon: <ShieldCheck className="text-blue-500" size={32} />,
      title: "ACCURACY_GUARANTEE",
      label: "ความถูกต้อง 100%",
      desc: "เอกสารทุกฉบับผ่านการตรวจสอบแบบ Cross-Check ตาม Checklist ของสถานทูตและหน่วยงานราชการอย่างเข้มงวด เพื่อลดโอกาสการถูกปฏิเสธให้เป็นศูนย์",
    },
    {
      icon: <Lock className="text-blue-500" size={32} />,
      title: "PRIVACY_PROTECTION",
      label: "การรักษาความลับสูงสุด",
      desc: "เรามีระบบจัดเก็บข้อมูลมาตรฐาน ISO และนโยบายล้างฐานข้อมูล (Data Scrubbing) ทันทีหลังจบภารกิจ เพื่อความเป็นส่วนตัวสูงสุดของลูกค้าทุกระดับ",
    },
    {
      icon: <RotateCcw className="text-blue-500" size={32} />,
      title: "RE-SERVICE_POLICY",
      label: "รับผิดชอบจนกว่าจะสำเร็จ",
      desc: "กรณีมีการร้องขอแก้ไขจากเจ้าหน้าที่สถานทูต เราพร้อมปรับปรุงเอกสารให้ใหม่ทันทีโดยไม่มีค่าใช้จ่ายเพิ่มเติม (ภายใต้เงื่อนไขการรับบริการเดิม)",
    },
  ]

  return (
    <section
      className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32"
      id="guarantee-registry"
    >
      {/* 🧩 BACKGROUND_GEOMETRY: องค์ประกอบตกแต่งพื้นหลัง */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 select-none text-[15vw] font-black leading-none tracking-tighter opacity-[0.03]">
        GUARANTEE
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* 📋 SECTION_HEADER */}
        <div className="mb-20 max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-blue-500" />
            <Award className="text-blue-500" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
              Quality_Assurance_Protocol
            </span>
          </div>

          <h2 className="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl">
            TRUST IS OUR <br />
            <span className="text-blue-500">FOUNDATION.</span>
          </h2>

          <p className="max-w-xl text-base font-bold uppercase leading-relaxed tracking-tight text-slate-400">
            JP VISUAL DOCS ออกแบบทุกขั้นตอนบนมาตรฐานสถาปัตยกรรมเอกสาร
            เพื่อความแม่นยำและความปลอดภัยที่คุณวางใจได้ในระยะยาว
          </p>
        </div>

        {/* 🏗️ GUARANTEE_GRID_SYSTEM */}
        <div className="grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 lg:grid-cols-3">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-slate-900 p-12 transition-all duration-500 hover:bg-slate-800/50"
            >
              {/* HOVER_LINE_ANIMATION */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />

              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center bg-slate-800 text-blue-500 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:bg-blue-600 group-hover:text-white">
                {item.icon}
              </div>

              <span className="mb-3 block text-[10px] font-black tracking-[0.4em] text-blue-500">
                {item.title}
              </span>

              <h3 className="mb-6 text-2xl font-black uppercase tracking-tight text-white">
                {item.label}
              </h3>

              <p className="text-sm font-medium leading-relaxed text-slate-400">
                {item.desc}
              </p>

              <div className="mt-10 flex items-center gap-3 opacity-30 transition-all duration-500 group-hover:opacity-100">
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Verified_Compliance_Standard
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 TRUST_INDICATORS_FOOTER */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-10 border-t border-slate-800 pt-12">
          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600/30 text-sm font-black text-blue-500">
              100
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                Client_Satisfaction
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Based_on_Success_Logs_v8.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-700 text-sm font-black text-slate-500">
              24
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                System_Redundancy
              </p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Document_Protection_Active
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <span className="label-mono !text-[10px] uppercase tracking-[0.5em] opacity-20">
              ISO_9001_Compliance_Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
