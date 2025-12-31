/** @format */

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ShieldCheck, Fingerprint, Check } from 'lucide-react'

/**
 * ---------------------------------------------------------------------
 * COMPONENT: AuditStamp
 * เวอร์ชัน: Industrial_Sharp_V4.1
 *
 * หน้าที่
 * - แสดงตราประทับยืนยันสถานะเคส
 * - คลิกแล้วนำทางไปหน้า /pass/[id] เพื่อแสดง Digital Pass
 *
 * โครงสร้างเส้นทางที่อ้างอิง
 * - app/pass/[id]/page.tsx  ✅ มีอยู่จริงในโปรเจกต์
 *
 * NOTE_FOR_AI:
 * - เส้นทางถูกตรวจสอบและยืนยันแล้วว่าตรงกับโครงสร้างโปรเจกต์
 * - ไม่มีโหมดทดสอบ
 * - caseId ต้องเป็น ticket_id ตัวเดียวกับที่บันทึกใน Supabase
 * - ไฟล์นี้ผ่านการปรับภาษาและโครงสร้างเพื่อให้อ่านตรงกันทุก AI
 * ---------------------------------------------------------------------
 */

interface AuditStampProps {
  status?: string
  authority?: string
  date?: string
  className?: string
  isSuccess?: boolean
  caseId: string // บังคับต้องส่ง เพื่อป้องกัน path ผิดพลาด
}

export const AuditStamp = ({
  status = 'VERIFIED',
  authority = 'JP_CORE_SYSTEM',
  date = '2025_PROTO',
  className,
  isSuccess = true,
  caseId,
}: AuditStampProps) => {
  /**
   * เส้นทางตรวจสอบ
   * → /pass/[id]
   */
  const verifyPath = `/pass/${caseId}`

  return (
    <Link href={verifyPath} className="group block w-fit transition-all active:scale-95">
      <div
        className={cn(
          'relative w-fit border-2 border-[#020617] bg-white p-1 shadow-[6px_6px_0px_0px_#020617] transition-all group-hover:shadow-[8px_8px_0px_0px_#FCDE09]',
          className,
        )}
      >
        {/* กรอบด้านในแบบเทคนิค */}
        <div className="border border-dashed border-[#020617]/30 p-4">
          <div className="flex items-center gap-5">
            {/* ไอคอนสถานะความปลอดภัย */}
            <div className="relative flex h-12 w-12 items-center justify-center border border-slate-100 bg-slate-50">
              <div className="absolute inset-0 animate-pulse bg-[#FCDE09]/10" />
              <ShieldCheck className="relative h-7 w-7 text-[#020617]" strokeWidth={1.5} />
              {isSuccess && (
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-green-500 text-white ring-2 ring-white">
                  <Check size={10} strokeWidth={4} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              {/* แหล่งอำนาจรับรอง */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Auth_Node
                </span>
                <div className="h-[1px] w-6 bg-slate-200" />
                <span className="font-mono text-[9px] font-black text-[#020617] opacity-80">
                  {authority}
                </span>
              </div>

              {/* สถานะหลัก */}
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
                  {status}
                </h4>
                <div className="h-1.5 w-1.5 animate-bounce bg-[#FCDE09]" />
              </div>

              {/* รหัสอ้างอิง */}
              <div className="mt-1 flex items-center gap-2 border-t border-slate-100 pt-1">
                <Fingerprint size={10} className="text-slate-400" />
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
                  ID: {caseId} | {date.replace(/ /g, '_')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* มุมตกแต่ง */}
        <div
          className="absolute -right-[2px] -top-[2px] h-5 w-5 bg-[#FCDE09] [clip-path:polygon(100%_0,100%_100%,0_0)]"
          aria-hidden="true"
        />

        {/* ป้ายระบบ */}
        <div className="absolute -bottom-[20px] -left-[2px]">
          <span className="bg-[#020617] px-1.5 py-0.5 font-mono text-[7px] font-black uppercase text-[#FCDE09]">
            CLICK_TO_VERIFY
          </span>
        </div>
      </div>
    </Link>
  )
}
