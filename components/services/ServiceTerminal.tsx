/** @format */
"use client"

import React from "react"
import { ArrowRight, Terminal, Cpu } from "lucide-react"
import { siteConfig } from "@/config/site"

/**
 * 🛰️ SERVICE_TERMINAL_COMPONENT
 * ส่วนท้ายของ Service Grid สำหรับรับงาน Custom Logic / เคสพิเศษ
 * ออกแบบให้เหมือนหน้าจอ Command Center เพื่อสื่อถึง "การแก้ปัญหาเฉพาะทาง"
 */
export const ServiceTerminal: React.FC = () => {
  const handleCustomInquiry = () => {
    const message = encodeURIComponent(
      `[${siteConfig.system.status}]: ต้องการส่งคำสั่งงาน Custom Logic / เคสพิเศษสำหรับ ${siteConfig.shortName}`
    )
    window.open(`${siteConfig.social.line}?text=${message}`, "_blank")
  }

  return (
    <div className="group relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden border border-industrial-border bg-industrial-black p-12 text-center text-white">
      {/* 🧩 VISUAL_CORE: Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#facc15_0.5px,transparent_0.5px)] bg-[size:32px_32px] opacity-5 transition-opacity group-hover:opacity-10" />

      {/* 📡 SIGNAL_DECOR: แถบสถานะด้านข้างและมุม */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-brand to-transparent" />
      <div className="absolute right-0 top-0 p-8 opacity-20">
        <Cpu size={24} className="text-brand" />
      </div>

      <div className="relative z-10">
        {/* Terminal Icon Decor */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-brand/20 bg-brand/5 text-brand transition-all duration-500 group-hover:scale-110 group-hover:border-brand group-hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]">
          <Terminal size={36} className="animate-pulse" />
        </div>

        <div className="mx-auto mb-10 h-[2px] w-16 bg-brand shadow-[0_0_10px_#facc15]" />

        <h3 className="mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
          NEED_CUSTOM <br />
          <span className="text-brand">LOGIC?</span>
        </h3>

        <p className="mx-auto mb-12 max-w-[360px] font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.3em] text-industrial-gray">
          หากโจทย์ของคุณไม่ตรงกับ{" "}
          <span className="italic text-brand/80">PAYLOAD</span> มาตรฐาน <br />
          <span className="text-white opacity-80">
            ส่งคำสั่งงานสายตรงเพื่อประเมินโครงสร้างพิเศษ
          </span>
        </p>

        <button
          onClick={handleCustomInquiry}
          className="group/btn relative flex items-center gap-6 overflow-hidden border-2 border-brand bg-transparent px-14 py-6 text-[11px] font-black uppercase tracking-[0.5em] text-brand shadow-sharp transition-all hover:bg-brand hover:text-black active:scale-95"
        >
          {/* Hover Slide Effect */}
          <span className="relative z-10 flex items-center gap-4">
            Execute_Inquiry
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/btn:translate-x-2"
            />
          </span>
          {/* Scanline Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </button>

        {/* 📟 SYSTEM_FOOTER: รายละเอียดทางเทคนิค */}
        <div className="mt-20 flex items-center justify-center gap-10 opacity-40">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-status-success shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[8px] font-black tracking-[0.4em]">
              SECURE_LINK
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#facc15]" />
            <span className="font-mono text-[8px] font-black tracking-[0.4em]">
              DIRECT_COMMAND
            </span>
          </div>
        </div>
      </div>

      {/* 📐 CORNER_LABELS: ป้ายกำกับมุมแบบ Blueprint */}
      <div className="absolute bottom-8 right-8 hidden opacity-20 md:block">
        <div className="flex flex-col items-end font-mono text-[8px] leading-tight tracking-[0.1em]">
          <span>
            {siteConfig.shortName}_REFSYS_V{siteConfig.system.version}
          </span>
          <span className="text-brand">UNIT_CLASS: OVERRIDE_LOGIC</span>
        </div>
      </div>
    </div>
  )
}
