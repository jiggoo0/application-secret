/** @format */
import React from "react"

export const metadata = {
  title: "Terms_of_Service | Boutique Ops",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการระบบปฏิบัติการเอกสาร",
}

export default function TermsPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <div className="mb-12 border-b border-slate-100 pb-8">
        <span className="mb-4 inline-block bg-slate-950 px-2 py-1 font-mono text-xs font-black uppercase text-brand">
          Service_Agreement
        </span>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-5xl">
          Terms <span className="not-italic text-brand">Of_Service.</span>
        </h1>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Ref: TERMS_V2_2025 // Effective_Immediately
        </p>
      </div>

      <div className="space-y-8 font-thai leading-relaxed text-slate-600">
        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            1. ขอบเขตการบริการ (Operational_Scope)
          </h2>
          <p>
            Boutique Ops ให้บริการคำปรึกษา จัดเตรียม
            และวางกลยุทธ์ด้านเอกสารวีซ่า อย่างไรก็ตาม
            การอนุมัติวีซ่าเป็นสิทธิ์ขาดของสถานทูตหรือหน่วยงานที่เกี่ยวข้องเท่านั้น
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            2. ความถูกต้องของข้อมูล (Data_Accuracy)
          </h2>
          <p>
            ผู้ใช้บริการตกลงที่จะให้ข้อมูลที่เป็นความจริงและถูกต้องครบถ้วน
            การให้ข้อมูลเท็จอาจส่งผลต่อการพิจารณา
            และทางบริษัทจะไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นในกรณีดังกล่าว
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black uppercase italic text-slate-950">
            3. การคืนเงิน (Refund_Policy)
          </h2>
          <p>
            เนื่องจากบริการของเราเป็นการให้คำปรึกษาและวิเคราะห์ข้อมูลเชิงลึก
            ค่าธรรมเนียมการดำเนินงานจะถูกพิจารณาเป็นรายกรณีตามขอบเขตงานที่ระบุไว้ในใบเสนอราคา
          </p>
        </section>
      </div>
    </article>
  )
}
