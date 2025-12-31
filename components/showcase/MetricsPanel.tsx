/** @format */

import React from 'react'
import { cn } from '@/lib/utils'
import { ShieldAlert, BarChart3, Binary, CheckCircle2 } from 'lucide-react'

interface MetricsPanelProps {
  stats: {
    docs_processed: number | string
    complexity_level: string
    processing_time: string
  }
  technical_strategy: string[]
}

export const MetricsPanel = ({ stats, technical_strategy }: MetricsPanelProps) => {
  const getComplexityConfig = (level: string) => {
    const l = level.toUpperCase()
    if (l.includes('CRITICAL') || l.includes('ระดับความละเอียดอ่อนสูง'))
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
      color: 'bg-green-500',
      text: 'text-green-500',
      icon: <CheckCircle2 size={12} />,
    }
  }

  const config = getComplexityConfig(stats.complexity_level)

  return (
    <div className="space-y-0 border-l-2 border-[#020617] bg-white shadow-[8px_8px_0px_0px_rgba(2,6,23,1)]">
      <div className="bg-[#020617] p-8 text-white md:p-10">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse bg-[#FCDE09]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
              Audit_Metrics
            </span>
          </div>
          <span className="font-mono text-[9px] font-bold uppercase italic text-slate-500">
            Realtime_Data_Sync
          </span>
        </div>

        <div className="space-y-12">
          <div className="group">
            <div className="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-2 text-slate-500">
                <BarChart3 size={12} /> Risk_Level_Assessment
              </span>
              <span className={cn('flex items-center gap-1.5 bg-white/5 px-2 py-0.5', config.text)}>
                {config.icon} {stats.complexity_level}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-white/5">
              <div
                className={cn(
                  'h-full transition-all duration-1000 ease-out',
                  config.width,
                  config.color,
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
            <div className="pr-6 pt-8">
              <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {/* ✅ Master Fix: ลบเศษ // ออกทั้งหมด เหลือเพียง Metadata ที่ถูกต้อง */}
                CYCLE_TIME_ANALYSIS
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black uppercase italic tracking-tighter text-white">
                  {stats.processing_time.split(' ')[0] || '0'}
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {stats.processing_time.split(' ')[1] || 'DAYS'}
                </span>
              </div>
            </div>
            <div className="pl-8 pt-8">
              <span className="mb-3 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {/* ✅ Master Fix: ลบเศษ // ออกเพื่อผ่าน Lint Check */}
                ANALYSIS_UNIT_IDENTIFIER
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black uppercase italic tracking-tighter text-white">
                  {stats.docs_processed}
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-400">OBJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white p-8 md:p-10">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10">
          <h4 className="mb-10 flex items-center text-[11px] font-black uppercase tracking-[0.4em] text-[#020617]">
            <span className="mr-3 block h-5 w-1.5 bg-[#020617]" />
            Execution_Protocols
          </h4>
          <div className="space-y-4">
            {technical_strategy.map((s, i) => (
              <div
                key={i}
                className="group flex gap-5 border border-slate-100 bg-slate-50/30 p-4 transition-all duration-300 hover:border-[#020617] hover:bg-white"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-[11px] font-black leading-none text-slate-300 group-hover:text-[#020617]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="h-full w-[1px] bg-slate-100 group-hover:bg-[#020617]" />
                </div>
                <span className="font-thai text-[14px] font-bold leading-snug tracking-tight text-slate-600 transition-colors group-hover:text-[#020617]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
