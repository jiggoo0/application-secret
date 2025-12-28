/** @format */

import React from "react"
import Image from "next/image"
import { ArrowRight, type LucideIcon } from "lucide-react"

interface ServiceCardProps {
  id: string
  code: string
  title: string
  description: string
  image: string
  category: string
  icon: LucideIcon
  price: { base: string; suffix?: string }
  technical: { status: string; protocol: string[] }
  cta: { label: string; action: string }
}

/**
 * 🛰️ COMPONENT: ServiceCard
 * แสดงผลบัตรบริการในรูปแบบ Industrial High-Contrast
 * แก้ไข: ลบ Unused Import 'cn' เพื่อให้ผ่าน Lint Check
 */
export const ServiceCard = ({ icon: Icon, ...item }: ServiceCardProps) => (
  <div className="group relative flex h-full flex-col border-b border-r border-slate-100 bg-white transition-all duration-500 last:border-r-0 hover:z-20 hover:shadow-[25px_25px_50px_-12px_rgba(0,0,0,0.08)]">
    {/* 🖼️ VISUAL_NODE: ภาพประกอบพร้อมสถานะทางเทคนิค */}
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover opacity-90 grayscale-[0.3] transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-slate-950/20 transition-colors duration-500 group-hover:bg-transparent" />

      {/* 🏷️ System Status Badge */}
      <div className="absolute right-5 top-5 border border-slate-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
          <span className="font-mono text-[8px] font-black uppercase italic tracking-widest text-slate-950">
            {item.technical.status}
          </span>
        </div>
      </div>

      {/* 🏷️ Category Label */}
      <div className="absolute bottom-5 left-5">
        <span className="bg-brand px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 shadow-[6px_6px_0px_0px_#020617]">
          {item.category}
        </span>
      </div>
    </div>

    {/* 📝 DATA_CONTENT: ข้อมูลบริการ */}
    <div className="flex flex-grow flex-col p-8">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex flex-col">
          <span className="mb-1 font-mono text-[10px] font-bold tracking-[0.2em] text-slate-300">
            REGISTRY_UID
          </span>
          <span className="font-mono text-[11px] font-black text-slate-400 transition-colors group-hover:text-slate-950">
            {item.code}
          </span>
        </div>
        <div className="bg-slate-50 p-3 text-slate-300 transition-all duration-300 group-hover:bg-brand group-hover:text-slate-950">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="mb-4 text-2xl font-black uppercase leading-[0.9] tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-brand">
        {item.title}
      </h3>

      <p className="mb-8 line-clamp-3 font-thai text-[15px] font-medium leading-relaxed text-slate-500">
        {item.description}
      </p>

      {/* ⚙️ PROTOCOL_STACK: ขั้นตอนการดำเนินงาน */}
      <div className="mt-auto">
        <div className="mb-8">
          <span className="mb-3 block font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
            Operating_Protocol
          </span>
          <div className="flex flex-wrap gap-2">
            {item.technical.protocol.map((step) => (
              <span
                key={step}
                className="border border-slate-100 bg-slate-50/50 px-2.5 py-1 font-mono text-[8px] font-black uppercase tracking-wider text-slate-400"
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* 💳 TRANSACTION_FOOTER: ราคาและปุ่มดำเนินการ */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-8">
          <div className="flex flex-col">
            <span className="mb-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-300">
              FEE_STRUCTURE
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black italic tracking-tighter text-slate-950 transition-colors group-hover:text-brand">
                ฿{item.price.base}
              </span>
              {item.price.suffix && (
                <span className="text-[10px] font-bold italic text-slate-400">
                  {item.price.suffix}
                </span>
              )}
            </div>
          </div>

          <a
            href={item.cta.action}
            className="flex h-14 w-14 items-center justify-center bg-slate-950 text-brand transition-all duration-300 active:scale-95 group-hover:bg-brand group-hover:text-slate-950 group-hover:shadow-[10px_10px_0px_0px_rgba(252,222,9,0.2)]"
            aria-label={item.cta.label}
          >
            <ArrowRight size={24} />
          </a>
        </div>
      </div>
    </div>
  </div>
)
