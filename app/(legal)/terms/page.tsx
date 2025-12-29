/** @format */
import React from "react"
import {
  Scale,
  Coins,
  CheckCircle2,
  FileLock2,
  ShieldAlert,
} from "lucide-react"

/**
 * @description TERMS_OF_SERVICE: หน้าข้อกำหนดและเงื่อนไข (Service Protocol Agreement)
 * @fix Resolved ESLint warnings by removing unused FileText and AlertTriangle imports.
 */

export const metadata = {
  title: "Terms_of_Service | JP‑VISOUL&DOCS",
  description:
    "ข้อกำหนดและเงื่อนไขการใช้บริการระบบปฏิบัติการเอกสาร (Service Protocol Agreement)",
}

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-white pb-32 pt-32 font-sans lg:pt-48">
      {/* 🧩 UI_DECORATION: Blueprint Grid (MODE B) */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- CONTRACT_HEADER (MODE B) --- */}
        <div className="mb-20 border-b-4 border-[#020617] pb-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-[#020617] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09] shadow-sharp">
              Contract_ID: JPV-TOS-2025
            </div>
            <div className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-300">
              Stamp: System_Enforced_Authorized
            </div>
          </div>

          <h1 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
            Terms <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
              Of_Service.
            </span>
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <p className="font-thai text-base font-bold leading-relaxed text-[#020617]">
              เงื่อนไขนี้มีผลผูกพันทางกฎหมายทันทีที่มีการส่งข้อมูลผ่านระบบ
              กรุณาอ่านข้อตกลงเพื่อรับทราบขอบเขตความรับผิดชอบและสิทธิ์ในการดำเนินงานของเรา
            </p>
            <div className="flex flex-col items-end justify-end gap-2 font-mono text-[10px] font-black uppercase text-slate-400">
              <span>Revision: v2.0.2025</span>
              <span className="bg-[#FCDE09] px-2 py-0.5 text-[#020617] shadow-sharp">
                Effect: Immediate_Legality
              </span>
            </div>
          </div>
        </div>

        {/* --- PROTOCOL_SECTIONS (MODE C: ป้องกันและได้เปรียบ) --- */}
        <div className="space-y-24 font-thai text-[#020617]">
          {/* Protocol 01: ขอบเขตและอำนาจตัดสินใจ */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white shadow-sharp transition-all group-hover:bg-[#FCDE09]">
                <Scale size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_01
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  ขอบเขตหน้าที่ (Operational_Scope)
                </h2>
              </div>
            </div>
            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-medium leading-relaxed">
                เราให้บริการในฐานะที่ปรึกษาและผู้วางแผนกลยุทธ์ด้านเอกสารเท่านั้น{" "}
                <span className="font-black underline decoration-[#FCDE09] decoration-4">
                  การตัดสินใจผลวีซ่าเป็นอำนาจเด็ดขาดของสถานทูต
                </span>
              </p>
              <div className="relative flex gap-4 overflow-hidden bg-[#020617] p-6 text-white shadow-sharp">
                <ShieldAlert
                  size={48}
                  className="absolute -bottom-4 -right-4 shrink-0 text-[#FCDE09] opacity-20"
                />
                <div className="relative z-10">
                  <p className="text-sm font-bold leading-relaxed">
                    ข้อจำกัดความรับผิดชอบ:
                    เราไม่รับประกันผลการอนุมัติวีซ่าในทุกกรณี
                    และไม่สามารถถูกฟ้องร้องหรือเรียกค่าเสียหายจากการตัดสินใจของเจ้าหน้าที่กงสุลหรือสถานทูตได้
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Protocol 02: กรรมสิทธิ์ในข้อมูล */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white shadow-sharp transition-all group-hover:bg-[#FCDE09]">
                <FileLock2 size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_02
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  กรรมสิทธิ์ในข้อมูล (Intellectual_Property)
                </h2>
              </div>
            </div>
            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-medium leading-relaxed">
                ผลการวิเคราะห์ แผนกลยุทธ์ และเอกสารประกอบที่จัดทำขึ้น{" "}
                <span className="font-black underline decoration-[#FCDE09] decoration-4">
                  ถือเป็นทรัพย์สินทางปัญญาของเรา
                </span>
              </p>
              <p className="text-base italic text-slate-500">
                ผู้รับบริการไม่มีสิทธิ์นำแนวทางหรือรูปแบบการจัดเตรียมเอกสารของเราไปเผยแพร่
                ขายต่อ
                หรือใช้ในเชิงพาณิชย์อื่นใดโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
              </p>
            </div>
          </section>

          {/* Protocol 03: นโยบายค่าธรรมเนียม */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white shadow-sharp transition-all group-hover:bg-[#FCDE09]">
                <Coins size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_03
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  นโยบายการชำระเงิน (No_Refund_Protocol)
                </h2>
              </div>
            </div>
            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-black leading-relaxed">
                เนื่องจากบริการของเราเริ่มดำเนินการทันทีหลังการตกลง
                ค่าธรรมเนียมการดำเนินงานทั้งหมด "ไม่มีนโยบายคืนเงิน"
                (Non-Refundable) ไม่ว่าผลการยื่นวีซ่าจะเป็นอย่างไร
              </p>
              <p className="font-mono text-sm font-bold uppercase text-slate-400">
                Reason: Immediate_Expert_Allocation_and_Strategic_Labor
              </p>
            </div>
          </section>
        </div>

        {/* --- SIGNATURE_AREA (MODE B: Industrial Sharp) --- */}
        <div className="relative mt-32 overflow-hidden border-4 border-[#020617] bg-slate-50 p-10 shadow-sharp">
          <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-10">
            <CheckCircle2 size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-[#10B981] shadow-sharp" />
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[#020617]">
                  Authorization_Confirmed
                </span>
              </div>
              <p className="font-thai text-[11px] font-bold leading-relaxed text-slate-500">
                การส่งข้อมูลผ่านระบบถือเป็นการ "ลงนามทางอิเล็กทรอนิกส์"
                (Electronic Signature) <br />
                ที่แสดงเจตนาตกลงรับเงื่อนไขและข้อกำหนดทั้งหมดที่ระบุไว้ข้างต้น
              </p>
            </div>

            <div className="flex flex-col items-end border-l-2 border-[#020617] pl-8 text-right">
              <span className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                Authenticated_By
              </span>
              <span className="font-mono text-xl font-black italic tracking-tighter text-[#020617]">
                JP_VISOUL_TERMINAL
              </span>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
