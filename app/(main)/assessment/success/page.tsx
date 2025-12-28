/** @format */

import React from "react"
import Link from "next/link"
// ✅ FIXED: ลบ ArrowRight ที่ไม่ได้ใช้งานออกเพื่อผ่าน Lint Check
import { CheckCircle2, ShieldCheck } from "lucide-react"

/**
 * 🛰️ COMPONENT: AssessmentSuccessPage
 * หน้าจอแสดงสถานะเมื่อส่งข้อมูลประเมินสำเร็จ (Transmission_Complete)
 * สไตล์: Industrial Sharp / Blueprint Grid
 */
export default function AssessmentSuccessPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white">
      {/* 🧩 Blueprint Grid Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 max-w-xl px-6 text-center">
        {/* SUCCESS_ICON_NODE */}
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center bg-slate-950 shadow-sharp-brand">
          <CheckCircle2 className="text-brand" size={40} strokeWidth={1.5} />
        </div>

        {/* CONTENT_MANIFEST */}
        <div className="mb-12 space-y-4">
          <span className="bg-slate-950 px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-brand">
            Transmission_Complete
          </span>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-6xl">
            Case_Accepted.
          </h1>
          <p className="font-thai font-medium text-slate-500">
            ระบบได้รับข้อมูลการประเมินของคุณเรียบร้อยแล้ว <br />
            เจ้าหน้าที่ฝ่ายวิเคราะห์จะดำเนินการตรวจสอบและติดต่อกลับภายใน 24
            ชั่วโมง
          </p>
        </div>

        {/* ACTION_REGISTRY */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-950 px-8 py-4 font-mono text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand hover:text-slate-950 active:scale-95"
          >
            Return_Home
          </Link>
          
          <div className="flex items-center justify-center gap-3 border border-slate-100 px-8 py-4 opacity-50">
            <ShieldCheck size={16} className="text-success" />
            <span className="font-mono text-[10px] font-bold uppercase text-slate-400">
              Secure_Storage_Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
