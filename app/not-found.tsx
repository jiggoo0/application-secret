/** * @format
 * @description NOT_FOUND_PAGE: System Resource Retrieval Failure (V2.9.5)
 * ✅ ENFORCEMENT: Industrial HUD Interface, Command-Line Aesthetics, Sharp Recovery Path
 */

import React from 'react'
import Link from 'next/link'
import { Terminal, AlertTriangle, ChevronRight, Home, Activity } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white selection:bg-brand selection:text-slate-950">
      {/* 🧩 BLUEPRINT_CANVAS: ลายเส้นตารางทางวิศวกรรม */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      {/* 📡 SCANLINE_EFFECT: เอฟเฟกต์จอ Terminal */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%]" />

      <div className="container relative z-10 max-w-2xl px-6 text-center">
        {/* --- 📟 ERROR_INTERFACE_HEAD --- */}
        <div className="mb-12 inline-flex flex-col items-center">
          <div className="relative mb-8 h-24 w-24">
            {/* Background Sharp Box */}
            <div className="absolute inset-0 rotate-45 border-2 border-slate-950 bg-white" />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 shadow-sharp-brand transition-transform hover:scale-110">
              <AlertTriangle className="text-brand" size={42} strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-slate-950 px-4 py-1.5">
              <Activity className="animate-pulse text-brand" size={12} />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
                Protocol_Error: 404_NOT_FOUND
              </span>
            </div>
            <h1 className="text-7xl font-black uppercase italic leading-none tracking-tighter text-slate-950 md:text-9xl">
              Lost <br />
              <span className="text-slate-200 transition-colors group-hover:text-brand">Node.</span>
            </h1>
          </div>
        </div>

        {/* --- 🛰️ SYSTEM_LOG_TERMINAL --- */}
        <div className="relative mb-12 overflow-hidden border-2 border-slate-950 bg-slate-50 p-8 text-left md:p-10">
          <div className="absolute -right-4 -top-4 rotate-12 opacity-[0.03]">
            <Terminal size={180} />
          </div>

          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                System_Diagnostic_Log
              </p>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-none bg-slate-200" />
                <div className="h-2 w-2 rounded-none bg-slate-200" />
                <div className="h-2 w-2 rounded-none bg-brand" />
              </div>
            </div>

            <div className="space-y-3 font-mono text-[13px] leading-relaxed text-slate-600">
              <p className="flex items-start gap-3">
                <span className="select-none font-black text-brand">{'>'}</span>
                <span>
                  [ERROR]: ทรัพยากรที่ร้องขอถูกย้ายหรือไม่มีอยู่ในศูนย์ข้อมูล
                  (Null_Pointer_Exception)
                </span>
              </p>
              <p className="flex items-start gap-3 italic">
                <span className="select-none font-black text-brand">{'>'}</span>
                <span>
                  กรุณาตรวจสอบเส้นทางเชื่อมต่อ หรือใช้ฟังก์ชันการกู้คืนด้านล่างเพื่อกลับสู่ระบบ
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* --- 🕹️ RECOVERY_COMMANDS --- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-4 bg-slate-950 py-5 text-white transition-all hover:bg-brand hover:text-slate-950 active:scale-95"
          >
            <Home size={18} />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em]">
              Initialize_Home
            </span>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-white/20 transition-all group-hover:w-full" />
          </Link>

          <Link
            href="/assessment"
            className="group flex items-center justify-center gap-4 border-2 border-slate-950 bg-white py-5 transition-all hover:bg-slate-50 active:scale-95"
          >
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
              New_Assessment
            </span>
            <ChevronRight
              size={18}
              className="text-slate-400 transition-transform group-hover:translate-x-2 group-hover:text-slate-950"
            />
          </Link>
        </div>

        {/* --- 📑 FOOTNOTE --- */}
        <div className="mt-20 flex flex-col items-center gap-4 opacity-40 transition-opacity hover:opacity-100">
          <div className="h-[1px] w-24 bg-slate-200" />
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.6em] text-slate-500">
            Jp_Visual_Operational_Excellence // DAP_v2.9.5
          </p>
        </div>
      </div>
    </div>
  )
}
