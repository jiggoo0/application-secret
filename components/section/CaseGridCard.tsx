/** * @format
 * @description CASE_GRID_CARD: Industrial Sharp Node (Refined V2.6)
 * ✅ ENFORCEMENT: Safety Yellow Accents, Blueprint Alignment, Strict Stability
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CaseShowcase } from '@/config/showcase-types'

interface CaseGridCardProps {
  data: CaseShowcase
}

export const CaseGridCard = ({ data }: CaseGridCardProps) => {
  // 🛡️ DATA_INTEGRITY: Fallback Logic
  const processingTime = data.stats?.processing_time ?? 'TBD'
  const complexity = data.stats?.complexity_level ?? 'LOW'
  const clientTag = data.client_category?.substring(0, 2).toUpperCase() ?? 'PR'

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex h-full flex-col bg-white p-10 transition-all duration-500',
        'rounded-none border-b border-r border-slate-950 last:border-r-0',
        'hover:z-10 hover:bg-slate-50',
        'hover:shadow-sharp shadow-none', // ใช้ shadow-sharp ที่เราเพิ่งสร้างใน globals.css
      )}
    >
      {/* 📁 UPPER_STRATA: Identification & Folder Icon */}
      <div className="mb-12 flex items-start justify-between">
        <div className="space-y-1">
          <span className="block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            Case_Identity
          </span>
          <span className="block w-fit rounded-none bg-[#FCDE09] px-2 py-1 text-[11px] font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
            {data.id}
          </span>
        </div>
        <div className="border-2 border-slate-950 p-2 text-slate-950 transition-all duration-300 group-hover:rotate-6 group-hover:bg-slate-950 group-hover:text-[#FCDE09]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* 📝 MID_STRATA: Content with Typography Emphasis */}
      <div className="flex-1 space-y-6">
        <h3 className="text-4xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 transition-all duration-300 group-hover:text-slate-800">
          {data.title}
        </h3>
        <p className="line-clamp-3 border-l-[6px] border-[#FCDE09] pl-6 text-sm font-medium leading-relaxed text-slate-600 transition-colors group-hover:text-slate-950">
          {data.executive_summary ?? data.description}
        </p>
      </div>

      {/* 📊 LOWER_STRATA: Performance Telemetry */}
      <div className="mt-12 flex items-end justify-between border-t-2 border-slate-950 pt-10">
        <div className="flex items-center gap-10">
          <div className="space-y-1.5">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              Processing
            </span>
            <span className="block font-mono text-[14px] font-black uppercase italic text-slate-950">
              {processingTime}
            </span>
          </div>
          <div className="h-10 w-[2px] bg-slate-100" />
          <div className="space-y-1.5">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              Complexity
            </span>
            <span
              className={cn(
                'block font-mono text-[14px] font-black uppercase italic',
                complexity === 'HIGH' || complexity === 'CRITICAL'
                  ? 'text-red-600 underline decoration-red-200 decoration-4'
                  : 'text-slate-950',
              )}
            >
              {complexity}
            </span>
          </div>
        </div>

        {/* Action Button: Industrial Arrow */}
        <div className="flex h-14 w-14 items-center justify-center bg-slate-950 text-[#FCDE09] transition-all duration-500 active:scale-90 group-hover:bg-[#FCDE09] group-hover:text-slate-950 group-hover:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="square"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* 🏗️ DECORATIVE_STAMP: Watermark */}
      <div className="pointer-events-none absolute bottom-4 right-4 select-none font-mono text-[72px] font-black italic leading-none text-slate-950 opacity-[0.03] transition-opacity group-hover:opacity-[0.05]">
        {clientTag}
      </div>
    </Link>
  )
}
