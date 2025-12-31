/** @format */
'use client'

import React, { useEffect, useState } from 'react'

/**
 * 🛰️ COMPONENT: GLOBAL_LOADING
 * PURPOSE: แสดงหน้าจอระหว่างการเปลี่ยนเส้นทางของระบบ
 * STYLE: Industrial_Minimal_Terminal
 *
 * [AI_NOTE]
 * - แก้ข้อความทั้งหมดให้เป็นภาษาไทย อ่านตรง ชัด ไม่ใช้คำเชิง AI
 * - ตัดโหมดทดสอบ ไม่มี mock / demo
 * - ใช้เป็น loading.tsx สำหรับ Route Transition โดยตรง
 */
export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 15)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-6 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* ฉากหลัง Grid เชิงเทคนิค */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* สถานะระบบ */}
        <div className="mb-4 flex items-end justify-between">
          <div className="space-y-1">
            <span className="block font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#020617]">
              กำลังเตรียมระบบ
            </span>
            <span className="block font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
              เชื่อมต่อระบบอย่างปลอดภัย
            </span>
          </div>

          <span className="font-mono text-2xl font-black italic text-[#FCDE09] drop-shadow-[1px_1px_0px_#020617]">
            {progress}%
          </span>
        </div>

        {/* แถบความคืบหน้า */}
        <div className="relative h-[2px] w-full overflow-hidden bg-slate-100">
          <div
            className="absolute left-0 top-0 h-full bg-[#020617] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ข้อมูลระบบ */}
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 animate-ping bg-[#FCDE09]" />
            <span className="font-mono text-[7px] font-bold uppercase text-slate-500">
              ระบบเอกสารควบคุมภายใน
            </span>
          </div>
          <span className="font-mono text-[7px] font-bold uppercase text-slate-500">
            © 2025 JP Visual Docs
          </span>
        </div>
      </div>
    </div>
  )
}
