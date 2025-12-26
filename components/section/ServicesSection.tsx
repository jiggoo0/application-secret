/** @format */
"use client"

import React from "react"

// Sub-Components (correct relative paths)
import { ServiceHeader } from "../services/ServiceHeader"
import { ServiceCard } from "../services/ServiceCard"
import { ServiceTerminal } from "../services/ServiceTerminal"

// Data
import { servicesData } from "../services/data"

/**
 * ServicesSection
 * ----------------------------------------------------------------
 * แสดงรายการบริการหลักของ JP Visual Docs
 * จัดการโครงสร้าง Grid และส่งต่อข้อมูลไปยัง Component ย่อย
 */
export default function ServicesSection() {
  return (
    <section id="services-index" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* 🛠️ HEADER_SYSTEM */}
        <ServiceHeader />

        {/* 🏗️ ASSET_GRID_SYSTEM */}
        <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}

          {/* 🏁 CUSTOM_LOGIC_TERMINAL */}
          <ServiceTerminal />
        </div>

        {/* 📐 FOOTER_NOTE */}
        <div className="mt-12 flex items-center justify-between opacity-20">
          <span className="font-mono text-[10px] uppercase tracking-widest">
            JP_VISUAL_DOCS // SERVICE_MANIFEST_REVISION_8.0
          </span>
          <div className="mx-8 h-[1px] flex-1 bg-slate-900" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            (C) 2024_CORE_SYSTEM
          </span>
        </div>
      </div>
    </section>
  )
}
