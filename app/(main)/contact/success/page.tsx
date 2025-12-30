/** @format */

'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, Home, Loader2, ChevronRight, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🛰️ COMPONENT: SUCCESS_CONTENT_VIEW
 * ✅ FIXED: ESLint error - ลบ 'CalendarCheck' ที่ไม่ได้ใช้งานออก
 * ✅ IMPROVED: เพิ่ม Contrast ของสีเทาจาก Slate-300/400 เป็น Slate-500/600 ให้อ่านง่ายขึ้น
 */
const SuccessContent = () => {
  const searchParams = useSearchParams()

  const name = searchParams.get('name') || 'ท่าน'
  const ticketId = searchParams.get('id') || 'REF-PENDING'
  const isVerified = searchParams.get('verified') === 'true'

  const trackUrl = `https://jpvisouldocs.online/track/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trackUrl)}`

  return (
    <div className="relative w-full max-w-md border-2 border-[#020617] bg-white p-10 text-center shadow-[20px_20px_0px_0px_#f1f5f9] duration-500 animate-in fade-in zoom-in">
      {/* 🧩 UI_ACCENT: Corner Elements */}
      <div className="absolute -left-0.5 -top-0.5 h-10 w-10 border-l-4 border-t-4 border-[#FCDE09]" />

      {/* 🏷️ HEADER: Status Identification */}
      <div className="mb-10 space-y-3">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#020617]">
          {isVerified ? 'Confirmed' : 'Received'}
          <span className="text-[#FCDE09]">.</span>
        </h2>
        <div className="flex items-center justify-center gap-2.5">
          <div
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              isVerified ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-slate-400',
            )}
          />
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            {isVerified ? 'Profile_Verified_Active' : 'Awaiting_System_Verification'}
          </p>
        </div>
      </div>

      {/* 🔐 REFERENCE_KEY_VISUAL */}
      <div className="group relative mb-8 overflow-hidden border-2 border-[#020617] bg-white shadow-sm transition-all">
        {!isVerified && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 p-8 backdrop-blur-[2px] transition-all">
            <Lock size={28} className="mb-3 text-[#020617]" />
            <p className="text-center font-thai text-[13px] font-black leading-relaxed text-[#020617]">
              เพื่อความปลอดภัยของข้อมูล <br />
              <span className="text-slate-600">โปรดยืนยันตัวตนผ่านลิงก์ในอีเมล</span>
            </p>
          </div>
        )}

        <div className="space-y-6 bg-white p-10">
          <div className="space-y-1">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
              Reference_ID
            </span>
            <span className="font-mono text-3xl font-black tracking-widest text-[#020617]">
              {isVerified ? ticketId : '---- ----'}
            </span>
          </div>

          {isVerified && (
            <div className="border-t border-slate-100 pt-6 duration-1000 animate-in fade-in zoom-in">
              <div className="inline-block border-2 border-[#020617] bg-white p-2 shadow-sm">
                <Image
                  src={qrImage}
                  alt="Case Tracking QR"
                  width={120}
                  height={120}
                  className="h-32 w-32 grayscale transition-all duration-500 hover:grayscale-0"
                  unoptimized
                  priority
                />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
                <QrCode size={10} /> Case_Tracking_Protocol
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📝 ADVISOR_MESSAGE */}
      <div className="mb-10 min-h-[110px] font-thai">
        {isVerified ? (
          <div className="w-full space-y-4 duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4 border-l-4 border-[#10B981] bg-slate-50 p-5 text-left">
              <CheckCircle2 className="mt-0.5 shrink-0 text-[#10B981]" size={20} />
              <div className="space-y-1">
                <p className="text-[15px] font-black text-[#020617]">ข้อมูลเข้าสู่ระบบสำเร็จ</p>
                <p className="text-[12px] font-bold leading-relaxed text-slate-600">
                  คุณ{' '}
                  <span className="text-[#020617] underline decoration-[#FCDE09] underline-offset-4">
                    {name}
                  </span>{' '}
                  ข้อมูลการประเมินเบื้องต้นถูกส่งไปยังที่ปรึกษาแล้ว โปรดรอการติดต่อกลับครับ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 size={14} className="animate-spin" />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                Processing_Status
              </span>
            </div>
            <p className="max-w-[280px] text-[11px] font-bold italic leading-relaxed text-slate-500">
              *รหัสอ้างอิงและ QR จะแสดงผลทันทีหลังจาก <br /> คุณยืนยันอีเมลเรียบร้อยแล้ว
            </p>
          </div>
        )}
      </div>

      {/* 🚪 ACTION: Navigation */}
      <div className="border-t border-slate-100 pt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 transition-all hover:text-[#020617]"
        >
          <Home size={14} className="transition-transform group-hover:-translate-y-0.5" />
          <span>Return_to_Main_Portal</span>
          <ChevronRight
            size={14}
            className="text-[#FCDE09] transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  )
}

/**
 * 🛰️ MAIN_PAGE_WRAPPER
 */
export default function ContactSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-6 selection:bg-[#FCDE09] selection:text-[#020617]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 flex w-full justify-center">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin border-4 border-slate-200 border-t-[#020617]" />
              <p className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                Authenticating...
              </p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>

      <div className="absolute bottom-6 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">
        <ShieldCheck size={12} className="text-[#FCDE09]" /> Unified_Security_Protocol_v3.3
      </div>
    </main>
  )
}
