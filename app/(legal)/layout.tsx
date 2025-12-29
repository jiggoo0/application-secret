/** @format */
import React from "react"
import { ShieldAlert, FileSearch } from "lucide-react"

/**
 * @description LEGAL_LAYOUT: โครงสร้างหลักสำหรับหน้ากฎหมายและข้อตกลง
 * @rules Strictly followed Mode A (Code) and Mode B (Industrial Sharp Design)
 */

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-white pb-32 pt-24 font-sans">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid & Fixed Accents (MODE B) */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      {/* Side Decorative Terminal Bar */}
      <div className="fixed left-10 top-1/2 hidden -translate-y-1/2 space-y-8 opacity-20 transition-opacity hover:opacity-100 lg:block">
        <div className="flex flex-col items-center gap-2">
          <ShieldAlert size={16} className="text-[#020617]" />
          <div className="h-20 w-px bg-[#020617]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
            Legal_Compliance
          </span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        {/* 📑 MAIN_DOCUMENT_CONTAINER: Sharp Edges & Hard Shadows */}
        <div className="relative overflow-hidden border-2 border-[#020617] bg-white p-8 shadow-sharp md:p-20">
          {/* Corner Elements */}
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-b-2 border-l-2 border-slate-50" />
          <div className="absolute right-4 top-4 text-[#020617]/10">
            <FileSearch size={80} strokeWidth={1} />
          </div>

          {children}
        </div>

        {/* 📑 DOCUMENT_METADATA_FOOTER */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-[#FCDE09] shadow-sharp" />
            <span>Official_Enforcement_v2025.1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#020617]">JP_VISUAL.DOCS</span>
            <span className="text-slate-100">/</span>
            <span>LEGAL_DEPARTMENT_TERMINAL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
