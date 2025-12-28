/** @format */

import React from "react"
import { cn } from "@/lib/utils"

interface MetricsPanelProps {
  stats: {
    docs_processed: number
    complexity_level: string
    processing_time: string
  }
  technical_strategy: string[]
}

/**
 * 🛠️ COMPONENT: MetricsPanel
 * STYLE: Industrial Black Ops / Data Audit Visualization
 */
export const MetricsPanel = ({
  stats,
  technical_strategy,
}: MetricsPanelProps) => {
  return (
    <div className="space-y-0 border-l border-slate-950">
      {/* 📊 SECTION_01: Audit Metrics */}
      <div className="bg-slate-950 p-10 text-white">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-[#FCDE09]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Audit_Metrics
            </span>
          </div>
          <span className="text-[9px] font-bold uppercase italic text-slate-500 underline underline-offset-4">
            Live_System
          </span>
        </div>

        <div className="space-y-10">
          {/* Complexity Bar */}
          <div>
            <div className="mb-3 flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">Risk_Assessment</span>
              <span
                className={cn(
                  stats.complexity_level === "HIGH" ||
                    stats.complexity_level === "CRITICAL"
                    ? "text-red-500"
                    : "text-[#FCDE09]"
                )}
              >
                {stats.complexity_level}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5">
              <div
                className={cn(
                  "h-full transition-all duration-700",
                  stats.complexity_level === "HIGH"
                    ? "w-4/5 bg-red-600"
                    : "w-2/5 bg-[#FCDE09]"
                )}
              />
            </div>
          </div>

          {/* Metric Grid: Sharp & Heavy */}
          <div className="grid grid-cols-2 border-t border-white/10">
            <div className="border-r border-white/10 pr-4 pt-6">
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Processing
              </span>
              <span className="text-3xl font-black uppercase italic tracking-tighter text-white">
                {stats.processing_time}
              </span>
            </div>
            <div className="pl-6 pt-6">
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Analysis
              </span>
              <span className="text-3xl font-black uppercase italic tracking-tighter text-white">
                {stats.docs_processed}+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🛠️ SECTION_02: Core Protocols */}
      <div className="border-t border-slate-950 bg-white p-10">
        <h4 className="mb-8 flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
          <span className="mr-3 block h-4 w-1 bg-slate-950" />
          Core_Protocols
        </h4>
        <div className="space-y-6">
          {technical_strategy.map((s, i) => (
            <div
              key={i}
              className="group flex gap-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0"
            >
              <span className="h-fit bg-slate-950 px-1.5 py-0.5 text-[11px] font-black leading-none text-[#FCDE09]">
                0{i + 1}
              </span>
              <span className="text-[13px] font-bold uppercase leading-tight tracking-tight text-slate-700 transition-colors group-hover:text-slate-950">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
