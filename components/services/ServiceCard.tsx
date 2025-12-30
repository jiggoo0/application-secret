/** @format */
'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, type LucideIcon } from 'lucide-react'
// 🛰️ IMPORT_PROTOCOL: ดึงค่า Config เพื่อเข้าถึง Line ID
import { siteConfig } from '@/config/site'

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

/**
 * 🛰️ COMPONENT: ServiceCard
 * ✅ FIXED: บังคับส่งข้อความเข้า LINE OA ด้วยโปรโตคอล oaMessage (ข้อความขึ้นแน่นอน)
 * ✅ ENFORCED: Industrial Sharp Protocol
 */
export const ServiceCard = ({ icon: Icon, ...item }: ServiceCardProps) => {
  // 🛠️ MESSAGE_PROTOCOL: ข้อความที่จะให้ไปปรากฏในช่องแชท
  const lineMessage = `สวัสดีครับ สนใจบริการ: ${item.title} (รหัส: ${item.code}) ขอทราบรายละเอียดเพิ่มเติมครับ`

  // 🔗 LINK_PROTOCOL: ใช้โครงสร้าง https://line.me/R/oaMessage/{lineId}/?{message}
  // lineId จาก config คือ @462fqtfc
  const lineUrl = `https://line.me/R/oaMessage/${siteConfig.contact.lineId}/?${encodeURIComponent(lineMessage)}`

  return (
    <div className="hover:shadow-sharp-hover group relative flex h-full flex-col border-b border-r border-slate-100 bg-white transition-all duration-500 last:border-r-0 hover:z-20">
      {/* 🖼️ IMAGE_CONTAINER */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="duration-industrial ease-sharp-out object-cover opacity-80 grayscale-[0.5] transition-transform group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute right-5 top-5 border border-slate-200/50 bg-white/90 px-3 py-1.5 shadow-sharp-sm backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-[#FCDE09] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-none bg-[#FCDE09]"></span>
            </div>
            <span className="font-mono text-[9px] font-black uppercase italic tracking-widest text-slate-950">
              {item.technical.status}
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5">
          <span className="inline-block bg-[#FCDE09] px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-slate-950 shadow-sharp transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-8 lg:p-10">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="mb-1 font-mono text-[10px] font-bold tracking-[0.3em] text-slate-300">
              REGISTRY_UID
            </span>
            <span className="font-mono text-[12px] font-black text-slate-400 transition-colors duration-300 group-hover:text-slate-950">
              {item.code}
            </span>
          </div>
          <div className="border border-slate-100 bg-slate-50 p-3.5 text-slate-400 transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-[#FCDE09] group-hover:bg-[#FCDE09] group-hover:text-slate-950">
            <Icon size={22} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="mb-5 text-3xl font-black uppercase leading-tight tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-[#FCDE09]">
          {item.title}
        </h3>

        <p className="mb-10 line-clamp-3 font-thai text-[16px] font-medium leading-relaxed text-slate-500 group-hover:text-slate-600">
          {item.description}
        </p>

        <div className="mt-auto space-y-10">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              Operating_Protocol
            </span>
            <div className="flex flex-wrap gap-2.5">
              {item.technical.protocol.map((step) => (
                <span
                  key={step}
                  className="rounded-none border border-slate-100 bg-slate-50/50 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-slate-400 transition-colors group-hover:border-slate-200 group-hover:text-slate-600"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-10">
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                FEE_ESTIMATE
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black italic tracking-tighter text-slate-950 transition-colors group-hover:text-[#FCDE09]">
                  ฿{item.price.base}
                </span>
                {item.price.suffix && (
                  <span className="text-[11px] font-bold italic text-slate-400">
                    {item.price.suffix}
                  </span>
                )}
              </div>
            </div>

            {/* 🎯 FIXED: ใช้ lineUrl (oaMessage) เพื่อให้ข้อความไปขึ้นในช่องแชททันที */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex h-16 w-16 items-center justify-center overflow-hidden bg-slate-950 transition-all duration-300 hover:shadow-none active:scale-95 group-hover:bg-[#FCDE09] group-hover:shadow-sharp-brand"
              aria-label={`สอบถามข้อมูลบริการ ${item.title} ผ่าน LINE`}
            >
              <ArrowRight
                size={26}
                className="z-10 text-[#FCDE09] transition-colors group-hover:text-slate-950"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
