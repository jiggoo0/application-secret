/** @format */

import React from 'react'
import { supabaseServer } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ShieldCheck, Globe, Fingerprint, CheckCircle2, Activity, Zap } from 'lucide-react'

/**
 * 🛰️ PROTOCOL_INTERFACES
 * ----------------------------------------------------------------
 * โครงสร้าง Metadata ของ Lead
 * แก้ไขภาษาให้เป็นไทยชัดเจน เพื่อให้ AI ตัวถัดไปเข้าใจตรงกัน
 */
interface LeadMetadata {
  ticket_id?: string
  source_type?: string
  case_profile?: {
    country?: string
    occupation?: string
    target_date?: string
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * 🛰️ PAGE: DIGITAL_PASS_CORE
 * VERSION: 3.3.6 (Production – Test Mode Removed)
 * PURPOSE: แสดงบัตรรับรองผลการประเมินเคสแบบ Digital สำหรับลูกค้า
 *
 * NOTE_FOR_AI:
 * - ไม่มีโหมดทดสอบ
 * - ทุก Ticket ID ต้องผ่านการตรวจสอบจากฐานข้อมูลเท่านั้น
 */
export default async function PassPage({ params }: PageProps) {
  const { id } = await params

  /**
   * 1. DATA_EXTRACTION
   * ----------------------------------------------------------------
   * ดึงข้อมูล Lead จาก Supabase โดยใช้ ticket_id ที่อยู่ใน metadata
   */
  const { data: lead, error } = await supabaseServer
    .from('leads')
    .select('*')
    .eq('metadata->>ticket_id', id.toUpperCase())
    .single()

  if (error || !lead) return notFound()

  /**
   * 2. DATA_MAPPING
   * ----------------------------------------------------------------
   * แปลงข้อมูลจาก Lead + Metadata ให้อยู่ในรูปแบบที่ใช้แสดงผล
   */
  const customerName = lead.name || 'ผู้ถือบัตร'
  const metadata = (lead.metadata as unknown as LeadMetadata) || {}

  const targetCountry = metadata.case_profile?.country || 'ไม่ระบุประเทศ'
  const serviceType = lead.category || 'การประเมินเคส'
  const ticketId = id.toUpperCase()

  const authDate = new Date(lead.created_at).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] p-6 font-sans text-white">
      {/* โครงตารางพื้นหลังแบบ Blueprint */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#FCDE09 1px, transparent 1px), linear-gradient(90deg, #FCDE09 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* เส้น Accent ด้านบน */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#FCDE09] to-transparent opacity-50" />

      <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in-95">
        {/* Glow Effect */}
        <div className="absolute -inset-10 rounded-full bg-[#FCDE09]/5 blur-[80px]" />

        <div className="relative overflow-hidden border-2 border-[#FCDE09] bg-[#020617] shadow-[25px_25px_0px_0px_rgba(0,0,0,0.5)]">
          {/* แถบหัวเอกสาร */}
          <div className="flex h-10 items-center justify-between bg-[#FCDE09] px-6">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#020617]">
              เอกสารภายในระบบ
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#020617]/20" />
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* ส่วนหัวข้อมูล */}
            <div className="mb-12 flex items-start justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#FCDE09]" />
                  <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#FCDE09]">
                    สิทธิ์การเข้าถึงแผนงาน
                  </h2>
                </div>
                <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  PROTOCOL_VERSION: 3.3.6
                </p>
              </div>
              <div className="border-2 border-slate-800 p-2.5 text-[#FCDE09] shadow-[4px_4px_0px_0px_#1e293b]">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
            </div>

            {/* ข้อมูลผู้ถือบัตร */}
            <div className="mb-10 space-y-10">
              <div className="relative border-l-4 border-[#FCDE09] pl-6">
                <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  ชื่อผู้ถือบัตร
                </p>
                <h1 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-white">
                  {customerName}
                </h1>
              </div>

              {/* ตารางข้อมูลหลัก */}
              <div className="grid grid-cols-2 gap-px border-y border-slate-800 bg-slate-800">
                <div className="bg-[#020617] py-6 pr-4">
                  <p className="mb-2 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
                    <Fingerprint size={10} className="text-[#FCDE09]" />
                    รหัสอ้างอิง
                  </p>
                  <p className="font-mono text-sm font-black tracking-widest text-white">
                    {ticketId}
                  </p>
                </div>
                <div className="bg-[#020617] py-6 pl-4">
                  <p className="mb-2 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
                    <Globe size={10} className="text-[#FCDE09]" />
                    พื้นที่เป้าหมาย
                  </p>
                  <p className="truncate text-sm font-black uppercase text-white">
                    {targetCountry}
                  </p>
                </div>
              </div>
            </div>

            {/* สถานะการประเมิน */}
            <div className="mb-8 border border-slate-800/50 bg-slate-900/40 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-[#FCDE09]" fill="currentColor" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {serviceType}
                  </span>
                </div>
                <CheckCircle2 size={16} className="text-[#FCDE09]" />
              </div>
              <div className="h-1 w-full bg-slate-800">
                <div className="h-full w-full bg-[#FCDE09] shadow-[0_0_8px_#FCDE09]" />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[8px] font-bold uppercase tracking-tighter">
                <span className="text-slate-500">สถานะ: ยืนยันแล้ว</span>
                <span className="text-[#FCDE09]">มีผลจนกว่ากระบวนการจะสิ้นสุด</span>
              </div>
            </div>

            {/* แถบ Barcode จำลอง */}
            <div className="pt-4 text-center">
              <div className="mb-6 flex items-center justify-center gap-[1.5px]">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/20 transition-all hover:bg-[#FCDE09]"
                    style={{
                      width: i % 5 === 0 ? '3px' : '1px',
                      height: `${((i * 13) % 20) + 25}px`,
                    }}
                  />
                ))}
              </div>
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.5em] text-slate-700">
                JPV_MANAGEMENT_SYSTEM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* แถบสถานะการเชื่อมต่อ */}
      <footer className="fixed bottom-10 flex w-full justify-center">
        <div className="group flex items-center gap-4 border border-slate-800 bg-[#020617]/80 px-6 py-2.5 backdrop-blur-md transition-all hover:border-[#FCDE09]">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            การเชื่อมต่อปลอดภัย: <span className="text-white">เชื่อมต่อแล้ว</span>
          </p>
          <div className="h-4 w-px bg-slate-800" />
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#FCDE09]">
            ออกเมื่อ {authDate}
          </p>
        </div>
      </footer>
    </main>
  )
}
