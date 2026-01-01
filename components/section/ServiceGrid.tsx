/** @format */

'use client'

import React, { useState, useMemo } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react'

/**
 * 🛰️ COMPONENT: ServiceGrid
 * @version 2026.1.1 (Cleanup & Performance)
 * ✅ FIXED: Removed unused 'Box' and 'cn' imports to resolve ESLint errors.
 */
export const ServiceGrid = () => {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  // 🔍 DATA_QUERY_OPTIMIZATION
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      activeTab === 'ALL_SERVICES' ? true : service.category === activeTab,
    )
  }, [activeTab])

  return (
    <section
      className="relative overflow-hidden bg-white py-32 selection:bg-[#FCDE09] selection:text-slate-950 lg:py-48"
      id="services"
    >
      {/* 🧩 UI_INFRA: Blueprint Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#020617_1px,transparent_1px)] opacity-[0.03] [background-size:32px_32px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* --- 01: SYSTEM_HEADER --- */}
        <ServiceHeader />

        {/* --- 02: COMMAND_INTERFACE --- */}
        <div className="mb-20">
          <ServiceFilter active={activeTab} onChange={setActiveTab} />
        </div>

        {/* --- 03: GRID_MATRIX_ENGINE --- */}
        <div className="relative">
          {/* Service Matrix Diagram Reference */}

          <div className="relative z-10 grid grid-cols-1 gap-px border-2 border-slate-950 bg-slate-950 shadow-[20px_20px_0px_#f1f5f9] md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}

            {/* ⚡ ENTERPRISE_NODE: Strategic Custom Solutions */}
            <div className="group relative flex min-h-[500px] flex-col items-center justify-center bg-[#020617] p-12 text-center transition-all duration-700">
              <div className="relative z-10">
                {/* Visual Node Indicator */}
                <div className="relative mx-auto mb-12 h-24 w-24">
                  <div className="animate-spin-slow absolute inset-0 border border-dashed border-[#FCDE09]/30" />
                  <div className="flex h-full w-full items-center justify-center border-2 border-[#FCDE09] bg-slate-950 text-[#FCDE09] shadow-[0_0_30px_rgba(252,222,9,0.3)]">
                    <Cpu size={40} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mb-6 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white">
                  Custom <br />
                  <span className="text-[#FCDE09]">Architecture</span>
                </h3>

                <p className="mx-auto mb-14 max-w-[280px] font-thai text-[16px] font-bold leading-relaxed text-slate-500">
                  ออกแบบโครงสร้างเอกสารระดับยุทธศาสตร์
                  สำหรับกรณีที่มีความซับซ้อนสูงหรือการจัดการสินทรัพย์ระดับสากล
                </p>

                <button className="group/btn relative h-16 w-full overflow-hidden border-2 border-[#FCDE09] bg-transparent transition-all hover:bg-[#FCDE09]">
                  <span className="relative z-10 flex items-center justify-center gap-3 font-mono text-[11px] font-black uppercase tracking-[0.4em] text-[#FCDE09] group-hover/btn:text-slate-950">
                    Execute_Node <ArrowUpRight size={18} />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover/btn:translate-x-0" />
                </button>
              </div>

              {/* Matrix Decoration */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(#FCDE09 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>
          </div>
        </div>

        {/* --- 04: REGISTRY_FOOTER --- */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-8 border-t-2 border-slate-950 pt-10 md:flex-row">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative h-3 w-3">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-20" />
                <div className="h-full w-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              </div>
              <span className="font-mono text-[12px] font-black uppercase tracking-[0.3em] text-slate-950">
                System_Core: Active
              </span>
            </div>

            <div className="font-mono text-[12px] font-black uppercase text-slate-400">
              Active_Modules:{' '}
              <span className="text-slate-950">
                [{filteredServices.length.toString().padStart(2, '0')}]
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border border-slate-200 bg-slate-50 px-6 py-3">
            <ShieldCheck size={16} className="text-slate-400" />
            <p className="font-mono text-[10px] font-black uppercase italic tracking-[0.2em] text-slate-400">
              Protocol: AES-256_Encrypted_Communication
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
