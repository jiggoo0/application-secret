/** @format */

import React from 'react'
import { ShowcaseGrid } from '@/components/section/ShowcaseGrid'
import { Database, Terminal, FileCode, Layers } from 'lucide-react'

/**
 * 🛠️ HELPER: TechSpec
 * ปรับปรุง: ใช้คำที่สื่อถึงความมั่นคงและตรวจสอบได้จริง
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
    <span className="font-thai text-[12px] font-black text-[#020617]">{value}</span>
  </div>
)

/**
 * 🛰️ PAGE: ShowcasePage
 * @version 2026.0.9 (JP-Professional Archive)
 * ✅ ตรวจสอบ: ภาษาถูกจริตคนไทย, ดีไซน์ดุดัน, เน้นความจริงใจ
 */
export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* HEADER_SECTION: เน้นความคมชัดและเป็นระบบ */}
      <header className="relative border-b-4 border-[#020617] bg-white px-4 pb-24 pt-32 md:px-10 lg:pb-32 lg:pt-48">
        {/* Technical Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-10">
            <nav className="flex items-center gap-4">
              <div className="flex items-center gap-3 border-2 border-[#020617] bg-[#FCDE09] px-4 py-1.5 font-thai text-[11px] font-black uppercase tracking-tight text-[#020617] shadow-sharp">
                <Database size={14} className="animate-pulse" />
                คลังผลงานจริง
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-400">
                LATEST_UPDATE: 2026
              </span>
            </nav>

            <div className="space-y-6">
              <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-[#020617] md:text-9xl lg:text-[140px]">
                Proven <br />
                Works
                <span className="not-italic text-[#FCDE09] drop-shadow-[8px_8px_0px_#020617]">
                  .
                </span>
              </h1>
              <div className="flex items-center gap-6">
                <div className="h-[4px] w-24 bg-[#FCDE09]" />
                <p className="font-thai text-xl font-black uppercase tracking-widest text-[#020617]">
                  บันทึกความสำเร็จและการแก้ปัญหาหน้างานจริง
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-thai text-2xl font-bold leading-tight text-slate-700">
                  รวมกรณีศึกษาการเตรียมเอกสารและการปลดล็อกปัญหาที่ติดขัด
                  พิสูจน์ผลลัพธ์ผ่านตัวเลขและการอนุมัติจริง ด้วย{' '}
                  <span className="bg-[#020617] px-2 text-white">
                    ทีมงานมืออาชีพที่มีประสบการณ์มากกว่า 8 ปี
                  </span>
                </p>
              </div>
              <div className="hidden lg:col-span-5 lg:block">
                <div className="flex flex-wrap justify-end gap-8">
                  <TechSpec
                    icon={<Terminal size={16} className="text-[#FCDE09]" />}
                    label="RECORD_SYSTEM"
                    value="จัดเก็บประวัติงาน"
                  />
                  <TechSpec
                    icon={<FileCode size={16} className="text-[#FCDE09]" />}
                    label="VERIFIED"
                    value="สแกนตรวจสอบได้"
                  />
                  <TechSpec
                    icon={<Layers size={16} className="text-[#FCDE09]" />}
                    label="PROFESSIONAL"
                    value="มาตรฐานสากล"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Industrial Notch (มุมตัดดุดัน) */}
        <div
          className="absolute bottom-[-4px] right-0 h-32 w-32 bg-[#020617] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          aria-hidden="true"
        />
      </header>

      {/* GRID_SECTION: โครงสร้างแบบ Grid-based ที่ดุดัน */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-10">
        <div className="mb-20 flex items-end justify-between border-b-4 border-[#020617] pb-8">
          <div className="space-y-2">
            <h2 className="font-thai text-sm font-black uppercase tracking-[0.3em] text-[#020617]">
              ประวัติการดูแลลูกค้า
            </h2>
            <p className="font-thai text-xs font-bold uppercase tracking-widest text-slate-400">
              เคสตัวอย่างที่ผ่านการพิจารณาเรียบร้อยแล้ว
            </p>
          </div>
          <div className="text-right">
            <span className="block font-thai text-xs font-black text-[#020617]">
              ข้อมูลอัปเดตเรียลไทม์
            </span>
            <span className="block font-mono text-[10px] font-bold text-emerald-500">
              SYSTEM_STATUS: SECURE
            </span>
          </div>
        </div>

        <div className="relative">
          {/* ขอบมุมสไตล์ Sharp Design */}
          <div className="absolute -left-4 -top-4 h-8 w-8 border-l-4 border-t-4 border-[#FCDE09]" />
          <div className="absolute -right-4 -top-4 h-8 w-8 border-r-4 border-t-4 border-[#FCDE09]" />

          <ShowcaseGrid />
        </div>
      </section>
    </main>
  )
}
