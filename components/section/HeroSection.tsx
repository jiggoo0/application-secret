/** @format */
"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { navigationConfig } from "@/config/navigation"
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Database,
  Globe,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react"

// ─── ICON CONFIG ─────────────────────────────
const ICON_SIZE_SMALL = 14 // Capability icons
const ICON_SIZE_MEDIUM = 18 // Buttons / arrows
const ICON_SIZE_LARGE = 40 // Metric highlight
const ICON_COLOR_DEFAULT = "text-slate-400"
const ICON_COLOR_HOVER = "group-hover:text-blue-600"
const ICON_TRANSITION = "transition-colors duration-300 ease-in-out"

// --- TYPES ---
interface StatItem {
  label: string
  value: string
  unit: string
}

interface CapabilityItem {
  label: string
  icon: LucideIcon
}

export default function HeroSection() {
  const stats: StatItem[] = [
    { label: "Total_Clients", value: "180", unit: "+" },
    { label: "Project_Deployed", value: "80", unit: "+" },
    { label: "Operation_Years", value: "8", unit: "YRS" },
  ]

  const capabilities: CapabilityItem[] = [
    { label: "VISA_STRATEGY_PROTOCOL", icon: Globe },
    { label: "DATA_ENCRYPTION_LAYER", icon: Database },
    { label: "LEGAL_DRAFTING_UNIT", icon: ShieldCheck },
  ]

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-white pb-20 pt-32 md:pt-48 lg:flex lg:items-center">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-slate-50">
        <Image
          src="/images/hero/HeroBackground.png"
          alt="JP Visual Docs Architecture"
          fill
          priority
          className="object-cover object-center opacity-[0.06] grayscale transition-opacity duration-1000"
        />
        <div className="bg-blueprint absolute inset-0 opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_90%)]" />
      </div>

      {/* WATERMARK */}
      <div className="pointer-events-none absolute right-[-8%] top-[15%] z-0 hidden rotate-90 select-none opacity-[0.015] xl:block">
        <span className="text-[22vw] font-black leading-none tracking-tighter text-slate-900">
          JP_CORE.v8
        </span>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center justify-center border-b-2 border-blue-600 bg-slate-900 px-4 py-2 text-white shadow-2xl">
                <Activity
                  size={ICON_SIZE_SMALL}
                  className="animate-pulse text-blue-500"
                />
                <span className="ml-3 text-[10px] font-black uppercase tracking-[0.3em]">
                  System_Live: Active
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 opacity-60">
                Architectural_Documentation_Unit
              </span>
            </div>

            <h1 className="mb-10 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 md:text-8xl">
              WE DESIGN <br />
              <span className="text-blue-600">SUCCESS</span> <br />
              STRUCTURES<span className="text-blue-600">.</span>
            </h1>

            <p className="mb-12 max-w-2xl border-l-4 border-blue-600 pl-6 text-lg font-bold leading-relaxed text-slate-500 md:text-xl">
              ไม่ใช่แค่การจัดเตรียมเอกสาร
              แต่เราคือสถาปนิกผู้ออกแบบโครงสร้างความน่าเชื่อถือ
              ยกระดับโปรไฟล์ของคุณผ่านระบบจัดการที่แม่นยำที่สุด
              <span className="font-black italic text-slate-900">
                {" "}
                โดยทีมงานมืออาชีพและประสบการณ์ตรง 8 ปี
              </span>
            </p>

            <div className="flex flex-col gap-5 sm:flex-row">
              <Link
                href={
                  navigationConfig.mainNav.find((l) => l.label === "SOLUTIONS")
                    ?.href || "/services"
                }
                className="group flex items-center justify-center gap-4 bg-slate-900 px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-2xl transition-all hover:bg-blue-600 active:scale-95"
              >
                Execute_Process
                <ArrowRight
                  size={ICON_SIZE_MEDIUM}
                  className={`text-blue-400 transition-transform group-hover:translate-x-2`}
                />
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-4 border-2 border-slate-100 bg-white px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95"
              >
                Methodology_Log{" "}
                <ArrowUpRight size={ICON_SIZE_MEDIUM} className="opacity-40" />
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-4">
            <div className="group relative border-2 border-slate-900 bg-white/90 p-10 shadow-[24px_24px_0px_0px_rgba(15,23,42,1)] backdrop-blur-md transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[30px_30px_0px_0px_rgba(37,99,235,1)]">
              <div className="absolute -top-4 left-6 bg-blue-600 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-xl transition-colors group-hover:bg-slate-900">
                Data_Verification
              </div>

              <div className="space-y-10">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={
                      index !== 0 ? "border-t border-slate-100 pt-8" : ""
                    }
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black tracking-tighter text-slate-900">
                        {stat.value}
                      </span>
                      <span className="text-xl font-black text-blue-600">
                        {stat.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between border-t-2 border-dashed border-slate-200 pt-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Security_Protocol
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 w-5 bg-blue-600/20 last:bg-blue-600"
                      />
                    ))}
                  </div>
                </div>
                <ShieldCheck
                  size={ICON_SIZE_LARGE}
                  className={`text-slate-100 ${ICON_COLOR_HOVER} ${ICON_TRANSITION}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="absolute bottom-0 left-0 hidden w-full border-t border-slate-100 bg-white/80 py-8 backdrop-blur-sm xl:block">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              {capabilities.map((item, i) => (
                <div
                  key={i}
                  className="group flex cursor-default items-center gap-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 transition-colors group-hover:border-blue-600">
                    <item.icon
                      size={ICON_SIZE_SMALL}
                      className={`${ICON_COLOR_DEFAULT} ${ICON_COLOR_HOVER} ${ICON_TRANSITION}`}
                    />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 transition-colors group-hover:text-slate-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-ping rounded-full bg-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">
                EST. 2017 // GLOBAL_OPS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
