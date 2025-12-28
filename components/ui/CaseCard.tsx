/** @format */

import React from "react"
/**
 * MODE A: FIX TS2307
 * เปลี่ยนการนำเข้าจาก @/config/showcase (ที่ไม่มีอยู่จริง)
 * เป็น @/config/showcase-types (Source of Truth)
 */
import { type CaseShowcase } from "@/config/showcase-types"
import { cn } from "@/lib/utils"

interface CaseCardProps {
  item: CaseShowcase
  className?: string
}

/**
 * 🛠️ COMPONENT: CaseCard (Atomic UI)
 * DESIGN: Industrial Sharp Enforcement
 * - บังคับใช้ rounded-none (ห้ามมีความโค้ง)
 * - บังคับใช้ shadow-sharp สำหรับมิติของ Card
 */
export function CaseCard({ item, className }: CaseCardProps) {
  return (
    <div
      className={cn(
        "group relative border-2 border-slate-950 bg-white p-6 transition-all duration-300",
        "rounded-none hover:shadow-sharp-brand", // MODE B: Sharp Edges & Hard Shadows
        className
      )}
    >
      {/* CASE_ID: TECHNICAL METADATA */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold tracking-tighter text-slate-400">
          ID_REF: {item.id}
        </span>
        <div className="h-1 w-8 bg-slate-100 transition-colors group-hover:bg-[#FCDE09]" />
      </div>

      {/* CONTENT: TITLE & IDENTITY */}
      <h3 className="text-xl font-black uppercase italic leading-tight text-slate-950 group-hover:text-slate-700">
        {item.title}
      </h3>

      <p className="mt-3 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
        {item.executive_summary}
      </p>

      {/* FOOTER: STATUS & BADGE */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="rounded-none bg-slate-950 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#FCDE09]">
          {item.status || "VERIFIED"}
        </span>

        <div className="text-[10px] font-bold uppercase italic text-slate-300">
          {item.client_category || "General"}
        </div>
      </div>

      {/* DECORATIVE: SHARP ANGLE (Optional) */}
      <div className="absolute right-0 top-0 h-4 w-4 bg-slate-950 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
    </div>
  )
}
