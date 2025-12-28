/** @format */
"use client"

import React from "react"
import Link from "next/link"
import { ALL_CASES } from "@/config/showcase/all-cases"
import { cn } from "@/lib/utils"
import { CaseShowcase } from "@/config/showcase-types"

/**
 * 🛰️ COMPONENT: ShowcaseGrid
 * ส่วนแสดงรายการกรณีศึกษา (Archive) แบบตารางอุตสาหกรรม
 * การออกแบบ: ไร้ขอบมน (Zero Radius) และใช้เส้นตัดสี Slate-900 ที่ชัดเจน
 */
export const ShowcaseGrid = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* 🧩 Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-0 border-l border-t border-slate-950 md:grid-cols-2 lg:grid-cols-3">
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
 * การออกแบบ High-Contrast พร้อมระบบ Hover Interaction แบบ Sharp
 */
export const CaseCard = ({ data }: { data: CaseShowcase }) => {
  // 🛡️ Safety Fallbacks (MODE A: Zero Error)
  const complexity = data.stats?.complexity_level ?? "LOW"
  const verdict = data.business_outcome?.verdict ?? "PENDING"
  const clientCategory = data.client_category ?? "GENERAL"

  return (
    <div
      className={cn(
        "group relative flex flex-col border-b border-r border-slate-950 bg-white p-10",
        "transition-all duration-500 hover:z-10 hover:shadow-[30px_30px_0px_0px_rgba(252,222,9,0.1)]"
      )}
    >
      <div className="flex flex-grow flex-col">
        {/* --- CARD_HEADER --- */}
        <header className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="bg-slate-950 px-2 py-0.5 font-mono text-[10px] font-black tracking-tighter text-brand">
              {data.id}
            </span>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
              {`// ${clientCategory}`}
            </span>
          </div>
          <h3 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tighter text-slate-950 transition-colors group-hover:text-brand">
            {data.title}
          </h3>
        </header>

        {/* --- SUMMARY_AREA --- */}
        <p className="mb-12 line-clamp-3 font-thai text-[15px] font-medium leading-relaxed text-slate-500">
          {data.executive_summary}
        </p>

        {/* --- DATA_METRICS --- */}
        <div className="mb-16 mt-auto space-y-4">
          <MetricRow
            label="ANALYSIS_LVL"
            value={complexity}
            isCritical={complexity === "CRITICAL" || complexity === "HIGH"}
          />
          <MetricRow
            label="FINAL_VERDICT"
            value={verdict}
            isSuccess={verdict === "APPROVED" || verdict === "SUCCESS"}
          />
        </div>

        {/* --- ACTION_BUTTON --- */}
        <Link
          href={`/showcase/${data.slug}`}
          className={cn(
            "group/btn flex items-center justify-between bg-slate-950 px-6 py-5",
            "font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white",
            "transition-all duration-300 hover:bg-brand hover:text-slate-950"
          )}
        >
          View_Full_Audit
          <div className="relative flex h-5 w-5 items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              <path d="M7 7l10 10M17 7v10H7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}

/**
 * 🛠️ UI_HELPER: MetricRow
 */
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
  <div className="flex items-end justify-between border-b border-slate-100 pb-2.5">
    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-300">
      {label}
    </span>
    <span
      className={cn(
        "font-mono text-[11px] font-black uppercase tracking-tight",
        isCritical && "text-red-500",
        isSuccess && "text-emerald-500",
        !isCritical && !isSuccess && "text-slate-950"
      )}
    >
      {value}
    </span>
  </div>
)
