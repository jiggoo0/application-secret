/** * @format
 * @description HERO_FRAME: The Structural Matrix (Industrial Sharp V2.6)
 * ✅ ENFORCEMENT: 12-Column Grid System, Seamless Blueprint Integration
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface HeroFrameProps {
  left: React.ReactNode
  right?: React.ReactNode
  className?: string
}

export const HeroFrame = ({ left, right, className }: HeroFrameProps) => {
  return (
    <div className={cn('relative min-h-[100dvh] w-full', className)}>
      {/* 🧩 BLUEPRINT_CANVAS: ลายกริตสำหรับระบุระนาบงาน */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.03]" />

      {/* 📏 AXIS_GUIDES: เส้นนำสายตาเชิงวิศวกรรม (Vertical Guide) */}
      <div className="pointer-events-none absolute left-[5%] top-0 hidden h-full w-px bg-slate-100 lg:block" />
      <div className="pointer-events-none absolute right-[5%] top-0 hidden h-full w-px bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto h-full px-6">
        <div className="grid min-h-[100dvh] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 🛠️ LEFT_ZONE: Primary Message Area (7/12) */}
          <div className="py-20 lg:col-span-7 lg:py-0">
            <div className="relative">
              {/* Decorative Corner Bracket */}
              <div className="absolute -left-6 -top-6 h-4 w-4 border-l-2 border-t-2 border-brand opacity-40" />
              {left}
            </div>
          </div>

          {/* 🛰️ RIGHT_ZONE: Visual / Secondary Data Area (5/12) */}
          {right && (
            <div className="relative hidden h-full items-center lg:col-span-5 lg:flex">
              <div className="w-full border-l border-slate-100 py-12 pl-12">{right}</div>
            </div>
          )}
        </div>
      </div>

      {/* 📐 COORDINATE_TAG: ป้ายระบุพิกัดที่มุม (Industrial Detail) */}
      <div className="absolute bottom-10 right-10 hidden font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 lg:block">
        Loc_Ref::[13.7563° N, 100.5018° E]
      </div>
    </div>
  )
}
