/** @format */

"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Lock,
  Home,
  CalendarCheck,
  Loader2,
  ChevronRight,
  QrCode,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 🛰️ COMPONENT: CONTACT_SUCCESS_TERMINAL
 * @version 3.2.5 (Industrial Sharp Edition)
 * PURPOSE: แสดงผลลัพธ์การส่งข้อมูลติดต่อและออกบัตรคิวดิจิทัล
 */
const SuccessContent = () => {
  const searchParams = useSearchParams()

  // 1. DATA_EXTRACTION
  const name = searchParams.get("name") || "ท่าน"
  const ticketId = searchParams.get("id") || "WAITING"
  const isVerified = searchParams.get("verified") === "true"

  // 2. QR_CODE_PROTOCOL
  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(passUrl)}`

  return (
    <div className="relative w-full max-w-md border-4 border-[#020617] bg-white p-10 text-center shadow-sharp duration-500 animate-in fade-in zoom-in">
      {/* 🧩 UI_DECOR: Corner Accent (Mode B) */}
      <div className="absolute -left-2 -top-2 h-10 w-10 border-l-[6px] border-t-[6px] border-[#FCDE09]" />
      <div className="absolute -bottom-2 -right-2 h-10 w-10 border-b-[6px] border-r-[6px] border-[#020617]" />

      {/* 🏷️ STATUS_HEADER (Mode B & C) */}
      <div className="mb-10 space-y-3">
        <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
          {isVerified ? "Unlocked" : "Awaiting"}
          <span className="text-[#FCDE09]">.</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div
            className={cn(
              "h-2.5 w-2.5 shadow-sm",
              isVerified ? "animate-pulse bg-[#10B981]" : "bg-[#EF4444]"
            )}
          />
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            System_Status:{" "}
            {isVerified ? "IDENTITY_CONFIRMED" : "PENDING_VERIFICATION"}
          </p>
        </div>
      </div>

      {/* 🔐 ACCESS_KEY_BOARD & QR_CODE */}
      <div className="group relative mb-8 overflow-hidden border-[3px] border-[#020617] shadow-sharp">
        {!isVerified && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 p-8 backdrop-blur-md transition-all">
            <Lock size={32} strokeWidth={2.5} className="mb-4 text-[#020617]" />
            <p className="text-center font-thai text-[13px] font-bold leading-relaxed text-[#020617]">
              กรุณายืนยันตัวตนผ่านลิงก์ในอีเมลของคุณ <br />
              เพื่อเปิดใช้งานรหัสอ้างอิงและบัตรดิจิทัล
            </p>
          </div>
        )}

        <div className="space-y-6 bg-[#020617] p-10">
          <div className="space-y-1">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">
              Reference_Key
            </span>
            <span className="font-mono text-4xl font-black tracking-[0.2em] text-[#FCDE09] drop-shadow-[3px_3px_0px_rgba(255,255,255,0.05)]">
              {isVerified ? ticketId : "####-####"}
            </span>
          </div>

          {/* 📲 QR CODE DISPLAY: Optimized (Mode B) */}
          {isVerified && (
            <div className="border-t border-white/10 pt-6 duration-1000 animate-in fade-in zoom-in">
              <div className="group/qr inline-block border-4 border-[#FCDE09] bg-white p-3 shadow-sharp transition-transform hover:-rotate-1">
                <Image
                  src={qrImage}
                  alt="Identity Pass QR"
                  width={140}
                  height={140}
                  className="h-36 w-36 grayscale transition-all duration-500 group-hover/qr:grayscale-0"
                  unoptimized
                  priority
                />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                <QrCode size={12} /> Digital_Identity_Pass
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📝 INFORMATION_DISPLAY (Mode C: Advisor Tone) */}
      <div className="mb-10 flex min-h-[120px] items-center justify-center">
        {isVerified ? (
          <div className="w-full space-y-4 font-thai duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-5 border-l-[6px] border-[#10B981] bg-slate-50 p-6 text-left shadow-sm">
              <CalendarCheck
                className="mt-1 shrink-0 text-[#10B981]"
                size={28}
              />
              <div className="space-y-1.5">
                <p className="text-base font-black text-[#020617]">
                  ยืนยันการรับเรื่องสำเร็จ
                </p>
                <p className="text-[13px] font-medium leading-relaxed text-slate-500">
                  คุณ{" "}
                  <span className="font-bold text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-2">
                    {name}
                  </span>{" "}
                  ข้อมูลถูกส่งเข้าสู่ระบบคัดกรองแล้ว
                  ที่ปรึกษาจะติดต่อกลับเพื่อแจ้งแนวทางเบื้องต้นครับ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4 font-thai">
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2 size={16} className="animate-spin" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em]">
                Waiting_For_Auth
              </span>
            </div>
            <p className="max-w-[240px] text-center text-[11px] font-bold italic leading-relaxed text-slate-400">
              *รหัสและ QR
              จะถูกเปิดเผยทันทีที่ระบบได้รับการยืนยันจากลิงก์ในอีเมลของคุณ
            </p>
          </div>
        )}
      </div>

      {/* 🚪 TERMINAL_EXIT */}
      <div className="border-t-2 border-slate-100 pt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[#020617] transition-all hover:text-[#FCDE09]"
        >
          <Home
            size={18}
            className="transition-transform group-hover:-translate-y-1"
          />
          <span>Exit_To_Home</span>
          <ChevronRight
            size={16}
            className="text-[#FCDE09] transition-transform group-hover:translate-x-2"
          />
        </Link>
      </div>
    </div>
  )
}

export default function ContactSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-6 font-sans selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_DECOR: Blueprint Grid (Mode B) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Perspective Shapes */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rotate-12 border-[20px] border-slate-50 opacity-50" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rotate-45 border-[20px] border-slate-50 opacity-50" />

      <div className="relative z-10 flex w-full justify-center">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-6">
              <div className="h-14 w-14 animate-spin border-[6px] border-slate-100 border-t-[#020617] shadow-sharp" />
              <p className="animate-pulse font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                Authorizing_Session...
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
