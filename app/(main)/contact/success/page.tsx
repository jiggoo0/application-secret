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
 * @description CONTACT_SUCCESS_TERMINAL: ระบบแสดงผลการยืนยันตัวตนพร้อม QR Code
 * @fix Resolved ESLint warnings (Unused ShieldCheck, QrCode import, and Image optimization)
 */

const SuccessContent = () => {
  const searchParams = useSearchParams()

  // 1. DATA_EXTRACTION
  const name = searchParams.get("name") || "GUEST"
  const ticketId = searchParams.get("id") || "XXXX-XXXX"
  const isVerified = searchParams.get("verified") === "true"

  // 2. QR_CODE_GENERATION (Link to Digital Pass)
  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    passUrl
  )}`

  return (
    <div className="relative w-full max-w-md space-y-8 rounded-none border-4 border-[#020617] bg-white p-10 text-center shadow-sharp">
      {/* 🧩 UI_ACCENT: Corner Mark */}
      <div className="absolute left-0 top-0 h-8 w-8 -translate-x-2 -translate-y-2 border-l-4 border-t-4 border-[#FCDE09]" />

      {/* 🏷️ STATUS_HEADER (MODE B & C) */}
      <div className="space-y-3">
        <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
          {isVerified ? "Unlocked" : "Awaiting"}
          <span className="text-[#FCDE09]">.</span>
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-none shadow-sharp",
              isVerified ? "animate-pulse bg-[#10B981]" : "bg-[#EF4444]"
            )}
          />
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Status: {isVerified ? "IDENTITY_CONFIRMED" : "PENDING_VERIFICATION"}
          </p>
        </div>
      </div>

      {/* 🔐 ACCESS_KEY_BOARD & QR_CODE */}
      <div className="group relative overflow-hidden border-2 border-[#020617]">
        {!isVerified && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 p-6 backdrop-blur-sm transition-all">
            <Lock size={28} className="mb-3 text-[#020617]" />
            <p className="text-center font-thai text-[11px] font-bold leading-tight text-[#020617]">
              โปรดยืนยันตัวตนผ่านอีเมลของคุณ <br />{" "}
              เพื่อรับสิทธิ์การติดต่อลำดับพิเศษ
            </p>
          </div>
        )}

        <div className="space-y-6 bg-[#020617] p-8">
          <div className="space-y-1">
            <span className="block font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
              Official_Reference_Key
            </span>
            <span className="font-mono text-4xl font-black tracking-[0.15em] text-[#FCDE09] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
              {isVerified ? ticketId : "####-####"}
            </span>
          </div>

          {/* 📲 QR CODE DISPLAY: Optimized with next/image */}
          {isVerified && (
            <div className="border-t border-white/10 pt-4 duration-700 animate-in fade-in zoom-in">
              <div className="inline-block border-2 border-[#FCDE09] bg-white p-2 shadow-sharp">
                <Image
                  src={qrImage}
                  alt="Identity Pass QR"
                  width={128}
                  height={128}
                  className="h-32 w-32"
                  unoptimized
                  priority
                />
              </div>
              <p className="mt-2 flex items-center justify-center gap-2 font-mono text-[8px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
                <QrCode size={10} /> Scan to View Digital_Pass
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📝 INFORMATION_DISPLAY (MODE C) */}
      <div className="flex min-h-[100px] items-center justify-center">
        {isVerified ? (
          <div className="w-full space-y-4 font-thai duration-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4 border-l-4 border-[#10B981] bg-slate-50 p-6 text-left shadow-sharp">
              <CalendarCheck className="shrink-0 text-[#10B981]" size={24} />
              <div className="space-y-1">
                <p className="text-[13px] font-black text-[#020617]">
                  รับเรื่องเรียบร้อยแล้ว
                </p>
                <p className="text-[12px] font-medium leading-relaxed text-slate-500">
                  คุณ <strong>{name}</strong>{" "}
                  ข้อมูลของคุณถูกส่งถึงเจ้าหน้าที่ระดับสูงแล้ว
                  เราจะติดต่อกลับโดยอ้างอิงรหัสข้างต้นเป็นสำคัญครับ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4 font-thai">
            <div className="flex items-center gap-2 text-slate-300">
              <Loader2 size={14} className="animate-spin" />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                Waiting_for_signal
              </span>
            </div>
            <p className="text-[11px] italic text-slate-400">
              *รหัสอ้างอิงและ QR Code จะถูกเปิดเผยหลังการยืนยันตัวตนเท่านั้น
            </p>
          </div>
        )}
      </div>

      {/* 🚪 TERMINAL_EXIT */}
      <div className="border-t border-slate-100 pt-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#020617] transition-all hover:text-[#FCDE09]"
        >
          <Home size={16} />
          <span>Return_to_Main_Terminal</span>
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  )
}

export default function ContactSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-6 font-sans">
      {/* 🧩 UI_DECOR: Blueprint Grid (MODE B) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-slate-50" />

      <div className="relative z-10">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-none border-4 border-slate-100 border-t-[#020617] shadow-sharp" />
              <p className="animate-pulse font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Syncing_Protocol...
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
