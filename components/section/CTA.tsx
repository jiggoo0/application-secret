/** @format */
"use client"

import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { ArrowRight, MessageSquare, Phone, FileText, Zap } from "lucide-react"

/**
 * CTA (Call To Action) Component
 * ----------------------------------------------------------------
 * ส่วนปิดท้ายหน้าเว็บเพื่อกระตุ้นการตัดสินใจ (Final Conversion Point)
 * ออกแบบมาในสไตล์ "Command Center" เพื่อความน่าเชื่อถือสูงสุด
 */
export default function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-white py-24 lg:py-32"
      id="cta-terminal"
    >
      {/* 🧩 INDUSTRIAL_BACKGROUND: ลายจุดแบบ Matrix และแสง Glow จางๆ */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="group relative overflow-hidden border border-slate-900 bg-slate-900 p-8 shadow-2xl md:p-16 lg:p-20">
          {/* ⚡ DECORATIVE_SCANLINE: เส้นวิ่งแอนิเมชันด้านบน */}
          <div className="absolute left-0 top-0 h-1.5 w-full bg-blue-600 transition-all duration-500 group-hover:h-2.5" />
          <div className="absolute -left-full top-0 h-1.5 w-1/2 bg-white/20 blur-sm transition-all duration-1000 group-hover:left-full" />

          {/* BACKGROUND_WATERMARK */}
          <div className="absolute -bottom-10 -right-10 select-none text-[15vw] font-black leading-none text-white opacity-[0.02] transition-opacity group-hover:opacity-[0.05]">
            START
          </div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* 📝 LEFT: CORE_MESSAGE */}
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <Zap size={18} className="fill-blue-500 text-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-400">
                  Ready_To_Deploy_Project?
                </span>
              </div>

              <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-7xl">
                START YOUR <br />
                <span className="text-blue-500">DOCUMENT</span> <br />
                STRATEGY.
              </h2>

              <p className="max-w-md text-[15px] font-bold uppercase leading-relaxed tracking-tight text-slate-400">
                ลดความเสี่ยงในการถูกปฏิเสธวีซ่า หรือความผิดพลาดในเอกสารทางธุรกิจ
                ทีมผู้เชี่ยวชาญ JP VISUAL DOCS พร้อมวางโครงสร้างให้คุณทันที
              </p>
            </div>

            {/* ⚡ RIGHT: INTERACTIVE_PANEL */}
            <div className="relative z-10 flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
              {/* PRIMARY_ACTION */}
              <Link
                href="/contact"
                className="group/btn relative flex flex-1 items-center justify-center gap-4 overflow-hidden bg-white py-6 text-[12px] font-black uppercase tracking-[0.4em] text-slate-900 transition-all hover:bg-blue-600 hover:text-white"
              >
                <span className="relative z-10">Get_Started_Now</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform group-hover/btn:translate-x-2"
                />
                <div className="absolute inset-0 -translate-x-full bg-blue-700 transition-transform duration-300 group-hover/btn:translate-x-0" />
              </Link>

              {/* SECONDARY_ACTIONS */}
              <div className="grid flex-1 grid-cols-2 gap-4">
                <a
                  href={`https://line.me/ti/p/${siteConfig.social.line}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-slate-700 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-blue-500 hover:bg-blue-600/10 active:scale-95"
                >
                  <MessageSquare size={16} className="text-blue-500" />{" "}
                  LINE_SYNC
                </a>
                <a
                  href={`tel:${siteConfig.social.phone || siteConfig.social.email}`}
                  className="flex items-center justify-center gap-3 border border-slate-700 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-blue-500 hover:bg-blue-600/10 active:scale-95"
                >
                  <Phone size={16} className="text-blue-500" /> VOICE_CALL
                </a>
              </div>
            </div>
          </div>

          {/* 🏁 BOTTOM_TRUST_FOOTER: รายละเอียดความปลอดภัย */}
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-slate-800 pt-10">
            <div className="flex items-center gap-3 transition-colors hover:text-white">
              <FileText size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Fixed_Price_No_Hidden_Cost
              </span>
            </div>
            <div className="flex items-center gap-3 transition-colors hover:text-white">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Express_Processing_Active
              </span>
            </div>
            <div className="flex items-center gap-3 transition-colors hover:text-white">
              <div className="flex h-5 w-5 items-center justify-center rounded border border-slate-700 text-[8px] font-black text-slate-500">
                100
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Secure_Data_Handling
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
