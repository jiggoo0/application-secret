/** @format */
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Cpu, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 🛰️ SYSTEM_ERROR_404_PROTOCOL
 * หน้าแจ้งเตือนไม่พบทรัพยากรในระบบ สไตล์ Industrial Sharp
 */
export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [systemId, setSystemId] = useState("")

  useEffect(() => {
    // ✅ แก้ไข: เลื่อนการอัปเดตสถานะด้วย requestAnimationFrame
    // เพื่อป้องกัน Cascading Renders ตามมาตรฐาน React Strict Mode
    const frameId = requestAnimationFrame(() => {
      setMounted(true)
      const generatedId = Math.random().toString(36).substring(7).toUpperCase()
      setSystemId(generatedId)
    })

    return () => cancelAnimationFrame(frameId)
  }, [])

  // 🔒 PRE-RENDER_LOCK: ป้องกัน Hydration Mismatch
  if (!mounted) return null

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-industrial-black p-6 font-sans text-industrial-soft">
      {/* 🧩 BLUEPRINT_GRID_BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* 🛠️ TERMINAL_CONTAINER */}
        <div className="border border-industrial-border bg-industrial-dark/80 shadow-blueprint backdrop-blur-md">
          {/* HEADER_BAR */}
          <div className="flex items-center justify-between border-b border-industrial-border bg-industrial-surface/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-brand" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                System_Diagnostics
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-industrial-border" />
              <div className="h-2 w-2 rounded-full bg-industrial-border" />
              <div className="bg-status-error h-2 w-2 animate-pulse rounded-full" />
            </div>
          </div>

          {/* CONTENT_AREA */}
          <div className="p-8 md:p-12">
            <div className="mb-8 flex items-start gap-6">
              <div className="bg-status-error/10 text-status-error flex h-16 w-16 shrink-0 items-center justify-center">
                <AlertTriangle size={40} />
              </div>
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white md:text-7xl">
                  404<span className="text-brand">.</span>
                </h1>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-brand">
                  Requested_Resource_Not_Found
                </p>
              </div>
            </div>

            <div className="space-y-4 border-l-2 border-industrial-border pl-6 font-mono text-sm leading-relaxed">
              <p className="text-industrial-gray">
                &gt; ERROR_CODE:{" "}
                <span className="text-white">ERR_RESOURCE_MISSING</span>
              </p>
              <p className="text-industrial-gray">
                &gt; SYSTEM_ID: <span className="text-brand">{systemId}</span>
              </p>
              <p className="italic text-industrial-gray">
                &gt; ทางระบบไม่พบหน้าที่ท่านกำลังค้นหา กรุณาตรวจสอบ URL
                หรือกลับเข้าสู่โปรโตคอลหลัก
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className={cn(
                  "group flex items-center justify-center gap-3 bg-brand px-8 py-4",
                  "text-xs font-black uppercase tracking-[0.2em] text-white transition-all",
                  "shadow-sharp hover:bg-brand-dark active:scale-95"
                )}
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back_to_System
              </Link>
            </div>
          </div>

          {/* FOOTER_INFO */}
          <div className="flex items-center justify-between border-t border-industrial-border bg-industrial-surface/30 px-6 py-4">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-industrial-gray">
              <Cpu size={12} />
              <span>LOGS_STAMP: {new Date().toISOString()}</span>
            </div>
            <div className="h-1.5 w-24 bg-industrial-border/30">
              <div className="h-full w-1/3 animate-shimmer-run bg-brand" />
            </div>
          </div>
        </div>

        {/* DECORATIVE_GEOMETRY */}
        <div className="absolute -left-4 -top-4 h-12 w-12 border-l-2 border-t-2 border-brand/30" />
        <div className="absolute -bottom-4 -right-4 h-12 w-12 border-b-2 border-r-2 border-brand/30" />
      </div>
    </main>
  )
}
