/** @format */

import React from 'react'
import { Metadata } from 'next'
import { ContactForm } from '@/components/form/ContactForm'
import { ShieldCheck, Activity, ChevronRight, Globe2, FileText, CheckCircle2 } from 'lucide-react'

/**
 * 🛰️ PAGE: STRATEGIC_INQUIRY_PORTAL
 * @version 3.3.2 (Clean Edition)
 * PURPOSE: ศูนย์รับเรื่อง วิเคราะห์โปรไฟล์ และประเมินโอกาสสำเร็จในหน้าเดียว
 * ✅ FIXED: ESLint error - ลบ 'cn' ที่ไม่ได้ใช้งานออก
 * ✅ STYLED: High-Visibility Contrast สำหรับเนื้อหาภาษาไทยและอังกฤษ
 */

export const metadata: Metadata = {
  title: 'Contact & Assessment | JP‑VISOUL&DOCS',
  description: 'ศูนย์บริการข้อมูลทางเทคนิคและวิเคราะห์โปรไฟล์เพื่อการวางแผนเอกสารระดับสากล',
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_BACKGROUND: Industrial Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative Structural Element */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[40%] translate-x-1/4 -skew-x-12 border-l border-slate-200 bg-slate-50/60" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 🌑 LEFT_SECTION: Unified Value Proposition */}
          <div className="space-y-12 duration-700 animate-in fade-in slide-in-from-left-8 lg:col-span-5">
            <div className="space-y-8">
              {/* System Badge */}
              <div className="inline-flex items-center gap-2 bg-[#020617] px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-[#FCDE09] shadow-sharp-sm">
                <Activity size={12} className="text-[#FCDE09]" /> Unified_Case_Inquiry_v3.3
              </div>

              {/* Main Headline */}
              <h1 className="text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
                Strategic
                <br />
                <span className="text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">Inquiry.</span>
              </h1>

              {/* Sub-text with Thai language */}
              <div className="space-y-6 font-thai">
                <p className="max-w-sm text-2xl font-black leading-tight text-[#020617]">
                  วิเคราะห์เคสเบื้องต้น <br />
                  <span className="bg-[#FCDE09] px-2 py-0.5">และประเมินโอกาส</span>{' '}
                  ก่อนเริ่มกระบวนการ
                </p>
                <p className="max-w-md text-sm font-bold leading-relaxed text-slate-600">
                  หน้าเดียวจบสำหรับการติดต่อและประเมินโปรไฟล์เบื้องต้น
                  เราใช้ข้อมูลเชิงลึกของคุณเพื่อวางแผนกลยุทธ์จัดการเอกสารให้มีประสิทธิภาพ
                  และลดความเสี่ยงในการถูกปฏิเสธให้เหลือน้อยที่สุด
                </p>
              </div>
            </div>

            {/* 🛡️ FEATURES: Trust Markers */}
            <div className="grid grid-cols-1 gap-4 border-t-2 border-slate-100 pt-12 font-thai">
              <FeatureItem
                icon={<Globe2 size={20} />}
                title="Profile Assessment"
                desc="ประเมินคุณภาพโปรไฟล์ตามหลักเกณฑ์สากล"
              />
              <FeatureItem
                icon={<FileText size={20} />}
                title="Case Analysis"
                desc="วิเคราะห์เคสเฉพาะบุคคลโดยที่ปรึกษาเทคนิค"
              />
              <FeatureItem
                icon={<CheckCircle2 size={20} />}
                title="Response Protocol"
                desc="ระบบคัดกรองข้อมูลรวดเร็วและเป็นความลับ"
              />
            </div>
          </div>

          {/* 🌕 RIGHT_SECTION: Unified Form Terminal */}
          <div className="relative duration-1000 animate-in fade-in slide-in-from-bottom-12 lg:col-span-7">
            {/* Structural Decorative Frame */}
            <div className="pointer-events-none absolute -left-2 -top-2 hidden h-16 w-16 border-l-4 border-t-4 border-[#020617] md:block" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 hidden h-16 w-16 border-b-4 border-r-4 border-[#FCDE09] md:block" />

            <div className="relative overflow-hidden border-2 border-[#020617] bg-white p-8 shadow-[20px_20px_0px_0px_#f1f5f9] md:p-12">
              <div className="pointer-events-none absolute -right-12 -top-12 select-none opacity-[0.03]">
                <ShieldCheck size={300} strokeWidth={1} />
              </div>

              <div className="relative mb-10 flex items-end justify-between border-b border-slate-200 pb-6">
                <div>
                  <h3 className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Inquiry_Terminal_Gate
                  </h3>
                  <div className="h-1.5 w-16 bg-[#FCDE09]" />
                </div>
                <div className="hidden font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400 sm:block">
                  Auth_Encrypted_Session
                </div>
              </div>

              {/* 🟢 THE UNIFIED FORM COMPONENT */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* 📜 SYSTEM_FOOTER: Professional Status */}
      <div className="container mx-auto max-w-7xl px-6 pb-12">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-slate-200 pt-10 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-2.5 text-[#020617]">
            <div className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            System_Status: Operational
          </div>
          <FooterLink label="Encrypted_Data_Transmission" />
          <FooterLink label="Privacy_Governance_v3.3" />
          <div className="ml-auto tracking-[0.2em] opacity-40">© 2025 JPV_DOCS_MANAGEMENT</div>
        </div>
      </div>
    </main>
  )
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="group flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#020617] bg-white shadow-[4px_4px_0px_0px_#020617] transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-[#FCDE09] group-hover:shadow-none">
        {icon}
      </div>
      <div>
        <p className="text-[15px] font-black uppercase tracking-tight text-[#020617]">{title}</p>
        <p className="text-[11px] font-bold text-slate-600">{desc}</p>
      </div>
    </div>
  )
}

function FooterLink({ label }: { label: string }) {
  return (
    <div className="flex cursor-default items-center gap-2 transition-colors hover:text-[#020617]">
      <ChevronRight size={10} className="text-[#FCDE09]" />
      {label}
    </div>
  )
}
