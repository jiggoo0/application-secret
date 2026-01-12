/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.823Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: audit-stamp          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

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
 * ✅ Production-ready Digital Seal component
 * PURPOSE: แสดงตราประทับยืนยันผลงาน (Digital Seal) ที่สื่อถึงความถูกต้อง โปร่งใส และตรวจสอบได้
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
          'shadow-sharp relative w-fit border-4 border-[#020617] bg-white p-1 transition-all duration-300',
          'group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-none group-active:scale-95',
        )}
      >
        {/* Inner Frame */}
        <div className="border-2 border-dashed border-[#020617]/10 bg-slate-50/50 p-6 lg:p-8">
          <div className="flex items-center gap-8">
            {/* Security Node */}
            <div className="shadow-sharp relative flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[#020617] bg-white transition-transform group-hover:rotate-6">
              <div className="absolute inset-0 animate-pulse bg-[#FCDE09]/10" />
              <ShieldCheck className="relative h-10 w-10 text-[#020617]" strokeWidth={1.5} />
              {isSuccess && (
                <div className="shadow-sharp absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center border-2 border-[#020617] bg-emerald-500 text-white">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {/* Authority Info */}
              <div className="mb-1 flex items-center gap-3">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  ISSUER_REF
                </span>
                <span className="font-thai text-[11px] font-black uppercase tracking-tighter text-[#020617]">
                  {authority}
                </span>
              </div>

              {/* Status Display */}
              <div className="flex items-center gap-4">
                <h4 className="font-thai text-4xl font-black uppercase italic leading-none tracking-tighter text-[#020617] transition-colors group-hover:text-emerald-600">
                  {status === 'VERIFIED' ? 'ยืนยันแล้ว' : status}
                </h4>
                <div className="h-3 w-3 border-2 border-[#020617] bg-[#FCDE09] group-hover:animate-spin" />
              </div>

              {/* Digital Fingerprint */}
              <div className="mt-4 flex items-center gap-3 border-t-2 border-slate-200 pt-3">
                <Fingerprint size={14} className="text-[#020617]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                  VERIFY_ID: {caseId} <span className="mx-2 text-slate-200">|</span> {date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Corner */}
        <div
          className="absolute -right-1 -top-1 h-8 w-8 border-b-4 border-l-4 border-[#020617] bg-[#FCDE09] transition-all duration-500 group-hover:h-full group-hover:w-2 group-hover:border-none group-hover:bg-[#020617]"
          aria-hidden="true"
        />

        {/* Action Badge */}
        <div className="shadow-sharp absolute -bottom-5 right-6 flex items-center gap-3 border-2 border-[#020617] bg-[#020617] px-4 py-1.5 transition-all group-hover:-bottom-6 group-hover:bg-[#FCDE09]">
          <span className="font-thai text-[10px] font-black uppercase tracking-widest text-[#FCDE09] group-hover:text-[#020617]">
            ตรวจสอบความถูกต้อง
          </span>
          <ExternalLink size={10} className="text-[#FCDE09] group-hover:text-[#020617]" />
        </div>
      </div>
    </Link>
  )
}
