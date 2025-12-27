/** @format */
"use client"

import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { ArrowRight, MessageSquare, Phone, FileText, Zap } from "lucide-react"

/**
 * 🛰️ CTA_COMPONENT (Protocol_Conversion)
 * แก้ไขปัญหา TS2339 โดยการตรวจสอบการมีอยู่ของ Property และใช้ข้อมูลจาก Config อย่างเคร่งครัด
 */
export default function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-white py-24 lg:py-32"
      id="cta-terminal"
    >
      {/* 🧩 INDUSTRIAL_BACKGROUND: ลายจุดแบบ Matrix */}
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
          {/* ⚡ DECORATIVE_SCANLINE: แอนิเมชันสไตล์ Industrial */}
          <div className="absolute left-0 top-0 h-1.5 w-full bg-blue-600 transition-all duration-500 group-hover:h-2.5" />

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* 📝 LEFT: CORE_MESSAGE */}
            <article className="relative z-10">
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
                ลดความเสี่ยงในการถูกปฏิเสธวีซ่า ทีมผู้เชี่ยวชาญ JP VISUAL DOCS
                พร้อมวางโครงสร้างให้คุณทันที
              </p>
            </article>

            {/* ⚡ RIGHT: INTERACTIVE_PANEL */}
            <nav className="relative z-10 flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
              {/* PRIMARY_ACTION: Link ไปยังหน้า Contact */}
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

              {/* SECONDARY_ACTIONS: Social Links */}
              <div className="grid flex-1 grid-cols-2 gap-4">
                <a
                  href={siteConfig.social.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-slate-700 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-blue-500 hover:bg-blue-600/10"
                >
                  <MessageSquare size={16} className="text-blue-500" />{" "}
                  LINE_SYNC
                </a>

                {/* 🛡️ FIX: ตรวจสอบ property ให้ตรงกับ siteConfig interface */}
                <a
                  href={`tel:${siteConfig.author.contacts.phone}`}
                  className="flex items-center justify-center gap-3 border border-slate-700 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:border-blue-500 hover:bg-blue-600/10"
                >
                  <Phone size={16} className="text-blue-500" /> VOICE_CALL
                </a>
              </div>
            </nav>
          </div>

          {/* 🏁 BOTTOM_TRUST_FOOTER */}
          <footer className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-slate-800 pt-10">
            <div className="flex items-center gap-3 transition-colors hover:text-white">
              <FileText size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Fixed_Price_No_Hidden_Cost
              </span>
            </div>
            {/* ... สถานะอื่นๆ ... */}
          </footer>
        </div>
      </div>
    </section>
  )
}
