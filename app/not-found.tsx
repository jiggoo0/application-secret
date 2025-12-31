/** @format */

import React from 'react'
import Link from 'next/link'
import { Terminal, AlertTriangle, ChevronRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* 🧩 Blueprint Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 max-w-2xl px-6 text-center">
        {/* 📟 ERROR_INTERFACE */}
        <div className="mb-12 inline-flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center bg-slate-950 shadow-sharp-brand">
            <AlertTriangle className="text-brand" size={40} strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <span className="bg-slate-950 px-2 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-brand">
              Error_Code: 404
            </span>
            <h1 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-8xl">
              Lost <span className="not-italic text-brand">Node.</span>
            </h1>
          </div>
        </div>

        {/* 🛰️ SYSTEM_MESSAGE */}
        <div className="relative mb-12 overflow-hidden border border-slate-100 bg-slate-50 p-8 text-left">
          <div className="absolute right-0 top-0 p-4 opacity-5">
            <Terminal size={100} />
          </div>

          <div className="relative z-10 space-y-4 font-mono text-xs">
            <p className="flex items-center gap-2 text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              STATUS: RESOURCE_NOT_FOUND
            </p>
            <p className="leading-relaxed text-slate-600">
              [SYSTEM_ALERT]: เส้นทางที่คุณพยายามเข้าถึงไม่ได้รับการลงทะเบียนในศูนย์ข้อมูลของเรา
              กรุณาตรวจสอบ URL อีกครั้งหรือกลับไปที่ศูนย์ปฏิบัติการหลัก
            </p>
          </div>
        </div>

        {/* 🕹️ NAVIGATION_RECOVERY */}
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-3 bg-slate-950 px-8 py-4 text-white transition-all hover:bg-brand hover:text-slate-950 active:scale-95 md:w-auto"
          >
            <Home size={18} />
            <span className="font-mono text-xs font-black uppercase tracking-widest">
              Return_Home
            </span>
          </Link>

          <Link
            href="/assessment"
            className="group flex w-full items-center justify-center gap-3 border border-slate-200 px-8 py-4 transition-all hover:border-slate-950 md:w-auto"
          >
            <span className="font-mono text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950">
              Start_Assessment
            </span>
            <ChevronRight
              size={18}
              className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-950"
            />
          </Link>
        </div>

        {/* 📑 FOOTNOTE */}
        <p className="mt-16 font-mono text-[8px] uppercase tracking-[0.5em] text-slate-400 opacity-50">
          Operational_Excellence_System // V2.9.5
        </p>
      </div>
    </div>
  )
}
