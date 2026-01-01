/** @format */

'use client'

import React from 'react'
import { ShieldCheck, EyeOff, Activity, Lock, Maximize2 } from 'lucide-react'

interface Artifact {
  label: string
  type: string
  description: string
  title?: string
  status?: 'VERIFIED' | 'REDACTED' | 'PROCESSED'
}

/**
 * 🛰️ COMPONENT: EvidenceBoard_Protocol
 * @version 2026.0.3 (Cleanup & Visual Audit)
 * ✅ FIXED: Removed unused 'FileText', 'Search', and 'cn' to pass ESLint audit.
 */
export const EvidenceBoard = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="relative rounded-none border-2 border-[#020617] bg-white p-6 shadow-[12px_12px_0px_0px_#020617] md:p-12">
      {/* 🧩 UI_INFRA: Background Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#020617_1px,transparent_1px),linear-gradient(90deg,#020617_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* 📁 HEADER_INTERFACE */}
      <div className="relative z-10 mb-14 flex flex-col justify-between border-b-4 border-[#020617] pb-10 md:flex-row md:items-end">
        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <div className="relative flex h-10 w-10 items-center justify-center bg-[#020617] shadow-[4px_4px_0px_#FCDE09]">
              <Activity className="animate-pulse text-[#FCDE09]" size={18} />
            </div>
            <div>
              <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.5em] text-[#020617]">
                Evidence_Vault_Registry
              </h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Node_Secure: JP-VSD-2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700 shadow-sm">
              <ShieldCheck size={12} /> ENCRYPTED_STORAGE
            </div>
            <div className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black text-slate-500 shadow-sm">
              <EyeOff size={12} /> PII_REDACTION_STRICT
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-end gap-1 font-mono md:mt-0">
          <span className="text-[10px] font-black text-slate-400">ARTIFACT_LOAD_SEQUENCE</span>
          <span className="text-2xl font-black text-[#020617]">
            {artifacts.length.toString().padStart(2, '0')}
            <span className="text-slate-300">/99</span>
          </span>
        </div>
      </div>

      {/* 🏗️ ARTIFACT_MATRIX */}

      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {artifacts.map((art, i) => (
          <div
            key={i}
            className="group relative flex flex-col border-2 border-slate-200 bg-white transition-all duration-500 hover:border-[#020617] hover:shadow-[10px_10px_0px_rgba(2,6,23,0.05)]"
          >
            {/* Metadata Terminal Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 bg-slate-50 p-4 transition-all duration-500 group-hover:border-[#020617] group-hover:bg-[#020617]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:animate-ping group-hover:bg-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-500 group-hover:text-white">
                  DOC_REF: {art.type.toUpperCase()}_{new Date().getFullYear()}_
                  {i.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={10} className="text-slate-300 group-hover:text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black text-slate-400 group-hover:text-[#FCDE09]">
                  STRICT_CONFIDENTIAL
                </span>
              </div>
            </div>

            {/* Asset Forensic Preview */}
            <div className="relative aspect-video w-full overflow-hidden border-b-2 border-slate-200 bg-slate-100">
              {/* Engineering Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#020617_1.5px,transparent_1.5px)] opacity-[0.05] [background-size:16px_16px]" />

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative flex h-full w-full items-center justify-center border-2 border-dashed border-slate-300 bg-white/40 transition-all duration-500 group-hover:bg-white/80">
                  {/* Watermark */}
                  <div className="absolute rotate-[-15deg] select-none opacity-20 transition-opacity group-hover:opacity-40">
                    <span className="block text-[14px] font-black uppercase tracking-[1em] text-slate-400">
                      JP_AUDIT_VERIFIED
                    </span>
                  </div>

                  {/* Hover Interaction Node */}
                  <div className="z-10 flex translate-y-4 flex-col items-center gap-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex h-14 w-14 cursor-pointer items-center justify-center bg-[#020617] text-[#FCDE09] shadow-sharp transition-transform active:scale-90">
                      <Maximize2 size={24} strokeWidth={2.5} />
                    </div>
                    <span className="bg-[#FCDE09] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]">
                      EXPAND_MANIFEST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Analysis */}
            <div className="p-8 lg:p-10">
              <div className="mb-4 inline-block bg-slate-950 px-2 py-0.5 font-mono text-[9px] font-black text-[#FCDE09]">
                TYPE: {art.type}
              </div>
              <h4 className="mb-5 text-2xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
                {art.label}
              </h4>
              <p className="font-thai text-[15px] font-medium leading-relaxed text-slate-500 group-hover:text-slate-700">
                {art.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏷️ SYSTEM_FOOTER: Data Integrity Check */}
      <footer className="mt-16 flex items-center justify-between border-t-2 border-slate-100 pt-8">
        <div className="flex items-center gap-4 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 text-emerald-600">
            <Activity size={12} />
            CHECKSUM_OK
          </div>
          <span>Security_Seal: ACTIVE</span>
        </div>
        <div className="font-mono text-[10px] font-bold italic text-slate-300">
          TIMESTAMP: {new Date().toISOString().slice(0, 10).replace(/-/g, '.')}
        </div>
      </footer>
    </div>
  )
}
