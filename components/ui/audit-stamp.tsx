/** @format */

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ShieldCheck, Fingerprint, Check, ExternalLink } from 'lucide-react'

interface AuditStampProps {
  status?: string
  authority?: string
  date?: string
  className?: string
  isSuccess?: boolean
  caseId: string
}

/**
 * 🛰️ COMPONENT: AuditStamp_Official
 * @version 2026.0.1 (Verification Logic Optimized)
 * PURPOSE: ตราประทับยืนยันความถูกต้องแบบ Digital Signature
 */
export const AuditStamp = ({
  status = 'VERIFIED',
  authority = 'JP_CORE_SYSTEM',
  date = '2026_PROTO',
  className,
  isSuccess = true,
  caseId,
}: AuditStampProps) => {
  const verifyPath = `/pass/${caseId}`

  return (
    <Link href={verifyPath} className={cn('group block w-fit', className)}>
      <div
        className={cn(
          'relative w-fit border-2 border-[#020617] bg-white p-1 shadow-[8px_8px_0px_0px_#020617] transition-all duration-300',
          'group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-[0px_0px_0px_0px_#020617] group-active:scale-95',
        )}
      >
        {/* 🧩 UI_INFRA: Technical Inner Frame */}
        <div className="border border-dashed border-[#020617]/20 bg-slate-50/30 p-5 lg:p-6">
          <div className="flex items-center gap-6">
            {/* Security Indicator Node */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center bg-white shadow-inner">
              <div className="absolute inset-2 animate-pulse rounded-full bg-[#FCDE09]/20" />
              <ShieldCheck
                className="relative h-8 w-8 text-[#020617] transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.2}
              />

              {isSuccess && (
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-emerald-500 text-white shadow-lg">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {/* Authority Header */}
              <div className="mb-1 flex items-center gap-3">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  AUTH_NODE
                </span>
                <span className="font-mono text-[10px] font-black text-slate-950">{authority}</span>
              </div>

              {/* Status Display */}
              <div className="flex items-center gap-3">
                <h4 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-[#020617] transition-colors group-hover:text-emerald-600">
                  {status}
                </h4>
                <div className="h-2 w-2 rounded-full bg-[#FCDE09] group-hover:animate-ping" />
              </div>

              {/* Digital Fingerprint */}
              <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-2">
                <Fingerprint size={12} className="text-slate-400" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
                  ID: {caseId} <span className="mx-1 text-slate-200">|</span>{' '}
                  {date.replace(/ /g, '_')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Corner Indicator */}
        <div
          className="absolute -right-[2px] -top-[2px] h-6 w-6 bg-[#FCDE09] transition-all duration-300 [clip-path:polygon(100%_0,100%_100%,0_0)] group-hover:h-full group-hover:w-1 group-hover:bg-[#020617] group-hover:[clip-path:none]"
          aria-hidden="true"
        />

        {/* Verification Trigger Label */}
        <div className="absolute -bottom-4 right-4 flex items-center gap-2 bg-[#020617] px-3 py-1 shadow-xl transition-all group-hover:-bottom-5 group-hover:bg-[#FCDE09]">
          <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-[#FCDE09] group-hover:text-[#020617]">
            OPEN_SECURE_PASS
          </span>
          <ExternalLink size={8} className="text-[#FCDE09] group-hover:text-[#020617]" />
        </div>
      </div>
    </Link>
  )
}
