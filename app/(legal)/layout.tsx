/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.950Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: layout          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
import React from 'react'
import { ShieldAlert, FileSearch, Terminal } from 'lucide-react'

/**
 * @description LEGAL_LAYOUT: โครงสร้างหลักสำหรับหน้ากฎหมายและข้อตกลง
 * ✅ VERSION: 5.2.0 (High-Security Frame)
 * ✅ DESIGN: Industrial Sharp (Mode B)
 */

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white pb-32 pt-24 font-sans">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid & Fixed Accents */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Side Decorative Terminal Bar: ปรับตำแหน่งและเพิ่ม Interactive Element */}
      <div className="fixed left-6 top-1/2 hidden -translate-y-1/2 space-y-8 opacity-20 transition-all duration-500 hover:opacity-100 lg:block">
        <div className="flex flex-col items-center gap-4">
          <Terminal size={14} className="text-[#020617]" />
          <div className="h-32 w-[2px] bg-gradient-to-b from-[#020617] via-[#FCDE09] to-transparent" />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-950 [writing-mode:vertical-lr]">
            Protocol_Compliance_Active
          </span>
          <ShieldAlert size={16} className="text-[#020617]" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        {/* 📑 MAIN_DOCUMENT_CONTAINER: Sharp Edges & Hard Shadows */}
        <div className="shadow-sharp relative overflow-hidden border-[3px] border-slate-950 bg-white p-8 md:p-16 lg:p-24">
          {/* Decorative Corner: สัญลักษณ์ความปลอดภัย */}
          <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
            <div className="absolute right-[-30px] top-[10px] w-[120px] rotate-45 bg-[#FCDE09] py-1 text-center font-mono text-[8px] font-black uppercase tracking-widest text-slate-950 shadow-sm">
              Secured_Doc
            </div>
          </div>

          <div className="absolute right-8 top-8 text-slate-950/5">
            <FileSearch size={120} strokeWidth={1} />
          </div>

          {/* Render Privacy/Terms content here */}
          <div className="relative z-10">{children}</div>
        </div>

        {/* 📑 DOCUMENT_METADATA_FOOTER: อัปเดตเวอร์ชันและคุมโทนสี */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="shadow-sharp-sm h-3 w-3 bg-[#020617]" />
            <span>Official_Enforcement_v3.2.2026</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-950">JP_SYSTEM</span>
              <span className="text-slate-200">|</span>
              <span className="text-slate-400">LEGAL_TERMINAL_01</span>
            </div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
