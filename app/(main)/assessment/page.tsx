/** @format */
import React from "react"
import AssessmentForm from "@/components/form/AssessmentForm"

export const metadata = {
  title: "Case Assessment | Boutique Ops",
  description: "ระบบประเมินโอกาสได้รับวีซ่าเบื้องต้นด้วยมาตรฐานความแม่นยำสูง",
}

export default function AssessmentPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* 🧩 Blueprint Background */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6 pb-20 pt-32">
        <div className="mx-auto mb-16 max-w-4xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-brand">
            System_Access: Authorized
          </div>
          <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-6xl">
            Initial <span className="not-italic text-brand">Assessment.</span>
          </h1>
          <p className="mx-auto max-w-xl font-thai font-medium text-slate-500">
            กรุณากรอกข้อมูลตามความเป็นจริง
            เพื่อให้ระบบวิเคราะห์โอกาสเบื้องต้นได้อย่างแม่นยำ
            ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน Security Protocol
          </p>
        </div>

        {/* 🛠️ FORM_CONTAINER */}
        <div className="border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-12">
          <AssessmentForm />
        </div>

        {/* 📑 FOOTNOTE */}
        <div className="mt-12 flex justify-center gap-8 opacity-30 grayscale transition-all hover:grayscale-0">
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold text-slate-400">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            ENCRYPTED_DATA_TRANSMISSION
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold text-slate-400">
            <div className="h-1.5 w-1.5 rounded-full bg-brand" />
            V2.9.5_STABLE_BUILD
          </div>
        </div>
      </div>
    </div>
  )
}
