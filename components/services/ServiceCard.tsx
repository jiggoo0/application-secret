/** @format */
"use client"

import React from "react"
import Image from "next/image"
import { Plus, ShieldCheck } from "lucide-react"
import { ServiceCardProps } from "./types"
import { cn } from "@/lib/utils"

export default function ServiceCard({ item, onExecute }: ServiceCardProps) {
  const { title, description, price, icon: Icon, image, technical, type } = item

  return (
    <div className="group relative border border-industrial-border bg-industrial-dark p-4 shadow-sharp transition-all duration-300 hover:border-brand/50 hover:bg-industrial-surface">
      {/* MEDIA_UNIT */}
      <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-industrial-border bg-industrial-black">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div
          className={cn(
            "absolute right-2 top-2 z-10 px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-widest text-white",
            type === "VISA_ASSET" ? "bg-brand" : "bg-industrial-gray"
          )}
        >
          {type.replace("_", " ")}
        </div>
      </div>

      {/* CONTENT_UNIT */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-brand/20 bg-brand/5 text-brand transition-colors group-hover:bg-brand group-hover:text-black">
            <Icon size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight text-white transition-colors group-hover:text-brand">
            {title}
          </h3>
        </div>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-industrial-gray">
          {description}
        </p>

        {/* PROTOCOLS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {technical.protocol.map((step, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 font-mono text-[7px] font-bold uppercase text-brand/60"
            >
              <ShieldCheck size={8} /> {step}
            </span>
          ))}
        </div>
      </div>

      {/* ACTION_UNIT */}
      <div className="mt-6 flex items-center justify-between border-t border-industrial-border/50 pt-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-black text-white">
            ฿{price.base}
          </span>
        </div>
        <button
          onClick={() => onExecute?.(item.code)}
          className="flex h-9 w-9 items-center justify-center bg-brand text-black shadow-sharp transition-all hover:bg-brand-dark active:scale-90"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}
