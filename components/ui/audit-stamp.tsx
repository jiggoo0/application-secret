/** @format */

import React from 'react'
import { cn } from '@/lib/utils'

interface AuditStampProps {
  status?: 'PASSED' | 'VERIFIED' | 'APPROVED' | 'SUCCESS'
  className?: string
}

/**
 * 🛠️ COMPONENT: AuditStamp
 * STYLE: Industrial Verification Seal / Raw Ink Aesthetic
 * ROLE: Visual confirmation for verified documentation protocols
 */
export const AuditStamp = ({ status = 'VERIFIED', className }: AuditStampProps) => {
  return (
    <div
      className={cn(
        'relative flex h-40 w-40 select-none items-center justify-center border-[6px] border-double transition-all duration-500',
        'rotate-[-15deg] border-emerald-600/30 text-emerald-600/50 group-hover:rotate-[-5deg] group-hover:border-emerald-600/50 group-hover:text-emerald-600/70',
        'bg-white/5',
        className,
      )}
    >
      {/* 🧩 STRUCTURAL_LAYERS: Sharp Concentric Frames */}
      <div className="absolute inset-2 border-2 border-emerald-600/10" />
      <div className="absolute inset-4 border border-dashed border-emerald-600/5" />

      <div className="flex flex-col items-center justify-center px-2 text-center">
        <span className="mb-2 text-[10px] font-black uppercase leading-none tracking-[0.4em]">
          Official_Audit
        </span>

        <div className="mb-2 h-[2px] w-full bg-emerald-600/20" />

        <span className="text-[28px] font-black uppercase italic leading-none tracking-tighter drop-shadow-sm">
          {status}
        </span>

        <div className="mt-2 h-[2px] w-full bg-emerald-600/20" />

        <span className="mt-2 text-[9px] font-bold uppercase italic leading-none tracking-[0.2em]">
          Auth_JP_2025_DOCS
        </span>
      </div>

      {/* 🖋️ TEXTURE_ENGINE: Industrial Grit Simulation */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.png')] bg-repeat opacity-[0.15] mix-blend-multiply" />

      {/* Corner Registration Marks */}
      <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-emerald-600/20" />
      <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-emerald-600/20" />
    </div>
  )
}
