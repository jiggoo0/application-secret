/** @format */

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Database, ShieldCheck, Activity, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CaseShowcase } from '@/config/showcase-types'

interface CaseCardProps {
  data: CaseShowcase
  className?: string
}

/**
 * 🛰️ COMPONENT: CaseCard_Tactical
 * @version 2026.1.5 (JP-Industrial-Impact)
 * ✅ ปรับปรุง: ดีไซน์ดุดันขึ้นด้วย Border 4px, ภาษาไทยที่เน้น "ผลลัพธ์", และ Visual Feedback ที่คมชัด
 */
export const CaseCard = ({ data, className }: CaseCardProps) => {
  // 🛡️ LOGIC_AUDIT: ประเมินระดับความท้าทายของงาน
  const complexity = data.stats?.complexity_level?.toUpperCase() || 'STANDARD'
  const isHighComplexity =
    complexity.includes('CRITICAL') ||
    complexity.includes('HIGH') ||
    complexity.includes('ละเอียดอ่อน')

  return (
    <Link
      href={`/showcase/${data.slug}`}
      className={cn(
        'group relative flex flex-col border-4 border-[#020617] bg-white transition-all duration-500',
        'hover:-translate-y-3 hover:shadow-sharp active:scale-[0.98]',
        className,
      )}
    >
      {/* 🖼️ COVER_SECTION: พื้นที่แสดงภาพผลงาน */}
      <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-[#020617] bg-slate-100">
        {/* Engineering Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[size:16px_16px] opacity-[0.06]" />

        {/* Official Status Badge: ตราประทับสถานะ */}
        <div className="absolute left-0 top-6 z-20 flex items-center gap-3 bg-[#020617] px-5 py-2.5 shadow-sharp">
          <Activity size={14} className="animate-pulse text-[#FCDE09]" />
          <span className="font-thai text-[11px] font-black uppercase tracking-widest text-white">
            {data.business_outcome?.verdict || 'อนุมัติผ่านเกณฑ์'}
          </span>
        </div>

        {/* Media Rendering */}
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:rotate-1 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-slate-200 text-slate-400">
            <Database size={64} strokeWidth={1} className="mb-4 opacity-20" />
            <span className="font-mono text-[10px] font-black tracking-[0.3em]">
              NO_VISUAL_DATA
            </span>
          </div>
        )}

        {/* Hover Security Scan Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]/0 transition-all duration-500 group-hover:bg-[#020617]/20">
          <div className="translate-y-10 scale-50 border-4 border-[#020617] bg-[#FCDE09] p-5 text-[#020617] opacity-0 shadow-sharp transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <ShieldCheck size={32} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* 📝 CONTENT_FACILITY: ข้อมูลสรุป */}
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <header className="mb-8 flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="border-2 border-[#020617] bg-[#FCDE09] px-3 py-1 font-thai text-[10px] font-black uppercase text-[#020617] shadow-[2px_2px_0px_#020617]">
                {data.client_category || 'ทั่วไป'}
              </span>
              <span className="font-mono text-[10px] font-black text-slate-300">REF_{data.id}</span>
            </div>
            <h3 className="font-thai text-3xl font-black leading-[1.1] tracking-tight text-[#020617] transition-colors group-hover:text-[#020617]">
              {data.title}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-100 text-slate-200 transition-all duration-500 group-hover:border-[#020617] group-hover:bg-[#020617] group-hover:text-[#FCDE09] group-hover:shadow-sharp">
            <ArrowUpRight size={24} strokeWidth={3} />
          </div>
        </header>

        <p className="mb-10 line-clamp-2 font-thai text-lg font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-800">
          {data.executive_summary}
        </p>

        {/* 📊 METRIC_LEDGER: ตัวเลขสถิติที่จับต้องได้ */}
        <div className="mt-auto grid grid-cols-2 gap-px border-4 border-[#020617] bg-[#020617] shadow-sm">
          <div className="bg-white p-5">
            <span className="mb-2 flex items-center gap-2 font-thai text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Target size={12} /> ข้อมูลที่ตรวจสอบ
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-black text-[#020617]">
                {data.stats?.docs_processed || '0'}
              </span>
              <span className="font-thai text-[10px] font-black text-slate-400">ชุดเอกสาร</span>
            </div>
          </div>
          <div className="bg-white p-5">
            <span className="mb-2 block font-thai text-[10px] font-black uppercase tracking-widest text-slate-400">
              ความยากของงาน
            </span>
            <span
              className={cn(
                'block font-thai text-base font-black uppercase leading-tight',
                isHighComplexity ? 'text-red-600' : 'text-emerald-600',
              )}
            >
              {complexity === 'HIGH' ? 'ความซับซ้อนสูง' : complexity}
            </span>
          </div>
        </div>
      </div>

      {/* 📐 BRAND_STAMP: กิมมิคมุมการ์ด */}
      <div className="absolute bottom-[-4px] right-[-4px] h-14 w-14 bg-[#020617] opacity-0 transition-all duration-500 [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:opacity-100" />
    </Link>
  )
}
