/** @format */
"use client"

import React, { useState } from "react"
import { Plus, HelpCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 🛰️ DATA: faqData (V2 - Updated Content)
 * ปรับปรุงเนื้อหาให้ดูเป็นมืออาชีพและสร้างความมั่นใจ (MODE C)
 */
const faqData = [
  {
    id: "FAQ_01",
    question: "ต้องเตรียมยอดเงินในบัญชีเท่าไหร่เพื่อให้วีซ่ามีโอกาสผ่านสูง?",
    answer:
      "ไม่มีตัวเลขตายตัวที่สถานทูตกำหนด แต่ยอดเงินต้องสัมพันธ์กับแผนการเดินทางและอาชีพของคุณ ทีมงานจะช่วยวิเคราะห์โปรไฟล์ (Profile Analysis) เพื่อช่วยคุณเตรียมตัวเลขที่เหมาะสมและน่าเชื่อถือที่สุดในสายตาเจ้าหน้าที่",
    tag: "FINANCIAL",
  },
  {
    id: "FAQ_02",
    question: "หากเคยถูกปฏิเสธวีซ่ามาก่อน ยังมีโอกาสยื่นผ่านไหม?",
    answer:
      "มีโอกาสสูงครับ เราจะเริ่มจากการวิเคราะห์สาเหตุการปฏิเสธเดิม (Refusal Audit) เพื่ออุดรอยรั่วและจัดเตรียมเอกสารใหม่ให้รัดกุมกว่าเดิม โดยเน้นการสร้างน้ำหนักของหลักฐานใหม่ประกอบการยื่นเพื่อให้พิจารณาได้ง่ายขึ้น",
    tag: "STRATEGY",
  },
  {
    id: "FAQ_03",
    question: "กระบวนการเตรียมเอกสารใช้เวลานานแค่ไหน?",
    answer:
      "โดยปกติจะใช้เวลาประมาณ 5-14 วันทำการ ทั้งนี้ขึ้นอยู่กับความซับซ้อนของเคสและประเภทวีซ่า เราเน้นความประณีตและการตรวจสอบที่ถี่ถ้วน (Multi-step Verification) เพื่อให้มั่นใจว่าเอกสารจะสมบูรณ์ที่สุดก่อนส่งมอบ",
    tag: "TIMELINE",
  },
  {
    id: "FAQ_04",
    question: "ข้อมูลส่วนบุคคลจะถูกเก็บรักษาอย่างไร?",
    answer:
      "เราให้ความสำคัญกับความเป็นส่วนตัวสูงสุด ข้อมูลทั้งหมดจะถูกจัดการผ่านระบบที่ปลอดภัย (Secure Node) และจะถูกลบออกจากระบบปฏิบัติการทันทีเมื่อการส่งมอบงานเสร็จสิ้นตามนโยบาย Privacy Protocol",
    tag: "SECURITY",
  },
]

/**
 * 🛰️ COMPONENT: FAQSection
 * ส่วนแสดงคำถามที่พบบ่อย ออกแบบด้วยระบบ Accordion แบบ Industrial High-Contrast
 */
export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>("FAQ_01")

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-white py-32">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* 📂 LEFT_SIDE: Header & Status */}
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

                        {/* Expandable Content Area */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-500 ease-in-out",
                            isOpen
                              ? "mt-6 max-h-48 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <p className="border-l-2 border-brand pl-6 font-thai text-[15px] leading-relaxed text-slate-500">
                            {item.answer}
                          </p>
                        </div>
                      </div>

                      {/* Icon Toggle: Plus with 45deg rotation */}
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

            {/* Direct Action Link */}
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

      {/* 🧩 UI Decorations */}
      <div className="absolute bottom-0 right-0 -mb-32 -mr-32 h-64 w-64 rounded-full bg-slate-50 opacity-50 blur-3xl" />
    </section>
  )
}
