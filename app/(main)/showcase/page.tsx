/** @format */
"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight, Filter, Database, Search } from "lucide-react"

// ข้อมูลจำลอง (ในอนาคตเปลี่ยนเป็นดึงจาก API หรือ Database)
const showcaseRegistry = [
  {
    id: "CASE-V-2024-001",
    title: "Visa Approval Strategy: Complex Financial Structure",
    category: "Visa_Strategy",
    impact: "High_Success",
    date: "2024-Q1",
  },
  {
    id: "CASE-L-2024-002",
    title: "Commercial Contract Architecture for Freelance Group",
    category: "Legal_Document",
    impact: "Risk_Mitigation",
    date: "2024-Q2",
  },
  {
    id: "CASE-V-2024-003",
    title: "Schengen Visa: Recovery after Multiple Rejections",
    category: "Visa_Strategy",
    impact: "Turnaround_Success",
    date: "2024-Q3",
  },
]

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* 📟 HEADER_TERMINAL */}
        <div className="mb-16 border-l-4 border-blue-600 pl-8">
          <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter text-slate-900 md:text-7xl">
            SUCCESS_LOGS <br />
            <span className="text-blue-600">REGISTRY.</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
            Archive_Data_v1.0 // Verified Case Studies
          </p>
        </div>

        {/* 🛠️ FILTER_BAR */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-y border-slate-100 py-6 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Filter size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Sort_By: LATEST
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Database size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Total_Logs: {showcaseRegistry.length}
              </span>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
              size={14}
            />
            <input
              type="text"
              placeholder="SEARCH_BY_ID..."
              className="w-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* 📂 REGISTRY_GRID */}
        <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200">
          {showcaseRegistry.map((item) => (
            <Link
              key={item.id}
              href={`/showcase/${item.id}`}
              className="group flex flex-col items-center justify-between bg-white p-8 transition-all hover:bg-slate-50 md:flex-row"
            >
              <div className="mb-4 flex flex-col items-start gap-6 md:mb-0 md:flex-row md:items-center">
                <span className="border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-600">
                  {item.id}
                </span>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Cat: {item.category}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Date: {item.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-8 md:w-auto md:justify-end">
                <span className="hidden text-[9px] font-black uppercase tracking-widest text-slate-300 lg:block">
                  Status: {item.impact}
                </span>
                <ChevronRight className="text-slate-200 transition-all group-hover:translate-x-2 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
