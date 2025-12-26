/** @format */
"use client"

import React from "react"
import { ArrowRight, Terminal, Cpu } from "lucide-react"
import { siteConfig } from "@/config/site"

/**
 * ServiceTerminal Component
 * ส่วนท้ายของ Service Grid สำหรับรับงาน Custom Logic
 * ออกแบบให้เหมือนหน้าจอ Terminal เพื่อสื่อถึง "การแก้ปัญหาเฉพาะทาง"
 */
export const ServiceTerminal: React.FC = () => {
  const handleCustomInquiry = () => {
    const message = encodeURIComponent(
      `[${siteConfig.system.status}]: ต้องการส่งคำสั่งงาน Custom Logic / เคสพิเศษพิเศษสำหรับ ${siteConfig.shortName}`
    )
    window.open(`${siteConfig.social.line}?text=${message}`, "_blank")
  }

  return (
    <div className="group relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden border-b border-r border-slate-800 bg-slate-900 p-12 text-center text-white">
      {/* 🧩 VISUAL_CORE: Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 transition-opacity group-hover:opacity-20" />

      {/* 📡 SIGNAL_DECOR: แถบสถานะด้านข้างและมุม */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-600 to-transparent" />
      <div className="absolute right-0 top-0 p-6 opacity-20">
        <Cpu size={24} className="text-blue-500" />
      </div>

      <div className="relative z-10">
        {/* Terminal Icon Decor */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-blue-600/30 bg-blue-600/10 text-blue-500 transition-all group-hover:scale-110 group-hover:border-blue-500">
          <Terminal size={32} className="animate-pulse" />
        </div>

        <div className="mx-auto mb-8 h-[2px] w-12 bg-blue-600" />

        <h3 className="mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-5xl">
          NEED_CUSTOM <br />
          <span className="text-blue-500">LOGIC?</span>
        </h3>

        <p className="mx-auto mb-10 max-w-[320px] text-[11px] font-bold uppercase leading-relaxed tracking-[0.25em] text-slate-400">
          หากโจทย์ของคุณไม่ตรงกับ{" "}
          <span className="italic text-blue-400">PAYLOAD</span> มาตรฐาน <br />
          <span className="text-slate-100">
            ส่งคำสั่งงานสายตรงเพื่อประเมินโครงสร้างพิเศษ
          </span>
        </p>

        <button
          onClick={handleCustomInquiry}
          className="group/btn relative flex items-center gap-6 overflow-hidden border-2 border-blue-600 bg-transparent px-12 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 transition-all hover:bg-blue-600 hover:text-white active:scale-95"
        >
          {/* Hover Slide Effect */}
          <span className="relative z-10 flex items-center gap-4">
            Execute_Inquiry
            <ArrowRight
              size={18}
              className="transition-transform group-hover/btn:translate-x-2"
            />
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
        </button>

        {/* 📟 SYSTEM_FOOTER: รายละเอียดทางเทคนิค */}
        <div className="mt-16 flex items-center justify-center gap-8 opacity-40">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="font-mono text-[9px] font-black tracking-[0.3em]">
              SECURE_LINK
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="font-mono text-[9px] font-black tracking-[0.3em]">
              DIRECT_COMMAND
            </span>
          </div>
        </div>
      </div>

      {/* 📐 CORNER_LABELS: ป้ายกำกับมุมแบบ Blueprint */}
      <div className="absolute bottom-8 right-8 hidden opacity-20 md:block">
        <div className="flex flex-col items-end font-mono text-[9px] leading-tight tracking-tighter">
          <span>
            {siteConfig.shortName}_REFSYS_{siteConfig.system.version}
          </span>
          <span>UNIT_CLASS: OVERRIDE_LOGIC</span>
        </div>
      </div>
    </div>
  )
}
