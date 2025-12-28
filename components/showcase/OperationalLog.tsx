/** @format */

import React from "react"
import { cn } from "@/lib/utils"

interface CaseLog {
  day: number
  event: string
  status: string
}

/**
 * 🛠️ COMPONENT: OperationalLog
 * STYLE: Industrial Audit Trail / Strict Vertical Grid
 */
export const OperationalLog = ({ logs }: { logs: CaseLog[] }) => {
  return (
    <div className="relative overflow-hidden border border-slate-950 bg-white p-10">
      {/* 🟢 HEADER_SECTION: Audit Metadata */}
      <div className="mb-12 flex items-center justify-between border-b border-slate-950 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse bg-[#FCDE09]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950">
            Operational_Timeline_v.2025
          </h3>
        </div>
        <span className="text-[9px] font-bold uppercase italic text-slate-400">
          Ref: LOG_STR_001
        </span>
      </div>

      {/* 🏗️ TIMELINE_INFRASTRUCTURE */}
      <div className="space-y-0">
        {logs.map((log, i) => (
          <div
            key={i}
            className="group relative flex border-l-2 border-slate-950 pb-12 last:pb-0"
          >
            {/* Hard Square Node */}
            <div className="absolute -left-[7px] top-0 h-[12px] w-[12px] border-2 border-slate-950 bg-white transition-colors group-hover:bg-[#FCDE09]" />

            <div className="flex-1 pl-10">
              <div className="mb-3 flex items-center gap-4">
                <span className="bg-slate-100 px-2 py-0.5 text-[11px] font-black italic text-slate-950">
                  DAY_{log.day.toString().padStart(2, "0")}
                </span>
                <div className="h-[1px] flex-1 bg-slate-100" />
                <span
                  className={cn(
                    "border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest",
                    log.status === "VERIFIED"
                      ? "border-emerald-500 text-emerald-600"
                      : "border-slate-300 text-slate-500"
                  )}
                >
                  {log.status}
                </span>
              </div>

              <p className="text-[13px] font-medium uppercase leading-relaxed tracking-tight text-slate-700">
                {log.event}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏗️ BACKGROUND_MARK: Decorative Industrial Text */}
      <div className="pointer-events-none absolute bottom-4 right-4 select-none opacity-[0.03]">
        <span className="text-6xl font-black uppercase italic">INTERNAL</span>
      </div>
    </div>
  )
}
