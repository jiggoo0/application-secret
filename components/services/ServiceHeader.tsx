/** * @format
 * @description SERVICE_HEADER: Industrial Infrastructure Interface (V2.6.1)
 * ✅ FIXED: Removed unused 'cn' to eliminate lint errors
 * ✅ REFINED: Font mapping to IBM Plex Sans Thai
 */

import React from 'react'
// 🛡️ REMOVED: import { cn } from '@/lib/utils' (เพื่อกำจัด Error: 'cn' is defined but never used)

export const ServiceHeader = () => (
  <header className="relative mb-40 max-w-7xl selection:bg-brand selection:text-slate-950">
    {/* 🧩 SYSTEM_ID_BADGE */}
    <div className="mb-16 inline-flex flex-wrap items-center gap-8">
      <div className="hover:shadow-brand-glow shadow-sharp group relative flex items-center gap-5 bg-slate-950 px-8 py-4 transition-all hover:-translate-x-1 hover:-translate-y-1">
        <div className="relative flex h-3 w-3 items-center justify-center">
          <div className="absolute h-full w-full animate-ping bg-brand/40" />
          <div className="h-2 w-2 bg-brand" />
        </div>
        <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-brand">
          OPERATION_MATRIX_V2.6
        </span>
      </div>

      <div className="hidden font-mono text-[10px] font-black tracking-widest text-slate-300 lg:block">
        <span className="text-slate-200">{'//'} ST_ID:</span> 0x889_PROTOCOL
        <span className="mx-4 text-slate-100">|</span>
        STATUS:{' '}
        <span className="animate-pulse uppercase italic text-emerald-500 underline underline-offset-4">
          Verified_Secure
        </span>
      </div>
    </div>

    {/* 🖋️ MAIN_TITLE */}
    <h2 className="mb-20 text-7xl font-black uppercase leading-[0.8] tracking-tighter text-slate-950 md:text-[11.5rem] lg:text-[13rem]">
      Integrated <br />
      <span className="relative z-10 inline-block italic text-brand">
        Infrastructure.
        <span className="absolute -bottom-4 left-0 -z-10 h-[32%] w-[105%] bg-slate-950 shadow-sharp-sm md:-bottom-6" />
      </span>
    </h2>

    {/* 📖 DESCRIPTION_BLOCK */}
    <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-12">
      <div className="border-l-[8px] border-brand pl-12 lg:col-span-8">
        <p className="font-sans text-3xl font-black leading-[1.3] text-slate-900 md:text-5xl">
          โครงสร้างการจัดการเอกสารยุคใหม่
          <br className="hidden lg:block" />
          ผสานกลยุทธ์
          <span className="relative ml-2 inline-block px-3 text-slate-950">
            <span className="relative z-10">การวิเคราะห์ข้อมูลระดับสูง</span>
            <span className="absolute bottom-1 left-0 -z-10 h-5 w-full skew-x-[-12deg] bg-brand" />
          </span>
          <br /> และมาตรฐานสากล
        </p>
      </div>

      {/* 📊 TECHNICAL_TELEMETRY */}
      <div className="flex flex-col justify-end pt-6 lg:col-span-4 lg:pt-0">
        <div className="space-y-4 font-mono text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">
          <div className="flex justify-between border-b-2 border-slate-100 pb-3 transition-colors hover:border-brand/40">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 bg-slate-200" /> [ Protocol ]
            </span>
            <span className="font-black text-slate-950">Active_Sync</span>
          </div>
          <div className="flex justify-between border-b-2 border-slate-100 pb-3 transition-colors hover:border-brand/40">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 bg-slate-200" /> [ Security ]
            </span>
            <span className="font-black text-slate-950">Tier_04_Audit</span>
          </div>
          <div className="flex justify-between bg-slate-950 p-3 text-brand shadow-sharp-sm">
            <span>[ Accuracy ]</span>
            <span className="animate-pulse tracking-tighter">99.98%_ACC</span>
          </div>
        </div>
      </div>
    </div>

    {/* 🧩 UI_TERMINATOR */}
    <div className="mt-28 flex items-center gap-6">
      <div className="h-[3px] w-32 bg-slate-950" />
      <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-950 via-slate-200 to-transparent" />
      <div className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-200">
        END_HEADER_REF
      </div>
    </div>
  </header>
)
