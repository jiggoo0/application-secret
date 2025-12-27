/** @format */
"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { navigationConfig } from "@/config/navigation"
import { ArrowRight, Activity, ArrowUpRight, Fingerprint } from "lucide-react"

import { CapabilityItem } from "../hero/CapabilityItem"
import { DataTerminal } from "../hero/DataTerminal"
import { capabilities } from "../hero/heroData"

/**
 * 🏗️ HERO_SECTION_ARCHITECT
 * ----------------------------------------------------------------
 * ส่วนหัวของเว็บไซต์ที่สะท้อนถึงภาพลักษณ์ "สถาปนิกด้านเอกสาร"
 */
export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white selection:bg-blue-600 selection:text-white">
      {/* 🧩 UI_LAYERS: Blueprint & Scanline */}
      <div className="bg-blueprint pointer-events-none absolute inset-0 z-0" />
      <div className="scan-line-overlay" />

      {/* 🛰️ SYSTEM_WATERMARK */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute right-[-5%] top-[15%] z-0 hidden rotate-90 select-none font-sans text-[18vw] font-black tracking-tighter text-slate-900 xl:block"
      >
        {`${siteConfig.shortName}_${siteConfig.system.version}`}
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-24 md:pt-32 lg:pt-0">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* 🏗️ LEFT_BLOCK: STRATEGIC MESSAGING */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="label-mono group inline-flex cursor-default">
                <Activity size={14} className="animate-pulse text-blue-600" />
                <span className="transition-colors group-hover:text-slate-900">
                  Operational_Status: {siteConfig.system.status}
                </span>
              </div>

              <h1 className="headline-sharp mb-8 text-balance">
                We Build <br />
                <span className="text-blue-600">Trust</span> <br />
                Architectures<span className="text-blue-600">.</span>
              </h1>

              <p className="mb-10 max-w-xl border-l-4 border-blue-600 pl-6 text-lg font-bold leading-relaxed text-slate-500 md:text-xl">
                เราไม่ใช่แค่บริษัทจัดการเอกสาร
                แต่เราคือสถาปนิกผู้ออกแบบโครงสร้างความน่าเชื่อถือ
                ยกระดับโปรไฟล์สู่มาตรฐานที่ทั่วโลกยอมรับ
              </p>

              {/* Functional Capabilities Grid */}
              <div className="mb-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {capabilities.map((cap, i) => (
                  <CapabilityItem key={i} {...cap} />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-6 sm:flex-row">
                <Link
                  href={navigationConfig.mainNav[1].href}
                  className="btn-industrial group"
                >
                  Execute_Process
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-2"
                  />
                </Link>
                <Link
                  href="/#about-section"
                  className="flex items-center justify-center gap-4 border-2 border-slate-900 bg-white px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
                >
                  Method_Log
                  <ArrowUpRight
                    size={18}
                    className="opacity-40 group-hover:opacity-100"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 🖥️ RIGHT_BLOCK: DATA_TERMINAL */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <DataTerminal />
          </div>
        </div>
      </div>

      {/* 🏷️ SYSTEM_FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-10 hidden items-center gap-4 xl:flex"
      >
        <Fingerprint className="text-blue-600 opacity-20" size={40} />
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Identity_Verified
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-300">
            EST_2017_{siteConfig.shortName}_OFFICIAL
          </span>
        </div>
      </motion.div>
    </section>
  )
}
