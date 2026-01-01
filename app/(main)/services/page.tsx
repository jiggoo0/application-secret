/** @format */
'use client'

import React, { useState } from 'react'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServiceFilter } from '@/components/services/ServiceFilter'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/components/services/serviceData'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('ALL_SERVICES')

  const filteredServices = services.filter((s) =>
    activeTab === 'ALL_SERVICES' ? true : s.category === activeTab,
  )

  return (
    <main className="min-h-screen bg-white pb-24 pt-32">
      <div className="container mx-auto px-6">
        <ServiceHeader />
        <ServiceFilter active={activeTab} onChange={setActiveTab} />

        <div className="grid grid-cols-1 border-l border-t border-slate-100 shadow-2xl md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}

          {/* ปรับภาษาในส่วน Custom Request: ให้ดูเป็นการคุยงานระหว่างคนมากขึ้น */}
          <div className="flex flex-col items-center justify-center bg-slate-950 p-10 text-center">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-brand">
              Special_Request
            </p>
            <h3 className="mb-6 text-2xl font-black uppercase leading-tight text-white">
              ต้องการจัดการเคส <br /> ในรูปแบบเฉพาะทาง?
            </h3>
            <Button
              className={cn(
                'px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all',
                'bg-brand text-slate-950 hover:shadow-sharp',
              )}
            >
              คุยกับทีมงานโดยตรง
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
