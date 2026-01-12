/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.967Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: page          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import React, { useState } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * 🛠️ COMPONENT: ServicesPage
 * @version 2026.0.9 (Refined Format)
 * ✅ Theme: High-End Professional | Bold & Sharp
 * ✅ Standard: JP-VisualDocs Design Tokens
 */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  // กรองบริการตาม Category โดยอ้างอิงจาก serviceData.ts
  const filteredServices = services.filter((s) =>
    activeTab === 'ALL_SERVICES' ? true : s.category === activeTab,
  )

  return (
    <main className="min-h-screen bg-white pb-32 pt-40 selection:bg-[#FCDE09] selection:text-[#020617]">
      <div className="container mx-auto max-w-7xl px-6">
        {/* 1. ส่วนหัว: Header สื่อถึงความน่าเชื่อถือระดับสูง */}
        <ServiceHeader />

        {/* 2. ระบบคัดกรอง: ใช้งานง่ายและตอบสนองทันที */}
        <ServiceFilter active={activeTab} onChange={setActiveTab} />

        {/* 3. ตารางบริการ (Service Grid): โครงสร้างเหลี่ยมคม (Sharp Border) */}
        <div className="shadow-sharp grid grid-cols-1 border-4 border-[#020617] bg-[#020617] md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}

          {/* ⚡ ส่วนติดต่อกรณีพิเศษ (Custom Consultation Card) */}
          <div className="group relative flex flex-col items-center justify-center overflow-hidden bg-[#020617] p-12 text-center transition-all hover:bg-slate-900">
            {/* Blueprint Decorative Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(252,222,9,0.1)_1px,transparent_1px),linear-gradient(rgba(252,222,9,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />

            <div className="relative z-10">
              <p className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FCDE09]">
                Direct_Message
              </p>

              <h3 className="font-thai mb-8 text-3xl font-black uppercase leading-[1.1] text-white">
                เคสยาก หรือ <br />
                ต้องการงานด่วน?
              </h3>

              <p className="font-thai mb-8 text-sm font-bold text-slate-400">
                หากงานของคุณมีความซับซ้อนเป็นพิเศษ <br />
                คุยรายละเอียดกับทีมงานมืออาชีพของเราได้ทันที
              </p>

              <Link href="/contact?ref=urgent-service" className="w-full">
                <Button
                  className={cn(
                    'font-thai h-16 w-full border-2 border-[#FCDE09] bg-transparent text-sm font-black uppercase tracking-widest text-[#FCDE09] transition-all duration-300',
                    'hover:shadow-sharp hover:bg-[#FCDE09] hover:text-[#020617] active:scale-95',
                  )}
                >
                  ติดต่อทีมงานโดยตรง
                </Button>
              </Link>
            </div>

            {/* ลายน้ำประทับตราสถานะ (Watermark) */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 select-none font-mono text-6xl font-black text-white opacity-[0.03]">
              URGENT
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
