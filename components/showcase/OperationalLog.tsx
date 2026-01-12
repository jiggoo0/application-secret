/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.834Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: OperationalLog          // ตัวอย่าง: ShowcasePage, ServicesPage
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
import { cn } from '@/lib/utils'
import { Cpu, CheckCircle2, AlertCircle, Scan, ArrowDown, History } from 'lucide-react'

interface CaseLog {
  day: number
  event: string
  status: string
}

/**
 * 🛰️ COMPONENT: OperationalLog_Protocol
 * @version 2026.1.3
 * ✅ แสดงลำดับเหตุการณ์งานรายวันแบบ Timeline Industrial พร้อมความปลอดภัยสูง
 */
export const OperationalLog = ({ logs = [] }: { logs?: CaseLog[] }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="shadow-sharp relative overflow-hidden border-4 border-[#020617] bg-white p-24 text-center">
        <div className="relative z-10">
          <div className="shadow-sharp mx-auto mb-6 flex h-20 w-20 items-center justify-center border-4 border-red-500 bg-red-50 text-red-500">
            <AlertCircle size={40} />
          </div>
          <h4 className="font-thai text-2xl font-black text-[#020617]">
            ระบบไม่พบฐานข้อมูลบันทึกงาน
          </h4>
          <p className="font-thai mt-3 font-bold text-slate-500">
            กรุณาติดต่อเจ้าหน้าที่เพื่อขอตรวจสอบ Log ข้อมูลย้อนหลัง
          </p>
        </div>
      </div>
    )
  }

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase()
    if (['VERIFIED', 'APPROVED', 'SUCCESS', 'DONE', 'เรียบร้อย'].includes(s))
      return {
        label: 'บันทึก: ตรวจสอบผ่านแล้ว',
        color: 'text-emerald-700 border-emerald-600 bg-emerald-50',
        icon: <CheckCircle2 size={14} />,
      }
    if (['ANALYZED', 'EXECUTED', 'PROCESSING', 'ACTION', 'ดำเนินการ'].includes(s))
      return {
        label: 'กำลังปฏิบัติงานจริง',
        color: 'text-[#020617] border-[#020617] bg-[#FCDE09]',
        icon: <Cpu size={14} />,
      }
    if (['WARNING', 'CRITICAL', 'REJECTED', 'แก้ไข'].includes(s))
      return {
        label: 'สถานะ: ต้องปรับปรุงข้อมูล',
        color: 'text-red-600 border-red-600 bg-red-50',
        icon: <AlertCircle size={14} />,
      }
    return { label: status, color: 'text-slate-600 border-slate-200 bg-slate-100', icon: null }
  }

  return (
    <div className="shadow-sharp relative overflow-hidden border-4 border-[#020617] bg-white p-8 md:p-16">
      {/* 🧩 Blueprint Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.04]" />

      {/* 📁 Header */}
      <div className="relative z-10 mb-24 flex flex-col justify-between border-b-8 border-[#020617] pb-12 md:flex-row md:items-end">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="shadow-sharp flex h-16 w-16 items-center justify-center bg-[#020617] text-[#FCDE09] transition-transform duration-500 hover:rotate-90">
              <History size={32} strokeWidth={3} />
            </div>
            <div>
              <h3 className="font-thai text-3xl font-black uppercase tracking-tight text-[#020617]">
                ลำดับการทำงาน{' '}
                <span className="shadow-sharp ml-2 bg-[#020617] px-3 py-1 text-xl italic text-[#FCDE09]">
                  LOG_SEQUENCE
                </span>
              </h3>
              <p className="font-thai mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
                <Scan size={16} className="text-[#020617]" />{' '}
                ตรวจสอบประวัติการจัดการข้อมูลรายเคสแบบละเอียด
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-end gap-3 md:mt-0">
          <div className="shadow-sharp flex items-center gap-4 border-4 border-[#020617] bg-[#FCDE09] px-8 py-4">
            <div className="h-4 w-4 animate-pulse rounded-full bg-emerald-600" />
            <span className="font-thai text-sm font-black uppercase tracking-widest text-[#020617]">
              SECURE_LOG_STAMP: ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* 🏗️ Timeline */}
      <div className="relative z-10">
        <div className="absolute left-[11px] top-0 h-full w-1.5 bg-[#020617]" />

        <div className="space-y-16">
          {logs.map((log, i) => {
            const style = getStatusStyle(log.status)
            return (
              <div key={i} className="group relative flex pb-6 last:pb-0">
                <div className="shadow-sharp absolute left-0 top-2 z-20 h-7 w-7 border-4 border-[#020617] bg-[#FCDE09] transition-all group-hover:rotate-45 group-hover:scale-125" />

                <div className="flex-1 pl-16 md:pl-24">
                  <div className="mb-6 flex flex-wrap items-center gap-6">
                    <span className="font-thai text-xl font-black text-[#020617]">
                      วันที่{' '}
                      <span className="text-5xl not-italic underline decoration-[#FCDE09] decoration-[10px] underline-offset-[-2px]">
                        {log.day}
                      </span>
                    </span>
                    <div
                      className={cn(
                        'font-thai shadow-sharp flex items-center gap-3 border-4 px-6 py-2 text-[11px] font-black transition-all',
                        style.color,
                      )}
                    >
                      {style.icon}
                      {style.label}
                    </div>
                  </div>

                  <div className="shadow-sharp relative border-l-[12px] border-[#020617] bg-slate-50 p-8 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[20px_20px_0px_#f1f5f9]">
                    <p className="font-thai text-xl font-bold leading-relaxed text-[#020617]">
                      {log.event}
                    </p>
                    <div className="absolute -bottom-6 -left-4 text-[#020617] group-last:hidden">
                      <ArrowDown size={32} strokeWidth={4} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 rotate-[-12deg] select-none opacity-[0.04]">
        <span className="font-mono text-[220px] font-black text-[#020617]">ARCHIVE</span>
      </div>
    </div>
  )
}
