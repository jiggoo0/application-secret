/** * @format
 * @description TERMS_OF_SERVICE: Service Protocol Agreement (V2.0.2025)
 * ✅ FIXED: Escaped HTML entities to pass linting
 * ✅ REFINED: Typography mapping for Industrial Sharp aesthetics
 */

import React from 'react'
import { Scale, Coins, CheckCircle2, FileLock2, ShieldAlert, Signature } from 'lucide-react'

export const metadata = {
  title: 'Terms_of_Service | JP-VISUAL&DOCS',
  description: 'ข้อกำหนดและเงื่อนไขการใช้บริการระบบปฏิบัติการเอกสาร (Service Protocol Agreement)',
}

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-white pb-32 pt-32 font-sans selection:bg-brand selection:text-slate-950 lg:pt-48">
      {/* 🧩 BLUEPRINT_CANVAS */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- 📟 CONTRACT_HEADER --- */}
        <div className="mb-24 border-b-4 border-slate-950 pb-16">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="shadow-sharp inline-flex items-center gap-3 bg-slate-950 px-4 py-2 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-brand">
              Contract_ID::JPV-TOS-2025
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-tighter text-slate-300">
              <Signature size={14} className="text-slate-200" />
              STATUS::SYSTEM_ENFORCED_AUTHORIZED
            </div>
          </div>

          <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-9xl">
            Terms <br />
            <span className="not-italic text-brand drop-shadow-[6px_6px_0px_#020617]">
              Of_Service.
            </span>
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <p className="font-sans text-lg font-bold leading-relaxed text-slate-950">
              เงื่อนไขนี้มีผลผูกพันทางกฎหมายทันทีที่มีการส่งข้อมูลผ่านระบบ
              โปรดศึกษาข้อตกลงเพื่อรับทราบ{' '}
              <span className="underline decoration-brand decoration-4 underline-offset-4">
                ขอบเขตความรับผิดชอบ
              </span>{' '}
              และสิทธิ์ในการดำเนินงาน
            </p>
            <div className="flex flex-col items-end justify-end gap-3 font-mono text-[10px] font-black uppercase text-slate-400">
              <div className="flex flex-col items-end border-r-4 border-brand pr-4">
                <span>REVISION: v2.0.2025</span>
                <span className="text-slate-950">EFFECTIVE: IMMEDIATE_LEGALITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 🛡️ PROTOCOL_GRID --- */}
        <div className="space-y-32 font-sans text-slate-950">
          {/* Protocol 01 */}
          <section className="group relative">
            <div className="mb-10 flex items-start gap-6">
              <div className="shadow-sharp flex h-16 w-16 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-all group-hover:bg-brand">
                <Scale size={28} />
              </div>
              <div>
                <span className="font-mono text-[11px] font-black uppercase italic tracking-[0.2em] text-slate-400 group-hover:text-brand">
                  Protocol_01
                </span>
                <h2 className="text-4xl font-black uppercase italic tracking-tight text-slate-950">
                  ขอบเขตหน้าที่ (Operational_Scope)
                </h2>
              </div>
            </div>
            <div className="ml-24 space-y-8 border-l-2 border-slate-100 pl-12 transition-colors group-hover:border-brand">
              <p className="text-xl font-bold leading-relaxed">
                เราให้บริการในฐานะที่ปรึกษาและผู้วางแผนกลยุทธ์ด้านเอกสารเท่านั้น <br />
                <span className="bg-slate-950 px-2 text-white">
                  การตัดสินใจผลวีซ่าเป็นอำนาจเด็ดขาดของสถานทูต
                </span>
              </p>
              <div className="shadow-sharp relative overflow-hidden bg-slate-950 p-8 text-white">
                <ShieldAlert
                  size={80}
                  className="absolute -bottom-6 -right-6 shrink-0 text-brand opacity-10"
                />
                <div className="relative z-10">
                  <p className="text-[15px] font-bold leading-relaxed">
                    [DISCLAIMER]: เราไม่รับประกันผลการอนุมัติวีซ่าในทุกกรณี
                    และไม่สามารถถูกฟ้องร้องหรือเรียกค่าเสียหายจากการตัดสินใจของเจ้าหน้าที่กงสุลหรือสถานทูตได้
                    เนื่องจากเราไม่มีส่วนเกี่ยวข้องกับอำนาจการพิจารณาของรัฐบาลต่างประเทศ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Protocol 02 */}
          <section className="group relative">
            <div className="mb-10 flex items-start gap-6">
              <div className="shadow-sharp flex h-16 w-16 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-all group-hover:bg-brand">
                <FileLock2 size={28} />
              </div>
              <div>
                <span className="font-mono text-[11px] font-black uppercase italic tracking-[0.2em] text-slate-400 group-hover:text-brand">
                  Protocol_02
                </span>
                <h2 className="text-4xl font-black uppercase italic tracking-tight text-slate-950">
                  กรรมสิทธิ์ในข้อมูล (IP_Matrix)
                </h2>
              </div>
            </div>
            <div className="ml-24 space-y-8 border-l-2 border-slate-100 pl-12 transition-colors group-hover:border-brand">
              <p className="text-xl font-bold leading-relaxed">
                แผนกลยุทธ์และรูปแบบการจัดเตรียมเอกสารที่บริษัทสร้างขึ้น <br />
                <span className="underline decoration-brand decoration-4 underline-offset-4">
                  ถือเป็นทรัพย์สินทางปัญญาของบริษัทแต่เพียงผู้เดียว
                </span>
              </p>
              <p className="text-[16px] font-medium italic text-slate-500">
                ผู้รับบริการห้ามมิให้นำแนวทางหรือรูปแบบเอกสารไปเผยแพร่ ขายต่อ
                หรือใช้ในเชิงพาณิชย์อื่นใดโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจาก JP-VISUAL&DOCS
              </p>
            </div>
          </section>

          {/* Protocol 03 */}
          <section className="group relative">
            <div className="mb-10 flex items-start gap-6">
              <div className="shadow-sharp flex h-16 w-16 shrink-0 items-center justify-center border-2 border-slate-950 bg-white transition-all group-hover:bg-brand">
                <Coins size={28} />
              </div>
              <div>
                <span className="font-mono text-[11px] font-black uppercase italic tracking-[0.2em] text-slate-400 group-hover:text-brand">
                  Protocol_03
                </span>
                <h2 className="text-4xl font-black uppercase italic tracking-tight text-slate-950">
                  นโยบายค่าธรรมเนียม (Billing_Policy)
                </h2>
              </div>
            </div>
            <div className="ml-24 space-y-8 border-l-2 border-slate-100 pl-12 transition-colors group-hover:border-brand">
              <div className="border-l-8 border-slate-950 bg-slate-50 p-8">
                <p className="text-2xl font-black leading-tight text-slate-950">
                  NON-REFUNDABLE_PROTOCOL
                </p>
                <p className="mt-4 text-lg font-bold leading-relaxed text-slate-700">
                  ค่าธรรมเนียมการดำเนินงานทั้งหมด &quot;ไม่มีนโยบายคืนเงิน&quot;
                  ไม่ว่าผลการพิจารณาจะเป็นอย่างไร
                  เนื่องจากบริการได้เริ่มดำเนินการและจัดสรรทรัพยากรผู้เชี่ยวชาญทันทีหลังการตกลง
                </p>
              </div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                REASON::IMMEDIATE_EXPERT_ALLOCATION_PROCESS
              </p>
            </div>
          </section>
        </div>

        {/* --- 🖋️ DIGITAL_SIGNATURE_SEAL --- */}
        <div className="shadow-sharp relative mt-40 overflow-hidden border-4 border-slate-950 bg-slate-50 p-12">
          <div className="pointer-events-none absolute -right-4 -top-4 p-4 opacity-[0.03]">
            <CheckCircle2 size={180} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="max-w-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="shadow-sharp h-4 w-4 bg-emerald-500" />
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.4em] text-slate-950">
                  AUTHENTICATION_CONFIRMED
                </span>
              </div>
              <p className="font-sans text-[13px] font-bold leading-relaxed text-slate-500">
                การคลิกตกลงหรือส่งข้อมูลผ่านระบบปฏิบัติการนี้ ถือเป็นการ <br />
                <span className="font-black italic text-slate-950">
                  &quot;ลงนามทางอิเล็กทรอนิกส์ (Electronic Signature)&quot;
                </span>{' '}
                <br />
                ที่แสดงเจตนาตกลงรับเงื่อนไขและข้อกำหนดทั้งหมดโดยสมบูรณ์
              </p>
            </div>

            <div className="flex flex-col items-center border-slate-200 pl-0 text-center md:items-end md:border-l-2 md:pl-10 md:text-right">
              <span className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                Verified_Endpoint
              </span>
              <span className="font-mono text-2xl font-black italic tracking-tighter text-slate-950">
                JPV_TERMINAL_2025
              </span>
              <div className="mt-4 h-1 w-full bg-slate-950" />
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
