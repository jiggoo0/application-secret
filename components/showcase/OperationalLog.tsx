/** @format */

import React from 'react'
import { cn } from '@/lib/utils'

interface CaseLog {
  day: number
  event: string
  status: string
}

/**
 * 🛠️ COMPONENT: OperationalLog
 * STYLE: Industrial Audit Trail / Dark Mode Execution
 * ✅ FIXED: ป้องกัน Runtime Error ด้วยการกำหนด Default Value []
 */
export const OperationalLog = ({ logs = [] }: { logs?: CaseLog[] }) => {
  // 🛡️ CHECK_POINT: ถ้าไม่มีข้อมูล ให้โศว์สถานะรอคิว (Pending)
  if (!logs || logs.length === 0) {
    return (
      <div className="border-2 border-dashed border-slate-800 bg-[#020617] p-10 text-center">
        <span className="animate-pulse font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          [!] Awaiting_Operational_Data_Sequence...
        </span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden border border-[#020617] bg-[#020617] p-8 md:p-10">
      {/* 🟢 HEADER_SECTION: Audit Metadata */}
      <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-ping bg-[#FCDE09]" />
          <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
            Operational_Timeline_v.2025
          </h3>
        </div>
        <span className="font-mono text-[9px] font-bold uppercase italic text-slate-500">
          STATION: OP_CENTRAL_01
        </span>
      </div>

      {/* 🏗️ TIMELINE_INFRASTRUCTURE */}
      <div className="space-y-0">
        {logs?.map((log, i) => (
          <div key={i} className="group relative flex border-l-2 border-white/10 pb-12 last:pb-0">
            {/* Hard Square Node: จุดเชื่อมต่อระบบ */}
            <div className="absolute -left-[7px] top-0 h-[12px] w-[12px] border-2 border-[#FCDE09] bg-[#020617] transition-all group-hover:scale-125" />

            <div className="flex-1 pl-8 md:pl-10">
              <div className="mb-3 flex items-center gap-4">
                <span className="bg-white/5 px-2 py-0.5 font-mono text-[11px] font-black italic text-[#FCDE09]">
                  DAY_{log.day.toString().padStart(2, '0')}
                </span>
                <div className="h-[1px] flex-1 bg-white/5" />
                <span
                  className={cn(
                    'px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest',
                    log.status === 'VERIFIED' || log.status === 'APPROVED'
                      ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                      : 'border border-white/10 bg-white/5 text-slate-500',
                  )}
                >
                  {log.status}
                </span>
              </div>

              <p className="font-thai text-[14px] font-bold leading-relaxed tracking-tight text-slate-300">
                {log.event}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏗️ BACKGROUND_MARK: Decorative Industrial Text */}
      <div className="pointer-events-none absolute bottom-4 right-4 select-none opacity-[0.02]">
        <span className="font-mono text-7xl font-black uppercase italic text-white">INTERNAL</span>
      </div>
    </div>
  )
}
