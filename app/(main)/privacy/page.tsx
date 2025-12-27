/** @format */
import React from "react"
import { ShieldCheck, Lock, EyeOff } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 border-l-4 border-blue-600 pl-8">
          <div className="mb-4 flex items-center gap-3 text-blue-600">
            <ShieldCheck size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Data_Protection_Registry
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-7xl">
            PRIVACY <br />
            <span className="text-blue-600">PROTOCOL.</span>
          </h1>
        </div>

        <div className="space-y-12">
          <section className="border-l-2 border-slate-900 bg-slate-50 p-10">
            <div className="mb-6 flex items-center gap-4">
              <Lock className="text-slate-900" size={24} />
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">
                Encryption_Standard
              </h2>
            </div>
            <p className="text-sm font-bold uppercase leading-relaxed text-slate-500">
              ข้อมูลเอกสารทั้งหมดจะถูกเก็บรักษาภายใต้มาตรฐานการเข้ารหัสขั้นสูงสุด
              และจะถูกทำลายทิ้งทันที (Data Shredding)
              เมื่อภารกิจเสร็จสิ้นตามที่ลูกค้าร้องขอ
            </p>
          </section>

          <section className="border-l-2 border-blue-600 p-10">
            <div className="mb-6 flex items-center gap-4">
              <EyeOff className="text-blue-600" size={24} />
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">
                No_Third_Party_Access
              </h2>
            </div>
            <p className="text-sm font-bold uppercase leading-relaxed text-slate-500">
              ไม่มีนโยบายการเปิดเผยข้อมูลหรือส่งต่อข้อมูลโครงสร้างเอกสารของลูกค้าให้แก่บุคคลที่สาม
              ยกเว้นหน่วยงานที่เกี่ยวข้องโดยตรงในกระบวนการยื่นเอกสารเท่านั้น
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
