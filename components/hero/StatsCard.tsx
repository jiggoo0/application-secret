/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.924Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: StatsCard          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string
  unit: string
  className?: string
}

/**
 * STATS_CARD — JP_VISUALDOCS
 * v2026.0.1
 */
export function StatsCard({ label, value, unit, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'hover:border-brand group flex flex-col border-l-2 border-slate-200 py-1 pl-6 pr-4 transition-all duration-500 hover:bg-slate-50/50',
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-black tracking-tighter text-slate-950 transition-colors duration-300">
          {value}
        </span>
        <span className="text-[11px] font-black uppercase tracking-tight text-slate-400 group-hover:text-slate-600">
          {unit}
        </span>
      </div>

      <span className="mt-1 font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 group-hover:text-slate-950">
        {label}
      </span>
    </div>
  )
}
