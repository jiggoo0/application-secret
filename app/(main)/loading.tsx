/** @format */
'use client'

import React, { useEffect, useState } from 'react'

/**
 * 🛰️ COMPONENT: GLOBAL_LOADING
 * PURPOSE: แสดงผลระหว่างการเปลี่ยนผ่านข้อมูล (Route Transitions)
 * STYLE: Industrial_Minimal_Terminal
 */
export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // ⚡ PROGRESS_EMULATION: จำลองการโหลดข้อมูลเข้าระบบ
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 15) // ปรับความเร็วให้กระชับขึ้นเล็กน้อย
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-6 selection:bg-[#FCDE09]">
      {/* 🧩 Background Technical Grid - ใช้ Inline style หาก tailwind config ยังไม่รองรับ blueprint-grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Upper Label: สื่อสารสถานะระบบ */}
        <div className="mb-4 flex items-end justify-between">
          <div className="space-y-1">
            <span className="block font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#020617]">
              System_Initializing
            </span>
            <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
              Establishing_Secure_Connection...
            </span>
          </div>
          {/* ✅ FIXED: เปลี่ยนสี brand เป็น #FCDE09 เพื่อความชัดเจน */}
          <span className="font-mono text-2xl font-black italic text-[#FCDE09] drop-shadow-[1px_1px_0px_#020617]">
            {progress}%
          </span>
        </div>

        {/* Progress Track: แถบสถานะแบบ High-Contrast */}
        <div className="relative h-[2px] w-full overflow-hidden bg-slate-100">
          <div
            className="absolute left-0 top-0 h-full bg-[#020617] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Lower Metadata: ข้อมูลเชิงเทคนิคเสริมความน่าเชื่อถือ */}
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <div className="h-1 w-1 animate-ping bg-[#FCDE09]" />
            <span className="font-mono text-[7px] font-bold uppercase text-slate-500">
              Boutique_Registry_V3.3.2025
            </span>
          </div>
          <span className="font-mono text-[7px] font-bold uppercase text-slate-500">
            © 2025_OP_CORE
          </span>
        </div>
      </div>
    </div>
  )
}
