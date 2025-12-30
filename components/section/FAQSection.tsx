/** * @format
 * @description FAQ_SECTION: Knowledge Base Terminal (V2.6 Refined)
 * ✅ FIX: Scope Alignment via External Data Import
 */

'use client'

import React, { useState } from 'react'
import { Plus, HelpCircle, ChevronRight, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqData } from '@/data/faqData' // ✅ Import Central Data

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('FAQ_01')

  // Safety Check: ป้องกัน Runtime Error หาก Data ไม่ถูกโหลด
  const totalRecords = (faqData?.length ?? 0).toString().padStart(2, '0')

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-white py-32 selection:bg-brand selection:text-slate-950 lg:py-48">
      {/* 🧩 BLUEPRINT_CANVAS */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          {/* 📂 LEFT_SIDE: System Identification */}
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:h-fit">
            <div className="mb-8 inline-flex items-center gap-3 bg-slate-950 px-4 py-1.5 shadow-sharp-sm">
              <div className="h-2 w-2 animate-pulse bg-brand" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
                Knowledge_Base_V2.6
              </span>
            </div>

            <h2 className="mb-10 text-6xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 lg:text-7xl">
              Common <br />
              <span className="not-italic text-brand">Queries.</span>
            </h2>

            <p className="font-thai mb-12 max-w-xs text-lg font-bold leading-relaxed text-slate-500">
              คลังข้อมูลสนับสนุนด้านเทคนิคและกระบวนการทำงาน เพื่อความโปร่งใสสูงสุดในทุกโปรโตคอล
            </p>

            <div className="flex flex-col gap-4 border-t border-slate-100 pt-10">
              <div className="flex items-center gap-4 font-mono text-[11px] font-black uppercase text-slate-950">
                <HelpCircle size={16} className="text-brand" />
                <span>Support_Active: 24/7</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[9px] font-bold uppercase text-slate-400">
                <Hash size={14} className="text-slate-200" />
                <span>Total_Records: {totalRecords}</span>
              </div>
            </div>
          </div>

          {/* 📑 RIGHT_SIDE: Accordion Matrix System */}
          <div className="lg:col-span-8">
            <div className="border-t-4 border-slate-950">
              {faqData?.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div
                    key={item.id}
                    className={cn(
                      'group border-b border-slate-100 transition-colors duration-500',
                      isOpen ? 'bg-slate-50/50' : 'hover:bg-slate-50/30',
                    )}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start gap-8 px-4 py-10 text-left transition-all"
                    >
                      {/* ID Terminal Indicator */}
                      <span
                        className={cn(
                          'mt-1.5 font-mono text-[10px] font-black transition-colors duration-300',
                          isOpen ? 'text-brand' : 'text-slate-300',
                        )}
                      >
                        {item.id.replace('FAQ_', '')}
                      </span>

                      <div className="flex-grow">
                        <div className="mb-4 flex items-center gap-4">
                          <span className="bg-slate-950 px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-brand">
                            {item.tag}
                          </span>
                          <div
                            className={cn(
                              'h-px flex-1 bg-slate-100 transition-all duration-700',
                              isOpen ? 'bg-brand/30' : 'group-hover:bg-slate-200',
                            )}
                          />
                        </div>

                        <h3
                          className={cn(
                            'text-2xl font-black uppercase tracking-tight transition-all duration-500 md:text-3xl',
                            isOpen
                              ? 'italic text-slate-950'
                              : 'text-slate-400 group-hover:text-slate-950',
                          )}
                        >
                          {item.question}
                        </h3>

                        {/* Expandable Data Stream */}
                        <div
                          className={cn(
                            'grid transition-all duration-500 ease-in-out',
                            isOpen
                              ? 'mt-8 grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0',
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="font-thai border-l-4 border-brand pl-8 text-lg font-bold leading-relaxed text-slate-600">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Icon Interaction: Mechanical Toggle */}
                      <div
                        className={cn(
                          'mt-2 flex h-10 w-10 items-center justify-center border-2 transition-all duration-500',
                          isOpen
                            ? 'rotate-45 border-brand bg-brand text-slate-950'
                            : 'border-slate-100 text-slate-300 group-hover:border-slate-950 group-hover:text-slate-950',
                        )}
                      >
                        <Plus size={24} strokeWidth={3} />
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* ⚙️ ACTION_CALL: Terminal Link */}
            <div className="mt-16 flex justify-end">
              <button className="group relative flex items-center gap-6 bg-white py-2 pl-6 transition-all active:scale-95">
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 transition-colors group-hover:text-slate-950">
                  Still_Unclear?_Ask_An_Expert
                </span>
                <div className="shadow-sharp flex h-14 w-14 items-center justify-center bg-slate-950 text-brand transition-all group-hover:bg-brand group-hover:text-slate-950 group-hover:shadow-none">
                  <ChevronRight size={24} strokeWidth={3} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
