/** @format */

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CaseShowcase } from "@/config/showcase-types"

interface CaseGridCardProps {
  data: CaseShowcase
}

/**
 * 🛠️ COMPONENT: CaseGridCard
 * MODE A: Strict Optional Chaining Enforcement
 * MODE B: Industrial Sharp (rounded-none, high contrast)
 */
export const CaseGridCard = ({ data }: CaseGridCardProps) => {
  // Fallback Values เพื่อความปลอดภัยของ UI
  const processingTime = data.stats?.processing_time ?? "TBD"
  const complexity = data.stats?.complexity_level ?? "LOW"
  const clientTag = data.client_category?.substring(0, 2) ?? "PR"

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        "group relative flex h-full flex-col bg-white p-10 transition-all duration-300",
        "rounded-none border-b border-r border-slate-950 last:border-r-0", // MODE B: rounded-none
        "hover:bg-slate-50"
      )}
    >
      {/* 📁 UPPER_STRATA: Case Identification */}
      <div className="mb-12 flex items-start justify-between">
        <div className="space-y-1">
          <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Case_Identity
          </span>
          <span className="block w-fit rounded-none bg-[#FCDE09] px-1.5 py-0.5 text-[12px] font-bold text-slate-950">
            {data.id}
          </span>
        </div>
        <div className="rounded-none border-2 border-slate-950 p-2 text-slate-950 transition-colors group-hover:bg-slate-950 group-hover:text-[#FCDE09]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* 📝 MID_STRATA: Technical Content */}
      <div className="flex-1 space-y-6">
        <h3 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-slate-950 transition-colors">
          {data.title}
        </h3>
        <p className="line-clamp-3 border-l-4 border-slate-900 pl-5 text-sm leading-relaxed text-slate-600">
          {data.executive_summary ?? data.description}
        </p>
      </div>

      {/* 📊 LOWER_STRATA: Performance Metrics */}
      <div className="mt-12 flex items-end justify-between border-t-2 border-slate-950 pt-8">
        <div className="flex items-center gap-8">
          <div className="space-y-1">
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Processing
            </span>
            <span className="block font-mono text-[13px] font-black uppercase italic text-slate-950">
              {processingTime}
            </span>
          </div>
          <div className="h-10 w-[1px] bg-slate-200" />
          <div className="space-y-1">
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Complexity
            </span>
            <span
              className={cn(
                "block text-[13px] font-black uppercase italic",
                complexity === "HIGH" || complexity === "CRITICAL"
                  ? "text-red-600"
                  : "text-slate-950"
              )}
            >
              {complexity}
            </span>
          </div>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-slate-950 text-[#FCDE09] shadow-sharp transition-all group-hover:bg-[#FCDE09] group-hover:text-slate-950">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* 🏗️ DECORATIVE_STAMP: Industrial Watermark */}
      <div className="pointer-events-none absolute bottom-2 right-2 select-none text-[60px] font-black italic leading-none text-slate-950 opacity-[0.03]">
        {clientTag}
      </div>
    </Link>
  )
}
