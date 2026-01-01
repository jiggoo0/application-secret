/** @format */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Cpu, CheckCircle2, AlertCircle, Scan, ArrowDown } from 'lucide-react'

interface CaseLog {
  day: number
  event: string
  status: string
}

/**
 * 🛰️ COMPONENT: OperationalLog_Protocol
 * @version 2026.0.5 (Clean Audit Protocol)
 * ✅ FIXED: Removed unused 'Terminal' and 'Info' to resolve ESLint errors.
 */
export const OperationalLog = ({ logs = [] }: { logs?: CaseLog[] }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="relative overflow-hidden border-2 border-dashed border-slate-800 bg-[#020617] p-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-20 [background-size:20px_20px]" />
        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-14 w-14 animate-bounce items-center justify-center border-2 border-red-500/50 bg-red-500/10 text-red-500">
            <AlertCircle size={28} />
          </div>
          <h4 className="font-mono text-xs font-black uppercase tracking-[0.5em] text-slate-500">
            [FATAL_ERROR]: No_Log_Data_Found
          </h4>
        </div>
      </div>
    )
  }

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase()
    if (['VERIFIED', 'APPROVED', 'SUCCESS', 'DONE'].includes(s))
      return {
        color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        icon: <CheckCircle2 size={12} />,
      }
    if (['ANALYZED', 'EXECUTED', 'PROCESSING', 'ACTION'].includes(s))
      return {
        color: 'text-[#FCDE09] border-[#FCDE09]/30 bg-[#FCDE09]/10',
        icon: <Cpu size={12} />,
      }
    if (['WARNING', 'CRITICAL', 'REJECTED'].includes(s))
      return {
        color: 'text-red-400 border-red-500/30 bg-red-500/10',
        icon: <AlertCircle size={12} />,
      }
    // Default style: Minimalist slate
    return { color: 'text-slate-400 border-white/10 bg-white/5', icon: null }
  }

  return (
    <div className="relative overflow-hidden border-2 border-[#020617] bg-[#020617] p-8 shadow-[20px_20px_0px_#f1f5f9] md:p-16">
      {/* 🧩 UI_INFRA: Terminal Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* 📁 HEADER: System Diagnostics */}
      <div className="relative z-10 mb-20 flex flex-col justify-between border-b-2 border-white/10 pb-12 md:flex-row md:items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-[#FCDE09] text-[#020617] shadow-[4px_4px_0px_#fff]">
              <Scan size={24} strokeWidth={2.5} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.6em] text-white">
                Execution_Log <span className="text-[#FCDE09]">v.26</span>
              </h3>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Protocol: Secure_Audit_Sequence
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-end gap-2 font-mono md:mt-0">
          <div className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-2">
            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-[#FCDE09]">
              System_Integrity: 100%
            </span>
          </div>
          <span className="text-[9px] font-bold italic text-slate-500">
            LOG_ENTRY_COUNT: {logs.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 🏗️ TIMELINE_MATRIX */}

      <div className="relative z-10">
        <div className="absolute left-[7px] top-0 h-full w-[2px] bg-gradient-to-b from-[#FCDE09] via-[#FCDE09]/20 to-transparent" />

        <div className="space-y-4">
          {logs.map((log, i) => {
            const style = getStatusStyle(log.status)
            return (
              <div key={i} className="group relative flex pb-12 last:pb-0">
                <div className="absolute left-0 top-1.5 z-20 flex h-4 w-4 items-center justify-center border-2 border-[#FCDE09] bg-[#020617] transition-all duration-500 group-hover:scale-125 group-hover:bg-[#FCDE09]">
                  <div className="h-1 w-1 bg-[#FCDE09] group-hover:bg-[#020617]" />
                </div>

                <div className="flex-1 pl-12 md:pl-16">
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <span className="font-mono text-[14px] font-black italic tracking-tighter text-white">
                      T-MINUS{' '}
                      <span className="text-[#FCDE09]">{log.day.toString().padStart(2, '0')}</span>
                      _DAY
                    </span>
                    <div
                      className={cn(
                        'flex items-center gap-2 border-2 px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500',
                        style.color,
                      )}
                    >
                      {style.icon}
                      {log.status}
                    </div>
                  </div>

                  <div className="relative border-l border-white/5 bg-white/[0.02] p-6 transition-all duration-500 group-hover:border-[#FCDE09]/30 group-hover:bg-white/[0.05]">
                    <p className="font-thai text-[16px] font-bold leading-relaxed text-slate-400 transition-colors duration-500 group-hover:text-white">
                      {log.event}
                    </p>
                    <ArrowDown
                      size={14}
                      className="absolute -bottom-3 -left-[7.5px] text-white/10 group-hover:text-[#FCDE09]"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-10 rotate-[-5deg] select-none opacity-[0.05]">
        <span className="font-mono text-[180px] font-black text-white">ARCHIVE</span>
      </div>
    </div>
  )
}
