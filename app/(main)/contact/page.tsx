/** @format */

import React from "react"
import { Metadata } from "next"
import { ContactForm } from "@/components/form/ContactForm"
import { ShieldCheck, Lock, Mail, ChevronRight, Zap } from "lucide-react"

/**
 * 🛰️ PAGE: CONTACT_PORTAL_CORE
 * @version 3.2.4 (Industrial Sharp Edition)
 * RULES: Strictly followed Mode A, B, and C as per Handbook v2025
 */

export const metadata: Metadata = {
  title: "Contact | JP‑VISOUL&DOCS",
  description:
    "ศูนย์รับเรื่องและคัดกรองข้อมูลเพื่อวางแผนด้านเอกสารและวีซ่าระบบความปลอดภัยสูง",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_DECORATION: Blueprint Grid & Hard Shapes (MODE B) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Structural Decor Element */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[45%] translate-x-1/3 -skew-x-12 border-l-2 border-slate-100 bg-slate-50/50" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 🌑 LEFT_SECTION: Value Proposition (MODE C) */}
          <div className="space-y-12 duration-700 animate-in fade-in slide-in-from-left-8 lg:col-span-5">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#020617] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09] shadow-sharp">
                <Zap size={14} className="fill-[#FCDE09]" /> Direct_Line_v1.0
              </div>

              <h1 className="text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
                Connect
                <br />
                <span className="text-[#FCDE09] drop-shadow-[5px_5px_0px_#020617]">
                  Today.
                </span>
              </h1>

              <div className="space-y-6">
                <p className="max-w-sm font-thai text-2xl font-black leading-tight text-[#020617]">
                  เริ่มเตรียมความพร้อมอย่างเป็นระบบ <br />
                  <span className="bg-[#FCDE09] px-2 py-0.5 shadow-sharp">
                    ลดความผิดพลาด
                  </span>{" "}
                  ในทุกขั้นตอนสำคัญ
                </p>
                <p className="max-w-md font-thai text-base font-medium leading-relaxed text-slate-500">
                  เราใช้ระบบคัดกรองข้อมูลมาตรฐานสูง
                  เพื่อให้คุณได้รับคำปรึกษาที่ตรงจุดและมีโอกาสสำเร็จสูงสุดจากทีมงานผู้เชี่ยวชาญ
                </p>
              </div>
            </div>

            {/* 🛡️ PROCESS_GUIDE: Phase Steps (MODE B & C) */}
            <div className="space-y-5 border-t-4 border-[#020617] pt-12">
              <div className="group flex items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[#020617] bg-white text-[#020617] shadow-sharp transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FCDE09]">
                  <Mail size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                    Phase_01
                  </p>
                  <p className="font-thai text-[17px] font-black text-[#020617]">
                    ยืนยันตัวตนผ่านระบบอีเมล
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[#020617] bg-white text-[#020617] shadow-sharp transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#FCDE09]">
                  <Lock size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                    Phase_02
                  </p>
                  <p className="font-thai text-[17px] font-black text-[#020617]">
                    รับ Digital Ticket เพื่อเข้าพบที่ปรึกษา
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 🌕 RIGHT_SECTION: Form Terminal (MODE A & B) */}
          <div className="relative duration-1000 animate-in fade-in slide-in-from-bottom-12 lg:col-span-7">
            {/* 🛠️ INDUSTRIAL_FRAME: Corner Borders */}
            <div className="pointer-events-none absolute -left-4 -top-4 hidden h-32 w-32 border-l-[10px] border-t-[10px] border-[#020617] md:block" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-32 w-32 border-b-[10px] border-r-[10px] border-[#FCDE09] md:block" />

            <div className="shadow-sharp-lg relative overflow-hidden border-[3px] border-[#020617] bg-white p-8 md:p-14">
              {/* Background Icon Watermark */}
              <div className="pointer-events-none absolute -right-12 -top-12 select-none opacity-[0.03]">
                <ShieldCheck size={320} strokeWidth={1} />
              </div>

              <div className="relative mb-12 flex items-end justify-between border-b-2 border-slate-50 pb-6">
                <div>
                  <h3 className="mb-2 font-mono text-xs font-black uppercase leading-none tracking-[0.5em] text-slate-400">
                    Transmission_Terminal
                  </h3>
                  <div className="h-2.5 w-24 bg-[#FCDE09] shadow-sharp" />
                </div>
                <div className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 sm:block">
                  Secure_Session_v3.2
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* 📜 TERMINAL_FOOTER (MODE B) */}
      <div className="container mx-auto max-w-7xl px-6 pb-12">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-slate-100 pt-12 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-emerald-500 shadow-sharp" />
            </div>
            System_Live: Active
          </div>
          <div className="group flex cursor-help items-center gap-2 transition-colors hover:text-[#020617]">
            <ChevronRight
              size={12}
              className="text-[#FCDE09] transition-transform group-hover:translate-x-1"
            />
            End_To_End_Verification
          </div>
          <div className="group flex cursor-help items-center gap-2 transition-colors hover:text-[#020617]">
            <ChevronRight
              size={12}
              className="text-[#FCDE09] transition-transform group-hover:translate-x-1"
            />
            Identity_Protection_Enabled
          </div>
          <div className="ml-auto opacity-50">© 2025_JPV_SECURITY_PROTOCOL</div>
        </div>
      </div>
    </main>
  )
}
