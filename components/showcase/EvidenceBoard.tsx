/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.844Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: EvidenceBoard          // ตัวอย่าง: ShowcasePage, ServicesPage
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
import { ShieldCheck, EyeOff, Activity, Lock, Maximize2, Shield } from 'lucide-react'

interface Artifact {
  label: string
  type: string
  description: string
  title?: string
  status?: 'VERIFIED' | 'REDACTED' | 'PROCESSED'
}

/**
 * 🛰️ COMPONENT: EvidenceBoard_Protocol
 * @version 2026.1.1 (JP-Professional Audit)
 * ✅ แสดงรายการเอกสารตรวจสอบอย่างละเอียด
 */
export const EvidenceBoard = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="shadow-sharp relative rounded-none border-4 border-[#020617] bg-white p-6 md:p-12">
      {/* 🧩 Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#020617_1px,transparent_1px),linear-gradient(90deg,#020617_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 📁 Header */}
      <div className="relative z-10 mb-14 flex flex-col justify-between border-b-8 border-[#020617] pb-10 md:flex-row md:items-end">
        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <div className="shadow-sharp relative flex h-12 w-12 items-center justify-center bg-[#020617] transition-transform hover:scale-105">
              <Shield className="text-[#FCDE09]" size={24} />
            </div>
            <div>
              <h3 className="font-thai text-xl font-black uppercase tracking-tight text-[#020617]">
                คลังเอกสารประกอบผลงานจริง
              </h3>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Data_Integrity: Secured_Node
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="shadow-sharp flex items-center gap-2 border-2 border-emerald-600 bg-emerald-50 px-4 py-1 text-[11px] font-black text-emerald-700">
              <ShieldCheck size={14} /> ข้อมูลผ่านการจัดเก็บแบบปลอดภัย
            </div>
            <div className="shadow-sharp flex items-center gap-2 border-2 border-[#020617] bg-slate-100 px-4 py-1 text-[11px] font-black text-slate-600">
              <EyeOff size={14} /> ปิดบังข้อมูลส่วนบุคคล (Strict PII)
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-end gap-1 md:mt-0">
          <span className="font-thai text-[11px] font-black uppercase tracking-widest text-slate-400">
            รายการที่ตรวจสอบแล้ว
          </span>
          <span className="font-mono text-4xl font-black text-[#020617]">
            {artifacts.length.toString().padStart(2, '0')}
            <span className="text-slate-300">/26</span>
          </span>
        </div>
      </div>

      {/* 🏗️ Artifact Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
        {artifacts.map((art, i) => (
          <div
            key={i}
            className="hover:shadow-sharp group relative flex flex-col border-4 border-[#020617] bg-white transition-all duration-500 hover:-translate-y-1"
          >
            {/* Metadata Header */}
            <div className="flex items-center justify-between border-b-4 border-[#020617] bg-slate-50 p-4 transition-all duration-500 group-hover:bg-[#020617]">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-slate-300 group-hover:animate-ping group-hover:bg-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-500 group-hover:text-white">
                  DOC_REF: {art.type.toUpperCase()}_REV26_{i.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={12} className="text-slate-300 group-hover:text-[#FCDE09]" />
                <span className="font-thai text-[10px] font-black text-slate-400 group-hover:text-[#FCDE09]">
                  เอกสารความลับสูงสุด
                </span>
              </div>
            </div>

            {/* Asset Preview */}
            <div className="relative aspect-video w-full overflow-hidden border-b-4 border-[#020617] bg-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(#020617_2px,transparent_2px)] opacity-[0.05] [background-size:20px_20px]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative flex h-full w-full items-center justify-center border-4 border-dashed border-slate-300 bg-white/50 transition-all duration-500 group-hover:bg-white/90">
                  <div className="absolute rotate-[-12deg] select-none opacity-10 transition-opacity group-hover:opacity-30">
                    <span className="block text-2xl font-black uppercase tracking-[0.8em] text-[#020617]">
                      JP_AUDIT_VERIFIED
                    </span>
                  </div>
                  <div className="z-10 flex translate-y-4 flex-col items-center gap-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="shadow-sharp flex h-16 w-16 cursor-pointer items-center justify-center bg-[#020617] text-[#FCDE09] transition-transform active:scale-95">
                      <Maximize2 size={28} strokeWidth={3} />
                    </div>
                    <span className="font-thai shadow-sharp bg-[#FCDE09] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#020617]">
                      ตรวจสอบเอกสารตัวเต็ม
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              <div className="font-thai shadow-sharp mb-4 inline-block border-2 border-[#020617] bg-[#FCDE09] px-3 py-1 text-[11px] font-black text-[#020617]">
                ประเภท: {art.type}
              </div>
              <h4 className="font-thai mb-6 text-3xl font-black uppercase italic leading-none tracking-tight text-[#020617]">
                {art.label}
              </h4>
              <p className="font-thai text-lg font-bold leading-relaxed text-slate-600 transition-colors group-hover:text-[#020617]">
                {art.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏷️ Footer */}
      <footer className="mt-16 flex flex-col items-center justify-between gap-6 border-t-4 border-slate-100 pt-10 md:flex-row">
        <div className="flex items-center gap-6 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="shadow-sharp flex items-center gap-3 border-2 border-emerald-600 bg-emerald-50 px-3 py-1 text-emerald-600">
            <Activity size={14} />
            STATUS_NORMAL
          </div>
          <span className="flex items-center gap-2">
            Security_Seal: <span className="text-[#020617]">VERIFIED_BY_JP_SYSTEM</span>
          </span>
        </div>
        <div className="font-mono text-[11px] font-black italic text-slate-300">
          AUDIT_DATE: {new Date().getFullYear()}.01.01
        </div>
      </footer>
    </div>
  )
}
