/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.863Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: ServiceFilter          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
import React from 'react'
import { cn } from '@/lib/utils'

const categories = ['ALL_SERVICES', 'IMMIGRATION', 'FINANCIAL', 'DOCUMENTATION', 'INFRASTRUCTURE']

interface ServiceFilterProps {
  active: string
  // ✅ ป้องกัน ESLint warning: parameter อาจไม่ได้ใช้ตรงนี้
  onChange: (_category: string) => void
}

/**
 * 🛰️ COMPONENT: ServiceFilter
 * Operational Filter Module สำหรับกรองบริการ
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

    {/* 🎛️ Filter Buttons */}
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => {
        const isActive = active === cat

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              'group relative overflow-hidden px-6 py-3 transition-all duration-300',
              'font-mono text-[10px] font-black uppercase tracking-widest',
              isActive
                ? 'text-brand bg-slate-950 shadow-[8px_8px_0px_0px_rgba(252,222,9,0.15)]'
                : 'border border-slate-100 bg-white text-slate-400 hover:border-slate-950 hover:text-slate-950',
            )}
          >
            {/* ⚡ Active Indicator Dot */}
            {isActive && <span className="bg-brand absolute right-1 top-1 h-1 w-1 rounded-full" />}

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
