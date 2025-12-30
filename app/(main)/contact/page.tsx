/** * @format
 * @description CONTACT_PORTAL_CORE: The High-Security Entry Point (V3.2.4)
 * ✅ ENFORCEMENT: Perspective UI Decors, Phase-Step HUD, Industrial Frame Mechanics
 */

import React from 'react'
import { Metadata } from 'next'
import { ContactForm } from '@/components/form/ContactForm'
import { ShieldCheck, Lock, Mail, ChevronRight, Zap, Terminal } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | JP-VISOUL&DOCS',
  description: 'ศูนย์รับเรื่องและคัดกรองข้อมูลเพื่อวางแผนด้านเอกสารและวีซ่าระบบความปลอดภัยสูง',
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans selection:bg-brand selection:text-slate-950">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid & Industrial Geometry (Mode B) */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />

      {/* Structural Decor: ขอบเฉียงที่สร้างมิติแบบ Perspective */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[40%] translate-x-1/4 -skew-x-12 border-l-[3px] border-slate-950 bg-slate-50 opacity-40" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pt-48">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          {/* 🌑 LEFT_SECTION: STRATEGIC_IDENTITY (Mode C) */}
          <div className="space-y-16 lg:col-span-5">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 bg-slate-950 px-5 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-brand shadow-sharp-brand duration-500 animate-in fade-in slide-in-from-left-4">
                <Zap size={14} className="animate-pulse fill-brand" /> DIRECT_LINE_v3.2
              </div>

              <h1 className="text-8xl font-black uppercase italic leading-[0.75] tracking-tighter text-slate-950 delay-100 duration-700 animate-in fade-in slide-in-from-bottom-6 md:text-9xl">
                Connect <br />
                <span className="not-italic text-brand drop-shadow-[8px_8px_0px_#020617]">
                  Today.
                </span>
              </h1>

              <div className="space-y-8 border-l-4 border-slate-950 pl-8">
                <p className="font-thai max-w-sm text-3xl font-black leading-none text-slate-950">
                  เริ่มเตรียมความพร้อม <br />
                  <span className="shadow-sharp bg-brand px-2 py-1 text-slate-950">
                    อย่างเป็นระบบ
                  </span>
                </p>
                <p className="font-thai max-w-md text-lg font-bold leading-relaxed text-slate-500">
                  เราใช้ระบบคัดกรองข้อมูลมาตรฐานวิศวกรรมเอกสาร
                  เพื่อให้คุณได้รับการวิเคราะห์ที่แม่นยำและรัดกุมที่สุดจากทีมเทคนิค
                </p>
              </div>
            </div>

            {/* 🛡️ PROCESS_HUD: Operation Phases (Mode B) */}
            <div className="space-y-6 pt-6">
              <PhaseIndicator
                number="01"
                title="Identity_Verification"
                desc="ยืนยันตัวตนผ่านระบบอีเมลเข้ารหัส"
                icon={<Mail size={24} />}
              />
              <PhaseIndicator
                number="02"
                title="System_Authorization"
                desc="รับ Digital Ticket เพื่อเข้าถึงช่องทางให้คำปรึกษา"
                icon={<Lock size={24} />}
              />
            </div>
          </div>

          {/* 🌕 RIGHT_SECTION: TRANSMISSION_TERMINAL (Mode A & B) */}
          <div className="relative lg:col-span-7">
            {/* 🛠️ INDUSTRIAL_FRAME: กล่องฟอร์มที่ดูเหมือนเครื่องจักร */}
            <div className="pointer-events-none absolute -left-6 -top-6 hidden h-40 w-40 border-l-[12px] border-t-[12px] border-slate-950 md:block" />
            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-40 w-40 border-b-[12px] border-r-[12px] border-brand opacity-50 md:block" />

            <div className="relative overflow-hidden border-[4px] border-slate-950 bg-white p-8 shadow-sharp-brand duration-1000 animate-in fade-in zoom-in-95 md:p-16">
              {/* Background Watermark */}
              <div className="pointer-events-none absolute -right-20 -top-20 opacity-[0.04]">
                <ShieldCheck size={450} strokeWidth={0.5} />
              </div>

              <div className="relative mb-16 flex items-end justify-between border-b-2 border-slate-100 pb-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.6em] text-slate-300">
                    <Terminal size={14} /> Transmission_Terminal
                  </div>
                  <div className="h-2 w-32 bg-brand shadow-sharp-sm" />
                </div>
                <div className="hidden font-mono text-[10px] font-black uppercase text-slate-400 sm:block">
                  SECURE_GATEWAY_3.2 // AUTH:REQ
                </div>
              </div>

              {/* 🧩 CORE_FORM_SLOT */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* 📜 TERMINAL_STATUS_BAR (Mode B) */}
      <footer className="container mx-auto max-w-7xl px-6 pb-12">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t-2 border-slate-950 pt-12 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500 opacity-75" />
              <span className="shadow-sharp relative inline-flex h-3 w-3 bg-emerald-500" />
            </div>
            <span className="text-slate-950">SYSTEM_LIVE: ACTIVE</span>
          </div>
          <StatusLink label="End_To_End_Audit" />
          <StatusLink label="Identity_Protection_Enabled" />
          <div className="ml-auto opacity-40 transition-opacity hover:opacity-100">
            [© 2025_JPV_SECURITY_INFRA]
          </div>
        </div>
      </footer>
    </main>
  )
}

/** 🛠️ ATOMIC_UI: PhaseIndicator */
function PhaseIndicator({
  number,
  title,
  desc,
  icon,
}: {
  number: string
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <div className="group flex items-center gap-8 transition-transform hover:translate-x-2">
      <div className="shadow-sharp flex h-16 w-16 shrink-0 items-center justify-center border-[3px] border-slate-950 bg-white text-slate-950 transition-all group-hover:bg-brand group-hover:shadow-none">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 transition-colors group-hover:text-brand">
          PHASE_{number}
        </span>
        <h3 className="font-mono text-[13px] font-black uppercase tracking-tighter text-slate-950">
          {title}
        </h3>
        <p className="font-thai text-[14px] font-bold leading-none text-slate-400">{desc}</p>
      </div>
    </div>
  )
}

/** 🛠️ ATOMIC_UI: StatusLink */
function StatusLink({ label }: { label: string }) {
  return (
    <div className="group flex cursor-help items-center gap-2 transition-colors hover:text-slate-950">
      <ChevronRight
        size={14}
        className="text-brand transition-transform group-hover:translate-x-1"
      />
      {label}
    </div>
  )
}
