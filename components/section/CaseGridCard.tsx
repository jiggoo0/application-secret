/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.910Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: CaseGridCard          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

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
 * 🧱 COMPONENT: CaseGridCard_REDESIGN
 * @version 3.0.0
 * DESIGN: Industrial / Ledger / Trust-First
 * GOAL: อ่านเร็ว คม ชัด ลดลูกเล่นฟุ่มเฟือย
 */
export const CaseGridCard = ({ data }: CaseGridCardProps) => {
  const processingTime = data.stats?.processing_time ?? 'UNDEFINED'
  const complexity = data.stats?.complexity_level?.toUpperCase() ?? 'PENDING'
  const clientTag = data.client_category?.slice(0, 3).toUpperCase() ?? 'SYS'
  const isHighRisk =
    complexity.includes('HIGH') || complexity.includes('CRITICAL') || complexity.includes('ซับซ้อน')

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex h-full flex-col bg-white p-8 transition-colors duration-300',
        'border-b border-r border-[#020617]',
        'hover:bg-[#020617] hover:text-white',
      )}
    >
      {/* CORNER MARK */}
      <span className="absolute right-0 top-0 h-3 w-3 border-b border-l border-slate-300 group-hover:border-[#FCDE09]" />

      {/* HEADER */}
      <div className="mb-10 flex items-start justify-between">
        <div className="space-y-2">
          <span className="block font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
            CASE_ID
          </span>
          <span className="inline-block bg-[#020617] px-2 py-0.5 font-mono text-[12px] font-black text-[#FCDE09] group-hover:bg-[#FCDE09] group-hover:text-[#020617]">
            {data.id}
          </span>
        </div>
        <div className="border-2 border-[#020617] p-2 text-[#020617] transition-colors group-hover:border-[#FCDE09] group-hover:text-[#FCDE09]">
          <FolderOpen size={18} strokeWidth={2.5} />
        </div>
      </div>

      {/* TITLE */}
      <div className="flex-1 space-y-6">
        <h3 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tight transition-transform group-hover:translate-x-1">
          {data.title}
        </h3>
        <p className="line-clamp-3 border-l-4 border-[#FCDE09] pl-5 text-sm font-bold leading-relaxed text-slate-600 group-hover:text-slate-400">
          {data.executive_summary}
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-10 flex items-end justify-between border-t-2 border-slate-100 pt-6 group-hover:border-slate-800">
        <div className="flex items-center gap-6">
          <div>
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Cycle
            </span>
            <span className="font-mono text-[14px] font-black italic">{processingTime}</span>
          </div>

          <div className="h-7 w-px bg-slate-200 group-hover:bg-slate-700" />

          <div>
            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
              Risk
            </span>
            <span
              className={cn(
                'font-mono text-[14px] font-black italic',
                isHighRisk ? 'text-orange-500' : 'text-emerald-500',
              )}
            >
              {complexity}
            </span>
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center bg-[#020617] text-[#FCDE09] transition-all group-hover:-translate-y-1 group-hover:bg-[#FCDE09] group-hover:text-[#020617]">
          <ArrowUpRight size={22} strokeWidth={3} />
        </div>
      </div>

      {/* BACKGROUND TAG */}
      <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[72px] font-black italic leading-none text-[#020617]/[0.04] group-hover:text-[#FCDE09]/20">
        {clientTag}
      </span>
    </Link>
  )
}
