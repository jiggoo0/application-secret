/** @format */

import React from 'react'
import { cn } from '@/lib/utils'
import { ShieldCheck, Fingerprint } from 'lucide-react'

interface AuditStampProps {
  status?: string
  authority?: string
  date?: string
  className?: string
}

/**
 * 🛰️ COMPONENT: AuditStamp
 * MODE: Industrial_Sharp_V3.3
 * PURPOSE: ตราประทับยืนยันความถูกต้องของเคส (Verified by Master Architect)
 */
export const AuditStamp = ({
  status = 'VERIFIED',
  authority = 'JP_CORE_SYSTEM',
  date = '2025_PROTO',
  className,
}: AuditStampProps) => {
  return (
    <div
      className={cn(
        'relative w-fit border-2 border-[#020617] bg-white p-1 shadow-[4px_4px_0px_0px_#020617]',
        className,
      )}
    >
      {/* 🧩 INNER_FRAME: เส้นขอบชั้นในเพิ่มความเนี้ยบ */}
      <div className="border border-dashed border-[#020617]/20 p-3">
        <div className="flex items-center gap-4">
          {/* 🛡️ ICON_NODE: สัญลักษณ์ความปลอดภัย */}
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#FCDE09]/20" />
            <ShieldCheck className="relative h-8 w-8 text-[#020617]" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                Auth_Node
              </span>
              <div className="h-[1px] w-4 bg-slate-200" />
              <span className="font-mono text-[9px] font-bold text-[#020617]">{authority}</span>
            </div>

            {/* 🏆 STATUS_HEADING: หัวใจหลักของตราประทับ */}
            <div className="flex items-baseline gap-2">
              <h4 className="text-xl font-black italic tracking-tighter text-[#020617]">
                {status}
              </h4>
              <div className="h-1 w-1 bg-[#FCDE09]" />
            </div>

            <div className="flex items-center gap-2">
              <Fingerprint size={10} className="text-slate-300" />
              <span className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-400">
                ID_REF: {date}_CONFIDENTIAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 📐 DECORATIVE_NOTCH: รอยบากมุมแบบอุตสาหกรรม */}
      <div
        className="absolute -right-[2px] -top-[2px] h-4 w-4 bg-[#FCDE09] [clip-path:polygon(100%_0,100%_100%,0_0)]"
        aria-hidden="true"
      />
    </div>
  )
}
