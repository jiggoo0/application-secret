/** @format */
"use client"

import React from "react"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

/**
 * 🛠️ CAPABILITY_ITEM_PROTOCOL
 * ----------------------------------------------------------------
 * ส่วนแสดงผลขีดความสามารถ (Capabilities) ในรูปแบบ Modular Box
 * รองรับ Staggered Animation และ Hover Effect สไตล์ระบบ Terminal
 */
interface CapabilityItemProps {
  icon: LucideIcon
  text: string
  delay?: number
}

export const CapabilityItem = ({
  icon: Icon,
  text,
  delay = 0,
}: CapabilityItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1], // Custom ease-out ให้ความรู้สึกพรีเมียม
      }}
      className="group flex cursor-default items-center gap-4 border border-slate-200 bg-white/40 p-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-600 hover:bg-white hover:shadow-lg"
    >
      {/* 🧩 ICON_HOLDER: ปรับการหมุนให้ดูมีความแม่นยำทางวิศวกรรม */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-900 text-white transition-all duration-500 group-hover:rotate-[90deg] group-hover:bg-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]">
        <Icon size={18} strokeWidth={2.5} />
      </div>

      {/* 🏷️ LABEL_TEXT: ใช้ฟอนต์ Mono เพื่อความขลังสไตล์ Log */}
      <span className="font-mono text-[10px] font-black uppercase leading-none tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
        {text}
      </span>

      {/* 🛰️ ACTIVE_INDICATOR: ขีดขนาดเล็กที่จะปรากฏเมื่อ Hover */}
      <div className="ml-auto h-4 w-1 bg-slate-100 opacity-0 transition-all group-hover:bg-blue-600 group-hover:opacity-100" />
    </motion.div>
  )
}
