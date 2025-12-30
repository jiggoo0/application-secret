/** * @format
 * @description SHOWCASE_PORTAL: Evidence of Success Archive (V2.025.1 Zero-Error)
 * ✅ FIXED: Corrected ShowcaseGrid import protocol (TS2305 Elimination)
 * ✅ REFINED: Typography system mapping to font-sans
 */

import { Metadata } from 'next'
import { ShowcaseGrid } from '@/components/section/ShowcaseGrid'
import { Database, Terminal, FileCode, Layers, Activity, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Reports | JP-VISUAL&DOCS',
  description:
    'รายงานผลการตรวจสอบเชิงลึกและกลยุทธ์การจัดเตรียมเอกสารทางเทคนิค ภายใต้มาตรฐาน Industrial Sharp',
}

const TechSpec = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex flex-col items-end gap-1.5 border-r border-slate-100 pr-6 last:border-0 last:pr-0">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
    </div>
    <span className="font-mono text-[11px] font-black text-slate-950">{value}</span>
  </div>
)

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-brand selection:text-slate-950">
      <header className="relative border-b-2 border-slate-950 bg-white px-6 pb-24 pt-32 md:px-12 lg:pb-36 lg:pt-48">
        <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-10">
            <nav className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 bg-slate-950 px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-brand shadow-sharp-sm">
                <Database size={12} className="animate-pulse" />
                Archive_System_Active
              </div>
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-emerald-500" />
                <span className="font-mono text-[9px] font-black text-slate-400">
                  NODE::STABLE_V2.025
                </span>
              </div>
            </nav>

            <div className="space-y-6">
              <h1 className="text-8xl font-black uppercase italic leading-[0.75] tracking-tighter text-slate-950 md:text-[10rem] lg:text-[12rem]">
                Case <br />
                <span className="not-italic text-brand drop-shadow-[8px_8px_0px_#020617]">
                  Reports.
                </span>
              </h1>
              <div className="flex items-center gap-6">
                <div className="h-[3px] w-32 bg-slate-950" />
                <div className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                  <ShieldCheck size={14} className="text-slate-950" />
                  VERIFICATION_SUCCESS_MANIFEST
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="font-sans text-2xl font-bold leading-relaxed text-slate-600 md:text-3xl">
                  คลังข้อมูลผลลัพธ์และการวิเคราะห์เชิงลึก (Post-Mortem)
                  จากการดำเนินงานจัดเตรียมเอกสารมาตรฐานสากลด้วย
                  <span className="ml-2 text-slate-950 underline decoration-brand decoration-[6px] underline-offset-8">
                    ระบบตรวจสอบ 360 องศา
                  </span>
                </p>
              </div>
              <div className="hidden lg:col-span-5 lg:block">
                <div className="flex justify-end gap-10 border-t-2 border-slate-50 pt-10">
                  <TechSpec
                    icon={<Terminal size={14} />}
                    label="ENCRYPTION"
                    value="AES_256_STABLE"
                  />
                  <TechSpec icon={<FileCode size={14} />} label="COMPLIANCE" value="ISO_READY" />
                  <TechSpec icon={<Layers size={14} />} label="DATA_POOL" value="POST_VERIFIED" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-20 flex flex-col gap-6 border-b-2 border-slate-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="font-mono text-[13px] font-black uppercase tracking-[0.4em] text-slate-950">
              Query_Result_Sequence
            </h2>
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span className="h-1.5 w-1.5 bg-brand" />
              Executing database fetch: status=all_active_cases
            </div>
          </div>
        </div>
        <div className="relative min-h-[400px]">
          {/* ✅ COMPONENT_EXECUTION: ShowcaseGrid is now stable */}
          <ShowcaseGrid />
        </div>
      </section>
    </main>
  )
}
