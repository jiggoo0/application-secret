/** @format */

'use client'

import React from 'react'
import { Shield, Globe, Award, Activity } from 'lucide-react'

/**
 * 🛰️ COMPONENT: TRUST_PARTNER
 * @description แสดงข้อมูลยืนยันความเชื่อถือและเครือข่ายความร่วมมือ
 * ✅ FIXED: ESLint error - ย้ายคอมเมนต์ออกจาก JSX text nodes
 * ✅ IMPROVED: ปรับ Contrast ของสีตัวอักษรและพื้นหลังให้คมชัดขึ้น
 */
export const TrustPartner = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-28 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 Blueprint Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* --- SECTION 01: PERFORMANCE_STATS --- */}
        <div className="mb-32 grid grid-cols-2 gap-y-16 lg:grid-cols-4 lg:gap-12">
          {[
            {
              label: 'Success_Rate',
              value: '98.7',
              unit: '%',
              icon: Shield,
              detail: 'Verified Documentation Protocol',
            },
            {
              label: 'Case_Management',
              value: '4.5k',
              unit: '+',
              icon: Activity,
              detail: 'Global Live Monitoring',
            },
            {
              label: 'Expert_Verified',
              value: '12',
              unit: 'EXP',
              icon: Award,
              detail: 'Senior Document Architects',
            },
            {
              label: 'Global_Points',
              value: '120',
              unit: '+',
              icon: Globe,
              detail: 'Inter-Connect Network',
            },
          ].map((stat, idx) => (
            <div key={`stat-${idx}`} className="group relative">
              {/* Icon Container: Sharp Square Design */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#020617] text-[#FCDE09] shadow-sharp transition-all duration-300 group-hover:shadow-none">
                  <stat.icon size={16} strokeWidth={2.5} />
                </div>
                {/* ✅ แก้ไข: ปรับจาก slate-400 เป็น slate-500 เพื่อความชัดเจน */}
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  {stat.label}
                </span>
              </div>

              {/* Data Display */}
              <div className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter text-[#020617] transition-transform duration-500 group-hover:translate-x-1 md:text-7xl">
                    {stat.value}
                  </span>
                  <span className="text-xl font-black text-[#FCDE09]">{stat.unit}</span>
                </div>

                {/* Technical Meta Data */}
                {/* ✅ แก้ไข: ปรับจาก slate-400 เป็น slate-600 และจัดการคอมเมนต์ // ใหม่ */}
                <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  <span className="font-black text-[#FCDE09]">{'//'}</span> {stat.detail}
                </p>

                {/* Progress Indicator */}
                <div className="mt-6 h-[2px] w-full overflow-hidden bg-slate-100">
                  <div className="h-full w-0 bg-[#020617] transition-all duration-1000 ease-out group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 02: PARTNER_NETWORK --- */}
        <div className="relative border-t border-slate-200 pt-24">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:justify-between">
            <div className="max-w-xs shrink-0 text-center lg:text-left">
              <div className="mb-4 inline-block bg-[#020617] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                NETWORK_REGISTRY
              </div>
              {/* ✅ แก้ไข: ปรับจาก slate-500 เป็น slate-600 เพื่อให้อ่านภาษาไทยออกง่ายขึ้น */}
              <p className="font-thai text-sm font-bold leading-relaxed text-slate-600">
                ประสานงานผ่านช่องทางที่ได้รับความเชื่อถือ <br />
                <span className="text-[#020617]">เพื่อความแม่นยำและมาตรฐานสูงสุด</span>
              </p>
            </div>

            {/* Partner Display: Minimal & Authorized */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 opacity-50 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0 lg:gap-x-16">
              {['VFS_GLOBAL', 'TLS_CONTACT', 'GOV_GATEWAY', 'INTER_LEGAL'].map((logo) => (
                <div key={logo} className="group cursor-default">
                  <span className="font-mono text-2xl font-black uppercase italic tracking-tighter text-slate-900 transition-all duration-300 group-hover:tracking-normal group-hover:text-[#FCDE09]">
                    {logo}
                  </span>
                  <div className="mt-1 h-0.5 w-0 bg-[#020617] transition-all duration-300 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Architecture */}
      <div className="absolute left-0 top-0 h-10 w-[2px] bg-gradient-to-b from-[#FCDE09] to-transparent" />
      <div className="absolute bottom-0 right-0 h-10 w-[2px] bg-gradient-to-t from-[#FCDE09] to-transparent" />
    </section>
  )
}
