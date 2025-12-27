/** @format */
"use client"

import React from "react"
import Link from "next/link"
import {
  X,
  ArrowRight,
  FileCheck,
  Shield,
  ReceiptText,
  ShieldAlert,
} from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  name: string
  price: string
}

interface CartSectionProps {
  selectedServices: CartItem[]
  onRemove: (id: string) => void
}

/**
 * 🛰️ CART_SECTION_COMPONENT (MANIFEST_VIEWER)
 * ----------------------------------------------------------------
 * ระบบตะกร้าบริการสไตล์ Industrial พร้อมระบบส่งข้อมูลเข้า LINE
 * ✅ FIXED: Unused 'id' variable warning
 * ✅ IMPROVED: Price parsing logic & LINE formatting
 */
export default function CartSection({
  selectedServices = [],
  onRemove,
}: CartSectionProps) {
  // หากไม่มีสินค้าในตะกร้า จะไม่เรนเดอร์คอมโพเนนต์เลย
  if (!selectedServices.length) return null

  // 🧮 CALCULATION_LOGIC: คำนวณยอดรวม (ลบอักขระที่ไม่ใช่ตัวเลขออก)
  const total = selectedServices.reduce((acc, item) => {
    const priceValue = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0
    return acc + priceValue
  }, 0)

  /**
   * 📨 LINE_MESSAGE_GENERATOR
   * จัดรูปแบบข้อความเพื่อเปิดใน LINE OA โดยตรง
   */
  const generateLineUrl = () => {
    const itemsText = selectedServices
      .map((item, index) => `${index + 1}. ${item.name} [${item.price}]`)
      .join("\n")

    const message =
      `สวัสดีครับ สนใจรับบริการดังนี้ครับ:\n\n` +
      `📦 รายการที่เลือก:\n${itemsText}\n\n` +
      `💰 ยอดรวมประมาณการ: ฿${total.toLocaleString()}\n` +
      `------------------\n` +
      `ยืนยันการขอคำปรึกษาจากเว็บไซต์`

    return `https://line.me/R/oaMessage/${siteConfig.contact.lineId}/?${encodeURIComponent(message)}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] w-[calc(100%-3rem)] max-w-sm duration-500 ease-out animate-in slide-in-from-right-10 sm:bottom-10 sm:right-10">
      <div className="relative border border-slate-800 bg-slate-900 p-6 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] backdrop-blur-md">
        {/* 📑 01. HEADER: MANIFEST_IDENTITY */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center bg-blue-600/10 text-blue-600">
              <ReceiptText size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Selected_Manifest
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
                Status: Ready_to_Execute
              </span>
            </div>
          </div>
          <div className="flex h-6 items-center bg-blue-600 px-2 text-[10px] font-black text-white">
            {selectedServices.length.toString().padStart(2, "0")}
          </div>
        </div>

        {/* 📋 02. ITEM_LIST: แสดงรายการที่เลือก */}
        <div className="custom-scrollbar max-h-60 overflow-y-auto pr-2">
          <div className="space-y-2">
            {selectedServices.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between border border-slate-800/50 bg-slate-900/50 p-3 transition-all hover:border-blue-600/50"
              >
                <div className="flex flex-col">
                  <p className="text-[11px] font-black uppercase tracking-tight text-white transition-colors group-hover:text-blue-600">
                    {item.name}
                  </p>
                  <p className="font-mono text-[10px] font-bold text-blue-600">
                    ฿
                    {parseInt(
                      item.price.replace(/[^0-9]/g, ""),
                      10
                    ).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="flex h-7 w-7 items-center justify-center text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 03. SUMMARY & EXECUTION */}
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
            href={generateLineUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative flex w-full items-center justify-center gap-3 bg-blue-600 py-4",
              "text-[11px] font-black uppercase tracking-[0.3em] text-white",
              "shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:bg-blue-700 active:translate-x-1 active:translate-y-1 active:shadow-none"
            )}
          >
            EXECUTE_ORDER (LINE)
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          {/* 🛡️ 04. SECURITY_FOOTER */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-800/50 pt-4 text-[8px] font-black uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield size={10} className="text-blue-600" /> Secured
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck size={10} className="text-blue-600" /> Confidential
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert size={10} className="text-blue-600" /> 24h_Response
            </div>
          </div>
        </div>

        {/* 📐 DECORATIVE_CORNERS */}
        <div className="absolute -left-[1px] -top-[1px] h-3 w-3 border-l border-t border-blue-600" />
        <div className="absolute -bottom-[1px] -right-[1px] h-3 w-3 border-b border-r border-blue-600" />
      </div>
    </div>
  )
}
