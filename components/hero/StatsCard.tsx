/** @format */

import React from 'react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string
  unit: string
  className?: string
}

/**
 * 🛰️ COMPONENT: STATS_CARD_PROTOCOL
 * @description แสดงผลข้อมูลเชิงสถิติด้วยดีไซน์แบบ Technical Grid
 * @version 2025.1.1
 */
export const StatsCard = ({ label, value, unit, className }: StatsCardProps) => (
  <div
    className={cn(
      'group flex flex-col border-l-2 border-slate-100 py-1 pl-6 pr-4 transition-all duration-500 hover:border-[#FCDE09] hover:bg-slate-50/50',
      className,
    )}
  >
    <div className="flex items-baseline gap-1.5">
      {/* 🔢 Main Value - เน้นความหนักแน่นด้วย Font Black และ Tracking Tighter */}
      <span className="text-4xl font-black tracking-tighter text-[#020617] transition-colors duration-300 group-hover:text-[#020617]">
        {value}
      </span>

      {/* 🏷️ Unit - ตัวพิมพ์ใหญ่เพื่อความเป็นสากลและแยกสัดส่วนชัดเจน */}
      <span className="text-[11px] font-black uppercase tracking-tight text-slate-400 group-hover:text-slate-500">
        {unit}
      </span>
    </div>

    {/* 📋 Technical Label - ใช้ Font Mono เพื่อสื่อถึงระบบฐานข้อมูลและความแม่นยำ */}
    <span className="mt-1 font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 group-hover:text-[#020617]">
      {label}
    </span>
  </div>
)
