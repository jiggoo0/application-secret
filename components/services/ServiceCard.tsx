// components/services/ServiceCard.tsx
"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ServiceItem } from "./types"
import { useServiceAction } from "@/hooks/useServiceAction"

interface ServiceCardProps {
  item: ServiceItem
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const { handleExecute } = useServiceAction()

  return (
    <div className="group flex flex-col border-b border-r border-slate-200 bg-white transition-all hover:bg-slate-50">
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
        />
        <div className="absolute bottom-4 left-6">
          <span className="bg-blue-600 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
            {item.type}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-10">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            {/* {item.highlight} */}
          </span>
          <h3 className="mt-2 text-2xl font-black uppercase tracking-tighter text-slate-900">
            {item.title}
          </h3>
        </div>

        <p className="mb-10 text-sm font-bold leading-relaxed text-slate-500">
          {item.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto border-t border-slate-100 pt-8">
          <div className="mb-6 flex items-end justify-between">
            <span className="text-2xl font-black text-slate-900">
              {item.price}
            </span>
          </div>
          <button
            onClick={() => handleExecute(item.id, item.title)}
            className="flex w-full items-center justify-center gap-4 bg-slate-900 py-5 text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-lg transition-all hover:bg-blue-600"
          >
            {item.cta} <ArrowRight size={14} className="text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
