/** @format */

import React from 'react'
import { ShowcaseGrid } from '@/components/section/ShowcaseGrid'
import { Database, Terminal, FileCode, Layers } from 'lucide-react'

/**
 * 🛠️ HELPER: TechSpec
 */
const TechSpec = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex flex-col items-end gap-1">
    <div className="flex items-center gap-2 text-slate-500">
      {icon}
      <span className="font-mono text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="font-mono text-[11px] font-black text-[#020617]">{value}</span>
  </div>
)

/**
 * 🛰️ PAGE: ShowcasePage
 */
export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* HEADER_SECTION */}
      <header className="relative border-b-2 border-[#020617] bg-white px-4 pb-24 pt-32 md:px-10 lg:pb-32 lg:pt-48">
        {/* Technical Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-8">
            <nav className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#020617] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
                <Database size={12} className="animate-pulse" />
                Archive_System
              </div>
              <span className="font-mono text-[9px] font-bold text-slate-400">
                อัปเดตล่าสุด: 2025
              </span>
            </nav>

            <div className="space-y-4">
              <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-[#020617] md:text-9xl">
                Case Reports<span className="not-italic text-[#FCDE09]">.</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-24 bg-[#020617]" />
                <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                  บันทึกการทำงานและผลลัพธ์จริง
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="font-thai text-xl font-bold leading-relaxed text-slate-700">
                  รวมสรุปวิธีการเตรียมเอกสารและแนวทางการแก้ปัญหา
                  จากประสบการณ์ทำงานจริงเพื่อให้ได้ตัวเลขและผลลัพธ์ตามที่วางแผนไว้ ด้วย{' '}
                  <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                    ขั้นตอนการตรวจสอบที่ชัดเจน
                  </span>
                </p>
              </div>
              <div className="hidden lg:col-span-6 lg:block">
                <div className="flex flex-wrap justify-end gap-6 opacity-60">
                  <TechSpec
                    icon={<Terminal size={14} />}
                    label="DATA_SYSTEM"
                    value="จัดเก็บเป็นระบบ"
                  />
                  <TechSpec icon={<FileCode size={14} />} label="ACCURACY" value="ข้อมูลถูกต้อง" />
                  <TechSpec icon={<Layers size={14} />} label="VERIFIED" value="ตรวจสอบได้จริง" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Industrial Notch */}
        <div
          className="absolute bottom-[-2px] right-0 h-24 w-24 bg-[#020617] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          aria-hidden="true"
        />
      </header>

      {/* GRID_SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 md:px-10">
        <div className="mb-16 flex items-end justify-between border-b-2 border-slate-200 pb-6">
          <div className="space-y-1">
            <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-[#020617]">
              Case_History_Log
            </h2>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
              รายการงานที่ผ่านมาทั้งหมด
            </p>
          </div>
          <div className="text-right font-mono uppercase">
            <span className="block text-[10px] font-bold text-[#020617]">ศูนย์ข้อมูลส่วนกลาง</span>
            <span className="block text-[8px] font-bold text-slate-400">สถานะ: ปกติ</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-slate-300" />
          <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-slate-300" />

          <ShowcaseGrid />
        </div>
      </section>
    </main>
  )
}
