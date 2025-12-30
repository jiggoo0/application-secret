/** * @format
 * @description CASE_PREVIEW: High-Impact Performance Showcase (Landing Edition)
 * ✅ STRATEGY: 3-Column Integrated Grid, Command Center Typography
 * ✅ ENFORCEMENT: Zero-Gap Border Logic, Industrial Kinetic Feedback
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'

export const CaseSectionPreview = () => {
  // 🔍 กรองเฉพาะ 3 เคสล่าสุดที่มี Impact สูงสุดมาแสดงที่หน้าแรก
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="relative overflow-hidden border-t-4 border-slate-950 bg-white py-32 selection:bg-brand selection:text-slate-950 lg:py-48">
      {/* 🧩 BLUEPRINT_CANVAS: ลายกริตจางๆ เพื่อรักษาระดับ Texture */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 📊 HEADER_STRATEGY: Command Center Style --- */}
        <div className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-3 w-12 bg-brand shadow-sharp-sm" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-950">
                Operational_Archive // V.2.6
              </span>
            </div>

            <h2 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-9xl">
              Success_ <br />
              <span className="text-slate-200 transition-colors duration-700 group-hover:text-slate-300">
                Protocols.
              </span>
            </h2>
          </div>

          <Link
            href="/showcase"
            className={cn(
              'group relative flex items-center gap-8 border-4 border-slate-950 bg-white px-12 py-6',
              'font-mono text-[14px] font-black uppercase tracking-[0.3em] text-slate-950 transition-all duration-300',
              'hover:-translate-x-1 hover:-translate-y-1 hover:bg-brand hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] active:scale-95',
            )}
          >
            Access_Full_Reports
            <div className="relative h-6 w-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </Link>
        </div>

        {/* --- 🏗️ GRID_INFRASTRUCTURE: Integrated Audit Cells --- */}
        <div className="grid grid-cols-1 border-l-4 border-t-4 border-slate-950 md:grid-cols-3">
          {featuredCases.map((data) => (
            <CaseGridCard key={data.id} data={data} />
          ))}
        </div>

        {/* --- 🛡️ FOOTER_NOTICE: Industrial Verification Stamp --- */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              <div className="h-2 w-2 animate-pulse bg-brand" />
              <div className="h-2 w-2 bg-slate-100" />
              <div className="h-2 w-2 bg-slate-100" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
              System_Status: <span className="text-slate-950">Verified_Secure</span>
            </span>
          </div>

          <div className="hidden h-[1px] flex-1 bg-slate-100 md:block lg:mx-20" />

          <div className="flex items-center gap-10">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-950">
              [ REF::Archive_Node_01 ]
            </span>
            <span className="bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-brand">
              v.2025_CORE_SYNC
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}
