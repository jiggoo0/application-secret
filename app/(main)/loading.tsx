/** @format */
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cpu, Zap } from "lucide-react"

/**
 * 🛠️ LOADING_PROTOCOL: SYSTEM_SYNCHRONIZATION
 * หน้าจอแสดงผลระหว่างรอการประมวลผลข้อมูล (Data Hydration)
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white">
      {/* 🧩 BACKGROUND_PATTERN: INDUSTRIAL_GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* 🏗️ ANIMATED_CORE: ระบบกำลังประมวลผล */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex h-20 w-20 items-center justify-center border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
          >
            <Cpu size={32} className="text-blue-600" />
          </motion.div>

          {/* Decorative Corner Brackets */}
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-blue-600" />
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-blue-600" />
        </div>

        {/* 📊 STATUS_TEXT: ข้อมูลทางเทคนิค */}
        <div className="text-center">
          <h3 className="mb-2 font-mono text-xs font-black uppercase tracking-[0.4em] text-slate-900">
            System_Syncing...
          </h3>

          <div className="flex items-center justify-center gap-2">
            <Zap
              size={10}
              className="animate-pulse fill-blue-600 text-blue-600"
            />
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Fetching_Registry_Data_v
              {new Date().getTime().toString().slice(-4)}
            </span>
          </div>
        </div>

        {/* 📏 PROGRESS_BAR_SIMULATION */}
        <div className="relative mt-8 h-1 w-48 overflow-hidden bg-slate-100">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-blue-600"
          />
        </div>
      </div>

      {/* 🏁 FOOTER_METADATA */}
      <div className="absolute bottom-10 flex flex-col items-center opacity-20">
        <span className="font-mono text-[7px] font-black uppercase tracking-[0.5em] text-slate-900">
          JP_VISUAL_DOCS // ARCHITECTURE_STABLE
        </span>
      </div>
    </div>
  )
}
