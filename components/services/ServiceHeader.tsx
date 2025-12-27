/** @format */
"use client"

import React from "react"
import { ShieldAlert, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/config/site"

/**
 * 🛰️ SERVICE_HEADER_COMPONENT
 * ----------------------------------------------------------------
 * ออกแบบด้วยสไตล์ Architectural Manifesto (พิมพ์เขียวสถาปัตยกรรม)
 * เน้นการแสดงสถานะความปลอดภัยและความแม่นยำของระบบ
 */
export const ServiceHeader: React.FC = () => {
  return (
    <div className="mb-20 flex flex-col items-end justify-between border-b-4 border-industrial-dark pb-10 md:flex-row">
      {/* ─── LEFT_SIDE: IDENTITY & TITLE ─── */}
      <div className="w-full max-w-2xl text-left">
        <div className="mb-6 flex items-center gap-3 text-brand">
          <div className="relative flex h-3 w-3">
            {/* ✅ SYSTEM_PULSE: ไฟกะพริบสถานะระบบ (สี Brand) */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75"></span>
            <ShieldAlert size={14} className="relative z-10" />
          </div>
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
            Service_Payload_Manifest.v{siteConfig.system.version}
          </span>
        </div>

        <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter text-industrial-dark md:text-9xl dark:text-white">
          CORE <br />
          <span className="text-brand">
            ASSETS
            <span className="text-industrial-dark dark:text-white">.</span>
          </span>
        </h2>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[2px] w-16 bg-brand" />
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-industrial-gray">
            Unit_Type:{" "}
            <span className="text-industrial-dark dark:text-white">
              PROFESSIONAL_SOLUTIONS
            </span>
          </p>
        </div>
      </div>

      {/* ─── RIGHT_SIDE: VERIFICATION SYSTEM ─── */}
      <div className="mt-12 text-right md:mt-0">
        <div className="mb-4 flex items-center justify-end gap-4">
          <div className="flex flex-col items-end leading-none">
            <span className="mb-1 text-[12px] font-black uppercase tracking-widest text-industrial-dark dark:text-white">
              {siteConfig.system.status}
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-tighter text-brand">
              {siteConfig.system.label}
            </span>
          </div>

          {/* ✅ INDUSTRIAL_ICON_BOX: กรอบไอคอนพร้อมเงา Offset สไตล์ Blueprint */}
          <div className="bg-industrial-dark p-3 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-transform hover:-translate-x-1 hover:-translate-y-1">
            <CheckCircle2 size={24} className="text-brand" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] font-black uppercase tracking-widest text-industrial-gray">
            Security_Level:{" "}
            <span className="text-industrial-dark dark:text-white">
              Class_A_Encrypted
            </span>
          </p>

          {/* ✅ DATA_VISUALIZER: แถบสถานะจำลอง (Visual Data) */}
          <div className="flex justify-end gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-4 transition-all duration-500 ${
                  i < 5
                    ? "bg-brand shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                    : "bg-industrial-surface"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
