/** @format */
'use client'

import React, { useState } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * 🛠️ COMPONENT: ServicesPage
 * @version 2026.0.8 (JP-Professional Execution)
 * ✅ ตรวจสอบ: ภาษาจริงใจ, ดีไซน์ดุดัน, ไม่มีศัพท์เทคนิค AI/นวัตกรรม
 */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  const filteredServices = services.filter((s) =>
    activeTab === 'ALL_SERVICES' ? true : s.category === activeTab,
  )

  return (
    <main className="min-h-screen bg-white pb-32 pt-40 selection:bg-[#FCDE09] selection:text-[#020617]">
      <div className="container mx-auto max-w-7xl px-6">
        {/* ส่วนหัว: เน้นความน่าเชื่อถือระดับมืออาชีพ */}
        <ServiceHeader />

        {/* ตัวกรอง: ต้องคมชัดและใช้งานง่าย */}
        <ServiceFilter active={activeTab} onChange={setActiveTab} />

        {/* 🏗️ SERVICE_GRID: เน้นโครงสร้างเหลี่ยมคม (Grid-based) */}
        <div className="grid grid-cols-1 border-4 border-[#020617] bg-[#020617] shadow-sharp md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}

          {/* ⚡ CUSTOM_CONSULTATION: ส่วนปิดท้ายที่แสดงถึงความ "ทีมงานเก่งมาก" */}
          <div className="group relative flex flex-col items-center justify-center overflow-hidden bg-[#020617] p-12 text-center transition-all hover:bg-slate-900">
            {/* Blueprint Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(252,222,9,0.1)_1px,transparent_1px),linear-gradient(rgba(252,222,9,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />

            <div className="relative z-10">
              <p className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                Direct_Message
              </p>

              <h3 className="mb-8 font-thai text-3xl font-black uppercase leading-[1.1] text-white">
                เคสยาก หรือ <br />
                ต้องการงานด่วน?
              </h3>

              <p className="mb-8 font-thai text-sm font-bold text-slate-400">
                หากงานของคุณมีความซับซ้อนเป็นพิเศษ <br />
                คุยรายละเอียดกับทีมงานมืออาชีพของเราได้ทันที
              </p>

              <Button
                className={cn(
                  'h-16 w-full border-2 border-[#FCDE09] bg-transparent font-thai text-sm font-black uppercase tracking-widest text-[#FCDE09] transition-all duration-300',
                  'hover:bg-[#FCDE09] hover:text-[#020617] hover:shadow-sharp active:scale-95',
                )}
              >
                ติดต่อทีมงานโดยตรง
              </Button>
            </div>

            {/* ลายน้ำประทับตราความมั่นใจ */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 select-none font-mono text-6xl font-black text-white opacity-[0.03]">
              URGENT
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
