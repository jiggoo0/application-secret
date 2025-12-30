/** * @format
 * @description CONTACT_SUCCESS_TERMINAL: Dynamic Identity Pass (V3.2.5)
 * ✅ ENFORCEMENT: Dual-State Access HUD, Encrypted QR Protocol, Mechanical Lock UI
 */

'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Lock,
  Home,
  CalendarCheck,
  Loader2,
  ChevronRight,
  QrCode,
  ShieldCheck,
  Cpu,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SuccessContent = () => {
  const searchParams = useSearchParams()

  // 1. DATA_EXTRACTION: ถอดรหัสสถานะจาก URL
  const name = searchParams.get('name') || 'Client'
  const ticketId = searchParams.get('id') || 'X-####-X'
  const isVerified = searchParams.get('verified') === 'true'

  // 2. QR_CODE_PROTOCOL: สร้าง Digital Identity Link
  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&bgcolor=ffffff&color=020617&data=${encodeURIComponent(passUrl)}`

  return (
    <div className="relative w-full max-w-md border-[4px] border-slate-950 bg-white p-10 text-center shadow-sharp-brand duration-700 animate-in fade-in zoom-in-95">
      {/* 🧩 UI_ACCENTS: Industrial Brackets (Mode B) */}
      <div className="absolute -left-3 -top-3 h-14 w-14 border-l-[8px] border-t-[8px] border-brand" />
      <div className="absolute -bottom-3 -right-3 h-14 w-14 border-b-[8px] border-r-[8px] border-slate-950" />

      {/* 🏷️ STATUS_HEADER: System Authorization Display */}
      <div className="mb-12 space-y-4">
        <h2 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950">
          {isVerified ? 'Unlocked' : 'Awaiting'}
          <span className="not-italic text-brand">.</span>
        </h2>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isVerified ? 'animate-pulse bg-emerald-500' : 'bg-rose-500',
              )}
            />
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
              STatus:: {isVerified ? 'ID_CONFIRMED' : 'PENDING_AUTH'}
            </span>
          </div>
        </div>
      </div>

      {/* 🔐 ACCESS_KEY_BOARD: Central Identity Module */}
      <div className="shadow-sharp group relative mb-10 overflow-hidden border-[3px] border-slate-950 bg-slate-950">
        {/* MECHANICAL_LOCK_OVERLAY: แสดงเมื่อยังไม่ยืนยันตัวตน */}
        {!isVerified && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-700">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-brand/20" />
              <div className="shadow-sharp relative flex h-16 w-16 items-center justify-center border-[3px] border-slate-950 bg-white text-slate-950">
                <Lock size={28} strokeWidth={2.5} />
              </div>
            </div>
            <p className="font-thai max-w-[240px] px-6 text-[14px] font-black leading-snug text-slate-950">
              กรุณาคลิกลิงก์ยืนยันตัวตนใน <br />
              <span className="bg-slate-950 px-1 italic text-brand">อีเมลของคุณ</span> <br />
              เพื่อปลดล็อค Digital Pass
            </p>
          </div>
        )}

        <div className="relative z-10 space-y-8 p-10">
          <div className="space-y-2">
            <span className="flex items-center justify-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              <Cpu size={12} /> Reference_Key
            </span>
            <div className="font-mono text-5xl font-black tracking-tighter text-brand drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
              {isVerified ? ticketId : '####-####'}
            </div>
          </div>

          {/* 📲 QR_CODE_ENFORCEMENT: Shown only on Success */}
          {isVerified && (
            <div className="border-t border-white/10 pt-8 duration-1000 animate-in fade-in slide-in-from-top-4">
              <div className="group/qr relative inline-block border-[4px] border-brand bg-white p-4 shadow-sharp-sm transition-transform hover:scale-105 active:scale-95">
                <Image
                  src={qrImage}
                  alt="Identity Pass QR"
                  width={160}
                  height={160}
                  className="h-40 w-40 grayscale-0 transition-all duration-500"
                  unoptimized
                  priority
                />
                <div className="absolute -right-2 -top-2 bg-slate-950 p-1 text-brand">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <p className="mt-6 flex items-center justify-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-brand">
                <QrCode size={14} /> ID_PASS_READY
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📝 INFO_DISPLAY: Advisor Response Unit */}
      <div className="mb-10 min-h-[140px]">
        {isVerified ? (
          <div className="font-thai w-full space-y-4 duration-700 animate-in fade-in slide-in-from-right-4">
            <div className="relative overflow-hidden border-l-[6px] border-emerald-500 bg-slate-50 p-8 text-left shadow-sharp-sm">
              <div className="absolute -right-4 -top-4 text-slate-950 opacity-[0.05]">
                <CalendarCheck size={100} />
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-lg font-black text-slate-950">ข้อมูลถูกส่งเข้าระบบสำเร็จ</p>
                <p className="text-[14px] font-bold leading-relaxed text-slate-500">
                  คุณ{' '}
                  <span className="text-slate-950 underline decoration-brand decoration-4 underline-offset-4">
                    {name}
                  </span>{' '}
                  ข้อมูลของคุณเข้าสู่คิวการตรวจสอบแล้ว ที่ปรึกษาจะติดต่อกลับภายในเวลาทำการครับ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="font-thai flex flex-col items-center gap-4 py-6">
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2 size={18} className="animate-spin" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em]">
                AWAITING_SIGNAL
              </span>
            </div>
            <p className="max-w-[260px] text-center text-[12px] font-bold italic leading-relaxed text-slate-400">
              *รหัสอ้างอิงและ QR Code จะแสดงผลทันที <br />
              หลังจากการตรวจสอบอีเมลเสร็จสมบูรณ์
            </p>
          </div>
        )}
      </div>

      {/* 🚪 EXIT_STRATEGY */}
      <div className="border-t-2 border-slate-100 pt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-4 font-mono text-[13px] font-black uppercase tracking-[0.4em] text-slate-950 transition-all hover:text-brand"
        >
          <div className="flex h-10 w-10 items-center justify-center border-2 border-slate-950 transition-colors group-hover:bg-brand">
            <Home size={18} />
          </div>
          <span className="border-b-2 border-transparent group-hover:border-brand">
            EXIT_TO_CORE
          </span>
          <ChevronRight
            size={18}
            className="text-brand transition-transform group-hover:translate-x-2"
          />
        </Link>
      </div>
    </div>
  )
}

export default function ContactSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-6 font-sans selection:bg-brand selection:text-slate-950">
      {/* 🧩 UI_INFRA: Blueprint Grid (Mode B) */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />

      {/* Industrial Decorative Geometry */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full border-[60px] border-slate-50 opacity-50" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rotate-12 border-[80px] border-slate-50 opacity-50" />

      <div className="relative z-10 flex w-full justify-center">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-8">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 animate-spin border-[8px] border-slate-100 border-t-slate-950" />
                <div className="absolute inset-4 animate-ping bg-brand/20" />
              </div>
              <p className="animate-pulse font-mono text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">
                INITIATING_SECURE_SESSION...
              </p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  )
}
