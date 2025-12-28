/** @format */
"use client"

import React, { useState } from "react"
// ✅ CLEANED: ลบ Minus ออกเนื่องจากไม่ได้ถูกเรียกใช้ในโค้ด
import { Plus, HelpCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    id: "FAQ_01",
    question: "ต้องเตรียมเงินในบัญชีเท่าไหร่สำหรับการยื่นวีซ่า?",
    answer:
      "จำนวนเงินไม่ได้ถูกกำหนดตายตัว แต่ต้องสัมพันธ์กับระยะเวลาเดินทางและค่าใช้จ่ายจริง ระบบของเราจะช่วยวิเคราะห์ Profile ของคุณเพื่อหาตัวเลขที่เหมาะสมที่สุด (Embassy-Grade Assessment).",
    tag: "FINANCIAL",
  },
  {
    id: "FAQ_02",
    question: "กรณีเคยโดนปฏิเสธวีซ่ามาก่อน สามารถยื่นใหม่ได้ทันทีไหม?",
    answer:
      "สามารถยื่นได้ทันที หากเราพบ 'สาเหตุใหม่' หรือมีการแก้ปมปัญหาเดิม (Restructuring) โดยทีมงานจะทำการ Audit เอกสารเดิมทั้งหมดก่อนดำเนินการขั้นถัดไป.",
    tag: "STRATEGY",
  },
  {
    id: "FAQ_03",
    question: "ระยะเวลาดำเนินการ (Lead Time) ปกติอยู่ที่กี่วัน?",
    answer:
      "มาตรฐานการทำงานอยู่ที่ 5-14 วันทำการ ขึ้นอยู่กับประเภทของ Protocol และความซับซ้อนของเอกสารในเคสนั้นๆ.",
    tag: "TIMELINE",
  },
  {
    id: "FAQ_04",
    question: "ข้อมูลส่วนบุคคลจะถูกเก็บรักษาอย่างไร?",
    answer:
      "ข้อมูลทั้งหมดจะถูกเข้ารหัสผ่านระบบ Secure Node และจะถูกลบออกจากฐานข้อมูลปฏิบัติการทันทีเมื่อการส่งมอบงานเสร็จสิ้นตามนโยบาย Privacy Protocol.",
    tag: "SECURITY",
  },
]

/**
 * 🛰️ COMPONENT: FAQSection
 * ส่วนแสดงคำถามที่พบบ่อย ออกแบบด้วยระบบ Accordion แบบ Industrial High-Contrast
 * แก้ไข: ลบ Unused Import 'Minus' เพื่อให้ผ่านการตรวจสอบ Lint
 */
export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>("FAQ_01")

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-white py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* 📂 LEFT_SIDE: Header & Stats */}
          <div className="space-y-8 lg:col-span-4">
            <div className="inline-flex items-center gap-3 bg-slate-950 px-3 py-1">
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-brand">
                Knowledge_Base_V2
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-slate-950">
              Common <br />
              <span className="not-italic text-brand shadow-[inset_0_-8px_0_0_#020617]">
                Queries.
              </span>
            </h2>
            <p className="max-w-xs font-thai font-bold leading-relaxed text-slate-500">
              คำถามที่พบบ่อยเกี่ยวกับกระบวนการทำงานและมาตรฐานการจัดการระดับสูง
            </p>

            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-center gap-4 font-mono text-[10px] font-black uppercase text-slate-400">
                <HelpCircle size={14} className="text-brand" />
                <span>Support_Active: 24/7</span>
              </div>
            </div>
          </div>

          {/* 📑 RIGHT_SIDE: Accordion System */}
          <div className="lg:col-span-8">
            <div className="border-t border-slate-950">
              {faqData.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div
                    key={item.id}
                    className="group border-b border-slate-100"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start gap-6 py-8 text-left transition-all"
                    >
                      <span className="mt-1 font-mono text-[10px] font-black text-slate-300">
                        [{item.id}]
                      </span>
                      <div className="flex-grow">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-black uppercase text-slate-500">
                            {item.tag}
                          </span>
                        </div>
                        <h3
                          className={cn(
                            "text-xl font-black uppercase tracking-tight transition-colors duration-300",
                            isOpen
                              ? "italic text-brand"
                              : "text-slate-950 group-hover:text-brand"
                          )}
                        >
                          {item.question}
                        </h3>

                        {/* Expandable Content */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-500 ease-in-out",
                            isOpen
                              ? "mt-6 max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <p className="border-l-2 border-brand pl-6 font-thai text-[15px] leading-relaxed text-slate-500">
                            {item.answer}
                          </p>
                        </div>
                      </div>

                      {/* Icon Toggle - Always Plus but rotates 45 degrees when open (forming an X) */}
                      <div
                        className={cn(
                          "mt-1 transition-transform duration-500",
                          isOpen ? "rotate-45" : "rotate-0"
                        )}
                      >
                        <Plus
                          className={cn(
                            "transition-colors",
                            isOpen
                              ? "text-brand"
                              : "text-slate-300 group-hover:text-slate-950"
                          )}
                        />
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Direct Inquiry Action */}
            <div className="mt-12 flex justify-end">
              <button className="group flex items-center gap-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors group-hover:text-slate-950">
                  Still_Unclear?_Ask_An_Expert
                </span>
                <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-brand transition-all group-hover:bg-brand group-hover:text-slate-950">
                  <ChevronRight size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🧩 Background Elements */}
      <div className="absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-full bg-slate-50 opacity-50 blur-3xl" />
    </section>
  )
}
