/** @format */
import React from "react"
import {
  Scale,
  FileText,
  AlertTriangle,
  Coins,
  CheckCircle2,
} from "lucide-react"

export const metadata = {
  title: "Terms_of_Service | Boutique Ops",
  description:
    "ข้อกำหนดและเงื่อนไขการใช้บริการระบบปฏิบัติการเอกสาร (Service Protocol Agreement)",
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-white pb-32 pt-32 lg:pt-48">
      {/* 🧩 Blueprint Grid Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- CONTRACT_HEADER --- */}
        <div className="mb-20 border-b-2 border-slate-950 pb-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-brand">
              Contract_ID: BTQ-TOS-2025
            </div>
            <div className="font-mono text-[10px] font-bold text-slate-300">
              STAMP_HASH: 0x882A_SERVICE
            </div>
          </div>

          <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-8xl">
            Terms <br />
            <span className="not-italic text-brand">Of_Service.</span>
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <p className="font-thai text-sm font-bold text-slate-500">
              เอกสารฉบับนี้มีผลบังคับใช้ทันทีเมื่อผู้รับบริการตกลงใช้บริการ
              กรุณาอ่านเงื่อนไขการดำเนินงานให้ครบถ้วนเพื่อผลประโยชน์สูงสุดของคุณ
            </p>
            <div className="flex items-end justify-end gap-4 font-mono text-[10px] font-black uppercase text-slate-400">
              <span>Ref: TERMS_V2_2025</span>
              <span className="text-slate-200">/</span>
              <span>Effective_Immediately</span>
            </div>
          </div>
        </div>

        {/* --- PROTOCOL_SECTIONS --- */}
        <div className="space-y-20 font-thai">
          {/* SECTION_01: Operational Scope */}
          <section className="group">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-colors group-hover:bg-brand">
                <Scale size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Protocol_01
                </span>
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                  ขอบเขตการบริการ (Operational_Scope)
                </h2>
              </div>
            </div>
            <div className="ml-16 space-y-4">
              <p className="text-lg leading-relaxed text-slate-600">
                <span className="font-bold text-slate-950">Boutique Ops</span>{" "}
                ให้บริการคำปรึกษา จัดเตรียม
                และวางกลยุทธ์ด้านเอกสารวีซ่าแบบพรีเมียม
                เพื่อให้เคสมีความสมบูรณ์ตามมาตรฐานสถานทูตมากที่สุด
              </p>
              <div className="flex gap-3 bg-amber-50 p-6 text-amber-900 shadow-[4px_4px_0px_0px_#d97706]">
                <AlertTriangle size={24} className="shrink-0" />
                <p className="text-sm font-bold leading-normal">
                  ประกาศสำคัญ:
                  การอนุมัติวีซ่าเป็นสิทธิ์ขาดของเอกอัครราชทูตหรือเจ้าหน้าที่กงสุลเท่านั้น
                  ทางบริษัทไม่สามารถแทรกแซงอำนาจการตัดสินใจของทางรัฐบาลได้
                </p>
              </div>
            </div>
          </section>

          {/* SECTION_02: Data Accuracy */}
          <section className="group">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-colors group-hover:bg-brand">
                <FileText size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Protocol_02
                </span>
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                  ความถูกต้องของข้อมูล (Data_Accuracy)
                </h2>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-lg leading-relaxed text-slate-600">
                ผู้ใช้บริการตกลงที่จะให้ข้อมูลที่เป็นความจริงและถูกต้องครบถ้วน{" "}
                <span className="font-bold text-slate-950 underline decoration-brand decoration-2 underline-offset-4">
                  การให้ข้อมูลเท็จหรือปลอมแปลงเอกสาร
                </span>
                อาจส่งผลต่อการถูกปฏิเสธวีซ่าและการบันทึกประวัติถาวร
                ซึ่งทางบริษัทจะไม่รับผิดชอบต่อความเสียหายในกรณีดังกล่าว
              </p>
            </div>
          </section>

          {/* SECTION_03: Refund Policy */}
          <section className="group">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-colors group-hover:bg-brand">
                <Coins size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Protocol_03
                </span>
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                  นโยบายการเงิน (Financial_Policy)
                </h2>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-lg leading-relaxed text-slate-600">
                เนื่องจากบริการของเราเป็นการวิเคราะห์ข้อมูลเชิงลึกและใช้ทรัพยากรผู้เชี่ยวชาญทันทีที่เริ่มงาน
                <span className="font-bold text-slate-950">
                  {" "}
                  ค่าธรรมเนียมการดำเนินงานจะถูกพิจารณาเป็นรายกรณี
                </span>
                ตามขอบเขตงานที่ระบุไว้ในใบเสนอราคา (Quotation) เท่านั้น
              </p>
            </div>
          </section>
        </div>

        {/* --- SIGNATURE_AREA --- */}
        <div className="mt-32 border-2 border-slate-950 p-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="font-mono text-[11px] font-black uppercase tracking-widest text-slate-950">
                  Authorization_Manifest
                </span>
              </div>
              <p className="font-thai text-xs text-slate-400">
                การกดส่งข้อมูลผ่านแบบฟอร์มประเมิน
                ถือเป็นการยอมรับเงื่อนไขเบื้องต้นในเอกสารฉบับนี้
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[9px] font-bold text-slate-300">
                SYSTEM_AUTH_BY
              </span>
              <span className="font-mono text-sm font-black tracking-tighter text-slate-950">
                BOUTIQUE_OPS_TERMINAL
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
