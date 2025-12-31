/** @format */

import React from 'react'
// ✅ ปรึกษา Master: เพิ่ม Activity เข้าไปในลิสต์ Import เพื่อปิดช่องโหว่
import { FileText, ShieldCheck, Search, EyeOff, Activity } from 'lucide-react'

/** * 🛠️ INTERFACE: Artifact
 * จัดการ Schema ให้แน่นหนาด้วย TypeScript
 */
interface Artifact {
  label: string
  type: string
  description: string
  title?: string
  status?: 'VERIFIED' | 'REDACTED' | 'PROCESSED'
}

/**
 * 🛠️ COMPONENT: EvidenceBoard
 * STYLE: Industrial Sharp (#020617 + #FCDE09)
 */
export const EvidenceBoard = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="relative rounded-none border-2 border-[#020617] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(2,23,1)] md:p-10">
      {/* 📁 HEADER: System Pulse Active */}
      <div className="mb-12 flex flex-col justify-between border-b-2 border-[#020617] pb-8 md:flex-row md:items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-6 w-6 items-center justify-center bg-[#020617]">
              {/* 🟢 Status: Pulse บอกว่าระบบกำลังทำงาน */}
              <div className="h-2 w-2 animate-pulse bg-[#FCDE09]" />
            </div>
            <h3 className="font-mono text-[12px] font-black uppercase tracking-[0.4em] text-[#020617]">
              Technical_Evidence_Archive
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-700">
              <ShieldCheck size={10} /> ENCRYPTED_STORAGE
            </div>
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
              <EyeOff size={10} /> PII_MASKING_ACTIVE
            </div>
          </div>
        </div>
        <div className="mt-4 font-mono text-[10px] font-black text-slate-400 md:mt-0">
          SYSTEM_FETCH_COUNT: {artifacts.length.toString().padStart(2, '0')}
        </div>
      </div>

      {/* 🏗️ ARTIFACT_GRID */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {artifacts.map((art, i) => (
          <div
            key={i}
            className="group relative rounded-none border-2 border-slate-200 bg-white p-0 transition-all duration-300 hover:border-[#020617] hover:shadow-sharp"
          >
            {/* Metadata Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 bg-slate-50 p-4 transition-colors group-hover:border-[#020617] group-hover:bg-[#020617]">
              <div className="flex items-center gap-2">
                <FileText size={12} className="text-slate-400 group-hover:text-[#FCDE09]" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white">
                  REF_ID: {art.type.slice(0, 3)}_{i.toString().padStart(3, '0')}
                </span>
              </div>
              <span className="font-mono text-[10px] font-black text-slate-300 group-hover:text-[#FCDE09]">
                [{art.type}]
              </span>
            </div>

            {/* Asset Preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-slate-200 bg-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(#020617_1.5px,transparent_1.5px)] opacity-[0.08] [background-size:12px_12px]" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative flex h-full w-full items-center justify-center border-2 border-dashed border-slate-300 bg-white/50 group-hover:border-slate-400">
                  <div className="absolute -rotate-12 select-none text-center">
                    <span className="block text-[12px] font-black uppercase tracking-[0.8em] text-slate-200/60 transition-colors group-hover:text-slate-300">
                      JP_AUDIT_STAMP
                    </span>
                  </div>

                  <div className="z-10 flex scale-0 flex-col items-center gap-2 transition-transform duration-300 group-hover:scale-100">
                    <div className="bg-[#020617] p-3 text-[#FCDE09]">
                      <Search size={20} />
                    </div>
                    <span className="bg-[#FCDE09] px-2 py-0.5 font-mono text-[8px] font-black uppercase text-[#020617]">
                      Expand_Evidence
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Label & Description */}
            <div className="p-8">
              <h4 className="mb-4 text-lg font-black uppercase italic leading-none tracking-tighter text-[#020617]">
                {art.label}
              </h4>
              <p className="font-sans text-[12px] font-medium leading-relaxed text-slate-600">
                {art.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏷️ FOOTER: Validation Meta */}
      <div className="mt-12 flex items-center gap-3 border-t border-slate-100 pt-6 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
        <Activity size={10} className="text-[#FCDE09]" />
        Integrity_Check_Status: 100%_Passed_Checksum
      </div>
    </div>
  )
}
