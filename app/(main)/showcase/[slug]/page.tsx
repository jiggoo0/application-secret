/** @format */

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCaseBySlug } from "@/config/showcase/all-cases"
import { ShieldCheck, FileText } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * 🛰️ DYNAMIC_METADATA: SEO_ENFORCEMENT
 * ตรวจสอบความถูกต้องของ Property เพื่อแก้ปัญหา TS2339
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getCaseBySlug(slug)
  if (!data) return { title: "Not Found | JP-VISUAL" }

  return {
    title: `${data.title} | Case Study`,
    description: data.executive_summary || data.description,
    openGraph: {
      title: data.title,
      // Fix: เปลี่ยนจาก .thumbnail เป็น .image ให้ตรงกับ Type Definition
      images: [data.image || "/og-case.png"],
    },
  }
}

/**
 * 🛰️ PAGE: CaseDetailPage
 * MODE: Industrial_Sharp_V1
 * STATUS: Cleaned_Unused_Imports
 */
async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const data = getCaseBySlug(slug)

  if (!data) notFound()

  return (
    <main className="min-h-screen bg-white pb-32 selection:bg-[#FCDE09] selection:text-slate-950">
      {/* 🧩 BLUEPRINT_HEADER */}
      <header className="relative border-b-2 border-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden border-r-0 border-slate-950 p-10 md:border-r-2 md:p-16">
            <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 bg-blueprint-grid opacity-10" />
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1 w-8 bg-slate-950" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                CASE_FILE: {data.id}
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 md:text-7xl">
              {data.title}
              <span className="not-italic text-[#FCDE09]">.</span>
            </h1>
          </div>

          <div className="relative flex flex-col justify-center bg-slate-950 p-10 text-white md:p-16">
            <div className="absolute right-6 top-6 opacity-20">
              <ShieldCheck size={120} strokeWidth={0.5} />
            </div>
            <span className="mb-4 inline-flex w-fit bg-[#FCDE09] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-950">
              Official_Verdict
            </span>
            <div className="text-5xl font-black uppercase tracking-tighter text-emerald-400 md:text-7xl">
              {data.business_outcome?.verdict || "PENDING_REVIEW"}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-800 pt-6 font-mono text-[10px] uppercase tracking-tighter text-slate-500">
              <span>
                AUTH_NODE: {data.business_outcome?.authority || "N/A"}
              </span>
              <span className="text-slate-700">|</span>
              <span>
                REF_KEY: {data.business_outcome?.official_ref || "UNASSIGNED"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 🏗️ CASE_DATA_FACILITY */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 border-x-0 border-slate-950 lg:grid-cols-12 lg:border-x-2">
        <div className="border-r-0 border-slate-950 p-8 md:p-12 lg:col-span-8 lg:border-r-2">
          <section className="mb-24">
            <div className="mb-8 flex items-center gap-4">
              <FileText size={18} className="text-[#FCDE09]" />
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-950">
                Executive_Summary
              </h2>
            </div>
            <p className="font-thai text-xl font-bold leading-relaxed text-slate-700 md:text-2xl">
              {data.executive_summary || data.description}
            </p>
          </section>

          <section className="mb-24">
            <h2 className="mb-10 inline-block border-b-2 border-slate-950 pb-2 text-sm font-black uppercase tracking-[0.4em] text-slate-950">
              Technical_Strategy
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.technical_strategy.map((s: string, i: number) => (
                <div
                  key={`strat-${i}`}
                  className="group relative flex items-start border-2 border-slate-950 bg-white p-6 shadow-sharp transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  <span className="mr-4 font-mono text-xl font-black text-slate-200 group-hover:text-[#FCDE09]">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-black uppercase italic leading-tight text-slate-950">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="bg-slate-50/50 lg:col-span-4">
          <div className="border-b-2 border-slate-950 p-8 md:p-10">
            <h2 className="mb-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-slate-950">
              <div className="h-2 w-2 rounded-none bg-[#FCDE09]" />{" "}
              Metrics_Audit
            </h2>
            <div className="space-y-10">
              <div className="relative">
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  DOC_PROCESSED_QTY
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-6xl font-black tracking-tighter text-slate-950">
                    {data.stats?.docs_processed || "0"}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-300">
                    UNITS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CaseDetailPage
