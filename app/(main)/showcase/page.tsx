/** @format */

import { Metadata } from 'next'
import { ShowcaseGrid } from '@/components/section/ShowcaseGrid'
import { Database, Terminal, FileCode, Layers } from 'lucide-react'

/**
 * 🛰️ SEO_METADATA: Industrial_Sharp_Standard
 * เพิ่ม Canonical และสัดส่วนภาพสำหรับ Social Sharing
 */
export const metadata: Metadata = {
  title: 'Case Reports | JP-VISUAL&DOCS',
  description:
    'รายงานผลการตรวจสอบเชิงลึกและกลยุทธ์การจัดเตรียมเอกสารทางเทคนิค ภายใต้มาตรฐาน Industrial Sharp',
  alternates: {
    canonical: '/showcase',
  },
  openGraph: {
    title: 'Case Reports | JP-VISUAL&DOCS',
    description: 'Archive ข้อมูลการจัดทำเอกสารและผลลัพธ์ความสำเร็จระดับสากล',
    type: 'website',
  },
}

/**
 * 🛠️ HELPER: TechSpec (Local Scope)
 * ✅ IMPROVED: ปรับสี Slate ให้เข้มขึ้นเพื่อแก้อาการตัวหนังสือจาง (Accessibility)
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
      {' '}
      {/* เปลี่ยนจาก slate-400 */}
      {icon}
      <span className="font-mono text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="font-mono text-[11px] font-black text-[#020617]">{value}</span>
  </div>
)

/**
 * 🛰️ PAGE: ShowcasePage
 * ENTRY_POINT: Stable_Build_V3.3.2025
 */
export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🏗️ HEADER_SECTION: Audit Facility Identity */}
      <header className="relative border-b-2 border-[#020617] bg-white px-4 pb-24 pt-32 md:px-10 lg:pb-32 lg:pt-48">
        {/* Technical Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
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
                VER_3.3.2025_STABLE
              </span>
            </nav>

            <div className="space-y-4">
              <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-[#020617] md:text-9xl">
                Case Reports<span className="not-italic text-[#FCDE09]">.</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-24 bg-[#020617]" />
                <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Verification_Success_Manifest
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="font-thai text-xl font-bold leading-relaxed text-slate-700">
                  คลังข้อมูลผลลัพธ์และการวิเคราะห์เชิงลึก (Post-Mortem)
                  จากการดำเนินงานจัดเตรียมเอกสารมาตรฐานสากลด้วย{' '}
                  <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                    ระบบตรวจสอบแบบ 360 องศา
                  </span>
                </p>
              </div>
              <div className="hidden lg:col-span-6 lg:block">
                <div className="flex flex-wrap justify-end gap-6 opacity-60">
                  <TechSpec icon={<Terminal size={14} />} label="ENCRYPTION" value="SHA_256" />
                  <TechSpec icon={<FileCode size={14} />} label="COMPLIANCE" value="ISO_READY" />
                  <TechSpec icon={<Layers size={14} />} label="DATA_POOL" value="POST_VERIFIED" />
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

      {/* 📊 GRID_SECTION: The Gallery of Truth */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 md:px-10">
        <div className="mb-16 flex items-end justify-between border-b-2 border-slate-200 pb-6">
          <div className="space-y-1">
            <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-[#020617]">
              Query_Result_Sequence
            </h2>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
              Executing database fetch: status=all_active_cases
            </p>
          </div>
          <div className="text-right font-mono uppercase">
            <span className="block text-[10px] font-bold text-[#020617]">REPLICA_STATION_01</span>
            <span className="block text-[8px] font-bold text-slate-400">UPTIME: 99.99%</span>
          </div>
        </div>

        <div className="relative">
          {/* Corner Decors */}
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-slate-300" />
          <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-slate-300" />

          <ShowcaseGrid />
        </div>
      </section>
    </main>
  )
}