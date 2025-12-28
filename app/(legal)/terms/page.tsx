/** @format */
import React from "react"
import { siteConfig } from "@/config/site"
import { Gavel, ShieldAlert, FileText, Lock } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* 📑 HEADER_PROTOCOL */}
        <div className="mb-16 border-l-4 border-blue-600 pl-8">
          <div className="mb-4 flex items-center gap-3 text-blue-600">
            <Gavel size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Policy_Registry
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-7xl">
            TERMS OF <br />
            <span className="text-blue-600">SERVICE.</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            System_Update: {siteConfig.system.version}
            {/* ✅ แก้ไข: ย้ายคอมเมนต์ออกจาก Text Node มาอยู่ใน JSX Expression */}
            <span className="ml-2 opacity-50">{/* Last_Modified: 2024 */}</span>
          </p>
        </div>

        {/* ⚙️ CONTENT_GRID */}
        <div className="grid gap-12 text-slate-600">
          <section className="group border-b border-slate-100 pb-10">
            <h2 className="mb-6 flex items-center gap-4 text-lg font-black uppercase tracking-tight text-slate-900">
              <span className="text-blue-600">01.</span> Scope_Of_Work
            </h2>
            <p className="font-medium leading-relaxed">
              {siteConfig.name}{" "}
              ให้บริการออกแบบและจัดเตรียมโครงสร้างเอกสารตามมาตรฐานสากล
              โดยผลลัพธ์ที่ได้จะเป็นไปตามข้อมูลที่ท่านได้รับมอบหมายและเงื่อนไขทางกฎหมายในขณะนั้น
            </p>
          </section>

          <section className="group border-b border-slate-100 pb-10">
            <h2 className="mb-6 flex items-center gap-4 text-lg font-black uppercase tracking-tight text-slate-900">
              <span className="text-blue-600">02.</span>{" "}
              Confidentiality_Protocol
            </h2>
            <div className="flex gap-6 bg-slate-900 p-8 text-white shadow-xl shadow-slate-200">
              <Lock className="shrink-0 text-blue-500" size={32} />
              <p className="text-sm font-bold italic leading-relaxed">
                &quot;ข้อมูลส่วนบุคคลและรายละเอียดเคสของท่านจะถูกเก็บรักษาเป็นความลับสูงสุด
                และจะไม่มีการส่งต่อให้บุคคลที่สามโดยไม่ได้รับอนุญาตตามมาตรฐานความปลอดภัยข้อมูล&quot;
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-t-2 border-slate-900 bg-slate-50 p-8">
              <ShieldAlert size={24} className="mb-4 text-slate-900" />
              <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-900">
                Liability_Disclaimer
              </h3>
              <p className="text-xs font-bold leading-relaxed text-slate-500">
                เราคือที่ปรึกษาด้านโครงสร้างข้อมูล
                ผลลัพธ์สุดท้ายขึ้นอยู่กับการพิจารณาของหน่วยงานปลายทาง
                ทางบริษัทไม่สามารถการันตีผลลัพธ์ที่อยู่นอกเหนือขอบเขตการจัดการข้อมูลได้
              </p>
            </div>
            <div className="border-t-2 border-blue-600 bg-blue-50 p-8">
              <FileText size={24} className="mb-4 text-blue-600" />
              <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-blue-600">
                SLA_Policy
              </h3>
              <p className="text-xs font-bold leading-relaxed text-slate-500">
                การเริ่มดำเนินการ (Deployment) จะเกิดขึ้นทันทีหลังจากมีการยืนยัน
                Payload (ชำระค่าบริการ)
                และจะใช้เวลาดำเนินการตามกรอบเวลาที่ตกลงกันในแต่ละโปรเจกต์
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
