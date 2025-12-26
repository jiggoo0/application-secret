/** @format */
"use client"

import Image from "next/image"
import { ArrowRight, Box, Cpu } from "lucide-react"
import { ServiceItem } from "./types"
import { useServiceAction } from "@/hooks/useServiceAction"

interface ServiceCardProps {
  item: ServiceItem
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const { handleExecute } = useServiceAction()

  return (
    <div className="group relative flex flex-col border-b border-r border-slate-200 bg-white transition-all hover:bg-slate-50/50">
      {/* ─── HEADER: SYSTEM ID ─── */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-blue-600" />
          <span className="font-mono text-[9px] font-bold text-slate-400">
            ID_{item.id.toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-[9px] font-black text-slate-300">
          SYS_NODE_v2.8
        </span>
      </div>

      {/* ─── IMAGE UNIT ─── */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="absolute bottom-4 left-6 flex flex-col gap-1">
          <span className="w-fit bg-slate-900 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
            {item.type}
          </span>
          <span className="w-fit bg-blue-600 px-2 py-0.5 text-[8px] font-bold italic text-white">
            {item.highlight}
          </span>
        </div>
      </div>

      {/* ─── CONTENT UNIT ─── */}
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <div className="mb-6">
          <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-tighter text-slate-900">
            {item.title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h3>

          {/* Protocol Trace: กิมมิคขั้นตอนการทำงาน */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-blue-500/60">
              [{item.protocol}]
            </span>
          </div>
        </div>

        <p className="mb-10 text-[13px] font-bold leading-relaxed text-slate-500">
          {item.description}
        </p>

        {/* ─── FOOTER UNIT ─── */}
        <div className="mt-auto border-t border-dashed border-slate-200 pt-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Fixed_Price
              </span>
              <span className="text-3xl font-black tracking-tighter text-slate-900">
                {item.price}
              </span>
            </div>
            <Box
              size={24}
              className="text-slate-100 transition-colors group-hover:text-blue-100"
            />
          </div>

          <button
            onClick={() => handleExecute(item.id, item.title)}
            className="group/btn relative flex w-full items-center justify-center gap-4 overflow-hidden bg-slate-900 py-5 text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-xl transition-all hover:bg-blue-600 active:scale-95"
          >
            <span className="relative z-10">{item.cta}</span>
            <ArrowRight
              size={14}
              className="relative z-10 text-blue-400 transition-transform group-hover/btn:translate-x-2"
            />

            {/* กิมมิคแสงวิ่งบนปุ่มเมื่อ Hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
          </button>
        </div>
      </div>
    </div>
  )
}
