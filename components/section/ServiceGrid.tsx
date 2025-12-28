/** @format */
"use client"

import React, { useState } from "react"
import { ServiceHeader } from "@/components/services/ServiceHeader"
import { ServiceFilter } from "@/components/services/ServiceFilter"
import { ServiceCard } from "@/components/services/ServiceCard"
import { services } from "@/components/services/serviceData"
import { Box } from "lucide-react"

export default function ServiceGrid() {
  const [activeTab, setActiveTab] = useState("ALL_SERVICES")

  // 🔍 Logic ในการกรองข้อมูลตาม Category
  const filteredServices = services.filter((service) =>
    activeTab === "ALL_SERVICES" ? true : service.category === activeTab
  )

  return (
    <section className="relative overflow-hidden bg-white py-24" id="services">
      {/* 🧩 Blueprint Grid Overlay - สร้าง Texture แบบงานวิศวกรรมเอกสาร */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* 01: ส่วนหัวข้อ (เรียกใช้ Component ที่เราทำไว้) */}
        <ServiceHeader />

        {/* 02: ส่วนตัวกรอง (เรียกใช้ Component ที่เราทำไว้) */}
        <ServiceFilter active={activeTab} onChange={setActiveTab} />

        {/* 03: ตารางแสดงบริการ (The Grid Matrix) */}
        <div className="grid grid-cols-1 border-l border-t border-slate-100 shadow-2xl transition-all duration-500 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}

          {/* ⚡ Custom Protocol Box: ส่วนปิดท้ายตารางเพื่อให้ Grid ดูเต็มและดูแพง */}
          <div className="group relative flex min-h-[400px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center">
            <div className="relative z-10">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                <Box
                  className="animate-pulse text-brand"
                  size={32}
                  strokeWidth={1}
                />
              </div>
              <h3 className="mb-4 text-3xl font-black uppercase leading-tight tracking-tighter text-white">
                Enterprise <br /> Architecture
              </h3>
              <p className="mx-auto mb-10 max-w-[220px] font-thai text-sm leading-relaxed text-slate-400">
                สำหรับการวางโครงสร้างเอกสารระดับองค์กร
                หรือเคสที่มีความซับซ้อนสูงพิเศษ
              </p>
              <button className="border-b-2 border-brand pb-2 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand transition-all duration-500 group-hover:tracking-[0.6em]">
                REQUEST_CUSTOM_STACK
              </button>
            </div>

            {/* Background Accent Deco */}
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-brand/5 blur-3xl transition-colors group-hover:bg-brand/10" />
          </div>
        </div>

        {/* 📉 Footer Detail: แสดงจำนวนรายการที่พบ */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] font-black text-slate-400">
              REGISTRY_COUNT:{" "}
              {filteredServices.length.toString().padStart(2, "0")}
            </span>
            <div className="h-px w-12 bg-slate-100" />
          </div>
          <p className="font-mono text-[9px] uppercase italic tracking-widest text-slate-300">
            Secure_Data_Transmission_Active
          </p>
        </div>
      </div>
    </section>
  )
}
