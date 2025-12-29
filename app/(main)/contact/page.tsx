/** @format */

import { Metadata } from "next"
import { ContactForm } from "@/components/form/ContactForm"
import { ShieldCheck, Lock, Mail, ChevronRight, Zap } from "lucide-react"

/**
 * @description CONTACT_PAGE_PORTAL: หน้าหลักการติดต่อสื่อสาร
 * @rules Strictly followed Mode A, B, and C as per Handbook v2025
 * STATUS: PRODUCTION_READY
 */

export const metadata: Metadata = {
  title: "Contact | JP‑VISOUL&DOCS",
  description: "ศูนย์รับเรื่องและคัดกรองข้อมูลเพื่อวางแผนด้านเอกสารและวีซ่า",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans">
      {/* 🧩 UI_DECORATION: Blueprint Grid & Hard Shapes (MODE B) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[40%] translate-x-1/2 -skew-x-12 border-l border-slate-100 bg-slate-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          {/* 🌑 LEFT_SECTION: Value Proposition (MODE C) */}
          <div className="space-y-12 duration-700 animate-in fade-in slide-in-from-left-8 lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#020617] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#FCDE09] shadow-sharp">
                <Zap size={14} className="fill-[#FCDE09]" /> Direct_Line_v1.0
              </div>

              <h1 className="text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
                Connect
                <br />
                <span className="text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
                  Today.
                </span>
              </h1>

              <div className="space-y-4">
                <p className="max-w-sm font-thai text-xl font-bold leading-snug text-slate-500">
                  เริ่มเตรียมความพร้อมวันนี้ <br />
                  <span className="bg-[#FCDE09] px-2 py-0.5 text-[#020617] shadow-sharp">
                    เพื่อลดความเสี่ยง
                  </span>{" "}
                  ในการดำเนินการทุกขั้นตอน
                </p>
                <p className="max-w-xs font-thai text-sm font-medium leading-relaxed text-slate-400">
                  เราใช้ข้อมูลจริงในการวิเคราะห์เพื่อให้คุณได้รับคำแนะนำที่ถูกต้องที่สุดจากทีมที่ปรึกษา
                </p>
              </div>
            </div>

            {/* 🛡️ PROCESS_GUIDE: Steps (MODE B & C) */}
            <div className="space-y-4 border-t-2 border-[#020617] pt-10">
              <div className="group flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center border-2 border-[#020617] bg-white text-[#020617] shadow-sharp transition-all duration-300 group-hover:bg-[#FCDE09]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-300">
                    Phase_01
                  </p>
                  <p className="font-thai text-[15px] font-black text-[#020617] transition-colors group-hover:text-slate-600">
                    รับลิงก์ยืนยันทางอีเมล
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-6">
                <div className="flex h-14 w-14 items-center justify-center border-2 border-[#020617] bg-white text-[#020617] shadow-sharp transition-all duration-300 group-hover:bg-[#FCDE09]">
                  <Lock size={24} />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-tighter text-slate-300">
                    Phase_02
                  </p>
                  <p className="font-thai text-[15px] font-black text-[#020617] transition-colors group-hover:text-slate-600">
                    ปลดล็อกรหัส Ticket & QR Pass
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 🌕 RIGHT_SECTION: Form Terminal (MODE A & B) */}
          <div className="relative duration-1000 animate-in fade-in slide-in-from-bottom-12 lg:col-span-7">
            {/* 🛠️ INDUSTRIAL_DECOR: Sharp Edges Frames */}
            <div className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 border-l-8 border-t-8 border-[#020617] md:block" />
            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-24 w-24 border-b-8 border-r-8 border-[#FCDE09] md:block" />

            <div className="relative overflow-hidden border-2 border-[#020617] bg-white p-8 shadow-[40px_40px_0px_#f1f5f9] md:p-14">
              {/* Grid Pattern Overlay */}
              <div className="pointer-events-none absolute -right-10 -top-10 select-none p-4 opacity-[0.03]">
                <ShieldCheck size={280} strokeWidth={1} />
              </div>

              <div className="relative mb-12 flex items-end justify-between">
                <div>
                  <h3 className="mb-2 font-mono text-xs font-black uppercase leading-none tracking-[0.4em] text-slate-300">
                    Transmission_Terminal
                  </h3>
                  <div className="h-2 w-20 bg-[#FCDE09] shadow-sharp" />
                </div>
                <div className="hidden font-mono text-[9px] uppercase tracking-widest text-slate-300 sm:block">
                  Auth_Level: Secure_Sharp_v3.2
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* 📜 TERMINAL_FOOTER: Stats & Meta (MODE B) */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-4 border-t border-slate-100 pt-10 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 animate-pulse rounded-none bg-emerald-500 shadow-sharp" />
            System_Live: Active
          </div>
          <div className="group flex cursor-help items-center gap-2">
            <ChevronRight
              size={12}
              className="text-[#FCDE09] transition-transform group-hover:translate-x-1"
            />
            End_To_End_Verification
          </div>
          <div className="group flex cursor-help items-center gap-2">
            <ChevronRight
              size={12}
              className="text-[#FCDE09] transition-transform group-hover:translate-x-1"
            />
            Identity_Protection_Enabled
          </div>
        </div>
      </div>
    </main>
  )
}
