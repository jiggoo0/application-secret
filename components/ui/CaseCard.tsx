/** @format */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Database, ShieldCheck, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CaseShowcase } from '@/config/showcase-types'

interface CaseCardProps {
  data: CaseShowcase
  className?: string
}

/**
 * 🛰️ COMPONENT: CaseCard_Tactical
 * @version 2026.0.1 (Precision Optimized)
 * PURPOSE: การ์ดแสดงผลเคสศึกษาที่มีระบบ Visual Hierarchy เข้มงวด
 */
export const CaseCard = ({ data, className }: CaseCardProps) => {
  // 🛡️ LOGIC_AUDIT: Complexity Evaluation
  const complexity = data.stats?.complexity_level?.toUpperCase() || 'STANDARD'
  const isHighComplexity =
    complexity.includes('CRITICAL') ||
    complexity.includes('HIGH') ||
    complexity.includes('ละเอียดอ่อน')

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex flex-col border-2 border-[#020617] bg-white transition-all duration-500',
        'hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#020617] active:scale-[0.98]',
        className,
      )}
    >
      {/* 🖼️ COVER_SECTION: Visual Identity */}
      <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[#020617] bg-slate-50">
        {/* Dynamic Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Status Badge: Official Protocol */}
        <div className="absolute left-0 top-6 z-20 flex items-center gap-3 bg-[#020617] px-4 py-2 shadow-2xl">
          <Activity size={12} className="animate-pulse text-[#FCDE09]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white">
            {data.business_outcome?.verdict || 'ARCHIVE_VERIFIED'}
          </span>
        </div>

        {/* ✅ OPTIMIZED_MEDIA */}
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:rotate-1 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-200">
            <Database
              size={80}
              strokeWidth={0.5}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Security Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]/0 transition-all duration-500 group-hover:bg-[#020617]/10">
          <div className="scale-0 rounded-full bg-[#FCDE09] p-4 text-[#020617] opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* 📝 CONTENT_FACILITY */}
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <header className="mb-6 flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#020617] px-2 py-0.5 font-mono text-[9px] font-black text-[#FCDE09]">
                {data.client_category || 'N/A'}
              </span>
              <span className="font-mono text-[9px] font-bold text-slate-400">ID: {data.id}</span>
            </div>
            <h3 className="text-3xl font-black uppercase italic leading-[0.85] tracking-[calc(-0.05em)] text-[#020617] transition-colors group-hover:text-brand">
              {data.title}
            </h3>
          </div>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-slate-200 transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-[#020617]" />
        </header>

        <p className="mb-10 line-clamp-2 font-thai text-[15px] font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-700">
          {data.executive_summary}
        </p>

        {/* 📊 METRIC_LEDGER */}
        <div className="mt-auto grid grid-cols-2 gap-4 border-t-2 border-[#020617] pt-6">
          <div className="border-r border-slate-100">
            <span className="mb-1 block font-mono text-[8px] font-black uppercase tracking-widest text-slate-400">
              ASSETS_VERIFIED
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-[#020617]">
                {data.stats?.docs_processed || '00'}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-300">UNIT</span>
            </div>
          </div>
          <div className="pl-4">
            <span className="mb-1 block font-mono text-[8px] font-black uppercase tracking-widest text-slate-400">
              AUDIT_LVL
            </span>
            <span
              className={cn(
                'block font-mono text-[13px] font-black uppercase leading-tight transition-colors',
                isHighComplexity ? 'text-red-500' : 'text-emerald-600',
              )}
            >
              {complexity}
            </span>
          </div>
        </div>
      </div>

      {/* 📐 BRAND_STAMP */}
      <div className="absolute bottom-[-2px] right-[-2px] h-12 w-12 bg-[#020617] opacity-0 transition-all duration-500 [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:opacity-100" />
    </Link>
  )
}
