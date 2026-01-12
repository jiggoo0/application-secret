/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.941Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: loading          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import { useEffect, useState } from 'react'

/**
 * GLOBAL_LOADING — JP-VISUALDOCS
 * ---------------------------------------------------------------
 * - ใช้เป็น loading.tsx สำหรับ Route Transition
 * - โทน Industrial / Document-first
 * - ใช้ CSS Variables จาก globals.css เท่านั้น
 * - ไม่มี mock / demo / ข้อความเชิง AI
 */
export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((v) => (v < 100 ? v + 1 : 100))
    }, 15)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] antialiased">
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm px-6">
        {/* STATUS HEADER */}
        <div className="mb-4 flex items-end justify-between">
          <div className="space-y-1">
            <span className="block font-mono text-[10px] font-bold tracking-[0.28em]">
              กำลังเตรียมระบบ
            </span>
            <span className="block font-mono text-[8px] tracking-widest text-[var(--muted-foreground)]">
              ตรวจสอบและเชื่อมต่อข้อมูล
            </span>
          </div>

          <span className="font-mono text-2xl font-black italic text-[var(--accent)]">
            {progress}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative h-[2px] w-full overflow-hidden bg-[var(--border)]">
          <div
            className="absolute left-0 top-0 h-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: 'var(--foreground)',
            }}
          />
        </div>

        {/* FOOTER INFO */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 animate-ping" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="font-mono text-[7px] tracking-widest text-[var(--muted-foreground)]">
              ระบบเอกสารควบคุมภายใน
            </span>
          </div>

          <span className="font-mono text-[7px] tracking-widest text-[var(--muted-foreground)]">
            © 2025 JP Visual Docs
          </span>
        </div>
      </div>
    </div>
  )
}
