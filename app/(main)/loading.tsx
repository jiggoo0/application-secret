/** @format */
"use client"

import React, { useEffect, useState } from "react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 20)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white p-6">
      {/* 🧩 Background Technical Grid */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="relative w-full max-w-sm">
        {/* Upper Label */}
        <div className="mb-4 flex items-end justify-between">
          <div className="space-y-1">
            <span className="block font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-950">
              System_Initializing
            </span>
            <span className="block font-mono text-[8px] uppercase tracking-widest text-slate-400">
              Establishing_Secure_Connection...
            </span>
          </div>
          <span className="font-mono text-2xl font-black italic text-brand drop-shadow-[1px_1px_0px_#020617]">
            {progress}%
          </span>
        </div>

        {/* Progress Track */}
        <div className="relative h-[2px] w-full overflow-hidden bg-slate-100">
          <div
            className="absolute left-0 top-0 h-full bg-slate-950 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Lower Metadata */}
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <div className="h-1 w-1 animate-ping bg-brand" />
            <span className="font-mono text-[7px] uppercase text-slate-400">
              Boutique_Registry_V2.5
            </span>
          </div>
          <span className="font-mono text-[7px] uppercase text-slate-400">
            © 2024_OP_CORE
          </span>
        </div>
      </div>
    </div>
  )
}
