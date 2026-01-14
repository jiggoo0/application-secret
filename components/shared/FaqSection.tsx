"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H2, Lead } from "@/components/ui/typography";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

// ✅ แก้ไข Path ให้ตรงกับตำแหน่งไฟล์จริงที่ content/faq-data.ts
import { FAQ_DATA } from "@/content/faq-data";

interface FaqSectionProps {
  items?: typeof FAQ_DATA; // รองรับการส่งข้อมูลผ่าน props
}

export default function FaqSection({ items }: FaqSectionProps) {
  // เลือกใช้ข้อมูลจาก props ถ้าไม่มีให้ใช้จากไฟล์ content โดยตรง
  const displayData = items || FAQ_DATA;

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle size={14} />
            FAQ
          </div>
          <H2 className="mb-4 border-none p-0 text-3xl md:text-4xl font-black">
            คำถามที่ <span className="text-secondary">พบบ่อย</span>
          </H2>
          <Lead className="text-slate-500">
            รวบรวมข้อสงสัยที่คุณอาจสงสัย
            เพื่อช่วยให้คุณเข้าใจขั้นตอนการทำงานของเราได้ดียิ่งขึ้น
          </Lead>
        </motion.div>

        {/* Accordion Content */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border border-slate-200 rounded-2xl px-6 overflow-hidden transition-all data-[state=open]:shadow-lg data-[state=open]:border-secondary/30"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left font-bold text-slate-700 hover:text-secondary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 leading-relaxed pb-6 thai-snug">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Support Link */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-medium">
            ไม่พบคำตอบที่คุณต้องการ?{" "}
            <a
              href="/contact"
              className="text-secondary font-bold hover:underline transition-all"
            >
              ติดต่อสอบถามเจ้าหน้าที่โดยตรง
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
