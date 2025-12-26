/** @format */
"use client"

import React from "react"
import { ShieldAlert, CheckCircle2 } from "lucide-react"

/**
 * ServiceHeader Component
 * ออกแบบด้วยสไตล์ Architectural Manifesto
 * เน้นการแสดงสถานะระบบ (System Status) และความน่าเชื่อถือระดับสูง
 */
export const ServiceHeader: React.FC = () => {
  return (
    <div className="mb-20 flex flex-col items-end justify-between border-b-2 border-slate-900 pb-10 md:flex-row">
      {/* 🛠️ LEFT_SIDE: Identity & Title */}
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-2 text-blue-600">
          <ShieldAlert size={18} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Service_Payload_Manifest.v8
          </span>
        </div>

        <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 md:text-8xl">
          CORE <br />
          <span className="text-blue-600">ASSETS.</span>
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-slate-300" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Unit_Type: Professional_Documentation
          </p>
        </div>
      </div>

      {/* 📊 RIGHT_SIDE: Verification Status */}
      <div className="mt-8 text-right md:mt-0">
        <div className="mb-2 flex items-center justify-end gap-3 text-slate-900">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-black uppercase leading-none tracking-widest">
              System_Verified
            </span>
            <span className="text-[9px] font-medium uppercase tracking-tighter text-blue-600">
              Ready_for_Execution
            </span>
          </div>
          <div className="bg-slate-900 p-2 shadow-lg">
            <CheckCircle2 size={20} className="text-blue-500" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Security_Level: <span className="text-slate-900">Class_A</span>
          </p>
          {/* Visual Data Encryption Decors */}
          <div className="flex justify-end gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 w-3 bg-slate-100 last:bg-blue-600" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
