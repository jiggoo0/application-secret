/** @format */
import React from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: string
  unit: string
  className?: string
}

export const StatsCard = ({
  label,
  value,
  unit,
  className,
}: StatsCardProps) => (
  <div
    className={cn(
      "group flex flex-col border-l-2 border-slate-100 py-1 pl-6 pr-4 transition-all duration-300 hover:border-brand",
      className
    )}
  >
    <div className="flex items-baseline gap-1.5">
      {/* 🔢 Main Value - ใช้ font-sans (Inter) เพื่อความโมเดิร์นและหนักแน่น */}
      <span className="text-4xl font-black tracking-tighter text-slate-950 transition-colors group-hover:text-brand">
        {value}
      </span>

      {/* 🏷️ Unit - ตัวพิมพ์ใหญ่แบบหนาเพื่อแยกความต่าง */}
      <span className="text-[11px] font-black uppercase tracking-tight text-slate-400">
        {unit}
      </span>
    </div>

    {/* 📋 Technical Label - ใช้ font-mono เพื่อสื่อถึงรหัสหรือระบบข้อมูล */}
    <span className="mt-1 font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 transition-colors group-hover:text-slate-600">
      {label}
    </span>
  </div>
)
