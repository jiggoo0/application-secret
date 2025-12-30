/** * @format
 * @description EVIDENCE_BOARD: Industrial Asset Tracking (V2.6)
 * ✅ ENFORCEMENT: Sharp-Edge Geometry, Dot-Matrix Substrate, Kinetic Markers
 */

import React from 'react'

interface Artifact {
  label: string
  type: string
  description: string
}

export const EvidenceBoard = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="shadow-sharp relative rounded-none border-2 border-slate-950 bg-white p-6 selection:bg-brand selection:text-slate-950 md:p-10">
      {/* 🧩 BLUEPRINT_SUBSTRATE: ลายกริตภายในบอร์ดหลัก */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.02]" />

      {/* 📁 HEADER: Operational Identifier --- */}
      <div className="relative z-10 mb-12 flex items-center justify-between border-b-2 border-slate-950 pb-8">
        <div className="flex items-center gap-5">
          {/* Active Terminal Indicator */}
          <div className="relative flex h-6 w-6 items-center justify-center bg-slate-950">
            <div className="h-2 w-2 animate-pulse bg-brand" />
            <div className="absolute -inset-1 border border-slate-950 opacity-20" />
          </div>
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-950">
              Technical_Evidence_Artifacts
            </h3>
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Secured_Data_Stream // Protocol_Active
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-black text-slate-950">
            COUNT::{artifacts.length.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* 🏗️ ARTIFACT_GRID: Sharp Edge Infrastructure --- */}
      <div className="relative z-10 grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
        {artifacts.map((art, i) => (
          <div
            key={i}
            className="group relative flex flex-col bg-white transition-all duration-500 hover:z-20 hover:shadow-[20px_20px_0px_0px_rgba(var(--brand-rgb),0.1)]"
          >
            {/* Metadata Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white p-5 transition-colors group-hover:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-brand group-hover:animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand">
                  ASSET_TYPE::{art.type}
                </span>
              </div>
              <span className="font-mono text-[9px] font-black text-slate-300 group-hover:text-slate-700">
                REF_0{i + 1}
              </span>
            </div>

            {/* Asset Preview: Dot Matrix Pattern */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 transition-colors group-hover:bg-slate-100/50">
              <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-[0.08] [background-size:8px_8px]" />

              {/* Central Watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-slate-200 bg-white/50 px-6 py-3 backdrop-blur-sm transition-all group-hover:border-brand">
                  <span className="block text-[9px] font-black uppercase tracking-[0.8em] text-slate-400 transition-all group-hover:text-slate-950">
                    CONFIDENTIAL
                  </span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <h4 className="mb-4 text-xl font-black uppercase italic leading-none tracking-tighter text-slate-950 transition-colors group-hover:text-brand">
                {art.label}
              </h4>
              <p className="font-thai text-[13px] font-bold leading-relaxed text-slate-500 transition-colors group-hover:text-slate-700">
                {art.description}
              </p>
            </div>

            {/* Mechanical Corner Marker */}
            <div className="absolute bottom-0 right-0 h-4 w-4 translate-x-1 translate-y-1 bg-slate-950 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
