/** @format */
import React from "react"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-white pb-24 pt-32">
      {/* 🧩 Blueprint Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.02]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        <div className="border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-16">
          {children}
        </div>

        {/* 📑 Document Footer */}
        <div className="mt-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-slate-400">
          <span>Official_Protocol_v2.5</span>
          <span>Boutique_Ops_Legal_Dept</span>
        </div>
      </div>
    </div>
  )
}
