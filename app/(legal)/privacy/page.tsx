/** @format */
import React from "react"

export const metadata = {
  title: "Privacy_Policy | Boutique Ops",
  description: "นโยบายความเป็นส่วนตัวและการรักษาความปลอดภัยของข้อมูล",
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <div className="mb-12 border-b border-slate-100 pb-8">
        <span className="mb-4 inline-block bg-slate-950 px-2 py-1 font-mono text-xs font-black uppercase text-brand">
          Data_Protection_Act
        </span>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-5xl">
          Privacy <span className="not-italic text-brand">Policy.</span>
        </h1>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Last_Updated: 28_DEC_2025 // Status: ACTIVE
        </p>
      </div>

      <div className="space-y-8 font-thai leading-relaxed text-slate-600">
        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            1. การเก็บรวบรวมข้อมูล (Data_Collection)
          </h2>
          <p>
            เราเก็บรวบรวมข้อมูลส่วนบุคคลที่จำเป็นสำหรับการดำเนินงานด้านวีซ่าและเอกสารเท่านั้น
            ซึ่งรวมถึงชื่อ เบอร์โทรศัพท์ อีเมล
            และข้อมูลประวัติการเดินทางที่ท่านระบุในแบบฟอร์มประเมิน (Assessment
            Form)
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            2. มาตรฐานความปลอดภัย (Security_Protocol)
          </h2>
          <p>
            ข้อมูลทั้งหมดจะถูกเข้ารหัสผ่านระบบ Secure Node
            และถูกเก็บรักษาไว้ในฐานข้อมูลที่มีการป้องกันขั้นสูงสุด
            เราไม่มีนโยบายการขายหรือเผยแพร่ข้อมูลของท่านให้แก่บุคคลที่สามโดยไม่ได้รับอนุญาต
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            3. สิทธิ์ของเจ้าของข้อมูล (Subject_Rights)
          </h2>
          <p>
            ท่านมีสิทธิ์ในการเข้าถึง แก้ไข
            หรือร้องขอให้ลบข้อมูลส่วนบุคคลของท่านออกจากระบบของเราได้ตลอดเวลา
            ผ่านการแจ้งความประสงค์มาที่ช่องทางติดต่ออย่างเป็นทางการ
          </p>
        </section>
      </div>
    </article>
  )
}
