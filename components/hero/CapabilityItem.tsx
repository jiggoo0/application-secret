/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.926Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: CapabilityItem          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CapabilityItemProps {
  icon: LucideIcon
  title: string
  label: string
  className?: string
}

/**
 * 🧱 COMPONENT: CAPABILITY_ITEM_REDESIGN
 * PROTOCOL: JP-VisualDocs / Industrial-Trust / Sharp-System
 */
export const CapabilityItem = ({ icon: Icon, title, label, className }: CapabilityItemProps) => {
  return (
    <div
      className={cn(
        'group relative flex items-center gap-6 border-2 border-slate-900 bg-white p-6',
        'transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50',
        'hover:shadow-[14px_14px_0px_#020617]',
        className,
      )}
    >
      {/* SYSTEM INDEX BAR */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#FCDE09]" />

      {/* ICON BLOCK */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border-2 border-slate-900 bg-slate-950 text-[#FCDE09] transition-all group-hover:bg-[#FCDE09] group-hover:text-[#020617]">
        <Icon size={26} strokeWidth={2} />
      </div>

      {/* TEXT BLOCK */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          {label}
        </span>
        <span className="font-thai text-[15px] font-black leading-tight tracking-wide text-slate-950">
          {title}
        </span>
      </div>

      {/* HOVER SIGNAL */}
      <div className="absolute bottom-3 right-3 h-2 w-2 bg-[#FCDE09] opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
