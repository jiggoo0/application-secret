/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.905Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: FAQSection          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */
'use client'

import React, { useState } from 'react'
import { faqData } from '@/data/faqData'
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * 🧱 COMPONENT: FAQSection_REDESIGN
 * VERSION: 2026.1.0
 * STYLE: Industrial / Ledger / Trust-Oriented
 * INTENT: อ่านง่าย คุมจังหวะ ลด Animation ฟุ่มเฟือย
 */
export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="relative bg-white py-28 text-[#020617]">
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* HEADER */}
        <div className="mb-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <HelpCircle size={14} className="text-[#FCDE09]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">
              FREQUENTLY_VERIFIED_QUERIES
            </span>
          </div>

          <h2 className="text-5xl font-black uppercase italic tracking-tighter md:text-6xl">
            FAQ<span className="not-italic text-[#FCDE09]">.</span>
          </h2>

          <p className="font-thai mt-6 max-w-xl text-lg font-bold leading-relaxed text-slate-600">
            คำถามที่พบบ่อย ถูกจัดหมวด ตรวจสอบ และตอบตามกระบวนการทำงานจริง
          </p>
        </div>

        {/* FAQ LEDGER */}
        <div className="shadow-sharp divide-y-2 divide-[#020617] border-4 border-[#020617] bg-white">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={cn(
                    'group flex w-full items-center justify-between px-8 py-6 text-left transition-colors',
                    isOpen ? 'bg-slate-50' : 'bg-white',
                  )}
                >
                  <div className="flex items-start gap-6">
                    <span className="mt-1 font-mono text-[10px] font-black text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="font-thai text-lg font-black leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center border-2 border-[#020617] transition-all',
                      isOpen ? 'bg-[#FCDE09] text-[#020617]' : 'bg-white text-[#020617]',
                    )}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-6 border-t-2 border-[#020617] bg-white px-8 py-6">
                        <ArrowRight size={20} className="mt-1 text-[#FCDE09]" strokeWidth={3} />
                        <p className="font-thai text-base font-bold leading-relaxed text-slate-600">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
