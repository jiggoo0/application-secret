/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.979Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: page          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
import React from 'react'
import { Scale, Coins, CheckCircle2, FileLock2, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'ข้อกำหนดการใช้บริการ | JP Visual Docs',
  description: 'ข้อกำหนดและเงื่อนไขการให้บริการระบบจัดการเอกสาร (Service Protocol Agreement)',
}

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-white pb-32 pt-32 font-sans lg:pt-48">
      {/* 🧩 UI_DECOR: Blueprint Grid */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER: แถบระบุตัวตนสัญญาดิจิทัล */}
        <div className="mb-20 border-b-4 border-[#020617] pb-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="shadow-sharp inline-flex items-center gap-2 bg-[#020617] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
              CONTRACT_ID: JPV-TOS-2026
            </div>
            <div className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-300">
              System_Enforced_Authorized
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
              ข้อกำหนดนี้มีผลผูกพันทางกฎหมายทันทีที่ผู้ใช้บริการเข้าถึงหรือส่งข้อมูลผ่านระบบ
              โปรดศึกษารายละเอียดเพื่อรับทราบขอบเขตความรับผิดชอบและสิทธิ์ในการดำเนินงานของที่ปรึกษา
            </p>
            <div className="flex flex-col items-end justify-end gap-2 font-mono text-[10px] font-black uppercase text-slate-400">
              <span>Revision: v3.1.2026</span>
              <span className="shadow-sharp bg-[#FCDE09] px-2 py-0.5 text-[#020617]">
                Status: Immediate_Legality
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT: PROTOCOLS */}
        <div className="font-thai space-y-24 text-[#020617]">
          {/* PROTOCOL 01: ขอบเขตหน้าที่ */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="shadow-sharp flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white transition-all group-hover:bg-[#FCDE09]">
                <Scale size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_01
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  ขอบเขตการดำเนินงาน (Service_Scope)
                </h2>
              </div>
            </div>

            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-medium leading-relaxed">
                บริษัทให้บริการในฐานะที่ปรึกษาด้านการจัดการเอกสารและวางแผนกลยุทธ์เท่านั้น
                <span className="font-black underline decoration-[#FCDE09] decoration-4">
                  การอนุมัติหรือปฏิเสธคำร้องเป็นสิทธิ์ขาดของเจ้าหน้าที่กงสุลหรือสถานทูตแต่เพียงผู้เดียว
                </span>
              </p>

              <div className="shadow-sharp relative flex gap-4 overflow-hidden bg-[#020617] p-6 text-white">
                <ShieldAlert
                  size={48}
                  className="absolute -bottom-4 -right-4 text-[#FCDE09] opacity-20"
                />
                <p className="relative z-10 text-sm font-bold leading-relaxed">
                  DISCLAIMER: ที่ปรึกษาไม่รับประกันผลการพิจารณาในทุกกรณี
                  และไม่สามารถเรียกร้องค่าเสียหายจากการตัดสินใจของหน่วยงานรัฐหรือสถานทูตได้
                </p>
              </div>
            </div>
          </section>

          {/* PROTOCOL 02: ทรัพย์สินทางปัญญา */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="shadow-sharp flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white transition-all group-hover:bg-[#FCDE09]">
                <FileLock2 size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_02
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  ลิขสิทธิ์และกรรมสิทธิ์ในแผนงาน (Intellectual_Property)
                </h2>
              </div>
            </div>

            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-medium leading-relaxed">
                แผนกลยุทธ์ รูปแบบการจัดชุดเอกสาร และแนวทางการนำเสนอเคสที่จัดทำขึ้นโดยที่ปรึกษา
                <span className="font-black underline decoration-[#FCDE09] decoration-4">
                  ถือเป็นกรรมสิทธิ์ของบริษัท
                </span>
              </p>
              <p className="text-base italic text-slate-500">
                ห้ามมิให้ผู้รับบริการนำรูปแบบการจัดการ
                หรือเอกสารที่เป็นเทมเพลตเฉพาะของบริษัทไปเผยแพร่ ขายต่อ
                หรือดัดแปลงเพื่อการค้าโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
              </p>
            </div>
          </section>

          {/* PROTOCOL 03: นโยบายค่าธรรมเนียม */}
          <section className="group">
            <div className="mb-8 flex items-start gap-4">
              <div className="shadow-sharp flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#020617] bg-white transition-all group-hover:bg-[#FCDE09]">
                <Coins size={24} />
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                  Protocol_03
                </span>
                <h2 className="text-3xl font-black uppercase italic tracking-tight text-[#020617]">
                  นโยบายการคืนค่าธรรมเนียม (Finalized_Payment)
                </h2>
              </div>
            </div>

            <div className="ml-18 space-y-6 border-l-2 border-slate-100 pl-10 transition-colors group-hover:border-[#FCDE09]">
              <p className="text-lg font-black leading-relaxed">
                ค่าบริการคำปรึกษาและค่าดำเนินการ
                <span className="mx-1 font-black">&quot;ไม่มีนโยบายการคืนเงินในทุกกรณี&quot;</span>
                (Non-refundable)
                เนื่องจากบริษัทเริ่มใช้ทรัพยากรและทักษะวิชาชีพในการวิเคราะห์ทันทีที่มีการเริ่มงาน
              </p>
              <p className="font-mono text-[11px] font-bold uppercase tracking-tight text-slate-400">
                Reason: Professional_Asset_Allocation_and_Intellectual_Labor_Finalized
              </p>
            </div>
          </section>
        </div>

        {/* 🖊️ SIGNATURE BLOCK: ส่วนการยอมรับเงื่อนไขดิจิทัล */}
        <div className="shadow-sharp relative mt-32 overflow-hidden border-4 border-[#020617] bg-slate-50 p-10">
          <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-10">
            <CheckCircle2 size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="shadow-sharp h-4 w-4 bg-[#10B981]" />
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[#020617]">
                  Electronic_Acceptance
                </span>
              </div>
              <p className="font-thai text-[12px] font-bold leading-relaxed text-slate-500">
                การส่งคำขอผ่านระบบถือเป็นการยืนยันความเข้าใจและ
                <span className="mx-1 font-bold underline">
                  &quot;ลงนามยินยอมทางอิเล็กทรอนิกส์&quot;
                </span>
                เพื่อผูกพันตามข้อกำหนดและเงื่อนไขทั้งหมดข้างต้น
              </p>
            </div>

            <div className="flex flex-col items-end border-l-4 border-[#FCDE09] pl-8 text-right">
              <span className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                Authorized_System
              </span>
              <span className="font-mono text-xl font-black italic tracking-tighter text-[#020617]">
                JP_VISOUL_PORTAL
              </span>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
