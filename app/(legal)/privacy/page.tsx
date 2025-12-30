/** * @format
 * @description PRIVACY_POLICY_PORTAL: Legal Compliance Interface (V2025.1)
 * ✅ ENFORCEMENT: Industrial HUD Design, Secure Liability Clauses, Zero-Radius Aesthetics
 */

import React from 'react'
import { ShieldCheck, Lock, Database, AlertTriangle, Scale, Fingerprint } from 'lucide-react'

export const metadata = {
  title: 'Privacy_Policy | JP-VISUAL&DOCS',
  description: 'นโยบายความเป็นส่วนตัวและข้อกำหนดการคุ้มครองข้อมูลส่วนบุคคลระดับสากล',
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-white pb-32 pt-32 font-sans lg:pt-48">
      {/* 🧩 BLUEPRINT_CANVAS: ตารางโครงสร้างวิศวกรรม (Mode B) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- 📟 DOCUMENT_HEADER: IDENTITY_PROTOCOL --- */}
        <div className="mb-24 border-l-[12px] border-slate-950 pl-8 md:pl-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-slate-950 shadow-sharp-brand transition-transform hover:-rotate-12">
              <Lock className="text-brand" size={24} />
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                Legal_Framework_v2025.1
              </span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse bg-emerald-500" />
                <span className="font-mono text-[9px] font-black text-emerald-600">
                  ENFORCEMENT_ACTIVE
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-9xl">
            Privacy <br />
            <span className="not-italic text-brand drop-shadow-[6px_6px_0px_#020617]">Policy.</span>
          </h1>

          <div className="mt-12 flex flex-wrap gap-10 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <div className="flex flex-col gap-1">
              <span className="text-slate-300">DOCUMENT_ID</span>
              <span className="text-slate-950">JPV-LEG-099-2025</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-300">LAST_REVISION</span>
              <span className="text-slate-950">30_DEC_2025</span>
            </div>
          </div>
        </div>

        {/* --- 🛡️ LEGAL_HIGHLIGHT_GRID: TACTICAL_CORE --- */}
        <div className="shadow-sharp mb-24 grid grid-cols-1 gap-px border-2 border-slate-950 bg-slate-950 font-sans md:grid-cols-3">
          <PolicyHighlight
            icon={<Database size={20} />}
            title="DATA_SCOPE"
            desc="LIMITED_TRANSIT"
          />
          <PolicyHighlight icon={<Scale size={20} />} title="LEGAL_BASE" desc="USER_CONSENT" />
          <PolicyHighlight
            icon={<ShieldCheck size={20} />}
            title="PROTECTION"
            desc="AES_256_ACTIVE"
          />
        </div>

        {/* --- 📝 CONTENT_BODY: OPERATIONAL_CLAUSES --- */}
        <div className="font-thai space-y-24 leading-relaxed text-slate-600">
          {/* Clause 01: Data Processing */}
          <section className="group relative">
            <div className="mb-8 flex items-center gap-5 border-b-2 border-slate-100 pb-4 transition-colors group-hover:border-brand">
              <span className="font-mono text-sm font-black text-slate-950">01//</span>
              <h2 className="text-3xl font-black uppercase italic tracking-tight text-slate-950">
                ขอบเขตการเก็บข้อมูล (Data_Collection_Matrix)
              </h2>
            </div>
            <div className="space-y-6 pl-10 text-lg font-bold text-slate-700">
              <p>
                ท่านรับทราบและยินยอมให้เราเก็บรวบรวมข้อมูลส่วนบุคคลที่จำเป็นสำหรับการวิเคราะห์ทางเทคนิค
                อาทิ ชื่อ-นามสกุล, ข้อมูลการติดต่อ, และ{' '}
                <span className="bg-brand/20 px-1 text-slate-950 underline decoration-slate-950 decoration-2 underline-offset-4">
                  ข้อมูลประวัติการเดินทางเชิงลึก
                </span>
              </p>
              <div className="border-l-4 border-slate-950 bg-slate-50 p-6 text-[15px] font-medium leading-relaxed shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-black uppercase text-slate-950">
                  <Fingerprint size={14} /> System_Note:
                </div>
                ข้อมูลที่ถูกส่งผ่านระบบจะถูกใช้งานเพื่อวัตถุประสงค์ในการประเมินโอกาสสำเร็จของเคสท่านเท่านั้น
                โดยข้อมูลจะถูกจัดเก็บในรูปแบบเข้ารหัสเพื่อความเป็นส่วนตัวสูงสุด
              </div>
            </div>
          </section>

          {/* Clause 02: Liability Limitation */}
          <section className="group relative">
            <div className="mb-8 flex items-center gap-5 border-b-2 border-slate-100 pb-4 transition-colors group-hover:border-brand">
              <span className="font-mono text-sm font-black text-slate-950">02//</span>
              <h2 className="text-3xl font-black uppercase italic tracking-tight text-slate-950">
                การจำกัดความรับผิดชอบ (Liability_Protocol)
              </h2>
            </div>
            <div className="space-y-6 pl-10 text-lg">
              <p>
                บริษัทใช้เทคโนโลยีความปลอดภัยมาตรฐานระดับสากล
                อย่างไรก็ตามท่านยอมรับว่าสภาวะแวดล้อมทางดิจิทัลอาจมีความเสี่ยงที่อยู่นอกเหนือการควบคุม
              </p>
              <p className="shadow-sharp bg-slate-950 p-8 font-bold text-white">
                บริษัทขอสงวนสิทธิ์ในการไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากเหตุสุดวิสัย
                รวมถึงการรั่วไหลของข้อมูลที่เกิดจากการที่ผู้ใช้เปิดเผยรหัสอ้างอิง (Ticket ID)
                หรือทำข้อมูลส่วนตัวสูญหายด้วยตนเองในทุกกรณี
              </p>
            </div>
          </section>

          {/* Clause 03: Withdrawal Rights */}
          <section className="group relative">
            <div className="mb-8 flex items-center gap-5 border-b-2 border-slate-100 pb-4 transition-colors group-hover:border-brand">
              <span className="font-mono text-sm font-black text-slate-950">03//</span>
              <h2 className="text-3xl font-black uppercase italic tracking-tight text-slate-950">
                สิทธิ์ในการเข้าถึงและเพิกถอน (User_Control)
              </h2>
            </div>
            <div className="space-y-6 pl-10 text-lg font-bold">
              <p>
                ท่านมีสิทธิ์ร้องขอการเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลตามกฎหมาย PDPA ของประเทศไทย
                ผ่านช่องทางการติดต่ออย่างเป็นทางการของเรา
              </p>
              <div className="mt-8 flex items-start gap-5 bg-brand p-6 shadow-sharp-sm">
                <AlertTriangle size={24} className="mt-1 shrink-0 text-slate-950" />
                <p className="font-mono text-[11px] font-black uppercase leading-relaxed text-slate-950">
                  Notice: การขอเพิกถอนหรือลบข้อมูลในระหว่างที่กระบวนการประเมินยังไม่เสร็จสิ้น
                  อาจส่งผลให้การให้บริการสิ้นสุดลงทันทีและไม่สามารถกู้คืนข้อมูลเดิมได้
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* --- 📑 FOOTER_SIGNATURE: SEAL_OF_AUTHORITY --- */}
        <div className="mt-32 flex flex-col items-center justify-between gap-8 border-t-4 border-slate-950 pt-16 md:flex-row">
          <div className="space-y-2">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.8em] text-slate-300">
              JP_VISUAL.DOCS // INFRA_SEC
            </p>
            <p className="font-mono text-[8px] font-bold text-slate-400 opacity-50">
              © 2025 ALL RIGHTS RESERVED. PROTECTED BY GLOBAL DATA PROTOCOLS.
            </p>
          </div>
          <div className="border border-slate-200 bg-slate-50 px-6 py-3">
            <span className="font-mono text-[10px] font-black text-slate-950">
              AUTHORITY_TOKEN::REDACTED
            </span>
          </div>
        </div>
      </article>
    </main>
  )
}

/** 🛠️ ATOMIC_UI: PolicyHighlight (Mode B Industrial) */
function PolicyHighlight({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="group relative bg-white p-10 transition-all duration-500 hover:bg-slate-50">
      <div className="mb-6 text-slate-950 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand">
        {icon}
      </div>
      <div className="space-y-2">
        <span className="block font-mono text-[11px] font-black uppercase italic tracking-widest text-slate-400 transition-colors group-hover:text-slate-950">
          {title}
        </span>
        <span className="block text-xl font-black uppercase tracking-tighter text-slate-950">
          {desc}
        </span>
      </div>
      {/* Decorative Corner */}
      <div className="absolute right-0 top-0 h-4 w-4 bg-slate-950 opacity-0 transition-opacity [clip-path:polygon(100%_0,0_0,100%_100%)] group-hover:opacity-100" />
    </div>
  )
}
