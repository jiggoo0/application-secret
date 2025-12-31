/** @format */

import React from 'react'
import { cn } from '@/lib/utils'
import { Terminal, Cpu, CheckCircle2, AlertCircle, Info } from 'lucide-react'

interface CaseLog {
  day: number
  event: string
  status: string
}

/**
 * 🛠️ COMPONENT: OperationalLog
 * STYLE: Industrial Audit Trail / Dark Mode Execution
 * ✅ UPDATED: เพิ่ม Logic การเลือกไอคอนตาม Status และปรับปรุง UI ให้ดูเป็น Terminal มากขึ้น
 */
export const OperationalLog = ({ logs = [] }: { logs?: CaseLog[] }) => {
  // 🛡️ CHECK_POINT: ระบบสำรองหากไม่มีข้อมูล
  if (!logs || logs.length === 0) {
    return (
      <div className="border-2 border-dashed border-slate-800 bg-[#020617] p-16 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 animate-pulse items-center justify-center border-2 border-slate-800">
          <Terminal size={20} className="text-slate-700" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-600">
          [CRITICAL_ERROR]: Data_Stream_Missing
        </span>
      </div>
    )
  }

  // Helper สำหรับเลือกสีและไอคอนตามสถานะ
  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase()
    if (s === 'VERIFIED' || s === 'APPROVED' || s === 'SUCCESS')
      return {
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
        icon: <CheckCircle2 size={10} />,
      }
    if (s === 'ANALYZED' || s === 'EXECUTED' || s === 'PROCESSING')
      return { color: 'text-[#FCDE09] border-[#FCDE09]/20 bg-[#FCDE09]/5', icon: <Cpu size={10} /> }
    if (s === 'WARNING' || s === 'CRITICAL')
      return {
        color: 'text-red-400 border-red-500/20 bg-red-500/5',
        icon: <AlertCircle size={10} />,
      }
    return { color: 'text-slate-400 border-white/10 bg-white/5', icon: <Info size={10} /> }
  }

  return (
    <div className="relative overflow-hidden border-2 border-[#020617] bg-[#020617] p-8 shadow-[12px_12px_0px_0px_rgba(2,6,23,0.3)] md:p-12">
      {/* 🟢 HEADER_SECTION: Audit Metadata */}
      <div className="mb-16 flex flex-col justify-between border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse bg-[#FCDE09]" />
            <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-[#FCDE09]">
              Operational_Timeline_v.2025
            </h3>
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Terminal size={10} /> NODE: OP_CENTRAL_01
            </span>
            <span className="hidden text-white/10 md:inline">|</span>
            <span className="font-black uppercase italic tracking-widest">Audit_Trail_Active</span>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="border border-white/10 bg-white/5 px-4 py-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-tighter text-[#FCDE09]">
              Latency: 24ms // Status: Secure
            </span>
          </div>
        </div>
      </div>

      {/* 🏗️ TIMELINE_INFRASTRUCTURE: Execution Path */}
      <div className="relative space-y-0">
        {/* แถบเส้นประแนวตั้งเพื่อความสวยงามทางเทคนิค */}
        <div className="bg-linear-to-b absolute left-[5px] top-0 h-full w-[1px] from-[#FCDE09]/50 via-white/5 to-transparent" />

        {logs.map((log, i) => {
          const style = getStatusStyle(log.status)
          return (
            <div key={i} className="group relative flex pb-16 last:pb-4">
              {/* Hard Square Node: จุดเชื่อมต่อระบบ (Custom Shape) */}
              <div className="absolute -left-[6px] top-0 z-10 flex h-3 w-3 items-center justify-center border-2 border-[#FCDE09] bg-[#020617] transition-all duration-300 group-hover:scale-150 group-hover:bg-[#FCDE09]">
                <div className="h-0.5 w-0.5 bg-[#FCDE09] group-hover:bg-[#020617]" />
              </div>

              <div className="flex-1 pl-10 md:pl-14">
                {/* Log Header: Day & Status */}
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <div className="border-l-2 border-[#FCDE09] bg-white/5 px-3 py-1 font-mono text-[12px] font-black italic text-[#FCDE09]">
                    T-DAY_{log.day.toString().padStart(2, '0')}
                  </div>

                  <div
                    className={cn(
                      'flex items-center gap-2 border px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest transition-all duration-300 group-hover:border-white/40',
                      style.color,
                    )}
                  >
                    {style.icon}
                    {log.status}
                  </div>
                </div>

                {/* Log Event: Thai Description with Emphasis */}
                <div className="relative">
                  <p className="font-thai text-[15px] font-bold leading-relaxed tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-white">
                    {log.event}
                  </p>
                </div>
              </div>

              {/* Decorative side bar on hover */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </div>
          )
        })}
      </div>

      {/* 🏗️ BACKGROUND_MARK: Decorative Industrial Text */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 select-none opacity-[0.03]">
        <span className="font-mono text-9xl font-black uppercase italic text-white">PROTOCOLS</span>
      </div>
    </div>
  )
}
