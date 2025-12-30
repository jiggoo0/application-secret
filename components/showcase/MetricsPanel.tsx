/** * @format
 * @description METRICS_PANEL: Data Audit Visualization (V2.6)
 * ✅ ENFORCEMENT: High-Contrast Risk-Leveling, Precision Metering, Zero-Radius
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface MetricsPanelProps {
  stats: {
    docs_processed: number
    complexity_level: string
    processing_time: string
  }
  technical_strategy: string[]
}

export const MetricsPanel = ({ stats, technical_strategy }: MetricsPanelProps) => {
  // 🛡️ Logic Enforcement for Risk Leveling
  const isCritical = stats.complexity_level === 'HIGH' || stats.complexity_level === 'CRITICAL'

  return (
    <div className="shadow-sharp relative overflow-hidden border-l-4 border-slate-950">
      {/* 📊 SECTION_01: AUDIT_METRICS (Dark Terminal) */}
      <div className="bg-slate-950 p-10 text-white selection:bg-brand selection:text-slate-950">
        {/* Terminal Header */}
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-2.5 w-2.5 animate-pulse bg-brand" />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em]">
              Audit_Telemetry
            </span>
          </div>
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-600">
            Node_Ref::[Live_Feed]
          </span>
        </div>

        <div className="space-y-12">
          {/* Risk_Assessment_Meter */}
          <div className="relative">
            <div className="mb-4 flex justify-between font-mono text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="text-slate-500">Analysis_Risk_Level</span>
              <span className={cn(isCritical ? 'animate-pulse text-red-500' : 'text-brand')}>
                {stats.complexity_level}
              </span>
            </div>

            {/* Industrial Meter Bar */}
            <div className="relative h-2 w-full bg-white/5">
              <div
                className={cn(
                  'h-full transition-all duration-1000 ease-out',
                  isCritical ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-brand',
                )}
                style={{ width: isCritical ? '92%' : '45%' }}
              />
              {/* Scale Notches */}
              <div className="absolute inset-0 flex justify-between opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-full w-px bg-slate-950" />
                ))}
              </div>
            </div>
          </div>

          {/* Metric Grid: High-Performance Data */}
          <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
            <div className="pr-6 pt-8">
              <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Cycle_Time
              </span>
              <span className="text-4xl font-black uppercase italic tracking-tighter text-white">
                {stats.processing_time}
              </span>
            </div>
            <div className="pl-10 pt-8">
              <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Data_Volume
              </span>
              <span className="text-4xl font-black uppercase italic tracking-tighter text-white">
                {stats.docs_processed}
                <span className="ml-1 text-2xl text-brand">+</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🛠️ SECTION_02: CORE_PROTOCOLS (Light Registry) */}
      <div className="bg-white p-10">
        <header className="mb-10 flex items-center justify-between">
          <h4 className="flex items-center font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-950">
            <span className="mr-4 block h-5 w-1.5 bg-slate-950" />
            Core_Protocols
          </h4>
          <div className="ml-6 h-px flex-1 bg-slate-100" />
        </header>

        <div className="grid grid-cols-1 gap-5">
          {technical_strategy.map((s, i) => (
            <div
              key={i}
              className="group flex items-start gap-6 border-b border-slate-50 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="bg-slate-950 px-2 py-0.5 font-mono text-[10px] font-black leading-none text-brand">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <div className="mt-2 h-full w-px bg-slate-100 group-last:hidden" />
              </div>
              <span className="font-thai text-[15px] font-bold uppercase leading-tight tracking-tight text-slate-600 transition-colors group-hover:text-slate-950">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 📐 Coordinate Stamp */}
      <div className="absolute right-0 top-0 p-2 opacity-5">
        <span className="font-mono text-[8px] text-white">SEC_MODULE_v2.6</span>
      </div>
    </div>
  )
}
