/** * @format
 * @description HERO_CONTENT: The Message Core (Industrial Sharp V2.6.1 Zero-Error)
 * ✅ FIXED: Removed unused 'cn' import to satisfy strict linting
 * ✅ REFINED: Typography system updated to IBM Plex Sans Thai
 */

'use client'

import React from 'react'
import { HeroData } from './heroData'

export const HeroContent = ({ data }: { data: HeroData }) => {
  return (
    <div className="relative z-10 max-w-2xl py-12 lg:py-20">
      {/* 🏷️ EYEBROW: Registry Identification Style */}
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px w-8 bg-brand" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
          {data.eyebrow || 'System_Initial_Ready'}
        </span>
      </div>

      {/* 🏗️ HEADLINE: Bold High-Contrast Architecture */}
      <h1 className="mb-10 text-6xl font-black uppercase italic leading-[0.95] tracking-tighter text-slate-950 lg:text-8xl">
        {data.headline}
        <br />
        <span className="not-italic text-brand">{data.highlight}</span>
      </h1>

      {/* 📝 DESCRIPTION: Precision Body Text (IBM Plex Sans Thai) */}
      <p className="mb-12 max-w-xl font-sans text-lg font-bold leading-relaxed text-slate-500">
        {data.description}
      </p>

      {/* 🛰️ SIGNALS: Technical Status Indicators */}
      <div className="mb-16 flex flex-wrap gap-8 border-l-2 border-slate-100 pl-8">
        {data.signals.map((s, i) => (
          <div key={i} className="flex items-center gap-3 transition-colors hover:text-slate-950">
            <div className="flex h-8 w-8 items-center justify-center bg-slate-50 text-brand">
              <s.icon size={18} strokeWidth={2} />
            </div>
            <span className="font-mono text-[11px] font-black uppercase tracking-widest text-slate-400">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* 🎮 CTA_INTERFACE: Industrial Action Buttons */}
      <div className="flex flex-wrap gap-6">
        <button className="shadow-sharp group relative overflow-hidden bg-slate-950 px-10 py-5 transition-all active:scale-95">
          <span className="relative z-10 font-mono text-xs font-black uppercase tracking-[0.3em] text-brand transition-colors group-hover:text-slate-950">
            {data.cta.primary}
          </span>
          <div className="absolute inset-0 translate-y-full bg-brand transition-transform duration-300 group-hover:translate-y-0" />
        </button>

        {data.cta.secondary && (
          <button className="group relative border-2 border-slate-950 px-10 py-5 transition-all active:scale-95">
            <span className="relative z-10 font-mono text-xs font-black uppercase tracking-[0.3em] text-slate-950 transition-colors group-hover:text-white">
              {data.cta.secondary}
            </span>
            <div className="absolute inset-0 translate-x-full bg-slate-950 transition-transform duration-300 group-hover:translate-x-0" />
          </button>
        )}
      </div>
    </div>
  )
}
