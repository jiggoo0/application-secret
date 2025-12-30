/** @format */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CaseShowcase } from '@/config/showcase-types'

interface CaseCardProps {
  data: CaseShowcase
  className?: string
}

/**
 * 🛰️ COMPONENT: CaseCard
 * MODE: Industrial_Sharp_V3.3
 * STATUS: Optimized_NextImage_LCP
 */
export const CaseCard = ({ data, className }: CaseCardProps) => {
  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex flex-col border-2 border-[#020617] bg-white transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#020617]',
        className,
      )}
    >
      {/* 🖼️ COVER_SECTION: พื้นที่โชว์ Visual Identity */}
      <div className="relative aspect-video overflow-hidden border-b-2 border-[#020617] bg-slate-100">
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.05]" />

        {/* Status Badge: ตอกย้ำความสำเร็จ */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 bg-[#020617] px-2 py-1">
          <div className="h-1.5 w-1.5 animate-pulse bg-[#FCDE09]" />
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-white">
            {data.business_outcome?.verdict || 'VERIFIED'}
          </span>
        </div>

        {/* ✅ FIXED: Next.js Image Optimization เพื่อ Performance สูงสุด */}
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center opacity-10">
            <Database size={64} />
          </div>
        )}
      </div>

      {/* 📝 CONTENT_FACILITY: ข้อมูลสรุปเคส */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
            {data.client_category} / {data.id}
          </span>
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#FCDE09]" />
        </div>

        <h3 className="mb-3 text-2xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
          {data.title}
        </h3>

        <p className="mb-6 line-clamp-2 font-thai text-sm font-bold leading-relaxed text-slate-600">
          {data.executive_summary}
        </p>

        {/* 📊 STATS_PANEL: ข้อมูลเชิงลึกจาก Interface */}
        <div className="mt-auto grid grid-cols-2 border-t border-slate-100 pt-4">
          <div className="border-r border-slate-100">
            <span className="block font-mono text-[8px] font-black uppercase text-slate-400">
              DOCS_PROCESSED
            </span>
            <span className="font-mono text-sm font-black text-[#020617]">
              {data.stats?.docs_processed || 'N/A'}
            </span>
          </div>
          <div className="pl-4">
            <span className="block font-mono text-[8px] font-black uppercase text-slate-400">
              COMPLEXITY
            </span>
            <span
              className={cn(
                'font-mono text-sm font-black',
                data.stats?.complexity_level === 'CRITICAL' ? 'text-red-500' : 'text-[#020617]',
              )}
            >
              {data.stats?.complexity_level || 'LOW'}
            </span>
          </div>
        </div>
      </div>

      {/* 📐 DECORATIVE_STAMP: ตราประทับจิ๋วมุมการ์ด */}
      <div className="absolute -bottom-[2px] -right-[2px] h-6 w-6 bg-[#020617] opacity-0 transition-opacity [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:opacity-100" />
    </Link>
  )
}
