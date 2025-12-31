/** @format */

'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Home, ChevronRight, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react'

const SuccessContent = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'ท่าน'
  const ticketId = searchParams.get('id') || 'REF-ACTIVE'
  const trackUrl = `https://jpvisouldocs.online/track/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    trackUrl,
  )}`

  return (
    <div className="relative w-full max-w-md rounded-md border-2 border-[#020617] bg-white p-10 text-center shadow-[20px_20px_0px_0px_#f1f5f9] animate-in fade-in zoom-in">
      <div className="absolute -left-0.5 -top-0.5 h-10 w-10 border-l-4 border-t-4 border-[#FCDE09]" />

      {/* HEADER */}
      <div className="mb-10 space-y-3">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#020617]">
          Confirmed<span className="text-[#FCDE09]">.</span>
        </h2>
        <div className="flex items-center justify-center gap-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            Profile_Verified_Active
          </p>
        </div>
      </div>

      {/* REFERENCE + QR */}
      <div className="mb-8 rounded-md border-2 border-[#020617] bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
              Reference_ID
            </span>
            <span className="font-mono text-3xl font-black tracking-widest text-[#020617]">
              {ticketId}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="inline-block rounded-md border-2 border-[#020617] bg-white p-2 shadow-sm">
              <Image
                src={qrImage}
                alt="Case Tracking QR"
                width={120}
                height={120}
                className="h-32 w-32"
                unoptimized
                priority
              />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
              <QrCode size={10} /> Case_Tracking_Protocol
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="mb-10 font-thai">
        <div className="flex items-start gap-4 rounded-md border-l-4 border-[#10B981] bg-slate-50 p-5 text-left">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#10B981]" size={20} />
          <div className="space-y-1">
            <p className="text-[15px] font-black text-[#020617]">ข้อมูลเข้าสู่ระบบสำเร็จ</p>
            <p className="text-[12px] font-bold leading-relaxed text-slate-600">
              คุณ{' '}
              <span className="text-[#020617] underline decoration-[#FCDE09] underline-offset-4">
                {name}
              </span>{' '}
              ระบบบันทึกข้อมูลเรียบร้อยแล้ว
            </p>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="border-t border-slate-100 pt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 transition-all hover:text-[#020617]"
        >
          <Home size={14} className="group-hover:-translate-y-0.5" />
          <span>Return_to_Main_Portal</span>
          <ChevronRight size={14} className="text-[#FCDE09] group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function ContactSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white p-6 selection:bg-[#FCDE09] selection:text-[#020617]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 flex w-full justify-center">
        <SuccessContent />
      </div>

      <div className="absolute bottom-6 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">
        <ShieldCheck size={12} className="text-[#FCDE09]" />
        Unified_Security_Protocol_v3.3
      </div>
    </main>
  )
}
