/** @format */

import React from 'react'
/** * MODE A: Cleanup Enforcement
 * ลบการนำเข้า cn เนื่องจากไม่ได้ถูกใช้งานใน Component นี้ (Fix ESLint Warning)
 */

interface Artifact {
  label: string
  type: string
  description: string
}

/**
 * 🛠️ COMPONENT: EvidenceBoard
 * STYLE: Industrial Asset Tracking / Non-Radius Sharp Design
 * * 📐 DESIGN SPEC:
 * - Grid 1px Border-Collapse Logic
 * - Dot Matrix Pattern Placeholder
 * - Zero Border-Radius Policy
 */
export const EvidenceBoard = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="relative rounded-none border-2 border-slate-950 bg-white p-6 shadow-sharp md:p-10">
      {/* 📁 HEADER: Artifact Identification */}
      <div className="mb-12 flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-5 w-5 items-center justify-center rounded-none bg-slate-950">
            <div className="h-2 w-2 bg-[#FCDE09]" />
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-950">
            Technical_Evidence_Artifacts
          </h3>
        </div>
        <div className="font-mono text-[10px] font-bold text-slate-400">
          QUERY_COUNT: {artifacts.length.toString().padStart(2, '0')}
        </div>
      </div>

      {/* 🏗️ ARTIFACT_GRID: Sharp Edge Container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {artifacts.map((art, i) => (
          <div
            key={i}
            className="group relative rounded-none border border-slate-200 bg-white p-0 transition-all duration-300 hover:border-slate-950"
          >
            {/* Metadata Header: ใช้ Slate 950 เมื่อ Hover เพื่อความ High-Contrast */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4 transition-colors group-hover:bg-slate-950">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#FCDE09]">
                ASSET_TYPE: {art.type}
              </span>
              <span className="text-[9px] font-black uppercase text-slate-300">0{i + 1}</span>
            </div>

            {/* Asset Preview Placeholder: Dot Matrix & Watermark */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-200 bg-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-20 [background-size:10px_10px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-dashed border-slate-300 p-4 text-center">
                  <span className="block rotate-[-5deg] text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">
                    SECURED_DOCUMENT_STUB
                  </span>
                </div>
              </div>
            </div>

            {/* Label & Description: Typography Hierarchy */}
            <div className="p-6">
              <h4 className="mb-3 text-sm font-black uppercase italic tracking-tight text-slate-950">
                {art.label}
              </h4>
              <p className="text-[11px] font-medium uppercase leading-relaxed tracking-tight text-slate-500">
                {art.description}
              </p>
            </div>

            {/* Industrial corner mark: Visual feedback on hover */}
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-slate-950 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
