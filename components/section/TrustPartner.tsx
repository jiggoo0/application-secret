/** * @format
 * @description TRUST_PARTNER: The Verification Layer (Clean Build V2.6.1)
 * ✅ FIXED: Removed unused 'cn' to pass system lint
 * ✅ OPTIMIZED: Font mapping for maximum clarity
 */

'use client'

import React from 'react'
import { Shield, Globe, Award, Users } from 'lucide-react'
// 🛡️ REMOVED: import { cn } from '@/lib/utils' (เพื่อกำจัด Lint Error)

const stats = [
  {
    label: 'Success_Rate',
    value: '98.7%',
    icon: Shield,
    detail: 'Embassy-Grade Verified',
  },
  {
    label: 'Cases_Processed',
    value: '4,500+',
    icon: Globe,
    detail: 'Global Distribution',
  },
  {
    label: 'Expert_Engineers',
    value: '12',
    icon: Award,
    detail: 'Verified Specialists',
  },
  {
    label: 'Corporate_Clients',
    value: '120+',
    icon: Users,
    detail: 'Infrastructure Partners',
  },
]

const partners = [
  { name: 'P_01', logo: 'VFS_GLOBAL' },
  { name: 'P_02', logo: 'TLS_CONTACT' },
  { name: 'P_03', logo: 'GOV_GATEWAY' },
  { name: 'P_04', logo: 'INTER_LEGAL' },
  { name: 'P_05', logo: 'AMCHAM_TH' },
]

export const TrustPartner = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-32 selection:bg-brand selection:text-slate-950">
      {/* 🧩 BLUEPRINT_DECOR: กริตตารางจางพิเศษ 3% opacity */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 📊 PART 01: PERFORMANCE_TELEMETRY --- */}
        <div className="mb-32 grid grid-cols-2 gap-y-16 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={`stat-${idx}`}
              className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* 📟 Metric Label */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-slate-950">
                  <stat.icon
                    size={16}
                    strokeWidth={1.5}
                    className="text-slate-400 group-hover:text-inherit"
                  />
                </div>
                <div className="h-[1px] w-6 bg-slate-100 group-hover:bg-brand/40" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  {stat.label}
                </span>
              </div>

              {/* 📈 Value Output */}
              <div className="relative space-y-2">
                <h3 className="text-6xl font-black uppercase italic tracking-tighter text-slate-950 transition-all duration-500 group-hover:text-brand md:text-7xl">
                  {stat.value}
                </h3>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                  {`// STATUS: ${stat.detail}`}
                </p>
              </div>

              {/* Progress Line Decoration */}
              <div className="mt-8 h-[2px] w-full overflow-hidden bg-slate-50">
                <div className="h-full w-0 bg-brand transition-all duration-1000 ease-out group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* --- 🤝 PART 02: STRATEGIC_NETWORK_INTERFACE --- */}
        <div className="border-t border-slate-900 pt-28">
          <div className="flex flex-col items-center gap-20 lg:flex-row lg:justify-between">
            <div className="shrink-0 text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse bg-brand" />
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-slate-950">
                  Strategic_Network
                </span>
              </div>
              <p className="font-sans text-xl font-black leading-snug text-slate-500">
                เครือข่ายความร่วมมือเชิงกลยุทธ์ <br />
                <span className="uppercase italic text-slate-950">International Protocols</span>
              </p>
            </div>

            {/* Logo Cloud with Kinetic Typography Effect */}
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-12 transition-all duration-700 lg:gap-x-16">
              {partners.map((p) => (
                <div key={p.name} className="group relative">
                  <span className="font-mono text-2xl font-black uppercase italic tracking-tighter text-slate-300 transition-all duration-500 group-hover:tracking-widest group-hover:text-slate-950 md:text-4xl">
                    {p.logo}
                  </span>
                  <div className="absolute -bottom-4 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📐 INDUSTRIAL_MARKERS: จุดระบุพิกัดที่มุม Section */}
      <div className="absolute left-6 top-6 font-mono text-[8px] font-black text-slate-200">
        ID_REF::STATS_MDL_01
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[8px] font-black uppercase text-slate-200">
        Secure_Node_Active
      </div>
    </section>
  )
}
