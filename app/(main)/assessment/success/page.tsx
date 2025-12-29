/** @format */
"use client"

import { useSearchParams } from "next/navigation"
import { Lock, ShieldCheck, Home, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/**
 * @description ASSESSMENT_SUCCESS_PAGE: หน้าแสดงสถานะการยืนยันตัวตนและ QR Code
 * @fix Resolved ESLint warning by using Next.js Image component
 */

export default function AssessmentSuccessPage() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get("verified") === "true"
  const ticketId = searchParams.get("id") || "PENDING"
  const name = searchParams.get("name") || "Customer"

  // สร้างลิงก์สำหรับ QR Code เพื่อให้ลูกค้าสแกนเข้าหน้า Digital Pass
  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(passUrl)}`

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6 font-thai">
      <div className="relative w-full max-w-md overflow-hidden border-[3px] border-slate-950 bg-white p-8 shadow-[20px_20px_0px_0px_#f1f5f9]">
        {/* 🧩 DECOR_BAR: Status indicator */}
        <div
          className={`absolute left-0 top-0 h-2 w-full ${
            isVerified ? "bg-green-500" : "bg-[#FCDE09]"
          }`}
        />

        <div className="space-y-6 text-center">
          {/* 🛡️ ICON_STATUS */}
          <div className="inline-block bg-slate-950 p-4 text-[#FCDE09] shadow-sharp">
            {isVerified ? <ShieldCheck size={40} /> : <Lock size={40} />}
          </div>

          {/* 🏷️ HEADER */}
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-slate-950">
              {isVerified ? "Unlocked" : "Locked"}
              <span className="text-[#FCDE09]">.</span>
            </h2>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-400">
              STATUS: {isVerified ? "IDENTITY_CONFIRMED" : "WAITING_FOR_AUTH"}
            </p>
          </div>

          {/* 🔑 TICKET_DISPLAY */}
          <div className="group relative border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-colors hover:border-slate-300">
            <p className="mb-2 font-mono text-[10px] font-black uppercase text-slate-400">
              Access_Key
            </p>
            <p className="font-mono text-3xl font-black tracking-[0.2em] text-slate-950">
              {isVerified ? ticketId : "XXXX-XXXX"}
            </p>
            <div className="absolute -right-2 -top-2 bg-slate-950 px-2 py-0.5 text-[8px] font-bold italic text-white">
              V.2025
            </div>
          </div>

          {/* 📲 QR_CODE_SECTION: Optimized with next/image */}
          {isVerified && (
            <div className="py-4 duration-700 animate-in fade-in slide-in-from-bottom-4">
              <div className="inline-block border-2 border-slate-950 bg-white p-3 shadow-sharp">
                <Image
                  src={qrImage}
                  alt="Digital Pass QR"
                  width={160}
                  height={160}
                  className="h-40 w-40"
                  unoptimized // ใช้ unoptimized เพราะเป็น external API ที่ generate รูปสด
                  priority
                />
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-400">
                <QrCode size={12} /> Scan to view Digital Pass
              </p>
            </div>
          )}

          {/* 💬 MESSAGE */}
          <div className="space-y-4 px-2">
            <p className="text-sm font-bold leading-relaxed text-slate-600">
              {isVerified
                ? `คุณ ${name} ได้รับการยืนยันแล้ว ระบบได้ออกบัตรดิจิทัลให้คุณเรียบร้อย เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด`
                : "กรุณาตรวจสอบอีเมลและกดปุ่มยืนยันตัวตน เพื่อเข้าถึงรหัสคีย์และบัตรดิจิทัลของคุณ"}
            </p>
            {!isVerified && (
              <div className="border-l-4 border-[#FCDE09] bg-slate-50 p-4 text-left">
                <p className="text-[11px] font-bold text-slate-500">
                  <span className="text-slate-950">Note:</span>{" "}
                  หากไม่พบอีเมลในกล่องจดหมายหลัก โปรดตรวจสอบใน Junk/Spam folder
                </p>
              </div>
            )}
          </div>

          {/* 🏠 ACTIONS */}
          <div className="flex flex-col items-center gap-4 border-t border-slate-100 pt-6">
            <Link
              href="/"
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-950"
            >
              <Home
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              Return_to_base
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
