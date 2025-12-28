/** @format */
import React from "react"
import ContactForm from "@/components/form/ContactForm"
// ✅ FIXED: ลบ MapPin ออกเนื่องจากไม่ได้ถูกเรียกใช้งาน (Unused Import)
import { Mail, Phone, Globe } from "lucide-react"

export const metadata = {
  title: "Contact Hub | Boutique Ops",
  description:
    "ศูนย์กลางการติดต่อเพื่อประสานงานด้านเอกสารและวีซ่าระดับพรีเมียม",
}

/**
 * 🛰️ COMPONENT: ContactPage
 * หน้าจอการติดต่อสื่อสาร (Contact_Gateway)
 * สไตล์: Industrial Design / Blueprint Typography
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* 🧩 Blueprint Grid Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          
          {/* 📟 LEFT: SYSTEM_INFO & IDENTITY */}
          <div className="space-y-12 lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-brand">
                Contact_Gateway_Active
              </div>
              <h1 className="text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950 md:text-7xl">
                Get In <br />
                <span className="not-italic text-brand shadow-[inset_0_-10px_0_0_#020617]">
                  Touch.
                </span>
              </h1>
              <p className="max-w-sm font-thai text-lg leading-relaxed text-slate-500">
                ทีมปฏิบัติการของเราพร้อมให้คำปรึกษาและประสานงานเคสของคุณด้วยความแม่นยำสูงสุด
              </p>
            </div>

            {/* Direct Contact Nodes Registry */}
            <div className="space-y-8 border-t border-slate-100 pt-8">
              <ContactNode
                icon={<Phone className="text-brand" size={20} />}
                label="Direct_Line"
                value="+66 2 000 0000"
              />
              <ContactNode
                icon={<Mail className="text-brand" size={20} />}
                label="Email_Protocol"
                value="ops@boutique-ops.com"
              />
              <ContactNode
                icon={<Globe className="text-brand" size={20} />}
                label="Global_HQ"
                value="Sukhumvit, Bangkok, Thailand"
              />
            </div>
          </div>

          {/* 🛠️ RIGHT: FORM_INTERFACE (Transmission_Payload) */}
          <div className="border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/60 md:p-12 lg:col-span-7">
            <div className="mb-10">
              <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-950">
                Transmission_Form
              </h2>
              <div className="mt-2 h-1 w-12 bg-brand" />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 🧱 SUB-COMPONENT: ContactNode
 * แสดงผลหน่วยข้อมูลการติดต่อย่อย
 */
function ContactNode({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="group flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <span className="mb-1 block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="font-bold text-slate-950 transition-colors group-hover:text-brand">
          {value}
        </span>
      </div>
    </div>
  )
}
