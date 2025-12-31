/** @format */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Database, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CaseShowcase } from '@/config/showcase-types'

interface CaseCardProps {
  data: CaseShowcase
  className?: string
}

/**
 * 🛰️ COMPONENT: CaseCard
 * MODE: Industrial_Sharp_V3.3
 * STRATEGY: High-Performance Preview Card
 * ✅ UPDATED: ปรับปรุงการแสดงผล Complexity ให้รองรับ Logic ภาษาไทยและสี Alert
 */
export const CaseCard = ({ data, className }: CaseCardProps) => {
  // Logic สำหรับการจัดการสีความยาก (Complexity Color)
  const isHighComplexity =
    data.stats?.complexity_level === 'CRITICAL' ||
    data.stats?.complexity_level === 'HIGH' ||
    data.stats?.complexity_level?.includes('ความละเอียดอ่อนสูง')

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex flex-col border-2 border-[#020617] bg-white transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#020617]',
        className,
      )}
    >
      {/* 🖼️ COVER_SECTION: Visual Identity with Blueprint Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[#020617] bg-slate-100">
        {/* Blueprint Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Status Badge: Official Verification */}
        <div className="absolute left-0 top-4 z-20 flex items-center gap-2 bg-[#020617] py-1.5 pl-3 pr-4 shadow-lg">
          <div className="h-1.5 w-1.5 animate-pulse bg-[#FCDE09]" />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white">
            {data.business_outcome?.verdict || 'VERIFIED'}
          </span>
        </div>

        {/* ✅ Next.js Image Optimization */}
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-200">
            <Database size={64} strokeWidth={1} />
          </div>
        )}

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#020617]/0 transition-colors group-hover:bg-[#020617]/10">
          <div className="scale-0 bg-[#FCDE09] p-2 text-[#020617] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* 📝 CONTENT_FACILITY: Case Briefing */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
              {data.client_category}
            </span>
            <span className="font-mono text-[9px] font-bold text-slate-300">/ {data.id}</span>
          </div>
          <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#020617]" />
        </div>

        <h3 className="mb-4 text-2xl font-black uppercase italic leading-[0.9] tracking-tighter text-[#020617] group-hover:text-[#020617]/80">
          {data.title}
        </h3>

        <p className="mb-8 line-clamp-2 font-thai text-[14px] font-bold leading-relaxed text-slate-600">
          {data.executive_summary}
        </p>

        {/* 📊 STATS_PANEL: Data Metrics Preview */}
        <div className="mt-auto grid grid-cols-2 border-t-2 border-slate-950 pt-5">
          <div className="border-r border-slate-100 pr-2">
            <span className="mb-1 block font-mono text-[8px] font-black uppercase tracking-tighter text-slate-400">
              ANALYZED_ASSETS
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-black text-[#020617]">
                {data.stats?.docs_processed || '00'}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase text-slate-400">Items</span>
            </div>
          </div>
          <div className="pl-5">
            <span className="mb-1 block font-mono text-[8px] font-black uppercase tracking-tighter text-slate-400">
              AUDIT_COMPLEXITY
            </span>
            <span
              className={cn(
                'block font-mono text-xs font-black uppercase tracking-tight',
                isHighComplexity ? 'text-red-600' : 'text-[#020617]',
              )}
            >
              {data.stats?.complexity_level || 'STANDARD'}
            </span>
          </div>
        </div>
      </div>

      {/* 📐 DECORATIVE_STAMP: Industrial Corner Notch */}
      <div className="absolute bottom-[-2px] right-0 h-10 w-10 bg-[#020617] opacity-0 transition-all duration-300 [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:opacity-100" />
    </Link>
  )
}
