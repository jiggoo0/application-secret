/** @format */
"use client"

import React, { useState } from "react"
import { Plus, Minus, HelpCircle, ChevronRight } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: "VISA_PROCESS",
    question: "การเตรียมเอกสารวีซ่าใช้เวลานานเท่าไหร่?",
    answer:
      "โดยปกติจะใช้เวลา 3-5 วันทำการสำหรับการตรวจเช็คและจัดเตรียมชุดเอกสารให้สมบูรณ์ ทั้งนี้ขึ้นอยู่กับความครบถ้วนของข้อมูลเบื้องต้นที่ลูกค้าส่งให้เรา",
  },
  {
    category: "DOCUMENT_LEGAL",
    question: "JP Visual Docs รับแปลเอกสารด้วยหรือไม่?",
    answer:
      "เรามีบริการจัดหาและประสานงานด้านการแปลเอกสารที่ได้รับการรับรอง เพื่อให้มั่นใจว่าเอกสารแปลของคุณจะถูกต้องตามมาตรฐานที่สถานทูตหรือหน่วยงานราชการกำหนด",
  },
  {
    category: "FINANCIAL_PLAN",
    question: "หากติดปัญหาเรื่อง Statement สามารถปรึกษาได้ไหม?",
    answer:
      "เรามีทีมผู้เชี่ยวชาญช่วยวิเคราะห์สถานะทางการเงิน (DTI Evaluation) และแนะนำการจัดเตรียมเอกสารประกอบเพื่ออธิบายแหล่งที่มาของรายได้ให้มีความน่าเชื่อถือสูงสุด",
  },
  {
    category: "SECURITY",
    question: "ข้อมูลส่วนตัวของฉันจะปลอดภัยหรือไม่?",
    answer:
      "ความลับของลูกค้าคือความสำคัญสูงสุด (Data Privacy) เรามีนโยบายการจัดเก็บและทำลายข้อมูลที่ชัดเจนภายหลังจบงาน เพื่อป้องกันการรั่วไหลของข้อมูลส่วนบุคคล 100%",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* LEFT: SECTION_HEADER */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="mb-6 flex items-center gap-2 text-blue-600">
                <HelpCircle size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Inquiry_Support
                </span>
              </div>
              <h2 className="mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-slate-900 md:text-5xl">
                คำถามที่ <br />
                <span className="text-blue-600">พบบ่อย.</span>
              </h2>
              <p className="mb-8 text-sm font-bold leading-relaxed text-slate-500">
                รวบรวมข้อสงสัยเบื้องต้นเกี่ยวกับการจัดการเอกสาร
                หากคุณมีคำถามเพิ่มเติม
                ทีมงานสถาปนิกข้อมูลของเราพร้อมให้คำปรึกษาทันที
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 underline decoration-blue-600 decoration-2 underline-offset-8 transition-colors hover:text-blue-600"
              >
                Contact_Expert <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT: ACCORDION_LIST */}
          <div className="lg:col-span-8">
            <div className="border-t border-slate-200">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={idx}
                    className={`border-b border-slate-200 transition-all ${isOpen ? "bg-white shadow-sm" : "bg-transparent"}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-6 py-8 text-left"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black tracking-[0.3em] text-blue-600 opacity-60">
                          [{faq.category}]
                        </span>
                        <span
                          className={`text-lg font-black uppercase tracking-tight transition-colors ${isOpen ? "text-blue-600" : "text-slate-900"}`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`flex h-8 w-8 items-center justify-center border transition-all ${isOpen ? "rotate-90 border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-slate-900"}`}
                      >
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="px-6 pb-8 pt-2">
                        <div className="max-w-2xl border-l-2 border-blue-600 pl-6 text-sm font-medium leading-relaxed text-slate-500">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
