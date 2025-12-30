/** @format */
'use client'

import React, { useState } from 'react'
import { faqData } from '@/data/faqData'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-10">
        {/* 🧭 HEADER: Intelligence Briefing Label */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2 bg-[#020617] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
            <HelpCircle size={12} className="animate-pulse" />
            Common_Queries_Log
          </div>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#020617] md:text-6xl">
            FAQ<span className="not-italic text-[#FCDE09]">.</span>
          </h2>
          <div className="mt-4 h-[2px] w-20 bg-[#020617]" />
        </div>

        {/* 📑 ACCORDION_SYSTEM: แผงควบคุมคำถาม */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={cn(
                'border-2 border-[#020617] transition-all duration-300',
                openId === item.id ? 'bg-white shadow-[8px_8px_0px_0px_#020617]' : 'bg-slate-50',
              )}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] font-black text-slate-400">{item.id}</span>
                  <span className="font-thai text-lg font-black uppercase text-[#020617]">
                    {item.question}
                  </span>
                </div>
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center border-2 border-[#020617] transition-colors',
                    openId === item.id ? 'bg-[#FCDE09]' : 'bg-white',
                  )}
                >
                  {openId === item.id ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t-2 border-[#020617] bg-white p-6">
                      <p className="font-thai text-base font-bold leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
