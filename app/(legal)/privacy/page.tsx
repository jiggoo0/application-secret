/** @format */

import React from 'react'
import { Lock } from 'lucide-react'

/**
 * @description PRIVACY_POLICY_PORTAL
 * หน้าข้อกำหนดความเป็นส่วนตัว
 */

export const metadata = {
  title: 'Privacy_Policy | JP-VISOUL&DOCS',
  description: 'นโยบายความเป็นส่วนตัวและข้อกำหนดการคุ้มครองข้อมูลส่วนบุคคล',
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-white pb-24 pt-32 font-sans lg:pt-48">
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <div className="mb-20 border-l-8 border-[#020617] pl-8 md:pl-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#020617] shadow-sharp">
              <Lock size={20} className="text-[#FCDE09]" />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Legal_Protocol_v2025.1
            </span>
          </div>

          <h1 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
            Privacy <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
              Policy.
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#10B981] shadow-sharp" />
              STATUS: ENFORCED
            </span>
            <span>LAST_UPDATE: 29_DEC_2025</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-16 font-thai leading-relaxed text-slate-600">
          {/* SECTION 01 */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">01//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                ขอบเขตการเก็บข้อมูล (Scope_of_Processing)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg font-medium">
              <p>
                ท่านรับทราบและยินยอมให้เราเก็บรวบรวมข้อมูลส่วนบุคคล เช่น ชื่อ, ข้อมูลติดต่อ และ{' '}
                <span className="font-bold text-[#020617] underline decoration-[#FCDE09]">
                  ประวัติเชิงลึกที่จำเป็นต่อการวิเคราะห์เคส
                </span>
              </p>

              <p className="border-l-4 border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
                <strong className="text-[#020617]">ความได้เปรียบเชิงกฎหมาย:</strong>{' '}
                ข้อมูลที่ท่านให้ผ่านระบบนี้ จะถือเป็นข้อมูลที่ท่าน
                <span className="mx-1 font-bold text-[#020617]">&quot;สมัครใจ&quot;</span>
                เปิดเผยเพื่อวัตถุประสงค์ในการรับบริการคำปรึกษาเท่านั้น
              </p>
            </div>
          </section>

          {/* SECTION 02 */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">02//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                การจำกัดความรับผิดชอบ (Liability_Limitation)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg">
              <p>
                แม้ว่าเราจะใช้มาตรฐานการรักษาความปลอดภัย{' '}
                <span className="font-mono font-black text-[#020617]">AES-256 Bit</span>{' '}
                แต่ท่านยอมรับว่า
                <span className="mx-1 font-bold text-[#020617]">
                  &quot;ไม่มีระบบอิเล็กทรอนิกส์ใดที่มีความปลอดภัย 100%&quot;
                </span>
              </p>

              <p className="font-bold text-[#020617]">
                เราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากเหตุสุดวิสัย
                หรือการโจรกรรมข้อมูลโดยบุคคลที่สามซึ่งอยู่นอกเหนือการควบคุม
              </p>
            </div>
          </section>

          {/* SECTION 03 */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">03//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                สิทธิ์และการเพิกถอน (Withdrawal_Rights)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg">
              <p>
                ท่านมีสิทธิ์ร้องขอให้ลบข้อมูลได้ตามกฎหมาย PDPA อย่างไรก็ตาม{' '}
                <span className="font-bold text-[#020617]">
                  ข้อมูลที่ถูกนำไปใช้ประมวลผลหรือสรุปผลการวิเคราะห์แล้ว อาจไม่สามารถย้อนคืนได้
                </span>
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
