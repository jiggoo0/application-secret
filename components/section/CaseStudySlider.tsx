/** @format */

"use client"

import React, { useRef } from "react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { getSliderCases } from "@/config/showcase"

/**
 * 🛰️ COMPONENT: CaseStudySlider
 * แสดงผลเคสความสำเร็จล่าสุดในรูปแบบ Horizontal Scroll
 * ปรับปรุง: ย้าย Data Logic ไปที่ Config และล้าง Unused Imports
 */
export const CaseStudySlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // ⚡ ดึงข้อมูลจากสมองกลาง (Config Logic)
  const displayCases = getSliderCases(3)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      {/* 🧩 Blueprint Grid Decor */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.05]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- HEADER_SECTION --- */}
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 border border-brand/30 px-3 py-1">
              <span className="h-2 w-2 animate-pulse bg-brand" />
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-brand">
                Success_Registry_Archive
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase italic leading-none tracking-tighter text-white md:text-7xl">
              Proven <br />
              <span className="not-italic text-brand">Outcomes.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-px bg-slate-800">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll Left"
              className="border border-slate-800 bg-slate-900 p-4 text-white transition-all hover:bg-brand hover:text-slate-950"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll Right"
              className="border border-slate-800 bg-slate-900 p-4 text-white transition-all hover:bg-brand hover:text-slate-950"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL_SCROLL_AREA --- */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-12"
        >
          {displayCases.map((item) => (
            <div
              key={item.id}
              className="group min-w-full snap-start border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors hover:border-brand/50 md:min-w-[450px]"
            >
              {/* ID & CATEGORY */}
              <div className="mb-12 flex items-start justify-between">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
                  ID://{item.id}
                </span>
                <span className="bg-slate-800 px-2 py-1 font-mono text-[8px] font-black uppercase text-brand">
                  {item.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="mb-12 space-y-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  Client: {item.client}
                </p>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="border-l border-slate-800 pl-6 font-thai text-sm leading-relaxed text-slate-400 transition-colors group-hover:border-brand">
                  {item.summary}
                </p>
              </div>

              {/* STATS_MATRIX: ดึงจากข้อมูลจริง */}
              <div className="grid grid-cols-2 gap-px border border-slate-800 bg-slate-800">
                {item.stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="bg-slate-950 p-4">
                    <p className="mb-1 font-mono text-[8px] uppercase text-slate-500">
                      {stat.label.replace("_", " ")}
                    </p>
                    <p className="font-mono text-xs font-black text-brand">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- PROGRESS_INDICATOR --- */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[8px] text-slate-600">01</span>
          <div className="relative h-px flex-grow bg-slate-900">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-brand shadow-[0_0_10px_#FCDE09]" />
          </div>
          <span className="font-mono text-[8px] text-slate-600">
            {displayCases.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
