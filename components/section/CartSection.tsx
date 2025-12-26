"use client"

import React from "react"
import Link from "next/link"
import {
  X,
  ArrowRight,
  FileCheck,
  Shield,
  ReceiptText,
  AlertCircle,
} from "lucide-react"
import { navigationConfig } from "@/config/navigation"

interface CartItem {
  id: string
  name: string
  price: string
}

interface CartSectionProps {
  selectedServices: CartItem[]
  onRemove: (id: string) => void
}

export default function CartSection({
  selectedServices = [],
  onRemove,
}: CartSectionProps) {
  if (!selectedServices.length) return null

  const total = selectedServices.reduce((acc, item) => {
    const priceValue = parseInt(item.price.replace(/[^0-9]/g, "")) || 0
    return acc + priceValue
  }, 0)

  return (
    <div className="fixed bottom-6 right-6 z-[90] w-[calc(100%-3rem)] max-w-sm duration-500 ease-out animate-in slide-in-from-right-10 sm:bottom-10 sm:right-10">
      <div className="relative border border-slate-800 bg-slate-900 p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center bg-blue-600/10 text-blue-500">
              <ReceiptText size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Selected_Manifest
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
                Type: Service_Payload
              </span>
            </div>
          </div>
          <div className="flex h-6 items-center bg-blue-600 px-2 text-[10px] font-black text-white">
            {selectedServices.length.toString().padStart(2, "0")}
          </div>
        </div>

        {/* ITEM LIST */}
        <div className="custom-scrollbar max-h-60 overflow-y-auto pr-2">
          <div className="space-y-2">
            {selectedServices.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between border border-slate-800/50 bg-slate-800/30 p-3 transition-all hover:bg-slate-800/60"
              >
                <div className="flex flex-col">
                  <p className="text-[11px] font-black uppercase tracking-tight text-white">
                    {item.name}
                  </p>
                  <p className="font-mono text-[10px] font-bold text-blue-400">
                    ฿
                    {parseInt(
                      item.price.replace(/[^0-9]/g, "")
                    ).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="flex h-7 w-7 items-center justify-center text-slate-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Remove item"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="mb-6 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                Total_Estimation
              </span>
              <div className="h-0.5 w-6 bg-blue-600" />
            </div>
            <span className="text-3xl font-black leading-none tracking-tighter text-white">
              ฿{total.toLocaleString()}
            </span>
          </div>

          <Link
            href={navigationConfig.actions.primary.href}
            className="group relative flex w-full items-center justify-center gap-3 bg-blue-600 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            {navigationConfig.actions.primary.label}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          {/* SECURITY INFO */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-800/50 pt-4 text-[8px] font-black uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield size={10} className="text-blue-500" /> Secured
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck size={10} className="text-blue-500" /> Confidential
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle size={10} className="text-blue-500" /> 24h_Response
            </div>
          </div>
        </div>

        {/* DECORATION */}
        <div className="absolute -left-[1px] -top-[1px] h-3 w-3 border-l border-t border-blue-600" />
        <div className="absolute -bottom-[1px] -right-[1px] h-3 w-3 border-b border-r border-blue-600" />
      </div>
    </div>
  )
}
