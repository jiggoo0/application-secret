/** @format */
import React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2, ShieldCheck, RefreshCcw } from "lucide-react"

// ✅ Next.js อนุญาตให้ Named Export เฉพาะ Metadata เท่านั้น
export const metadata: Metadata = {
  title: "Submission Complete | JP Visual Docs",
  description: "Protocol transmission successfully completed.",
  robots: { index: false, follow: false },
}

/**
 * 🛰️ COMPONENT: AssessmentSuccessPage
 * 🚩 REMOVED 'export' keyword to satisfy Next.js TS2344 constraint
 */
const AssessmentSuccessPage = () => {
  const ticketId = "REG-9942-X82"

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white py-20">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.04]" />

      <div className="container relative z-10 max-w-2xl px-6 text-center">
        {/* SUCCESS_NODE: SIGNAL_TRANSMITTED */}
        <div className="relative mb-12 inline-block">
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-none bg-slate-950 shadow-[15px_15px_0px_0px_#FCDE09]">
            <CheckCircle2
              className="text-[#FCDE09]"
              size={48}
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 animate-pulse border border-slate-100" />
        </div>

        {/* CONTENT_MANIFEST */}
        <div className="mb-14 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span className="bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
              Transmission_Complete
            </span>
            <span className="font-mono text-[9px] font-bold text-slate-300">
              TIMESTAMP: {new Date().toISOString()}
            </span>
          </div>

          <h1 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-8xl">
            Case_Accepted<span className="not-italic text-[#FCDE09]">.</span>
          </h1>

          <div className="mx-auto max-w-md border-y border-slate-100 py-8">
            <p className="font-thai text-lg font-bold leading-relaxed text-slate-500">
              ระบบได้รับข้อมูลการประเมินของคุณเรียบร้อยแล้ว <br />
              <span className="text-slate-950">
                ทีมวิเคราะห์กลยุทธ์จะดำเนินการตรวจสอบ
              </span>{" "}
              <br />
              และสรุปผลเบื้องต้นให้คุณทราบภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>

        {/* TICKET_INFO_BOARD */}
        <div className="mb-14 flex flex-col items-center justify-center gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 border border-dashed border-slate-200 px-8 py-4">
            <span className="font-mono text-[9px] font-black uppercase text-slate-300">
              Registry_Ticket
            </span>
            <span className="font-mono text-xl font-black text-slate-950">
              {ticketId}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-ping rounded-none bg-emerald-500" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-950">
              Status: Active_Processing
            </span>
          </div>
        </div>

        {/* ACTION_REGISTRY */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-3 rounded-none bg-slate-950 px-8 py-5 shadow-sharp-brand transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
          >
            <RefreshCcw
              size={16}
              className="duration-industrial ease-sharp-out text-[#FCDE09] transition-transform group-hover:rotate-180"
            />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-white">
              Return_Home_Core
            </span>
          </Link>

          <div className="flex items-center justify-center gap-4 border-2 border-slate-100 bg-slate-50/50 px-8 py-5">
            <ShieldCheck size={18} className="text-slate-400" />
            <div className="text-left">
              <p className="font-mono text-[9px] font-black uppercase text-slate-950">
                Vault_Encryption
              </p>
              <p className="font-mono text-[8px] font-bold text-slate-400">
                Secure_Archive_Activated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ✅ 🛡️ MANDATORY_DEFAULT_EXPORT: Next.js Page Entry Point
export default AssessmentSuccessPage
