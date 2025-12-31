/** @format */

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ShieldCheck, Activity, Database, Zap } from 'lucide-react'

/**
 * 🛠️ COMPONENT: CaseSectionPreview
 * STRATEGY: High-Impact Performance Showcase (Landing Page)
 * DESIGN: Industrial Sharp Grid / Zero-Gap Border Logic
 * ✅ UPDATED: เพิ่มสัญลักษณ์ทางเทคนิคและปรับปรุง Accessibility
 */
export const CaseSectionPreview = () => {
  // เลือกเฉพาะ 3 เคสที่มี Impact สูงสุดมาแสดงในหน้าแรก
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="relative border-t-2 border-slate-950 bg-white py-24 lg:py-32">
      {/* Background Decor: Industrial Grid Dots */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#020617 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-10">
        {/* 📊 HEADER_STRATEGY: Command Center Style */}
        <div className="mb-20 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-6 items-center gap-2 bg-slate-950 px-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#FCDE09]">
                <Zap size={10} className="fill-[#FCDE09]" />
                Live_Metrics
              </div>
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                Operational_Archive
              </span>
            </div>

            <h2 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 md:text-8xl">
              Success_ <br />
              <span className="text-slate-200 transition-colors group-hover:text-slate-300">
                Protocols.
              </span>
            </h2>

            <p className="mt-8 font-thai text-lg font-bold leading-relaxed text-slate-600 md:max-w-md">
              บันทึกการทำงานจริงและการแก้ปัญหาเชิงเทคนิค
              <span className="text-slate-950 underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                ที่พิสูจน์แล้วด้วยผลลัพธ์
              </span>
              ภายใต้มาตรฐานการตรวจสอบระดับสากล
            </p>
          </div>

          <Link
            href="/showcase"
            className={cn(
              'group relative flex items-center gap-6 border-[3px] border-slate-950 px-10 py-5',
              'text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300',
              'bg-white text-slate-950 hover:-translate-y-1 hover:bg-[#FCDE09] hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] active:translate-y-0 active:shadow-none',
            )}
          >
            Access_Full_Reports
            <ArrowUpRight
              size={20}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* 🏗️ GRID_INFRASTRUCTURE: Integrated Audit Cells */}
        <div className="grid grid-cols-1 gap-[2px] border-l-2 border-t-2 border-slate-950 bg-slate-950 md:grid-cols-3">
          {featuredCases.map((data) => (
            <div key={data.id} className="bg-white">
              <CaseGridCard data={data} />
            </div>
          ))}
        </div>

        {/* 🛡️ FOOTER_NOTICE: Industrial Verification Stamp */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950">
                Data_Integrity: Verified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#FCDE09]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950">
                Response: 100%
              </span>
            </div>
          </div>

          <div className="hidden h-[1px] flex-1 bg-slate-100 lg:mx-10 lg:block" />

          <div className="flex items-center gap-4">
            <Database size={14} className="text-slate-400" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
              ARCHIVE_NODE_V.2025
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
