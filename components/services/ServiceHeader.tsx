/** @format */
"use client"

import React from "react"
import { ShieldAlert, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/config/site"

/**
 * ServiceHeader Component
 * ----------------------------------------------------------------
 * ออกแบบด้วยสไตล์ Architectural Manifesto (พิมพ์เขียวสถาปัตยกรรม)
 * เน้นการแสดงสถานะความปลอดภัยและความแม่นยำของระบบ
 */
export const ServiceHeader: React.FC = () => {
  return (
    <div className="mb-20 flex flex-col items-end justify-between border-b-4 border-slate-900 pb-10 md:flex-row">
      {/* ─── LEFT_SIDE: IDENTITY & TITLE ─── */}
      <div className="w-full max-w-2xl text-left">
        <div className="mb-6 flex items-center gap-3 text-blue-600">
          <div className="relative flex h-3 w-3">
            {/* ไฟกะพริบสถานะระบบ */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <ShieldAlert size={14} className="relative z-10" />
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
            Service_Payload_Manifest.{siteConfig.system.version}
          </span>
        </div>

        <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-slate-900 md:text-9xl">
          CORE <br />
          <span className="text-blue-600">
            ASSETS<span className="text-slate-900">.</span>
          </span>
        </h2>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[2px] w-16 bg-blue-600" />
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            Unit_Type:{" "}
            <span className="text-slate-900">PROFESSIONAL_SOLUTIONS</span>
          </p>
        </div>
      </div>

      {/* ─── RIGHT_SIDE: VERIFICATION SYSTEM ─── */}
      <div className="mt-12 text-right md:mt-0">
        <div className="mb-4 flex items-center justify-end gap-4 text-slate-900">
          <div className="flex flex-col items-end leading-none">
            <span className="mb-1 text-[12px] font-black uppercase tracking-widest">
              {siteConfig.system.status}
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-tighter text-blue-600">
              {siteConfig.system.label}
            </span>
          </div>
          {/* กรอบไอคอนสไตล์ Industrial พร้อมเงา Offset */}
          <div className="bg-slate-900 p-3 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
            <CheckCircle2 size={24} className="text-blue-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Security_Level:{" "}
            <span className="text-slate-900">Class_A_Encrypted</span>
          </p>

          {/* แถบ Visual Data (ประดับเพื่อความขลัง) */}
          <div className="flex justify-end gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-4 transition-colors duration-500 ${
                  i > 4 ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
