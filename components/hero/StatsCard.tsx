/** @format */
"use client"

import React from "react"
import { motion } from "framer-motion"
import { themeConfig } from "@/config/theme"

interface StatsCardProps {
  label: string
  value: string
  unit: string
  color?: string
}

/**
 * 📊 STATS_CARD_PROTOCOL
 * ----------------------------------------------------------------
 * ส่วนแสดงผลสถิติแบบ Industrial Sharp Design
 * ✅ FIXED: JSX Comment Error
 * ✅ FIXED: Theme Token Integration
 */
export const StatsCard = ({
  label,
  value,
  unit,
  color = "text-slate-900",
}: StatsCardProps) => {
  return (
    <div
      className="asset-card group/stat border-2 border-slate-900 bg-white p-6 transition-all duration-300"
      style={{ boxShadow: themeConfig.effects.shadow.sharp }}
    >
      {/* 🏷️ MONO_LABEL: แสดงผลแบบ System Log String */}
      <p className="label-mono opacity-60 transition-opacity group-hover/stat:opacity-100">
        {`// ${label}`}
      </p>

      <div className="mt-2 flex items-baseline gap-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-5xl font-black tracking-tighter ${color} font-sans`}
        >
          {value}
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-black uppercase tracking-widest text-slate-400"
        >
          {unit}
        </motion.span>
      </div>

      {/* 🏗️ DECORATIVE_CORNER: เพิ่มจุดนำสายตาสไตล์ Industrial */}
      <div className="absolute right-2 top-2 h-1.5 w-1.5 bg-slate-100 transition-colors group-hover/stat:bg-blue-600" />
    </div>
  )
}
