/** @format */

import React from "react"
// 🛰️ FIX: Changed to Named Import to resolve TS2613
import { ContactForm } from "@/components/form/ContactForm"
import { Mail, Phone, Globe, Cpu, Hash } from "lucide-react"
import { Metadata } from "next"

/**
 * 🛰️ SEO_METADATA: Industrial_Sharp_Standard
 */
export const metadata: Metadata = {
  title: "Contact Hub | JP-VISUAL&DOCS",
  description:
    "ศูนย์กลางการติดต่อเพื่อประสานงานด้านเอกสารและวีซ่าระดับพรีเมียม ภายใต้โปรโตคอลความปลอดภัยสูง",
}

/**
 * 🛰️ COMPONENT: ContactPage
 * Gateway สำหรับการส่ง Payload ข้อมูลการติดต่อ
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-brand selection:text-slate-950">
      {/* 🧩 Blueprint Grid Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.04]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-slate-100 lg:left-8" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[1px] bg-slate-100 lg:right-8" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-40 lg:pt-52">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-12">
          {/* 📟 LEFT_COLUMN: SYSTEM_INFO & IDENTITY */}
          <div className="space-y-16 lg:col-span-5">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-ping rounded-none bg-brand" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">
                  Node_Status: Online
                </span>
              </div>

              <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-8xl">
                Contact <br />
                <span className="relative not-italic text-brand">
                  Gateway.
                  <span className="absolute -bottom-2 left-0 -z-10 h-4 w-full bg-slate-950" />
                </span>
              </h1>

              <div className="max-w-md border-l-4 border-slate-950 pl-6">
                <p className="font-thai text-xl font-bold leading-relaxed text-slate-500">
                  ทีมปฏิบัติการของเราพร้อมให้คำปรึกษาและประสานงานเคสของคุณด้วย{" "}
                  <span className="font-black text-slate-950 underline decoration-brand decoration-4 underline-offset-4">
                    ความแม่นยำระดับวิศวกรรมเอกสาร
                  </span>
                </p>
              </div>
            </div>

            {/* Direct Contact Nodes Registry */}
            <div className="grid grid-cols-1 gap-10 border-t border-slate-100 pt-12 md:grid-cols-2 lg:grid-cols-1">
              <ContactNode
                icon={<Phone className="text-slate-950" size={20} />}
                label="Direct_Line_Channel"
                value="+66 2 000 0000"
              />
              <ContactNode
                icon={<Mail className="text-slate-950" size={20} />}
                label="Encrypted_Email_Protocol"
                value="ops@jp-visualdocs.com"
              />
              <ContactNode
                icon={<Globe className="text-slate-950" size={20} />}
                label="Global_HQ_Coordinate"
                value="Sukhumvit, Bangkok, TH"
              />
            </div>

            {/* System Metadata Accent */}
            <div className="hidden pt-8 opacity-40 lg:block">
              <div className="flex items-center gap-4 font-mono text-[9px] font-bold text-slate-400">
                <Cpu size={14} />
                <span className="tracking-[0.3em]">SECURE_PORT: 443</span>
                <Hash size={14} className="ml-4" />
                <span className="tracking-[0.3em]">
                  ENCRYPTION: AES_256_GCM
                </span>
              </div>
            </div>
          </div>

          {/* 🛠️ RIGHT_COLUMN: FORM_INTERFACE */}
          <div className="relative lg:col-span-7">
            {/* Decorative Frame: Rounded-none Enforced */}
            <div className="absolute -inset-4 -z-10 rounded-none border border-slate-100 bg-slate-50/50" />

            <div className="relative rounded-none border-2 border-slate-950 bg-white p-8 shadow-sharp md:p-16">
              <div className="mb-14 flex items-end justify-between border-b border-slate-100 pb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-950">
                    Transmission_Form
                  </h2>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Build: 1.0.4 // Ready_to_Send
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-slate-950 bg-brand shadow-[4px_4px_0px_0px_#020617]">
                  <span className="font-mono text-xs font-black text-slate-950">
                    01
                  </span>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 🧱 SUB-COMPONENT: ContactNode (Local Helper) */
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
    <div className="group flex items-start gap-5 transition-transform hover:translate-x-2">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-slate-200 bg-slate-50 transition-colors group-hover:border-slate-950 group-hover:bg-brand">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-950">
          {label}
        </span>
        <span className="block text-lg font-black tracking-tight text-slate-950">
          {value}
        </span>
      </div>
    </div>
  )
}
