/** @format */
import React from "react"
import { ShieldCheck, Lock, EyeOff, Database, FileLock2 } from "lucide-react"

export const metadata = {
  title: "Privacy_Policy | Boutique Ops",
  description:
    "นโยบายความเป็นส่วนตัวและการรักษาความปลอดภัยของข้อมูลตามมาตรฐาน Security Protocol",
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-white pb-24 pt-32 lg:pt-48">
      {/* 🧩 Blueprint Grid Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* --- DOCUMENT_HEADER --- */}
        <div className="mb-20 border-l-4 border-slate-950 pl-8 md:pl-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-950 shadow-sharp-brand">
              <Lock className="text-brand" size={20} />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Data_Protection_Protocol_v2.5
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-7xl">
            Privacy <br />
            <span className="relative not-italic text-brand">
              Policy.
              <span className="absolute -bottom-2 left-0 -z-10 h-3 w-full bg-slate-950 md:h-4" />
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              STATUS: ACTIVE_ENCRYPTION
            </span>
            <span>LAST_REVISION: 28_DEC_2025</span>
          </div>
        </div>

        {/* --- SECURITY_INFOGRAPHIC_PREVIEW --- */}
        <div className="mb-20 grid grid-cols-1 gap-px border border-slate-100 bg-slate-100 md:grid-cols-3">
          <PolicyHighlight
            icon={<Database size={18} />}
            title="STORAGE"
            desc="Encrypted Node Cluster"
          />
          <PolicyHighlight
            icon={<EyeOff size={18} />}
            title="ACCESS"
            desc="Strict Personnel Only"
          />
          <PolicyHighlight
            icon={<ShieldCheck size={18} />}
            title="COMPLIANCE"
            desc="GDPR/PDPA Standard"
          />
        </div>

        {/* --- CONTENT_BODY --- */}
        <div className="space-y-16 font-thai leading-relaxed text-slate-600">
          <section className="group relative">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs font-black text-brand transition-transform group-hover:translate-x-1">
                01//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                การเก็บรวบรวมข้อมูล (Data_Collection)
              </h2>
            </div>
            <div className="border-l-2 border-slate-100 pl-8 transition-colors group-hover:border-brand">
              <p className="text-lg">
                เราเก็บรวบรวมข้อมูลส่วนบุคคลที่จำเป็นสำหรับการดำเนินงานด้านวีซ่าและเอกสารเท่านั้น
                ซึ่งรวมถึงชื่อ เบอร์โทรศัพท์ อีเมล
                และข้อมูลประวัติการเดินทางที่ท่านระบุในแบบฟอร์ม
                <span className="font-bold text-slate-950">
                  {" "}
                  ข้อมูลนี้จะถูกใช้เพื่อการวิเคราะห์และประเมินผลเคสของท่านโดยตรง
                </span>
              </p>
            </div>
          </section>

          <section className="group relative">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs font-black text-brand transition-transform group-hover:translate-x-1">
                02//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                มาตรฐานความปลอดภัย (Security_Protocol)
              </h2>
            </div>
            <div className="border-l-2 border-slate-100 pl-8 transition-colors group-hover:border-brand">
              <p className="text-lg">
                ข้อมูลทั้งหมดจะถูกเข้ารหัสด้วยเทคโนโลยี{" "}
                <span className="font-mono font-black text-slate-950">
                  AES-256 Bit
                </span>{" "}
                ผ่านระบบ Secure Node
                และถูกเก็บรักษาไว้ในฐานข้อมูลที่มีการป้องกันขั้นสูงสุด
                เราไม่มีนโยบายการขายหรือเผยแพร่ข้อมูลของท่านให้แก่บุคคลที่สามโดยเด็ดขาด
              </p>
              <div className="mt-6 flex items-center gap-3 bg-slate-50 p-4 font-mono text-[10px] font-bold text-slate-400">
                <FileLock2 size={16} className="text-slate-950" />
                PROTECTION_LEVEL: INDUSTRIAL_GRADE_SECURITY
              </div>
            </div>
          </section>

          <section className="group relative">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs font-black text-brand transition-transform group-hover:translate-x-1">
                03//
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                สิทธิ์ของเจ้าของข้อมูล (Subject_Rights)
              </h2>
            </div>
            <div className="border-l-2 border-slate-100 pl-8 transition-colors group-hover:border-brand">
              <p className="text-lg">
                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                ท่านมีสิทธิ์ในการเข้าถึง แก้ไข
                หรือร้องขอให้ลบข้อมูลส่วนบุคคลของท่านออกจากระบบของเราได้ตลอดเวลา
                กรุณาแจ้งความประสงค์ผ่านช่องทางประสานงานหลักของ{" "}
                <span className="font-black text-slate-950">Boutique Ops</span>
              </p>
            </div>
          </section>
        </div>

        {/* --- FOOTER_SIGNATURE --- */}
        <div className="mt-24 border-t border-slate-950 pt-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
              JP_Visual.Docs // Legal_Department
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-slate-100" />
              <span className="font-mono text-[10px] font-black text-slate-950">
                CERTIFIED_BY_BOUTIQUE_OPS
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

/** 🛠️ HELPER: PolicyHighlight */
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
    <div className="bg-white p-8 transition-all hover:bg-slate-50">
      <div className="mb-4 text-slate-950">{icon}</div>
      <div className="space-y-1">
        <span className="block font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
          {title}
        </span>
        <span className="block font-black uppercase tracking-tighter text-slate-950">
          {desc}
        </span>
      </div>
    </div>
  )
}
