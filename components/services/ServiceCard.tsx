/** * @format
 * @description SERVICE_CARD: Industrial Sharp Node (Clean V2.5.1)
 * ✅ FIXED: Removed unused 'cn' to pass system linting
 * ✅ REFINED: Font system alignment (IBM Plex Sans Thai)
 */

'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, type LucideIcon } from 'lucide-react'
// 🛡️ REMOVED: import { cn } from '@/lib/utils' (แก้ปัญหา Error: 'cn' is defined but never used)

export interface ServiceCardProps {
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

export const ServiceCard = ({ icon: Icon, ...item }: ServiceCardProps) => {
  return (
    <div className="group relative flex h-full flex-col border-b border-r border-slate-100 bg-white transition-all duration-500 last:border-r-0 hover:z-20 hover:shadow-[30px_30px_70px_-15px_rgba(200,164,93,0.15)]">
      {/* 🖼️ IMAGE_CONTAINER */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover opacity-70 grayscale transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

        {/* 🛰️ STATUS_BEACON */}
        <div className="absolute right-5 top-5 border border-white/10 bg-slate-950/40 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-brand opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-none bg-brand"></span>
            </div>
            <span className="font-mono text-[10px] font-black uppercase italic tracking-[0.2em] text-white">
              {item.technical.status}
            </span>
          </div>
        </div>

        {/* 🏷️ CATEGORY_TAG */}
        <div className="absolute bottom-5 left-5">
          <span className="inline-block bg-brand px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
            {item.category}
          </span>
        </div>
      </div>

      {/* 📝 DATA_FIELD */}
      <div className="flex flex-grow flex-col p-8 lg:p-10">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="mb-1.5 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              Registry_UID
            </span>
            <span className="font-mono text-[13px] font-black text-slate-400 transition-colors duration-300 group-hover:text-slate-950">
              {item.code}
            </span>
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:border-brand group-hover:bg-brand group-hover:text-slate-950 group-hover:shadow-lg">
            <Icon size={24} strokeWidth={1.5} />
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-6 text-3xl font-black uppercase leading-[1.1] tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-brand">
            {item.title}
          </h3>
          <p className="line-clamp-3 font-sans text-[16px] font-bold leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
            {item.description}
          </p>
        </div>

        {/* ⚙️ PROTOCOL_STRIKE */}
        <div className="mt-auto space-y-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-slate-200" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                Operating_Protocol
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {item.technical.protocol.map((step) => (
                <span
                  key={step}
                  className="rounded-none border border-slate-100 bg-slate-50/50 px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 transition-all duration-300 group-hover:border-slate-300 group-hover:text-slate-700"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* 💰 PRICING_&_ACTION_NODE */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-10">
            <div className="flex flex-col">
              <span className="mb-2 font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                Estimated_Fee
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-brand">
                  ฿{item.price.base}
                </span>
                {item.price.suffix && (
                  <span className="font-mono text-[11px] font-black uppercase italic tracking-tighter text-slate-400">
                    {item.price.suffix}
                  </span>
                )}
              </div>
            </div>

            <a
              href={item.cta.action}
              className="group/btn relative flex h-16 w-16 items-center justify-center overflow-hidden bg-slate-950 transition-all duration-500 active:scale-90 group-hover:bg-brand group-hover:shadow-[10px_10px_0px_0px_rgba(200,164,93,0.3)]"
              aria-label={item.cta.label}
            >
              <ArrowRight
                size={28}
                className="z-10 text-brand transition-all duration-500 group-hover:translate-x-1 group-hover:text-slate-950"
              />
              <div className="absolute inset-0 translate-y-full bg-white opacity-10 transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
