/** @format */

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'

/**
 * 🛠️ COMPONENT: CaseSectionPreview
 * STRATEGY: High-Impact Performance Showcase (Landing Page)
 * DESIGN: Industrial Sharp Grid / Zero-Gap Border Logic
 */
export const CaseSectionPreview = () => {
  // Select top 3 high-impact cases for the landing archive
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="border-t-2 border-slate-950 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        {/* 📊 HEADER_STRATEGY: Command Center Style */}
        <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 w-8 bg-[#FCDE09]" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-950">
                Operational_Archive
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 md:text-8xl">
              Success_ <br />
              <span className="text-slate-200">Protocols.</span>
            </h2>
          </div>

          <Link
            href="/showcase"
            className={cn(
              'group flex items-center gap-6 border-[3px] border-slate-950 px-10 py-5',
              'text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300',
              'bg-white text-slate-950 hover:-translate-y-1 hover:bg-[#FCDE09] hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)]',
            )}
          >
            Access_Full_Reports
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="transition-transform group-hover:translate-x-2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* 🏗️ GRID_INFRASTRUCTURE: Integrated Audit Cells */}
        <div className="grid grid-cols-1 border-l border-t border-slate-950 md:grid-cols-3">
          {featuredCases.map((data) => (
            <CaseGridCard key={data.id} data={data} />
          ))}
        </div>

        {/* 🛡️ FOOTER_NOTICE: Industrial Verification Stamp */}
        <div className="mt-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-1 w-1 bg-slate-950" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              System_Status: Verified
            </span>
          </div>
          <div className="mx-10 h-[1px] flex-1 bg-slate-100" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-950">
            v.2025_CORE_UPDATE
          </span>
        </div>
      </div>
    </section>
  )
}
