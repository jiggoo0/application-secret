/** * @format
 * @description OPERATIONAL_LOG: Tactical Timeline & Audit Trail (V2.6)
 * ✅ ENFORCEMENT: Sharp-Edge Nodes, Status-Responsive Borders, Heavy Typography
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface CaseLog {
  day: number
  event: string
  status: string
}

export const OperationalLog = ({ logs }: { logs: CaseLog[] }) => {
  return (
    <div className="relative overflow-hidden border-2 border-slate-950 bg-white p-10 selection:bg-brand selection:text-slate-950">
      {/* 🧩 BLUEPRINT_CANVAS: ลายกริตจางๆ 2% */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.02]" />

      {/* 🟢 HEADER_SECTION: Audit Metadata */}
      <div className="relative z-10 mb-16 flex items-center justify-between border-b-2 border-slate-950 pb-8">
        <div className="flex items-center gap-4">
          <div className="relative flex h-4 w-4 items-center justify-center">
            <div className="absolute h-full w-full animate-ping bg-brand/30" />
            <div className="h-2.5 w-2.5 bg-brand shadow-sharp-sm" />
          </div>
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-950">
              Operational_Timeline_v.2025
            </h3>
            <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Standard_Operation_Procedure // Secure_Log
            </p>
          </div>
        </div>
        <span className="font-mono text-[10px] font-black uppercase italic text-slate-300">
          REF::LOG_STR_001
        </span>
      </div>

      {/* 🏗️ TIMELINE_INFRASTRUCTURE */}
      <div className="relative z-10 space-y-0">
        {logs.map((log, i) => {
          const isVerified = log.status === 'VERIFIED' || log.status === 'COMPLETED'

          return (
            <div
              key={i}
              className="group relative flex border-l-4 border-slate-950 pb-16 last:pb-0"
            >
              {/* Hard Square Node: สี่เหลี่ยมล็อกพิกัด */}
              <div
                className={cn(
                  'absolute -left-[10px] top-0 h-[16px] w-[16px] border-2 border-slate-950 bg-white transition-all duration-300',
                  'group-hover:scale-125 group-hover:bg-brand group-hover:shadow-sharp-sm',
                )}
              />

              <div className="flex-1 pl-12">
                <div className="mb-4 flex items-center gap-6">
                  {/* Day Indicator */}
                  <span className="bg-slate-950 px-3 py-1 font-mono text-[12px] font-black italic text-brand">
                    DAY_{log.day.toString().padStart(2, '0')}
                  </span>

                  <div className="h-px flex-1 bg-slate-100 transition-colors group-hover:bg-slate-200" />

                  {/* Status Badge */}
                  <span
                    className={cn(
                      'border-2 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-tighter transition-all',
                      isVerified
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                        : 'border-slate-200 bg-slate-50 text-slate-400',
                    )}
                  >
                    {log.status}
                  </span>
                </div>

                {/* Event Description */}
                <div className="relative">
                  <p className="font-thai text-lg font-bold uppercase leading-snug tracking-tight text-slate-600 transition-colors group-hover:text-slate-950">
                    {log.event}
                  </p>
                  {/* Deco line on hover */}
                  <div className="mt-4 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-12" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 🏗️ BACKGROUND_MARK: Decorative Industrial Text */}
      <div className="pointer-events-none absolute -bottom-6 -right-4 select-none opacity-[0.04]">
        <span className="text-9xl font-black uppercase italic tracking-tighter">INTERNAL</span>
      </div>
    </div>
  )
}
