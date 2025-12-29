/** @format */
import React from "react"
import { ShieldCheck, Lock, Database, AlertTriangle, Scale } from "lucide-react"

/**
 * @description PRIVACY_POLICY_PORTAL: หน้าข้อกำหนดความเป็นส่วนตัว
 * @rules Strictly followed Mode B (Industrial) and Removed Unused Assets
 */

export const metadata = {
  title: "Privacy_Policy | JP‑VISOUL&DOCS",
  description: "นโยบายความเป็นส่วนตัวและข้อกำหนดการคุ้มครองข้อมูลส่วนบุคคล",
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-white pb-24 pt-32 font-sans lg:pt-48">
      {/* 🧩 UI_DECORATION: Blueprint Grid (MODE B) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- DOCUMENT_HEADER (MODE B) --- */}
        <div className="mb-20 border-l-8 border-[#020617] pl-8 md:pl-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#020617] shadow-sharp">
              <Lock className="text-[#FCDE09]" size={20} />
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
              <div className="h-2 w-2 bg-[#10B981] shadow-sharp" />
              STATUS: ENFORCED
            </span>
            <span>LAST_UPDATE: 29_DEC_2025</span>
          </div>
        </div>

        {/* --- LEGAL_HIGHLIGHT_GRID --- */}
        <div className="mb-20 grid grid-cols-1 gap-px border-2 border-[#020617] bg-[#020617] font-sans shadow-sharp md:grid-cols-3">
          <PolicyHighlight
            icon={<Database size={18} />}
            title="DATA_SCOPE"
            desc="Limited & Purposeful"
          />
          <PolicyHighlight
            icon={<Scale size={18} />}
            title="LEGAL_BASE"
            desc="Consent & Contract"
          />
          <PolicyHighlight
            icon={<ShieldCheck size={18} />}
            title="LIABILITY"
            desc="Limited Protection"
          />
        </div>

        {/* --- CONTENT_BODY (MODE C: ปลอดภัยและได้เปรียบ) --- */}
        <div className="space-y-16 font-thai leading-relaxed text-slate-600">
          {/* Section 01: ขอบเขตและจุดประสงค์ */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">
                01//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                ขอบเขตการเก็บข้อมูล (Scope_of_Processing)
              </h2>
            </div>
            <div className="space-y-4 pl-8 text-lg font-medium">
              <p>
                ท่านรับทราบและยินยอมให้เราเก็บรวบรวมข้อมูลส่วนบุคคล เช่น ชื่อ,
                ข้อมูลติดต่อ, และ{" "}
                <span className="font-bold text-[#020617] underline decoration-[#FCDE09]">
                  ประวัติเชิงลึกที่จำเป็นต่อการวิเคราะห์เคส
                </span>
              </p>
              <p className="border-l-4 border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
                <strong className="text-[#020617]">
                  ความได้เปรียบเชิงกฎหมาย:
                </strong>{" "}
                ข้อมูลที่ท่านให้ผ่านระบบนี้ จะถือเป็นข้อมูลที่ท่าน "สมัครใจ"
                เปิดเผยเพื่อวัตถุประสงค์ในการรับบริการคำปรึกษาเท่านั้น
                โดยเราจะใช้ข้อมูลเพื่อการพัฒนาคุณภาพบริการภายในโดยไม่ระบุตัวตนร่วมด้วย
              </p>
            </div>
          </section>

          {/* Section 02: การจำกัดความรับผิดชอบ */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">
                02//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                การจำกัดความรับผิดชอบ (Liability_Limitation)
              </h2>
            </div>
            <div className="space-y-4 pl-8 text-lg">
              <p>
                แม้ว่าเราจะใช้มาตรฐานการรักษาความปลอดภัย{" "}
                <span className="font-mono font-black text-[#020617]">
                  AES-256 Bit
                </span>{" "}
                แต่ท่านยอมรับว่า "ไม่มีระบบอิเล็กทรอนิกส์ใดที่มีความปลอดภัย
                100%"
              </p>
              <p className="font-bold text-[#020617]">
                เราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากเหตุสุดวิสัย
                หรือการโจรกรรมข้อมูลโดยบุคคลที่สามที่อยู่นอกเหนือการควบคุม
                รวมถึงการที่ท่านเปิดเผยรหัสอ้างอิง (Ticket ID) ให้แก่บุคคลอื่น
              </p>
            </div>
          </section>

          {/* Section 03: การเพิกถอนสิทธิ์ */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">
                03//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                สิทธิ์และการเพิกถอน (Withdrawal_Rights)
              </h2>
            </div>
            <div className="space-y-4 pl-8 text-lg">
              <p>
                ท่านมีสิทธิ์ร้องขอให้ลบข้อมูลได้ตามกฎหมาย PDPA อย่างไรก็ตาม{" "}
                <span className="font-bold text-[#020617]">
                  ข้อมูลที่ถูกนำไปใช้ประมวลผลหรือสรุปผลการวิเคราะห์ไปแล้วอาจไม่สามารถย้อนคืนได้
                </span>
              </p>
              <div className="mt-4 flex items-center gap-3 bg-[#020617] p-4 font-mono text-[10px] font-black text-[#FCDE09] shadow-sharp">
                <AlertTriangle size={16} />
                NOTICE: DELETION_REQUESTS_MAY_AFFECT_CASE_HISTORY_INTEGRITY
              </div>
            </div>
          </section>
        </div>

        {/* --- FOOTER_SIGNATURE --- */}
        <div className="mt-24 border-t-4 border-[#020617] pt-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
              JP_VISOUL.DOCS // LEGAL_COMPLIANCE_DEPT
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] font-black text-[#020617]">
                AUTHORIZED_ENFORCEMENT_v2025
              </span>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

/** 🛠️ HELPER: PolicyHighlight (MODE B) */
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
    <div className="group bg-white p-8 transition-all hover:bg-slate-50">
      <div className="mb-4 text-[#020617] transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="block font-mono text-[10px] font-black uppercase italic tracking-widest text-slate-400">
          {title}
        </span>
        <span className="block text-lg font-black uppercase tracking-tighter text-[#020617]">
          {desc}
        </span>
      </div>
    </div>
  )
}
