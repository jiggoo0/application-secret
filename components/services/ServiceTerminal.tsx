/** @format */
"use client"

import React from "react"
import { ArrowRight, Terminal } from "lucide-react"

/**
 * ServiceTerminal Component
 * ส่วนท้ายของ Service Grid สำหรับรับงาน Custom Logic
 * ออกแบบให้เหมือนหน้าจอ Terminal เพื่อสื่อถึง "การแก้ปัญหาเฉพาะทาง"
 */
export const ServiceTerminal: React.FC = () => {
  const handleCustomInquiry = () => {
    const message = encodeURIComponent(
      "[System_Override]: ต้องการส่งคำสั่งงาน Custom Logic / เคสพิเศษ"
    )
    window.open(`https://line.me/ti/p/@yourid?text=${message}`, "_blank")
  }

  return (
    <div className="group relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-slate-900 p-12 text-center text-white">
      {/* 🧩 VISUAL_CORE: Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 transition-opacity group-hover:opacity-20" />

      {/* 📡 SIGNAL_DECOR: แถบสถานะด้านข้าง */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-600 to-transparent" />

      <div className="relative z-10">
        {/* Terminal Icon Decor */}
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-blue-600/30 bg-blue-600/10 text-blue-500">
          <Terminal size={28} className="animate-pulse" />
        </div>

        <div className="mx-auto mb-8 h-[2px] w-12 bg-blue-600" />

        <h3 className="mb-6 text-3xl font-black uppercase leading-none tracking-tighter md:text-4xl">
          Need_Custom <br />
          <span className="text-blue-500">Logic?</span>
        </h3>

        <p className="mx-auto mb-10 max-w-[280px] text-xs font-bold uppercase leading-relaxed tracking-[0.2em] text-slate-400">
          หากโจทย์ของคุณไม่ตรงกับ Payload มาตรฐาน
          <br />
          <span className="text-slate-200">
            ส่งคำสั่งงานสายตรงเพื่อประเมินราคาพิเศษ
          </span>
        </p>

        <button
          onClick={handleCustomInquiry}
          className="group relative flex items-center gap-4 overflow-hidden border-2 border-blue-600 px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 transition-all hover:bg-blue-600 hover:text-white"
        >
          {/* Hover Slide Effect */}
          <span className="relative z-10 flex items-center gap-4">
            Execute_Inquiry
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-2"
            />
          </span>
        </button>

        {/* 📟 SYSTEM_FOOTER: รายละเอียดทางเทคนิคเล็กๆ */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-500" />
            <span className="text-[8px] font-black tracking-[0.3em]">
              ENCRYPTED
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <span className="text-[8px] font-black tracking-[0.3em]">
              DIRECT_ACCESS
            </span>
          </div>
        </div>
      </div>

      {/* 📐 CORNER_LABELS: ป้ายกำกับมุม */}
      <div className="absolute bottom-6 right-6 hidden opacity-20 md:block">
        <span className="font-mono text-[10px] tracking-tighter">
          REF_ID: CUSTOM_UNIT_v.08
        </span>
      </div>
    </div>
  )
}
