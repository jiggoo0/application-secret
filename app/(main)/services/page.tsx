/** @format */
"use client"

import React, { useState } from "react"
import { ServiceHeader } from "@/components/services/ServiceHeader"
import { ServiceFilter } from "@/components/services/ServiceFilter"
import { ServiceCard } from "@/components/services/ServiceCard"
import { services } from "@/components/services/serviceData"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("ALL_SERVICES")

  // ระบบกรองข้อมูล
  const filteredServices = services.filter((s) =>
    activeTab === "ALL_SERVICES" ? true : s.category === activeTab
  )

  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      {/* 🧩 Blueprint Grid Background */}
      <div className="pointer-events-none fixed inset-0 bg-blueprint-grid opacity-[0.02]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 01: Header - บอกความเป็นมืออาชีพ */}
        <ServiceHeader />

        {/* 02: Filter - ให้ลูกค้าเลือกสิ่งที่สนใจ */}
        <ServiceFilter active={activeTab} onChange={setActiveTab} />

        {/* 03: Grid Display - รายการบริการทั้งหมด */}
        <div className="grid grid-cols-1 border-l border-t border-slate-100 shadow-2xl md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}

          {/* Special CTA Box: กรณีหาบริการไม่เจอ */}
          <div className="flex flex-col items-center justify-center bg-slate-950 p-10 text-center">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-brand">
              Custom_Request
            </p>
            <h3 className="mb-6 text-2xl font-black uppercase leading-tight text-white">
              Looking for a <br /> Specific Solution?
            </h3>
            <button className="bg-brand px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-950 transition-all hover:shadow-sharp">
              CONTACT_ENGINEER
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
