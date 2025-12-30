/** * @format
 * @description CASE_DETAIL_PAGE: In-depth Technical Audit (V2.1.1 Production)
 * ✅ FIXED: Removed unused Lucide icons & variables to satisfy strict linting
 * ✅ REFINED: Typography system for Industrial aesthetics
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseBySlug } from '@/config/showcase/all-cases'
import { ShieldCheck, FileText, ChevronRight, Activity, Database, Zap } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

/** 🛰️ DYNAMIC_METADATA_PROTOCOL */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getCaseBySlug(slug)
  if (!data) return { title: '404_DATA_NOT_FOUND' }

  return {
    title: `${data.title} | Case_Study_Report`,
    description: data.executive_summary || data.description,
    openGraph: {
      title: data.title,
      images: [data.image || '/og-case.png'],
    },
  }
}

/** 🛰️ PAGE: CaseDetailPage (Industrial Sharp Edition) */
export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const data = getCaseBySlug(slug)

  if (!data) notFound()

  // 🛡️ NOTE: ดึงเฉพาะข้อมูลที่จำเป็นและถูกนำไปใช้จริงเท่านั้น เพื่อป้องกัน lint error: no-unused-vars
  const { business_outcome, stats, id, title, executive_summary, description, technical_strategy } =
    data

  return (
    <main className="min-h-screen bg-white pb-32 selection:bg-brand selection:text-slate-950">
      {/* --- 📟 HEADER_INTERFACE: DUAL_PANEL_HUD --- */}
      <header className="relative border-b-4 border-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          {/* LEFT: IDENTITY_NODE */}
          <div className="relative flex flex-col justify-center overflow-hidden border-r-0 border-slate-950 bg-white p-10 md:border-r-[3px] md:p-20">
            <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
                  FILE_ID::{id}
                </div>
                <Activity size={14} className="animate-pulse text-slate-300" />
              </div>
              <h1 className="text-6xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-8xl">
                {title}
                <span className="not-italic text-brand">.</span>
              </h1>
            </div>
          </div>

          {/* RIGHT: OUTCOME_NODE */}
          <div className="relative flex flex-col justify-center bg-slate-950 p-10 text-white md:p-20">
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
              <ShieldCheck size={280} strokeWidth={0.5} />
            </div>

            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center gap-2 bg-brand px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-950 shadow-sharp-sm">
                <Zap size={14} className="fill-slate-950" />
                VERDICT_AUTHORIZED
              </span>
              <div className="text-6xl font-black uppercase italic tracking-tighter text-brand md:text-8xl">
                {business_outcome?.verdict || 'PENDING'}
              </div>

              <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600">AUTH_BODY</span>
                  <span className="text-white">{business_outcome?.authority || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600">OFFICIAL_REF</span>
                  <span className="text-white">
                    {business_outcome?.official_ref || 'UNASSIGNED'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 🏗️ CASE_DATA_FACILITY --- */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 border-x-0 border-slate-950 lg:grid-cols-12 lg:border-x-[3px]">
        {/* MAIN_COLUMN: Strategic Analysis */}
        <div className="border-r-0 border-slate-950 p-10 md:p-20 lg:col-span-8 lg:border-r-[3px]">
          <section className="mb-24">
            <div className="mb-10 flex items-center gap-4 border-b-2 border-slate-100 pb-4">
              <FileText size={20} className="text-brand" />
              <h2 className="font-mono text-[12px] font-black uppercase tracking-[0.4em] text-slate-950">
                Executive_Summary
              </h2>
            </div>
            <p className="font-sans text-2xl font-bold leading-relaxed text-slate-700 md:text-3xl">
              {executive_summary || description}
            </p>
          </section>

          <section>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="inline-block bg-slate-950 px-4 py-1 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white">
                Technical_Strategy
              </h2>
              <div className="ml-6 h-[1px] flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {technical_strategy.map((s: string, i: number) => (
                <div
                  key={`strat-${i}`}
                  className="group relative flex flex-col border-2 border-slate-950 bg-white p-8 transition-all hover:bg-slate-50"
                >
                  <span className="mb-4 font-mono text-3xl font-black text-slate-100 transition-colors group-hover:text-brand">
                    0{i + 1}
                  </span>
                  <p className="font-sans text-lg font-black leading-tight text-slate-950">{s}</p>
                  <ChevronRight
                    className="absolute bottom-4 right-4 text-slate-100 transition-colors group-hover:text-slate-950"
                    size={24}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ASIDE_COLUMN: Metrics & Audit */}
        <aside className="bg-slate-50/40 lg:col-span-4">
          <div className="sticky top-0 p-10 md:p-14">
            <div className="mb-16 space-y-2">
              <h2 className="flex items-center gap-3 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
                <Database size={16} /> Metrics_Audit
              </h2>
              <div className="h-1 w-full bg-slate-950" />
            </div>

            <div className="space-y-16">
              <div className="group relative">
                <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  DOC_PROCESSED_QTY
                </span>
                <div className="flex items-baseline gap-4">
                  <span className="text-8xl font-black italic tracking-tighter text-slate-950 transition-colors group-hover:text-brand">
                    {stats?.docs_processed || '0'}
                  </span>
                  <span className="font-mono text-xs font-black text-slate-400">UNITS_AUDITED</span>
                </div>
                <div className="mt-6 h-1 w-full overflow-hidden bg-slate-100">
                  <div className="h-full w-2/3 bg-slate-950" />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 p-8 text-center opacity-40">
                <ShieldCheck size={40} className="mx-auto mb-4 text-slate-300" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Integrity_Seal_V2
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
