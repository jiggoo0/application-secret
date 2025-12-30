/** * @format
 * @description ABOUT_SECTION: The Industrial Philosophy Node
 * ✅ FIXED: Removed unused 'cn' to pass lint
 * ✅ REFINED: Font mapping for maximum clarity
 */

'use client'

import React from 'react'
import { ShieldCheck, Target, Lock } from 'lucide-react'
// 🛡️ REMOVED: import { cn } from '@/lib/utils' (แก้ปัญหา 'cn' is defined but never used)

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
    <section className="relative bg-white py-32 text-slate-950 selection:bg-brand selection:text-slate-950">
      {/* 🧩 BLUEPRINT_INTEGRATION: เชื่อมต่อลายกริตจากระบบหลัก */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 🏗️ HEADER_TERMINAL */}
        <div className="mb-24 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-brand" />
            <span className="font-mono text-xs font-black uppercase tracking-[0.4em] text-brand">
              JP Visual & Docs
            </span>
          </div>

          <h2 className="mb-8 text-5xl font-black uppercase italic leading-[1.1] tracking-tighter lg:text-6xl">
            ยกระดับธุรกิจสีเทา
            <br />
            <span className="text-brand">ให้ดูเป็นมืออาชีพ</span>
          </h2>

          <p className="max-w-2xl font-sans text-lg font-bold leading-relaxed text-slate-500">
            เราออกแบบโครงสร้าง เอกสาร และระบบภาพลักษณ์
            เพื่อทำให้งานที่อยู่นอกกรอบทั่วไปดูน่าเชื่อถือ ปลอดภัย
            และสามารถใช้งานในระบบเศรษฐกิจกระแสหลักได้อย่างไร้รอยต่อ
          </p>
        </div>

        {/* 🧱 VALUE_MATRIX: การจัดวางกล่องข้อมูลแบบ Industrial */}
        <div className="grid grid-cols-1 gap-1 border-y border-slate-100 bg-slate-100 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="group relative bg-white p-12 transition-all duration-500 hover:bg-slate-50"
            >
              {/* Icon Node */}
              <div className="shadow-sharp mb-10 flex h-14 w-14 items-center justify-center border border-slate-200 bg-white text-brand transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-brand group-hover:bg-brand group-hover:text-slate-950">
                <v.icon size={24} strokeWidth={1.5} />
              </div>

              <h3 className="mb-5 font-mono text-xl font-black uppercase tracking-tight text-slate-950">
                {v.title}
              </h3>

              <p className="font-sans text-sm font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-700">
                {v.desc}
              </p>

              {/* Functional Decorative Element */}
              <div className="absolute right-8 top-8 font-mono text-xs font-black text-slate-100 transition-colors group-hover:text-brand/20">
                0{i + 1}
              </div>

              {/* Bottom Accent Line */}
              <span className="absolute inset-x-0 bottom-0 h-1 translate-y-full bg-brand transition-transform duration-500 group-hover:translate-y-0" />
            </div>
          ))}
        </div>

        {/* 🏁 FOOTER_STATEMENT: การยืนยันตัวตนระดับวิศวกรรม */}
        <div className="mt-32 flex flex-col justify-between gap-10 border-t border-slate-200 pt-12 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              Exp 8+ Years // Confidential Protocol // System Driven
            </p>
            <p className="max-w-2xl font-sans text-[15px] font-bold leading-relaxed text-slate-500">
              เราไม่ได้เพียงแค่ทำงาน แต่เราสร้างระบบที่ช่วยลดความเสี่ยง เพิ่มความน่าเชื่อถือ
              และทำให้ธุรกิจของคุณเติบโตได้อย่างมั่นคง
              โดยยึดถือผลลัพธ์ที่จับต้องได้จริงเป็นบรรทัดฐานสูงสุด
            </p>
          </div>

          {/* Signature Label */}
          <div className="border-l-4 border-brand pl-6">
            <span className="block font-mono text-xs font-black uppercase text-slate-400">
              Verified_Agent
            </span>
            <span className="block text-2xl font-black uppercase italic tracking-tighter text-slate-950">
              The_JP_Visual
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
