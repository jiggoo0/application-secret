/** @format */

"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Lock, ShieldCheck, Home, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/**
 * 🛰️ COMPONENT: ASSESSMENT_SUCCESS_PROTOCOL
 * @version 3.2.5 (Industrial Sharp Edition)
 * PURPOSE: หน้าแสดงผลการรับรหัสอ้างอิงและบัตรคิวดิจิทัล
 * STATUS: ESLint_Warnings_Fixed
 */
function SuccessContent() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get("verified") === "true"
  const ticketId = searchParams.get("id") || "WAITING"
  const name = searchParams.get("name") || "ท่าน"

  // 🔗 PASS_GENERATOR_LOGIC
  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    passUrl
  )}`

  return (
    <div className="relative w-full max-w-md border-4 border-[#020617] bg-white p-8 shadow-sharp transition-all duration-500 animate-in fade-in zoom-in">
      {/* 🧩 STATUS_BAR (MODE B) */}
      <div
        className={`absolute left-0 top-0 h-2 w-full transition-colors duration-1000 ${
          isVerified ? "bg-[#10B981]" : "bg-[#FCDE09]"
        }`}
      />

      <div className="space-y-8 text-center">
        {/* 🛡️ STATUS_ICON */}
        <div className="inline-block border-2 border-[#020617] bg-[#020617] p-5 text-[#FCDE09] shadow-sharp transition-transform hover:scale-105">
          {isVerified ? (
            <ShieldCheck size={48} strokeWidth={2.5} />
          ) : (
            <Lock size={48} strokeWidth={2.5} />
          )}
        </div>

        {/* 🏷️ HEADER_TITLE */}
        <div className="space-y-2">
          <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-[#020617]">
            {isVerified ? "Ready" : "Waiting"}
            <span className="text-[#FCDE09]">.</span>
          </h2>
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            SYSTEM_STATUS:{" "}
            {isVerified ? "ACCESS_GRANTED" : "PENDING_VERIFICATION"}
          </p>
        </div>

        {/* 🔑 TICKET_MANIFEST */}
        <div className="relative border-2 border-dashed border-slate-200 bg-slate-50 p-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
          <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Reference_ID
          </p>
          <p className="font-mono text-3xl font-black tracking-[0.15em] text-[#020617]">
            {isVerified ? ticketId : "XXXX-XXXX"}
          </p>
          <div className="absolute -right-3 -top-3 bg-[#020617] px-3 py-1 text-[9px] font-black italic text-[#FCDE09] shadow-sharp">
            V.2025_SECURE
          </div>
        </div>

        {/* 📲 QR_PROTOCOL (MODE B: Sharp Edges) */}
        {isVerified && (
          <div className="py-2 duration-1000 animate-in fade-in slide-in-from-bottom-6">
            <div className="inline-block border-4 border-[#020617] bg-white p-4 shadow-sharp transition-transform hover:-rotate-1">
              <Image
                src={qrImage}
                alt="Digital Pass QR"
                width={180}
                height={180}
                className="h-44 w-44 grayscale transition-all duration-500 hover:grayscale-0"
                unoptimized
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
              <QrCode size={14} className="text-[#020617]" />
              Scan for Digital Identity Pass
            </div>
          </div>
        )}

        {/* 💬 COMMUNICATION_TONE (MODE C: Advisor Voice) */}
        <div className="space-y-5 px-2">
          <div className="font-thai text-base font-bold leading-relaxed text-slate-600">
            {isVerified ? (
              <p>
                คุณ{" "}
                <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                  {name}
                </span>{" "}
                ได้รับรหัสอ้างอิงเรียบร้อยแล้ว <br />
                ที่ปรึกษาจะตรวจสอบข้อมูลและติดต่อกลับเพื่อเริ่มขั้นตอนถัดไป
              </p>
            ) : (
              <p>
                กรุณาตรวจสอบกล่องจดหมายของคุณ <br />
                และกดปุ่ม{" "}
                <span className="font-black text-[#020617]">
                  "ยืนยันข้อมูล"
                </span>{" "}
                เพื่อเปิดล็อกบัตรคิวดิจิทัล
              </p>
            )}
          </div>

          {!isVerified && (
            <div className="border-l-4 border-[#FCDE09] bg-slate-50 p-5 text-left shadow-sm">
              <p className="font-thai text-[12px] font-bold leading-snug text-slate-500">
                <span className="uppercase text-[#020617]">Note:</span>{" "}
                หากไม่พบอีเมลในกล่องข้อความหลัก โปรดตรวจสอบใน "จดหมายขยะ" (Spam)
                เพื่อป้องกันความล่าช้าในการตรวจสอบ
              </p>
            </div>
          )}
        </div>

        {/* 🏠 ACTION_HUB */}
        <div className="flex flex-col items-center gap-6 border-t border-slate-100 pt-8">
          <Link
            href="/"
            className="group flex items-center gap-3 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-[#020617]"
          >
            <Home
              size={16}
              className="transition-transform group-hover:-translate-y-1"
            />
            Return_to_Main_Terminal
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * 🛰️ WRAPPER: ASSESSMENT_SUCCESS_PAGE
 */
export default function AssessmentSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white p-6 font-thai selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* BACKGROUND_DECOR (MODE B: Blueprint Grid) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-[0.01] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:100px_100px]" />

      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin border-4 border-[#FCDE09] border-t-[#020617]" />
            <p className="animate-pulse font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
              Syncing_Encrypted_Protocol...
            </p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  )
}
