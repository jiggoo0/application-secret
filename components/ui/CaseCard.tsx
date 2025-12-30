/** * @format
 * @description CASE_CARD: Success Evidence Module (Industrial Sharp V2.6)
 * ✅ ENFORCEMENT: Absolute Zero Radius, Hardware-Inspired Shadows, Mono-Technical HUD
 */

import React from 'react'
import { type CaseShowcase } from '@/config/showcase-types'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

interface CaseCardProps {
  item: CaseShowcase
  className?: string
}

export function CaseCard({ item, className }: CaseCardProps) {
  return (
    <div
      className={cn(
        'group relative border-2 border-slate-950 bg-white p-8 transition-all duration-500',
        'rounded-none hover:-translate-y-1 hover:shadow-sharp-brand',
        className,
      )}
    >
      {/* 🧩 HUD_HEADER: ข้อมูลทางเทคนิคเบื้องหลัง */}
      <div className="mb-6 flex items-center justify-between border-b-2 border-slate-50 pb-4 transition-colors group-hover:border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse bg-slate-950 group-hover:bg-brand" />
          <span className="font-mono text-[10px] font-black tracking-[0.2em] text-slate-400">
            ID::{item.id}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="font-mono text-[9px] font-black uppercase text-brand">
            Deploy_Success
          </span>
          <ArrowUpRight size={14} className="text-brand" />
        </div>
      </div>

      {/* 🖋️ CORE_CONTENT: Title และสรุปผู้บริหาร */}
      <div className="min-h-[120px]">
        <h3 className="text-2xl font-black uppercase italic leading-[0.9] tracking-tighter text-slate-950 transition-colors group-hover:text-slate-800">
          {item.title}
        </h3>

        <p className="font-thai mt-4 line-clamp-3 text-[13px] font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-600">
          {item.executive_summary}
        </p>
      </div>

      {/* 📊 TELEMETRY_FOOTER: สถานะและการจัดหมวดหมู่ */}
      <div className="mt-8 flex items-end justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck size={14} strokeWidth={3} />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest">
              {item.status || 'VERIFIED_ASSET'}
            </span>
          </div>

          <div className="inline-block bg-slate-950 px-3 py-1.5 shadow-sharp-sm transition-transform group-hover:scale-105">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-brand">
              CAT::{item.client_category || 'General'}
            </span>
          </div>
        </div>

        {/* 📐 DECORATIVE_GEOMETRY */}
        <div className="h-10 w-10 border-b-2 border-r-2 border-slate-100 transition-colors group-hover:border-brand/30" />
      </div>

      {/* 🛡️ CORNER_SHARP_INDICATOR: ตัวจบงานมุมขวาบน */}
      <div className="absolute right-0 top-0 h-6 w-6 bg-slate-950 [clip-path:polygon(100%_0,0_0,100%_100%)]" />

      {/* HOVER_LINE_ANIMATION */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand transition-all duration-700 group-hover:w-full" />
    </div>
  )
}
