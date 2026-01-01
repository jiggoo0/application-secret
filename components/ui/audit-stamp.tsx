/** @format */

'use client'

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
 * @version 2026.1.4 (JP-Final Verification)
 * PURPOSE: ตราประทับยืนยันผลงาน (Digital Seal) ที่สื่อถึงความถูกต้องและโปร่งใส
 */
export const AuditStamp = ({
  status = 'APPROVED',
  authority = 'JP_DOCS_VERIFIED',
  date = '2026_ARCHIVE',
  className,
  isSuccess = true,
  caseId,
}: AuditStampProps) => {
  const verifyPath = `/pass/${caseId}`

  return (
    <Link href={verifyPath} className={cn('group block w-fit', className)}>
      <div
        className={cn(
          'relative w-fit border-4 border-[#020617] bg-white p-1 shadow-sharp transition-all duration-300',
          'group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-none group-active:scale-95',
        )}
      >
        {/* 🧩 UI_INFRA: Technical Inner Frame (เฟรมเทคนิคด้านใน) */}
        <div className="border-2 border-dashed border-[#020617]/10 bg-slate-50/50 p-6 lg:p-8">
          <div className="flex items-center gap-8">
            {/* Security Node: ตราประทับความปลอดภัย */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[#020617] bg-white shadow-sharp transition-transform group-hover:rotate-6">
              <div className="absolute inset-0 animate-pulse bg-[#FCDE09]/10" />
              <ShieldCheck className="relative h-10 w-10 text-[#020617]" strokeWidth={1.5} />

              {isSuccess && (
                <div className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center border-2 border-[#020617] bg-emerald-500 text-white shadow-sharp">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {/* Authority Info: ผู้ออกใบรับรอง */}
              <div className="mb-1 flex items-center gap-3">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  ISSUER_REF
                </span>
                <span className="font-thai text-[11px] font-black uppercase tracking-tighter text-[#020617]">
                  {authority}
                </span>
              </div>

              {/* Status Display: สถานะการตรวจสอบ */}
              <div className="flex items-center gap-4">
                <h4 className="font-thai text-4xl font-black uppercase italic leading-none tracking-tighter text-[#020617] transition-colors group-hover:text-emerald-600">
                  {status === 'VERIFIED' ? 'ยืนยันแล้ว' : status}
                </h4>
                <div className="h-3 w-3 border-2 border-[#020617] bg-[#FCDE09] group-hover:animate-spin" />
              </div>

              {/* Digital Fingerprint: รหัสอ้างอิงเคส */}
              <div className="mt-4 flex items-center gap-3 border-t-2 border-slate-200 pt-3">
                <Fingerprint size={14} className="text-[#020617]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                  VERIFY_ID: {caseId} <span className="mx-2 text-slate-200">|</span> {date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Corner: กิมมิคมุมกระดาษดุดัน */}
        <div
          className="absolute -right-1 -top-1 h-8 w-8 border-b-4 border-l-4 border-[#020617] bg-[#FCDE09] transition-all duration-500 group-hover:h-full group-hover:w-2 group-hover:border-none group-hover:bg-[#020617]"
          aria-hidden="true"
        />

        {/* Action Badge: ปุ่มตรวจสอบข้อมูลเชิงลึก */}
        <div className="absolute -bottom-5 right-6 flex items-center gap-3 border-2 border-[#020617] bg-[#020617] px-4 py-1.5 shadow-sharp transition-all group-hover:-bottom-6 group-hover:bg-[#FCDE09]">
          <span className="font-thai text-[10px] font-black uppercase tracking-widest text-[#FCDE09] group-hover:text-[#020617]">
            ตรวจสอบความถูกต้อง
          </span>
          <ExternalLink size={10} className="text-[#FCDE09] group-hover:text-[#020617]" />
        </div>
      </div>
    </Link>
  )
}
