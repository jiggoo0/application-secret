/** @format */

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CaseShowcase } from '@/config/showcase-types'
import { ArrowUpRight, FolderOpen } from 'lucide-react'

interface CaseGridCardProps {
  data: CaseShowcase
}

/**
 * 🛠️ COMPONENT: CaseGridCard
 * @version 2.1.0
 * MISSION: แสดงผล Case Study ในรูปแบบ Industrial Grid Unit
 */
export const CaseGridCard = ({ data }: CaseGridCardProps) => {
  // Defensive Extraction: สกัดข้อมูลอย่างปลอดภัยตามหลัก Mode A
  const processingTime = data.stats?.processing_time ?? '00_DAYS'
  const complexity = data.stats?.complexity_level?.toUpperCase() ?? 'PENDING'
  const clientTag = data.client_category?.substring(0, 3).toUpperCase() ?? 'SYS'
  const isHighRisk =
    complexity.includes('HIGH') || complexity.includes('CRITICAL') || complexity.includes('ซับซ้อน')

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex h-full flex-col bg-white p-8 transition-all duration-500 lg:p-10',
        'rounded-none border-b border-r border-slate-950 last:border-r-0',
        'hover:bg-slate-950 hover:text-white', // Dark Mode Shift on Hover
      )}
    >
      {/* 🧩 UI_INFRA: Grid Corner Decor */}
      <div className="absolute right-0 top-0 h-4 w-4 border-b border-l border-slate-200 transition-colors group-hover:border-[#FCDE09]" />

      {/* UPPER_STRATA: Identification Ledger */}
      <div className="mb-12 flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#FCDE09]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-500">
              Protocol_ID
            </span>
          </div>
          <span className="block w-fit bg-[#020617] px-2 py-0.5 font-mono text-[12px] font-black text-[#FCDE09] shadow-sharp transition-all group-hover:bg-[#FCDE09] group-hover:text-[#020617]">
            {data.id}
          </span>
        </div>
        <div className="border-2 border-slate-950 p-2 text-slate-950 transition-all duration-500 group-hover:border-[#FCDE09] group-hover:text-[#FCDE09]">
          <FolderOpen size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* MID_STRATA: Strategic Content */}
      <div className="flex-1 space-y-6">
        <h3 className="text-4xl font-black uppercase italic leading-[0.85] tracking-tighter transition-all duration-500 group-hover:translate-x-2">
          {data.title}
        </h3>
        <p className="line-clamp-3 border-l-4 border-[#FCDE09] pl-6 text-sm font-bold leading-relaxed text-slate-600 transition-colors group-hover:text-slate-400">
          {data.executive_summary}
        </p>
      </div>

      {/* LOWER_STRATA: Performance Matrix */}
      <div className="mt-12 flex items-end justify-between border-t-2 border-slate-100 pt-8 transition-colors group-hover:border-slate-800">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Cycle_Time
            </span>
            <span className="block font-mono text-[14px] font-black italic">{processingTime}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-100 group-hover:bg-slate-800" />
          <div className="space-y-1">
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Complexity
            </span>
            <span
              className={cn(
                'block text-[14px] font-black italic',
                isHighRisk ? 'text-orange-500' : 'text-emerald-500',
              )}
            >
              {complexity}
            </span>
          </div>
        </div>

        {/* Action Node */}
        <div className="flex h-12 w-12 items-center justify-center bg-slate-950 text-[#FCDE09] shadow-sharp transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#FCDE09] group-hover:text-slate-950 group-hover:shadow-[4px_4px_0px_#fff]">
          <ArrowUpRight size={24} strokeWidth={3} />
        </div>
      </div>

      {/* 💾 BACKGROUND_STAMP: Identifier Visual */}
      <div className="pointer-events-none absolute bottom-4 right-4 select-none font-mono text-[80px] font-black italic leading-none text-slate-950 opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.07]">
        {clientTag}
      </div>
    </Link>
  )
}
