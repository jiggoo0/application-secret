/** @format */
'use client'

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { cn } from '@/lib/utils'
import { CaseShowcase } from '@/config/showcase-types'
import { ArrowUpRight, Activity } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ShowcaseGrid
 * @version 2026.0.4
 * DESCRIPTION: ศูนย์รวมบันทึกกรณีศึกษาในรูปแบบ Grid Matrix
 */
export const ShowcaseGrid = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48">
      {/* 🧩 UI_INFRA: Blueprint Texture */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />
      <div className="absolute right-0 top-0 h-64 w-64 bg-slate-950/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:border-b-4 lg:border-slate-950 lg:pb-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-3 w-3 animate-pulse bg-brand shadow-[0_0_10px_#FCDE09]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                Archived_Case_Studies
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-8xl">
              Proven <br />{' '}
              <span className="text-brand drop-shadow-[4px_4px_0px_#000]">Audits.</span>
            </h2>
          </div>
          <p className="max-w-xs border-l-4 border-brand pl-8 font-thai text-lg font-bold leading-relaxed text-slate-500">
            วิเคราะห์ยุทธศาสตร์และผลลัพธ์จากเคสจริงที่ผ่านกระบวนการคัดกรองสูงสุด
          </p>
        </div>

        {/* --- GRID_INTERFACE --- */}
        <div className="grid grid-cols-1 gap-0 border-l-2 border-t-2 border-slate-950 shadow-[20px_20px_0px_#f1f5f9] md:grid-cols-2 lg:grid-cols-3">
          {ALL_CASES?.map((item: CaseShowcase) => (
            <CaseCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 🛰️ SUB-COMPONENT: CaseCard
 */
export const CaseCard = ({ data }: { data: CaseShowcase }) => {
  const complexity = data.stats?.complexity_level?.toUpperCase() ?? 'PENDING'
  const verdict = data.business_outcome?.verdict?.toUpperCase() ?? 'SUCCESS'
  const clientCategory = data.client_category?.toUpperCase() ?? 'HNWI'

  return (
    <div
      className={cn(
        'group relative flex flex-col border-b-2 border-r-2 border-slate-950 bg-white p-10 lg:p-12',
        'transition-all duration-700 hover:z-20 hover:bg-slate-50',
      )}
    >
      <div className="flex flex-grow flex-col">
        {/* --- CARD_HEADER --- */}
        <header className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-brand" />
              <span className="bg-slate-950 px-2 py-0.5 font-mono text-[10px] font-black tracking-tighter text-brand">
                {data.id}
              </span>
            </div>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 transition-colors group-hover:text-slate-950">
              {`// ${clientCategory}`}
            </span>
          </div>
          <h3 className="text-4xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 transition-all duration-500 group-hover:translate-x-2">
            {data.title}
          </h3>
        </header>

        {/* --- SUMMARY_AREA --- */}
        <p className="mb-14 line-clamp-3 font-thai text-[16px] font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-700">
          {data.executive_summary}
        </p>

        {/* --- DATA_METRICS --- */}
        <div className="mb-16 mt-auto space-y-6 border-t-2 border-slate-50 pt-8 transition-colors group-hover:border-slate-200">
          <MetricRow
            label="ANALYSIS_LEVEL"
            value={complexity}
            isCritical={complexity.includes('CRITICAL') || complexity.includes('HIGH')}
          />
          <MetricRow
            label="VERDICT_PROTOCOL"
            value={verdict}
            isSuccess={verdict.includes('SUCCESS') || verdict.includes('APPROVED')}
          />
        </div>

        {/* --- ACTION_LINK --- */}
        <Link
          href={`/showcase/${data.slug}`}
          className={cn(
            'group/btn relative flex items-center justify-between overflow-hidden bg-slate-950 px-8 py-6',
            'font-mono text-[12px] font-black uppercase tracking-[0.4em] text-white transition-all',
            'shadow-[8px_8px_0px_#FCDE09] hover:shadow-none active:scale-95',
          )}
        >
          <span className="relative z-10">Access_Audit_Log</span>
          <ArrowUpRight
            size={20}
            className="relative z-10 transition-transform group-hover/btn:scale-125"
          />
          <div className="absolute inset-0 z-0 -translate-x-full bg-brand transition-transform duration-500 group-hover/btn:translate-x-0" />
        </Link>
      </div>
    </div>
  )
}

const MetricRow = ({
  label,
  value,
  isCritical,
  isSuccess,
}: {
  label: string
  value: string
  isCritical?: boolean
  isSuccess?: boolean
}) => (
  <div className="flex items-end justify-between border-b border-slate-100 pb-3">
    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
      {label}
    </span>
    <span
      className={cn(
        'font-mono text-[12px] font-black uppercase tracking-tight',
        isCritical && 'text-red-500',
        isSuccess && 'text-emerald-500',
        !isCritical && !isSuccess && 'text-slate-950',
      )}
    >
      {value}
    </span>
  </div>
)
