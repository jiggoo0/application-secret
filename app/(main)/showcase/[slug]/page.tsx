/** @format */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, ChevronRight, Terminal as TerminalIcon } from 'lucide-react'

// 🛰️ ARCHITECT_CORE: นำเข้า Logic และ Types
import { getCaseBySlug } from '@/config/showcase/all-cases'
import { OperationalLog } from '@/components/showcase/OperationalLog'
import type { CaseShowcase } from '@/config/showcase-types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getCaseBySlug(slug) as CaseShowcase | undefined

  if (!data) return { title: 'Not Found | JP-VISOUL' }

  return {
    title: `${data.title} | Case Archive | JP-VISOUL&DOCS`,
    description: data.executive_summary,
    openGraph: {
      title: data.title,
      description: data.executive_summary,
      images: [data.image || '/og-case.png'],
      type: 'article',
    },
  }
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const data = getCaseBySlug(slug) as CaseShowcase | undefined

  if (!data) notFound()

  return (
    <main className="min-h-screen bg-white pb-32 selection:bg-[#FCDE09] selection:text-[#020617]">
      <header className="relative border-b-2 border-[#020617]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden border-r-0 border-[#020617] p-10 md:border-r-2 md:p-16">
            <div
              className="pointer-events-none absolute left-0 top-0 h-40 w-40 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className="mb-6 flex items-center gap-2">
              <span className="h-[2px] w-8 bg-[#FCDE09]" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                CASE_ID: {data.id}
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-7xl">
              {data.title}
              <span className="not-italic text-[#FCDE09]">.</span>
            </h1>
          </div>

          <div className="relative flex flex-col justify-center bg-[#020617] p-10 text-white md:p-16">
            <div className="absolute right-6 top-6 text-[#FCDE09] opacity-10">
              <ShieldCheck size={140} strokeWidth={0.5} />
            </div>
            <span className="mb-4 inline-flex w-fit bg-[#FCDE09] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#020617]">
              Official_Verdict
            </span>
            <div className="text-6xl font-black uppercase tracking-tighter text-[#10B981] md:text-8xl">
              {data.business_outcome?.verdict || 'VERIFIED'}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6 font-mono text-[10px] font-bold uppercase tracking-tighter text-slate-400">
              <span>AUTH: {data.business_outcome?.authority || 'INTERNAL_DEPT'}</span>
              <span className="text-white/20">|</span>
              <span>REF: {data.business_outcome?.official_ref || 'SECURE_TRANS'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 border-x-0 border-[#020617] lg:grid-cols-12 lg:border-x-2">
        <div className="border-r-0 border-[#020617] p-8 md:p-12 lg:col-span-8 lg:border-r-2">
          <section className="mb-24">
            <div className="mb-8 flex items-center gap-4 border-l-4 border-[#FCDE09] pl-4">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#020617]">
                Executive_Summary
              </h2>
            </div>
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-700 md:text-2xl">
              {data.executive_summary}
            </p>
          </section>

          <section className="mb-24">
            <h2 className="mb-10 inline-block border-b-2 border-[#020617] pb-2 text-sm font-black uppercase tracking-[0.4em] text-[#020617]">
              Technical_Strategy
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.technical_strategy.map((s, i) => (
                <div
                  key={`strat-${i}`}
                  className="group relative flex items-start border-2 border-[#020617] bg-white p-6 shadow-[4px_4px_0px_0px_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  <span className="mr-4 font-mono text-xl font-black text-slate-200 group-hover:text-[#FCDE09]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-black uppercase italic leading-tight text-[#020617]">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="mb-6 flex items-center gap-3">
              <TerminalIcon size={16} className="text-[#020617]" />
              <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#020617]">
                Operational_Flow_Log
              </h3>
            </div>
            <OperationalLog logs={data.logs} />
          </section>
        </div>

        <aside className="bg-slate-50 lg:col-span-4">
          <div className="sticky top-24 border-b-2 border-[#020617] p-8 md:p-10">
            <h2 className="mb-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#020617]">
              <div className="h-2 w-2 bg-[#FCDE09]" /> Metrics_Audit
            </h2>
            <div className="space-y-12">
              <div className="relative">
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  DOC_PROCESSED_QTY
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-6xl font-black tracking-tighter text-[#020617]">
                    {data.stats?.docs_processed || '0'}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">UNITS</span>
                </div>
              </div>

              <Link
                href="/showcase"
                className="group mt-12 flex w-fit items-center gap-2 border-b-2 border-[#020617] pb-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]"
              >
                Return_To_Archive
                <ChevronRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}