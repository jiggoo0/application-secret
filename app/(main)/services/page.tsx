/** * @format
 * @description SERVICES_PAGE: Operational Matrix Assembly (V2.1.0)
 * ✅ ENFORCEMENT: Industrial Grid-Gap Architecture, Dynamic Filtering HUD, Blueprint Overlays
 */

'use client'

import React, { useState, useMemo } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { HelpCircle, Terminal, Activity } from 'lucide-react'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  // 🔍 DATA_FILTERING_LOGIC: กรองข้อมูลตาม Category
  const filteredServices = useMemo(() => {
    return services.filter((s) => (activeTab === 'ALL_SERVICES' ? true : s.category === activeTab))
  }, [activeTab])

  return (
    <main className="relative min-h-screen bg-white pb-40 pt-40 selection:bg-brand selection:text-slate-950 lg:pt-56">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid Layer */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 01: HEADER_SYSTEM --- */}
        <ServiceHeader />

        {/* --- 02: TELEMETRY_HUD: ตัวบ่งชี้สถานะการกรองข้อมูล --- */}
        <div className="mb-12 flex flex-col gap-6 border-b-2 border-slate-100 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <ServiceFilter active={activeTab} onChange={setActiveTab} />
          </div>

          <div className="hidden items-center gap-8 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 md:flex">
            <div className="flex flex-col items-end">
              <span className="text-slate-300">ACTIVE_FILTER</span>
              <span className="text-slate-950">{activeTab}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-slate-300">RESULTS_COUNT</span>
              <span className="text-slate-950">
                {filteredServices.length.toString().padStart(2, '0')}
              </span>
            </div>
            <Activity size={16} className="animate-pulse text-brand" />
          </div>
        </div>

        {/* --- 03: MATRIX_GRID: Core Service Assembly --- */}
        <section className="relative">
          {/* Grid Container: สร้างเส้นตารางด้วย bg-slate-200 และ gap-px */}
          <div className="grid grid-cols-1 gap-px overflow-hidden border-2 border-slate-950 bg-slate-200 shadow-sharp-brand md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}

            {/* ⚡ CUSTOM_SOLUTION_NODE: แผ่นพับกรณีต้องการโซลูชันพิเศษ */}
            <div className="group relative flex min-h-[400px] flex-col items-center justify-center bg-slate-950 p-12 text-center transition-all duration-700 hover:bg-slate-900">
              {/* Decorative Blueprint Overlay */}
              <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-10 flex h-20 w-20 items-center justify-center border-2 border-brand/20 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-brand">
                  <HelpCircle
                    className="-rotate-[135deg] text-brand transition-all group-hover:rotate-0"
                    size={36}
                    strokeWidth={1}
                  />
                </div>

                <div className="mb-10 space-y-2">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-brand/60">
                    Not_Listed?
                  </span>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                    Custom <br />
                    <span className="not-italic text-brand">Protocol.</span>
                  </h3>
                </div>

                <button className="group/btn relative overflow-hidden border-2 border-brand/30 bg-transparent px-10 py-5 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-brand transition-all hover:border-brand hover:bg-brand hover:text-slate-950">
                  <span className="relative z-10 flex items-center gap-2">
                    <Terminal size={14} />
                    CONTACT_ENGINEER
                  </span>
                </button>
              </div>

              {/* Decorative Corner Label */}
              <div className="absolute bottom-4 right-6 font-mono text-[8px] font-black uppercase tracking-widest text-slate-800">
                AUTH_REQ_STATION_04
              </div>
            </div>
          </div>

          {/* Bottom Anchor Decor */}
          <div className="mt-12 flex items-center gap-4 opacity-20">
            <div className="h-px flex-1 bg-slate-950" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em]">
              End_of_Matrix
            </span>
            <div className="h-px flex-1 bg-slate-950" />
          </div>
        </section>
      </div>
    </main>
  )
}
