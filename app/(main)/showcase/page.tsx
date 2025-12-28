/** @format */

import { notFound } from "next/navigation"
import { getCaseById } from "@/config/showcase"
import { Tag, ChevronLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { id } = await params
  const caseData = getCaseById(id)

  if (!caseData) notFound()

  return (
    <div className="min-h-screen bg-white pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        <Link
          href="/showcase"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-brand"
        >
          <ChevronLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          BACK_TO_REGISTRY
        </Link>

        <div className="mb-16 max-w-4xl">
          <div className="flex items-center gap-3 font-mono text-brand">
            <Tag size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              {caseData.category} {"//"} CASE_{caseData.id}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black uppercase italic leading-[0.9] tracking-tighter text-slate-950 md:text-8xl">
            {caseData.title}
          </h1>

          <p className="mt-8 font-thai text-xl leading-relaxed text-slate-500">
            {caseData.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border border-slate-100 bg-white p-8 shadow-sharp md:p-12">
              <h3 className="mb-8 font-mono text-xs font-black uppercase tracking-[0.3em] text-slate-900">
                EXECUTIVE_SUMMARY
              </h3>
              <div className="whitespace-pre-line font-thai text-lg leading-relaxed text-slate-600">
                {caseData.content}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <div className="border border-slate-950 bg-slate-950 p-8 text-white shadow-sharp">
              <div className="mb-6 flex items-center justify-between">
                <ShieldCheck size={24} className="text-brand" />
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-brand">
                  VERIFIED_CASE
                </span>
              </div>
              <div className="space-y-6">
                {caseData.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t border-white/10 pt-4"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black italic text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
