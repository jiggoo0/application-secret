/** @format */
import React from "react"
import { cn } from "@/lib/utils"

const categories = [
  "ALL_SERVICES",
  "IMMIGRATION",
  "FINANCIAL",
  "DOCUMENTATION",
  "INFRASTRUCTURE",
]

interface ServiceFilterProps {
  active: string
  // ✅ ใช้ _category เพื่อบอก ESLint ว่า parameter นี้ใน type definition
  // อาจไม่ได้ถูกเรียกใช้โดยตรงในไฟล์นี้ (ป้องกัน warning 'category' defined but never used)
  onChange: (_category: string) => void
}

/**
 * 🛰️ COMPONENT: ServiceFilter
 * ระบบกรองข้อมูลบริการ (Operational_Filter_Module)
 */
export const ServiceFilter = ({ active, onChange }: ServiceFilterProps) => (
  <div className="relative mb-16">
    {/* 🏷️ Filter Label */}
    <div className="mb-6 flex items-center gap-3">
      <div className="h-2 w-2 bg-slate-950" />
      <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
        Filter_Selector_Module
      </span>
    </div>

    {/* 🎛️ Filter Buttons Container */}
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => {
        const isActive = active === cat

        return (
          <button
            key={cat}
            // ✅ cat ตัวนี้ถูกใช้ใน onChange(cat) แล้ว จะไม่ติด warning
            onClick={() => onChange(cat)}
            className={cn(
              "group relative overflow-hidden px-6 py-3 transition-all duration-300",
              "font-mono text-[10px] font-black uppercase tracking-widest",
              isActive
                ? "bg-slate-950 text-brand shadow-[8px_8px_0px_0px_rgba(252,222,9,0.15)]"
                : "border border-slate-100 bg-white text-slate-400 hover:border-slate-950 hover:text-slate-950"
            )}
          >
            {/* ⚡ Active Indicator Dot */}
            {isActive && (
              <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-brand" />
            )}

            <span className="relative z-10">{cat}</span>

            {/* 💡 Subtle Background Code for Inactive */}
            {!isActive && (
              <span className="absolute -bottom-1 -right-1 font-mono text-[6px] opacity-0 transition-opacity group-hover:opacity-10">
                SELECT_STK
              </span>
            )}
          </button>
        )
      })}
    </div>

    {/* 📏 Decorative Line */}
    <div className="absolute -bottom-6 left-0 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
  </div>
)
