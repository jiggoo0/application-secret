/** @format */
"use client"

import React from "react"
import { services, type ServiceItem } from "@/components/services/serviceData"
import { ArrowRight, Box } from "lucide-react"
import Image from "next/image"

/**
 * 🛰️ COMPONENT: ServiceSection
 * ส่วนแสดงรายการบริการในรูปแบบ Matrix Grid พื้นผิว Industrial Sharp
 * แก้ไข: ลบ Unused Import 'cn' เพื่อให้ผ่านการตรวจสอบ Lint 100%
 */
export default function ServiceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* 🧩 Blueprint Background Infrastructure */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      {/* Decorative vertical line */}
      <div className="absolute left-[8%] top-0 hidden h-full w-px bg-slate-100 lg:block" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- HEADER: TECHNICAL REGISTRY --- */}
        <header className="mb-20 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-brand" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Service_Capability_Matrix
              </span>
            </div>
            <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-950 md:text-7xl lg:text-8xl">
              Operational <br />
              <span className="italic text-brand drop-shadow-[3px_3px_0px_#020617]">
                Excellence.
              </span>
            </h2>
          </div>

          <div className="max-w-sm border-l-4 border-brand py-2 pl-8">
            <p className="font-thai text-lg font-bold leading-relaxed text-slate-500">
              ยกระดับมาตรฐานงานเอกสารและกลยุทธ์วีซ่าด้วยระบบปฏิบัติการที่ตรวจสอบได้จริงทุกขั้นตอน
            </p>
          </div>
        </header>

        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 shadow-2xl md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}

          {/* ⚡ CUSTOM CTA BOX: ปิดท้าย Grid ให้ดูเป็นระบบ */}
          <div className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-slate-950 p-12 text-center">
            <div className="relative z-10">
              <Box
                className="mx-auto mb-8 animate-pulse text-brand"
                size={48}
                strokeWidth={1}
              />
              <h3 className="mb-4 text-3xl font-black uppercase leading-none tracking-tighter text-white">
                Custom <br /> Architecture
              </h3>
              <p className="mx-auto mb-10 max-w-[200px] font-thai text-sm text-slate-400">
                หากต้องการโซลูชันเฉพาะทางสำหรับธุรกิจระดับองค์กร
              </p>
              <button className="border-b-2 border-brand pb-2 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-brand transition-all group-hover:tracking-[0.4em]">
                REQUEST_PROTOCOL
              </button>
            </div>
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl transition-colors group-hover:bg-brand/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

/** * 📇 INTERNAL_COMPONENT: ServiceCard
 * แยกออกมาเพื่อประสิทธิภาพในการจัดการ State และ Hover effects
 */
function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon

  return (
    <div className="group relative flex h-full flex-col bg-white transition-all duration-500 hover:z-20">
      {/* 🖼️ Image Node */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-95 grayscale-[0.5] transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-slate-950/20 transition-colors duration-500 group-hover:bg-transparent" />

        {/* Status Badge */}
        <div className="absolute right-5 top-5 border border-slate-200 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-950">
            {item.technical.status}
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-5 left-5">
          <span className="bg-brand px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-[4px_4px_0px_0px_#020617]">
            {item.category}
          </span>
        </div>
      </div>

      {/* 📝 Content Node */}
      <div className="flex flex-grow flex-col p-10">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold tracking-widest text-slate-400">
            {item.code}
          </span>
          <div className="bg-slate-50 p-2 text-slate-300 transition-colors duration-300 group-hover:bg-brand group-hover:text-slate-950">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-black uppercase leading-tight tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-brand">
          {item.title}
        </h3>

        <p className="mb-10 line-clamp-2 font-thai text-[15px] font-medium leading-relaxed text-slate-500">
          {item.description}
        </p>

        {/* 🛠️ Technical Protocol Pills */}
        <div className="mt-auto border-t border-slate-50 pt-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {item.technical.protocol.map((step) => (
              <span
                key={step}
                className="border border-slate-100 bg-slate-50/50 px-2.5 py-1 font-mono text-[8px] font-black uppercase tracking-wider text-slate-400"
              >
                {step}
              </span>
            ))}
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                Base_Rate
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
              className="flex h-14 w-14 items-center justify-center bg-slate-950 text-brand transition-all duration-300 active:scale-95 group-hover:bg-brand group-hover:text-slate-950 group-hover:shadow-[8px_8px_0px_0px_rgba(2,6,23,0.1)]"
            >
              <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
