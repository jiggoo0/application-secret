/** * @format
 * @description SHOWCASE_GRID: Matrix Display System (V2.025.6 - PATH_STABLE)
 * ✅ FIXED: TS2307 - Corrected path to /config/showcase/all-cases.ts
 * ✅ FIXED: TS2740 - Integrated Flexible CaseShowcase Interface
 */

'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Globe, ShieldCheck, Clock } from 'lucide-react'

// 🛡️ INTERNAL_TYPE: บูรณาการจากอินเตอร์เฟซล่าสุดของคุณ
export interface CaseShowcase {
  id: string
  slug: string
  title: string
  executive_summary: string
  client_category: string
  description?: string
  image?: string
  category?: string
  stats?: {
    complexity_level: string
  }
}

/**
 * 📂 PATH_CORRECTION:
 * ถอยจาก components/section (../..) เพื่อไปที่ root
 * แล้วเจาะเข้า config/showcase/all-cases
 */
import { ALL_CASES } from '../../config/showcase/all-cases'

export const ShowcaseGrid = () => {
  return (
    <div className="shadow-sharp grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
      {(ALL_CASES as CaseShowcase[]).map((item: CaseShowcase) => (
        <div
          key={item.id}
          className="group relative flex flex-col bg-white p-8 transition-all duration-700 hover:bg-slate-50 lg:p-10"
        >
          {/* 🧩 HEADER: Identity */}
          <div className="mb-10 flex items-start justify-between">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-slate-950 bg-white transition-all duration-500 group-hover:bg-brand">
              <ShieldCheck size={28} strokeWidth={1.5} className="text-slate-950" />
            </div>
            <div className="text-right">
              <div className="mb-1 flex items-center justify-end gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                  SYSTEM_VERIFIED
                </span>
              </div>
              <span className="font-mono text-[11px] font-black uppercase text-slate-950">
                {item.id.slice(0, 8)}
              </span>
            </div>
          </div>

          {/* 🖼️ PREVIEW: Image handling with fallback */}
          <div className="relative mb-8 aspect-video w-full overflow-hidden border border-slate-100 bg-slate-50">
            <Image
              src={item.image || '/images/og-image.jpg'}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
          </div>

          {/* 📝 CONTENT: Data mapping based on your interface */}
          <div className="mb-10 flex-grow space-y-4">
            <div className="flex items-center gap-3">
              <Globe size={14} className="text-brand" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {item.client_category || item.category || 'GENERAL'}
              </span>
            </div>
            <h3 className="font-sans text-2xl font-black uppercase italic leading-tight tracking-tighter text-slate-950 group-hover:text-brand">
              {item.title}
            </h3>
            <p className="line-clamp-3 font-sans text-sm font-bold leading-relaxed text-slate-500">
              {item.executive_summary || item.description}
            </p>
          </div>

          {/* 🛠️ FOOTER: Navigation */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={12} />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                LVL: {item.stats?.complexity_level || 'STABLE'}
              </span>
            </div>
            <Link
              href={`/showcase/${item.slug}`}
              className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 transition-all hover:bg-slate-950 hover:text-brand"
            >
              <ArrowUpRight size={20} strokeWidth={3} />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-700 group-hover:w-full" />
        </div>
      ))}
    </div>
  )
}
