/** @format */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ShieldAlert, BarChart3, Binary, CheckCircle2, Cpu, ArrowDownRight } from 'lucide-react'

interface MetricsPanelProps {
  stats: {
    docs_processed: number | string
    complexity_level: string
    processing_time: string
  }
  technical_strategy: string[]
}

/**
 * 🛰️ COMPONENT: MetricsPanel_System
 * @version 2026.0.4 (Performance Refined)
 * ✅ FIXED: Resolved ambiguous class warning for cubic-bezier by using standard tailwind easing or safe arbitrary syntax.
 */
export const MetricsPanel = ({ stats, technical_strategy }: MetricsPanelProps) => {
  const getComplexityConfig = (level: string) => {
    const l = level.toUpperCase()
    if (l.includes('CRITICAL'))
      return {
        width: 'w-full',
        color: 'bg-red-600',
        text: 'text-red-500',
        icon: <ShieldAlert size={12} />,
      }
    if (l.includes('HIGH'))
      return {
        width: 'w-[80%]',
        color: 'bg-orange-500',
        text: 'text-orange-500',
        icon: <ShieldAlert size={12} />,
      }
    if (l.includes('MEDIUM'))
      return {
        width: 'w-[50%]',
        color: 'bg-[#FCDE09]',
        text: 'text-[#FCDE09]',
        icon: <Binary size={12} />,
      }
    return {
      width: 'w-[30%]',
      color: 'bg-emerald-500',
      text: 'text-emerald-500',
      icon: <CheckCircle2 size={12} />,
    }
  }

  const config = getComplexityConfig(stats.complexity_level)

  return (
    <div className="relative overflow-hidden border-2 border-[#020617] bg-white shadow-[16px_16px_0px_0px_#020617] transition-all duration-500 hover:shadow-[20px_20px_0px_0px_#020617]">
      {/* ⬛ UPPER_SHELL: Technical Metrics */}
      <div className="bg-[#020617] p-8 text-white md:p-12">
        <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="relative flex h-10 w-10 items-center justify-center border border-white/20">
              <div className="absolute inset-0 animate-pulse bg-[#FCDE09]/5" />
              <Cpu size={18} className="text-[#FCDE09]" />
            </div>
            <div>
              <span className="block font-mono text-[11px] font-black uppercase leading-none tracking-[0.5em]">
                Audit_Metrics
              </span>
              <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Data_Verification_System
              </span>
            </div>
          </div>
          <div className="hidden flex-col items-end opacity-40 lg:flex">
            <div className="mb-2 h-[1px] w-24 bg-white/20" />
            <span className="font-mono text-[8px] font-black italic">LIVE_FEED_0.2ms</span>
          </div>
        </header>

        <div className="space-y-14">
          {/* Complexity Slider */}
          <div className="group">
            <div className="mb-6 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-3 text-slate-400 transition-colors group-hover:text-white">
                <BarChart3 size={14} className="text-[#FCDE09]" /> Analysis_Case_Difficulty
              </span>
              <span
                className={cn(
                  'flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1',
                  config.text,
                )}
              >
                {config.icon} {stats.complexity_level}
              </span>
            </div>
            <div className="relative h-4 w-full border border-white/10 bg-white/5 p-1">
              <div
                className={cn(
                  'h-full transition-all duration-1000 ease-in-out', 
                  /* ✅ FIXED: Changed to ease-in-out for reliability, or use ease-&lsqb;cubic-bezier(0.85,0,0.15,1)&rsqb; */
                  config.width,
                  config.color,
                )}
              />
              {/* Dynamic Overlay Grid */}
              <div className="pointer-events-none absolute inset-0 flex justify-between px-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-full w-px bg-white/10" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          

          <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
            <div className="group relative">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-colors group-hover:text-[#FCDE09]">
                Cycle_Resolution
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  {stats.processing_time.split(' ')[0] || '0'}
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-tighter text-slate-400">
                  {stats.processing_time.split(' ')[1] || 'DAYS'}
                </span>
              </div>
            </div>

            <div className="group relative">
              <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-colors group-hover:text-[#FCDE09]">
                Processing_Units
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  {stats.docs_processed}
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-tighter text-slate-400">
                  OBJ_REF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⬜ LOWER_SHELL: Execution Protocols */}
      <div className="relative p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#020617 2px, transparent 2px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <div className="mb-10 flex items-center justify-between">
            <h4 className="flex items-center text-[12px] font-black uppercase tracking-[0.5em] text-[#020617]">
              <span className="mr-4 block h-6 w-2 bg-[#FCDE09] shadow-[2px_2px_0px_#020617]" />
              Strategic_Protocols
            </h4>
            <ArrowDownRight className="text-slate-200" size={32} />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {technical_strategy.map((s, i) => (
              <div
                key={i}
                className="group flex items-start gap-6 border-2 border-slate-100 bg-slate-50/50 p-6 transition-all duration-500 hover:translate-x-2 hover:border-[#020617] hover:bg-white"
              >
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[14px] font-black text-slate-300 transition-colors group-hover:text-[#020617]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="mt-2 h-10 w-[2px] bg-slate-100 transition-all group-hover:bg-[#FCDE09]" />
                </div>
                <span className="font-thai text-[16px] font-bold leading-relaxed tracking-tight text-slate-500 transition-colors group-hover:text-[#020617]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
            Logic_Integrity_Verified
          </span>
        </div>
        <span className="font-mono text-[8px] font-black uppercase text-slate-300">
          Archive_Ref: JP-AUDIT-LOG
        </span>
      </div>
    </div>
  )
}
