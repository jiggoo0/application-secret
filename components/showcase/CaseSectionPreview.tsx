/** @format */

'use client'

import React from 'react'
import Link from 'next/link'
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ShieldCheck, Activity, Database, Terminal } from 'lucide-react'

/**
 * 🛠️ COMPONENT: CaseSectionPreview
 * @version 2026.1.0 (JP-High-Impact Execution)
 * ✅ ตรวจสอบ: ภาษาจริงใจ, ดีไซน์ดุดัน, เน้นความน่าเชื่อถือระดับสูง
 */
export const CaseSectionPreview = () => {
  // เลือกเคสระดับ High Impact 3 รายการแรกมาแสดง
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="relative border-t-8 border-[#020617] bg-white py-32 selection:bg-[#FCDE09] selection:text-[#020617] lg:py-48">
      {/* 🧩 UI_INFRA: Engineering Grid & Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#020617 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* 📊 HEADER_MANIFEST: ส่วนหัวที่แสดงถึงอำนาจและความเชี่ยวชาญ */}
        <header className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <div className="flex h-10 items-center gap-3 bg-[#020617] px-5 shadow-sharp">
                <Terminal size={16} className="animate-pulse text-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                  System_Status: Verified
                </span>
              </div>
              <span className="h-[2px] w-12 bg-[#020617]" />
              <span className="font-thai text-sm font-black uppercase tracking-widest text-slate-400">
                บันทึกผลงานจริงปี 2026
              </span>
            </div>

            <h2 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-[#020617] md:text-9xl lg:text-[130px]">
              Proven <br />
              <span className="text-white drop-shadow-[6px_6px_0px_#020617] transition-all duration-500 hover:drop-shadow-[8px_8px_0px_#020617]">
                Success.
              </span>
            </h2>

            <div className="mt-12 flex gap-8 border-l-8 border-[#FCDE09] pl-10">
              <p className="max-w-lg font-thai text-2xl font-black leading-tight text-[#020617]">
                เพราะเราไม่ได้แค่ทำงานเอกสาร <br />
                <span className="text-slate-500">
                  แต่เรา "แก้ปัญหา" ให้เกิดผลลัพธ์ที่จับต้องได้จริง
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/showcase"
            className={cn(
              'group relative flex items-center justify-center gap-8 border-4 border-[#020617] bg-white px-12 py-8',
              'font-thai text-lg font-black uppercase tracking-tighter text-[#020617] transition-all duration-500',
              'hover:bg-[#020617] hover:text-[#FCDE09] hover:shadow-sharp active:scale-95',
            )}
          >
            ดูคลังผลงานทั้งหมด
            <ArrowUpRight
              size={28}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
            />
          </Link>
        </header>

        {/* 🏗️ GRID_ARCHITECTURE: การจัดวางที่แข็งแกร่ง */}
        <div className="grid grid-cols-1 gap-px border-4 border-[#020617] bg-[#020617] shadow-sharp md:grid-cols-3">
          {featuredCases.map((data) => (
            <div key={data.id} className="bg-white transition-colors hover:bg-slate-50">
              <CaseGridCard data={data} />
            </div>
          ))}
        </div>

        {/* 🛡️ SYSTEM_STATUS: แถบประทับตราความเชื่อมั่น */}
        <footer className="mt-28 flex flex-col items-center justify-between gap-10 border-t-4 border-[#020617] pt-12 md:flex-row">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-4 border-2 border-[#020617] bg-emerald-50 px-6 py-3 shadow-sharp">
              <ShieldCheck size={20} className="text-emerald-600" />
              <span className="font-thai text-sm font-black uppercase text-[#020617]">
                ข้อมูลผ่านการตรวจสอบแล้ว
              </span>
            </div>
            <div className="flex items-center gap-4 border-2 border-[#020617] bg-[#FCDE09] px-6 py-3 shadow-sharp">
              <Activity size={20} className="animate-pulse text-[#020617]" />
              <span className="font-thai text-sm font-black uppercase text-[#020617]">
                อัตราความสำเร็จ: 98.7%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="h-12 w-[2px] bg-slate-200" />
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-slate-400" />
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                  SECURE_ARCHIVE_2026
                </span>
              </div>
              <span className="font-thai text-[11px] font-bold text-slate-300">
                อัปเดตข้อมูลล่าสุด: {new Date().toLocaleDateString('th-TH')}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
