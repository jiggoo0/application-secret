/** @format */
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Terminal, Fingerprint, ShieldCheck } from "lucide-react"
import { siteConfig } from "@/config/site"
import { StatsCard } from "./StatsCard"
import { stats } from "./heroData"

/**
 * 🖥️ DATA_TERMINAL_COMPONENT
 * ----------------------------------------------------------------
 * ส่วนแสดงผล Terminal ด้านขวาของ Hero Section
 * รวบรวมสถิติสำคัญและการแสดงสถานะความปลอดภัยของระบบ
 */
export const DataTerminal = () => {
  return (
    <div className="relative w-full max-w-md">
      {/* ⚡ SCAN LINE OVERLAY: เรียกใช้จาก globals.css */}
      <div className="scan-line-overlay" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 border-2 border-slate-900 bg-white p-8 shadow-[24px_24px_0px_0px_rgba(15,23,42,1)] transition-all duration-500 hover:shadow-[32px_32px_0px_0px_rgba(37,99,235,1)]"
      >
        {/* TERMINAL_HEADER */}
        <div className="relative mb-8 flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            {/* Status Indicator: กะพริบตามสถานะใน site.ts */}
            <div
              className={`h-3 w-3 ${siteConfig.system.indicatorColor} animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]`}
            />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                ENCRYPTED_LINK
              </span>
              <span className="text-xs font-black uppercase text-slate-900">
                {siteConfig.system.label}
              </span>
            </div>
          </div>
          <Fingerprint size={24} className="animate-pulse text-blue-600" />
        </div>

        {/* STATS_REGISTRY: วนลูปแสดงผล StatsCard */}
        <div className="space-y-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              color={stat.color}
            />
          ))}
        </div>

        {/* TERMINAL_FOOTER */}
        <div className="mt-8 flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
          <div className="flex flex-col gap-1">
            <code className="font-mono text-[10px] font-black uppercase tracking-widest text-blue-600">
              SYS_LOG: {siteConfig.system.version}
            </code>
            <span className="text-[8px] font-bold uppercase text-slate-300">
              Authorization: Root_Access
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-slate-200" />
            <Terminal size={20} className="text-slate-900" />
          </div>
        </div>
      </motion.div>

      {/* BACKGROUND_DECORATION: เพิ่ม Layer ให้ดูมีมิติ */}
      <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border-2 border-dashed border-slate-200" />
    </div>
  )
}
