/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.839Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: MetricsPanel          // ตัวอย่าง: ShowcasePage, ServicesPage
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
import { ShieldAlert, BarChart3, CheckCircle2, Cpu, ArrowDownRight } from 'lucide-react'

interface MetricsPanelProps {
  stats: {
    docs_processed: number | string
    complexity_level: string
    processing_time: string
  }
  technical_strategy: string[]
}

/**
 * 🛰️ COMPONENT: MetricsPanel_System
 * @version 2026.1.3
 * ✅ แสดงสถิติการตรวจสอบและยุทธศาสตร์การทำงานอย่างชัดเจน
 */
export const MetricsPanel = ({ stats, technical_strategy }: MetricsPanelProps) => {
  const getComplexityConfig = (level: string) => {
    const l = level.toUpperCase()
    if (l.includes('CRITICAL') || l.includes('วิกฤต'))
      return {
        width: 'w-full',
        color: 'bg-red-600',
        text: 'text-red-500',
        label: 'ระดับวิกฤต (ความยากสูงสุด)',
        icon: <ShieldAlert size={14} />,
      }
    if (l.includes('HIGH') || l.includes('สูง'))
      return {
        width: 'w-[80%]',
        color: 'bg-orange-500',
        text: 'text-orange-500',
        label: 'ความซับซ้อนสูงมาก',
        icon: <ShieldAlert size={14} />,
      }
    return {
      width: 'w-[40%]',
      color: 'bg-[#FCDE09]',
      text: 'text-[#FCDE09]',
      label: 'ความซับซ้อนมาตรฐาน',
      icon: <CheckCircle2 size={14} />,
    }
  }

  const config = getComplexityConfig(stats.complexity_level)

  return (
    <div className="shadow-sharp relative overflow-hidden border-4 border-[#020617] bg-white transition-all duration-500 hover:shadow-[24px_24px_0px_0px_#020617]">
      {/* ⬛ Upper Metrics */}
      <div className="bg-[#020617] p-8 text-white md:p-12">
        <header className="mb-12 flex items-center justify-between border-b-2 border-white/10 pb-8">
          <div className="flex items-center gap-5">
            <div className="shadow-sharp relative flex h-12 w-12 items-center justify-center border-2 border-[#FCDE09] bg-white/5">
              <Cpu size={22} className="animate-pulse text-[#FCDE09]" />
            </div>
            <div>
              <span className="font-thai block text-sm font-black uppercase tracking-widest text-[#FCDE09]">
                สถิติการตรวจสอบรายเคส
              </span>
              <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500">
                Data_Verification_Node
              </span>
            </div>
          </div>
          <div className="hidden flex-col items-end text-[#FCDE09] opacity-60 lg:flex">
            <span className="font-mono text-[10px] font-black italic">PROCESSED_IN_REALTIME</span>
          </div>
        </header>

        <div className="space-y-16">
          {/* Complexity Slider */}
          <div className="group">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-thai flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 transition-colors group-hover:text-white">
                <BarChart3 size={16} className="text-[#FCDE09]" /> วิเคราะห์ระดับความยากของงาน
              </span>
              <span
                className={cn(
                  'font-thai shadow-sharp flex items-center gap-2 border-2 border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-black',
                  config.text,
                )}
              >
                {config.icon} {config.label}
              </span>
            </div>
            <div className="relative h-6 w-full border-2 border-white/20 bg-white/5 p-1">
              <div
                className={cn(
                  'h-full shadow-[0_0_15px_rgba(252,222,9,0.3)] transition-all duration-1000 ease-in-out',
                  config.width,
                  config.color,
                )}
              />
              <div className="pointer-events-none absolute inset-0 flex justify-between px-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-full w-[1px] bg-white/20" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-12 border-t-2 border-white/10 pt-12">
            <div className="group relative">
              <span className="font-thai mb-4 block text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[#FCDE09]">
                ระยะเวลาดำเนินการจบงาน
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  {stats.processing_time.split(' ')[0] || '0'}
                </span>
                <span className="font-thai text-sm font-black uppercase text-slate-400">
                  {stats.processing_time.split(' ')[1] || 'วัน'}
                </span>
              </div>
            </div>

            <div className="group relative">
              <span className="font-thai mb-4 block text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[#FCDE09]">
                จำนวนชุดเอกสารที่จัดการ
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  {stats.docs_processed}
                </span>
                <span className="font-thai text-sm font-black uppercase text-slate-400">ชุด</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⬜ Strategic Protocols */}
      <div className="relative p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#020617_2px,transparent_2px)] bg-[size:24px_24px] opacity-[0.05]" />

        <div className="relative z-10">
          <div className="mb-12 flex items-center justify-between">
            <h4 className="font-thai flex items-center text-sm font-black uppercase tracking-[0.4em] text-[#020617]">
              <span className="shadow-sharp mr-5 block h-8 w-2.5 bg-[#FCDE09]" />
              ยุทธศาสตร์การทำงาน
            </h4>
            <ArrowDownRight className="text-slate-200" size={40} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {technical_strategy.map((s, i) => (
              <div
                key={i}
                className="hover:shadow-sharp group flex items-start gap-8 border-2 border-slate-100 bg-slate-50/50 p-8 shadow-sm transition-all duration-500 hover:translate-x-3 hover:border-[#020617] hover:bg-white"
              >
                <div className="flex flex-col items-center">
                  <span className="font-mono text-xl font-black text-slate-200 transition-colors group-hover:text-[#020617]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="mt-3 h-12 w-[3px] bg-slate-100 transition-all group-hover:bg-[#FCDE09]" />
                </div>
                <span className="font-thai text-lg font-bold leading-relaxed tracking-tight text-slate-600 transition-colors group-hover:text-[#020617]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t-2 border-slate-100 bg-slate-50 px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
          <span className="font-thai text-[10px] font-black uppercase tracking-widest text-slate-400">
            โครงสร้างการวิเคราะห์ผ่านการตรวจสอบแล้ว
          </span>
        </div>
        <span className="font-mono text-[9px] font-black uppercase text-slate-300">
          REF_CODE: JP-AUDIT-LOG
        </span>
      </div>
    </div>
  )
}
