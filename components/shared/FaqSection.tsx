// components/shared/FaqSection.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/shared/Icons";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items?: FaqItem[];
}

/**
 * FaqSection (Production-ready)
 * - Default export (แก้ Element type is invalid)
 * - Guard ป้องกัน crash หาก items ว่าง / undefined
 * - ใช้ Icons registry อย่างปลอดภัย
 */
export default function FaqSection({ items = [] }: FaqSectionProps) {
  if (!Array.isArray(items) || items.length === 0) return null;

  // 🛡️ Guard icon (กันกรณีลืม register Icons.help)
  const HelpIcon = Icons.help ?? Icons.chevronRight;

  return (
    <section className="bg-[#FAFAF9] py-24">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600">
            <HelpIcon size={14} />
            FAQ
          </span>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-[#0A192F] md:text-5xl">
            คำถามที่พบบ่อย
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            รวมคำถามที่ลูกค้าสอบถามบ่อยเกี่ยวกับบริการและกระบวนการทำงานของ
            JP-VISOUL
          </p>
        </div>

        {/* FAQ List */}
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`faq-${index}`}
              className="rounded-2xl border border-slate-100 bg-white px-6 transition-shadow hover:shadow-sm"
            >
              <AccordionTrigger className="py-6 text-left text-base font-black text-slate-800 hover:no-underline">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="pb-6 text-sm font-medium leading-relaxed text-slate-500">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
