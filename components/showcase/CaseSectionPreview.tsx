/** @format */

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ShieldCheck, Activity, Database, Terminal } from 'lucide-react'

/**
 * 🛠️ COMPONENT: CaseSectionPreview
 * @version 2026.0.2 (Audit Protocol Optimized)
 * ✅ FIXED: Removed unused 'Zap' import to resolve ESLint error 8:57.
 */
export const CaseSectionPreview = () => {
  // กรองเคสระดับ High Impact เพื่อกระตุ้น Conversion
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="relative border-t-4 border-slate-950 bg-white py-32 selection:bg-[#FCDE09] selection:text-slate-950 lg:py-48">
      {/* 🧩 UI_INFRA: Engineering Grid & Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#020617 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute right-0 top-0 h-full w-1/4 translate-x-1/2 -skew-x-12 bg-slate-50/50" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* 📊 HEADER_MANIFEST: The Command Interface */}
        <header className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <div className="flex h-8 items-center gap-3 bg-slate-950 px-4 py-1 shadow-sharp">
                <Terminal size={14} className="animate-pulse text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
                  Protocol_Status: Online
                </span>
              </div>
              <span className="h-[2px] w-12 bg-slate-200" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                Performance_Archives_2026
              </span>
            </div>

            <h2 className="text-7xl font-black uppercase italic leading-[0.8] tracking-[calc(-0.04em)] text-slate-950 md:text-9xl lg:text-[130px]">
              Proven <br />
              <span className="text-slate-100 drop-shadow-[4px_4px_0px_#020617] transition-all duration-500 hover:text-slate-200">
                Protocols.
              </span>
            </h2>

            <div className="mt-12 flex gap-8 border-l-8 border-[#FCDE09] pl-10">
              <p className="max-w-lg font-thai text-xl font-bold leading-relaxed text-slate-600">
                บันทึกประวัติการวิเคราะห์ยุทธศาสตร์เชิงลึก
                <span className="mt-2 block font-mono text-sm font-black uppercase tracking-widest text-slate-400">
                  Data-Driven Case Resolutions
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/showcase"
            className={cn(
              'group relative flex items-center justify-center gap-8 border-4 border-slate-950 bg-white px-12 py-7',
              'text-[14px] font-black uppercase tracking-[0.3em] text-slate-950 transition-all duration-500',
              'hover:bg-slate-950 hover:text-[#FCDE09] hover:shadow-[16px_16px_0px_#FCDE09] active:scale-95',
            )}
          >
            Access_Audit_Logs
            <ArrowUpRight
              size={24}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
            />
          </Link>
        </header>

        {/* 🏗️ GRID_ARCHITECTURE: High-Contrast Audit Cells */}

        <div className="grid grid-cols-1 gap-px border-2 border-slate-950 bg-slate-950 shadow-[40px_40px_0px_#f8fafc] md:grid-cols-3">
          {featuredCases.map((data) => (
            <div key={data.id} className="bg-white transition-colors hover:bg-slate-50">
              <CaseGridCard data={data} />
            </div>
          ))}
        </div>

        {/* 🛡️ SYSTEM_STATUS: Industrial Verification Ledger */}
        <footer className="mt-28 flex flex-col items-center justify-between gap-10 border-t-2 border-slate-950 pt-12 md:flex-row">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-3 border border-emerald-100 bg-emerald-50 px-4 py-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Integrity: Verified
              </span>
            </div>
            <div className="flex items-center gap-3 border border-amber-100 bg-amber-50 px-4 py-2">
              <Activity size={18} className="animate-pulse text-amber-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Success_Rate: 98.7%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-10 w-px bg-slate-200" />
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3">
                <Database size={14} className="text-slate-400" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Secure_Archive_Node_V.26
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-300">
                Updated_Time: {new Date().getFullYear()}.01.01
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
