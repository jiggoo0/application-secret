/** @format */
import React from 'react'
import { Lock, UserCheck, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'นโยบายความเป็นส่วนตัว | JP Visual Docs',
  description: 'ข้อกำหนดความเป็นส่วนตัวและมาตรการคุ้มครองข้อมูลส่วนบุคคลตามมาตรฐาน PDPA',
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-white pb-24 pt-32 font-sans lg:pt-48">
      {/* 🧩 UI_DECOR: Industrial Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <article className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER: แถบสถานะประกาศทางกฎหมาย */}
        <header className="mb-20 border-l-8 border-[#020617] pl-8 md:pl-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#020617] shadow-sharp">
              <Lock size={20} className="text-[#FCDE09]" />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Data_Protection_Protocol_v3.3
            </span>
          </div>

          <h1 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
            Privacy <br />
            <span className="not-italic text-slate-200 drop-shadow-[4px_4px_0px_#020617] transition-colors hover:text-[#FCDE09]">
              Policy.
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2 border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-600">
              <span className="h-2 w-2 animate-pulse bg-emerald-500 shadow-sharp" />
              STATUS: ACTIVE_COMPLIANCE
            </span>
            <span className="border border-slate-100 bg-slate-50 px-2 py-1">
              EFFECTIVE_DATE: 01_JAN_2026
            </span>
          </div>
        </header>

        {/* 📋 DATA_FLOW_VISUALIZATION */}

        {/* CONTENT: Legal Execution */}
        <div className="space-y-16 font-thai leading-relaxed text-slate-600">
          {/* SECTION 01: การเก็บข้อมูล */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">01//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                การจัดเก็บข้อมูลส่วนบุคคล (Data_Collection)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg font-medium">
              <p>
                เราจัดเก็บข้อมูลที่จำเป็นต่อการดำเนินงานด้านเอกสารเท่านั้น รวมถึงข้อมูลระบุตัวตน และ{' '}
                <span className="font-bold text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                  ข้อมูลเชิงวิเคราะห์โปรไฟล์
                </span>{' '}
                เพื่อประเมินโอกาสตามเกณฑ์ของหน่วยงานที่เกี่ยวข้อง
              </p>

              <div className="border-l-4 border-[#020617] bg-slate-50 p-6 text-sm leading-relaxed shadow-sm">
                <div className="mb-3 flex items-center gap-2 font-black uppercase text-[#020617]">
                  <UserCheck size={16} /> กฎการยินยอม (Consent_Protocol):
                </div>
                การส่งข้อมูลผ่านฟอร์มในระบบ
                ถือเป็นการยืนยันความถูกต้องและยินยอมให้ที่ปรึกษาใช้ข้อมูลเพื่อวัตถุประสงค์ในการ
                <strong className="mx-1 text-[#020617]"> &quot;วางแผนยื่นเอกสาร&quot; </strong>{' '}
                ภายใต้มาตรฐานความปลอดภัยสูงสุด
              </div>
            </div>
          </section>

          {/* SECTION 02: มาตรฐานความปลอดภัย */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">02//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                ความปลอดภัยและการจำกัดสิทธิ์ (Security_Layer)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg">
              <p>
                เราใช้โปรโตคอลการรักษาความลับขั้นสูงในการจัดเก็บข้อมูล อย่างไรก็ตาม
                ท่านรับทราบว่ากระบวนการรับส่งข้อมูลผ่านเครือข่ายสาธารณะ
                <span className="mx-1 bg-[#FCDE09]/20 px-1 font-bold italic text-[#020617]">
                  &quot;อาจมีความเสี่ยงที่อยู่นอกเหนือการบริหารจัดการ&quot;
                </span>
              </p>

              <div className="flex items-center gap-4 border-2 border-slate-950 bg-[#020617] p-5 text-[#FCDE09]">
                <ShieldAlert size={20} />
                <div className="font-mono text-xs font-black uppercase tracking-[0.2em]">
                  ENCRYPTION_STANDARD: AES-256_GCM // ACTIVE
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 03: สิทธิ์ของเจ้าของข้อมูล */}
          <section className="group">
            <div className="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-2 transition-colors group-hover:border-[#FCDE09]">
              <span className="font-mono text-xs font-black text-[#020617]">03//</span>
              <h2 className="text-2xl font-black uppercase italic tracking-tight text-[#020617]">
                สิทธิ์ในการจัดการข้อมูล (User_Rights)
              </h2>
            </div>

            <div className="space-y-4 pl-8 text-lg text-slate-600">
              <p>
                ท่านสามารถแจ้งความประสงค์เพื่อตรวจสอบ แก้ไข
                หรือลบข้อมูลส่วนบุคคลออกจากฐานข้อมูลของเราได้ เว้นแต่ข้อมูลที่ถูกนำไปใช้ในกระบวนการ{' '}
                <span className="border-b-2 border-[#020617] font-bold text-[#020617]">
                  สรุปผลการพิจารณา (Finalized_Analysis)
                </span>{' '}
                เพื่อเป็นหลักฐานทางกฎหมาย
              </p>
            </div>
          </section>
        </div>

        {/* FOOTER: ช่องทางติดต่อเรื่อง Privacy */}
        <footer className="mt-32 border-t-4 border-slate-950 pt-12 font-mono">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Privacy_Officer_Contact
              </p>
              <a
                href="mailto:privacy@jpvisouldocs.online"
                className="text-2xl font-black text-[#020617] transition-colors hover:text-[#FCDE09]"
              >
                privacy@jpvisouldocs.online
              </a>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase text-slate-300">
                Document_ID: PRIV_2026_01
              </p>
              <p className="text-[9px] font-bold uppercase text-slate-300">Checksum: Verified_OK</p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}
