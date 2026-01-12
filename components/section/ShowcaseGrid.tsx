/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.883Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: ShowcaseGrid          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseShowcase } from '@/config/showcase-types'
import { ArrowUpRight, Activity } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ShowcaseGrid
 * @version 2026.1.0
 */
export const ShowcaseGrid = () => {
  return (
    <section className="relative overflow-hidden bg-white py-32 lg:py-48">
      {/* GRID PATTERN */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.04]" />
      <div className="absolute right-0 top-0 h-64 w-64 bg-slate-950/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* HEADER */}
        <header className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:border-b-4 lg:border-slate-950 lg:pb-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-3 w-3 animate-pulse bg-[#FCDE09] shadow-[0_0_10px_#FCDE09]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                Archived_Case_Studies
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-8xl">
              Proven <br />
              <span className="text-[#FCDE09] drop-shadow-[4px_4px_0px_#000]">Audits.</span>
            </h2>
          </div>

          <p className="font-thai max-w-xs border-l-4 border-[#FCDE09] pl-8 text-lg font-bold leading-relaxed text-slate-500">
            วิเคราะห์ยุทธศาสตร์และผลลัพธ์จากเคสจริงที่ผ่านกระบวนการคัดกรองสูงสุด
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 border-l-2 border-t-2 border-slate-950 shadow-[20px_20px_0px_#f1f5f9] md:grid-cols-2 lg:grid-cols-3">
          {ALL_CASES.map((item) => (
            <CaseCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ====================== CARD ====================== */

const CaseCard = ({ data }: { data: CaseShowcase }) => {
  const complexity = data.stats?.complexity_level?.toUpperCase() ?? 'PENDING'
  const verdict = data.business_outcome?.verdict?.toUpperCase() ?? 'SUCCESS'
  const clientCategory = data.client_category?.toUpperCase() ?? 'HNWI'

  return (
    <div className="group relative flex flex-col border-b-2 border-r-2 border-slate-950 bg-white p-10 transition-all duration-700 hover:z-20 hover:bg-slate-50 lg:p-12">
      <div className="flex flex-grow flex-col">
        {/* HEADER */}
        <header className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-[#FCDE09]" />
              <span className="bg-slate-950 px-2 py-0.5 font-mono text-[10px] font-black text-[#FCDE09]">
                {data.id}
              </span>
            </div>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-slate-950">
              {`// ${clientCategory}`}
            </span>
          </div>

          <h3 className="text-4xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 transition-transform duration-500 group-hover:translate-x-2">
            {data.title}
          </h3>
        </header>

        {/* SUMMARY */}
        <p className="font-thai mb-14 line-clamp-3 text-[16px] font-bold leading-relaxed text-slate-500 group-hover:text-slate-700">
          {data.executive_summary}
        </p>

        {/* METRICS */}
        <div className="mb-16 mt-auto space-y-6 border-t-2 border-slate-50 pt-8 group-hover:border-slate-200">
          <Metric label="ANALYSIS_LEVEL" value={complexity} />
          <Metric label="VERDICT_PROTOCOL" value={verdict} />
        </div>

        {/* ACTION */}
        <Link
          href={`/showcase/${data.slug}`}
          className="group/btn relative flex items-center justify-between overflow-hidden bg-slate-950 px-8 py-6 font-mono text-[12px] font-black uppercase tracking-[0.4em] text-white shadow-[8px_8px_0px_#FCDE09] transition-all hover:shadow-none active:scale-95"
        >
          <span className="relative z-10">Access_Audit_Log</span>
          <ArrowUpRight
            size={20}
            className="relative z-10 transition-transform group-hover/btn:scale-125"
          />
          <div className="absolute inset-0 -translate-x-full bg-[#FCDE09] transition-transform duration-500 group-hover/btn:translate-x-0" />
        </Link>
      </div>
    </div>
  )
}

/* ====================== METRIC ====================== */

const Metric = ({ label, value }: { label: string; value: string }) => {
  const isCritical = value.includes('CRITICAL') || value.includes('HIGH')
  const isSuccess = value.includes('SUCCESS') || value.includes('APPROVED')

  return (
    <div className="flex items-end justify-between border-b border-slate-100 pb-3">
      <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
        {label}
      </span>
      <span
        className={`font-mono text-[12px] font-black uppercase tracking-tight ${
          isCritical ? 'text-red-500' : isSuccess ? 'text-emerald-500' : 'text-slate-950'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
