/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.849Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: CaseSectionPreview          // ตัวอย่าง: ShowcasePage, ServicesPage
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
import { ALL_CASES } from '@/config/showcase/all-cases'
import { CaseGridCard } from '@/components/section/CaseGridCard'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ShieldCheck, Activity, Database, Terminal } from 'lucide-react'

/**
 * 🛠️ COMPONENT: CaseSectionPreview
 * @version 2026.1.0 (JP-High-Impact Execution)
 * ✅ แสดงผลงาน High Impact 3 รายการแรก
 */
export const CaseSectionPreview = () => {
  const featuredCases = ALL_CASES.slice(0, 3)

  return (
    <section className="relative border-t-8 border-[#020617] bg-white py-32 selection:bg-[#FCDE09] selection:text-[#020617] lg:py-48">
      {/* 🧩 Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#020617 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* 📊 Header */}
        <header className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <div className="shadow-sharp flex h-10 items-center gap-3 bg-[#020617] px-5">
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
              <p className="font-thai max-w-lg text-2xl font-black leading-tight text-[#020617]">
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
              'hover:shadow-sharp hover:bg-[#020617] hover:text-[#FCDE09] active:scale-95',
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

        {/* 🏗️ Grid */}
        <div className="shadow-sharp grid grid-cols-1 gap-px border-4 border-[#020617] bg-[#020617] md:grid-cols-3">
          {featuredCases.map((data) => (
            <div key={data.id} className="bg-white transition-colors hover:bg-slate-50">
              <CaseGridCard data={data} />
            </div>
          ))}
        </div>

        {/* 🛡️ Footer */}
        <footer className="mt-28 flex flex-col items-center justify-between gap-10 border-t-4 border-[#020617] pt-12 md:flex-row">
          <div className="flex flex-wrap items-center gap-10">
            <div className="shadow-sharp flex items-center gap-4 border-2 border-[#020617] bg-emerald-50 px-6 py-3">
              <ShieldCheck size={20} className="text-emerald-600" />
              <span className="font-thai text-sm font-black uppercase text-[#020617]">
                ข้อมูลผ่านการตรวจสอบแล้ว
              </span>
            </div>
            <div className="shadow-sharp flex items-center gap-4 border-2 border-[#020617] bg-[#FCDE09] px-6 py-3">
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
