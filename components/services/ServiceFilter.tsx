/** * @format
 * @description SERVICE_FILTER: Industrial Sharp Navigation (V2.5.1 Production)
 * ✅ ENFORCEMENT: Reliable CSS Variable Mapping
 * ✅ FIXED: Structural Integrity for Next.js 15 Build
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// 🛰️ REGISTRY: หมวดหมู่ที่ระบบรองรับ
const categories = ['ALL_SERVICES', 'IMMIGRATION', 'FINANCIAL', 'DOCUMENTATION', 'INFRASTRUCTURE']

interface ServiceFilterProps {
  active: string
  onChange: (category: string) => void
}

export const ServiceFilter = ({ active, onChange }: ServiceFilterProps) => (
  <nav className="relative mb-20" aria-label="Service Category Filter">
    {/* 🏷️ FILTER_HEADER */}
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 animate-pulse bg-brand" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          FILTER_SELECTOR_MODULE
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[8px] font-bold text-slate-300">
          MODE: <span className="font-black text-slate-950">STRICT_SORT</span>
        </span>
        <span className="font-mono text-[8px] font-bold text-slate-300">
          STATUS:{' '}
          <span className="font-black italic text-emerald-500 underline decoration-emerald-200 decoration-2">
            READY
          </span>
        </span>
      </div>
    </div>

    {/* 🎛️ SELECTOR_INTERFACE */}
    <div className="flex flex-wrap gap-4">
      {categories.map((cat) => {
        const isActive = active === cat

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            aria-pressed={isActive}
            className={cn(
              'group relative overflow-hidden px-8 py-5 transition-all duration-300',
              'font-mono text-[11px] font-black uppercase tracking-[0.2em]',
              'rounded-none border-0 focus:outline-none focus:ring-0 active:scale-95',
              isActive
                ? // 🛡️ FIXED: ปรับการใช้ Shadow ให้เป็นค่าสีคงที่เพื่อป้องกัน Build Error กรณี Variable ไม่ถูกโหลด
                  'bg-slate-950 text-brand shadow-[12px_12px_0px_0px_rgba(200,164,93,0.2)]'
                : 'border border-slate-200 bg-white text-slate-400 hover:border-slate-950 hover:text-slate-950',
            )}
          >
            {/* ⚡ ACTIVE_INDICATOR */}
            {isActive && <div className="absolute left-0 top-0 h-full w-1.5 bg-brand" />}

            <span className="relative z-10">{cat}</span>

            {/* 💡 MECHANICAL_DECOR */}
            {!isActive && (
              <span className="absolute -bottom-2 -right-4 font-mono text-[7px] font-bold opacity-0 transition-all group-hover:bottom-1 group-hover:right-2 group-hover:opacity-40">
                {'//'} EXECUTE
              </span>
            )}

            {/* Hover Backdrop Effect */}
            <div
              className={cn(
                'absolute inset-0 -z-0 translate-y-full bg-slate-100 transition-transform duration-500 group-hover:translate-y-0',
                isActive && 'hidden',
              )}
            />
          </button>
        )
      })}
    </div>

    {/* 📏 SECTION_TERMINATOR */}
    <div className="absolute -bottom-8 left-0 flex w-full items-center gap-4 opacity-30">
      <div className="h-[2px] w-24 bg-slate-950" />
      <div className="h-1 w-1 bg-slate-950" />
      <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-950 via-slate-400 to-transparent" />
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
        End_of_Selector
      </span>
    </div>
  </nav>
)

export default ServiceFilter
