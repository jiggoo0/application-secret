/** * @format
 * @description LEGAL_LAYOUT: The Framework of Authority (V2.1.0)
 * ✅ ENFORCEMENT: Absolute Sharp Edges, Tactical Sidebar HUD, Zero-Radius Container
 */

import React from 'react'
import { ShieldAlert, FileSearch, Fingerprint, Lock } from 'lucide-react'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white pb-32 pt-24 font-sans selection:bg-brand selection:text-slate-950">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid (Mode B) */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      {/* 📟 TACTICAL_SIDEBAR: Fixed Terminal HUD */}
      <aside className="fixed left-8 top-1/2 hidden -translate-y-1/2 space-y-12 opacity-20 transition-all duration-500 hover:opacity-100 lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-slate-950 p-2 text-brand shadow-sharp-sm">
            <Lock size={14} strokeWidth={2.5} />
          </div>
          <div className="h-32 w-[2px] bg-gradient-to-b from-slate-950 via-slate-200 to-transparent" />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-950 [writing-mode:vertical-lr]">
            Security_Protocol_V3
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Fingerprint size={18} className="text-slate-400" />
          <div className="h-16 w-[1px] border-l border-dashed border-slate-300" />
        </div>
      </aside>

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        {/* 📑 MAIN_DOCUMENT_VAULT: The Core Content Wrapper */}
        <div className="relative overflow-hidden border-[3px] border-slate-950 bg-white p-8 shadow-sharp-brand md:p-24">
          {/* Decorative Technical Accents */}
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 border-b-2 border-l-2 border-slate-50 transition-colors hover:border-brand/20" />

          <div className="absolute right-6 top-8 text-slate-950/5">
            <FileSearch size={140} strokeWidth={0.5} />
          </div>

          {/* Top Identifier Bar */}
          <div className="mb-16 flex items-center justify-between border-b-2 border-slate-50 pb-8">
            <div className="flex items-center gap-4">
              <ShieldAlert size={20} className="fill-slate-950 text-brand" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Official_Legal_Document
              </span>
            </div>
            <div className="h-2 w-12 bg-slate-100" />
          </div>

          {/* 🖋️ DYNAMIC_CONTENT_SLOT */}
          <div className="relative z-10">{children}</div>

          {/* Bottom Security Seal */}
          <div className="mt-24 flex justify-end opacity-20 transition-opacity hover:opacity-100">
            <div className="border-2 border-slate-950 p-4">
              <div className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-950">
                System_Signature_Hash: <br />
                <span className="text-[10px]">SHA256_AUTH_VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📑 DOCUMENT_METADATA: Footer Information */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 md:flex-row">
          <div className="group flex items-center gap-4">
            <div className="h-4 w-4 bg-brand shadow-sharp-sm transition-transform group-hover:rotate-45" />
            <span className="transition-colors group-hover:text-slate-950">
              Protocol_Enforcement_2025
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-950">JP_VISUAL_DOCS</span>
            <div className="h-[1px] w-6 bg-slate-200" />
            <span className="italic text-slate-300">LEGAL_TERMINAL_NODE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
