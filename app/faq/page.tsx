/**
 * FAQ Page – Production Ready
 * - App Router compatible
 * - ใช้ SITE_CONFIG เป็น Single Source of Truth
 * - ป้องกัน crash (Line / Contact)
 * - Structure + format พร้อมใช้งานจริง
 */

import { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  HelpCircle,
  Plane,
  ShieldCheck,
  MessageCircle,
  Wallet,
} from "lucide-react";

import { SITE_CONFIG } from "@/constants/site-config";
import { CONTACT_CHANNELS } from "@/lib/utils/line-link";

/* =====================
 * Metadata
 * ===================== */
export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ) | JP-VISOUL Professional Docs",
  description:
    "รวมคำถามเกี่ยวกับบริการจัดการเอกสารกงสุล วีซ่า และการวางโครงสร้างเอกสารการเงินเพื่อการอนุมัติ",
};

/* =====================
 * Page
 * ===================== */
export default function FAQPage() {
  const lineUrl = CONTACT_CHANNELS?.line?.officialUrl;

  const faqCategories = [
    {
      id: "finance",
      icon: <Wallet size={20} className="text-blue-600" />,
      title: "การวางโครงสร้างเอกสารการเงิน",
      questions: [
        {
          q: "กรณีไม่มีเอกสารรายได้หรือสเตทเม้นไม่สวย สามารถปรึกษาได้ไหม?",
          a: "ปรึกษาได้ครับ เรามีผู้เชี่ยวชาญช่วยวิเคราะห์และวางโครงสร้างเอกสารรายได้ (Document Structuring) ให้สอดคล้องกับเงื่อนไขการพิจารณาของสถาบันการเงินหรือสถานทูต เพื่อเพิ่มความน่าเชื่อถือของโปรไฟล์ให้สูงที่สุด",
        },
        {
          q: "การจัดเตรียมเอกสารใช้เวลานานเท่าไหร่?",
          a: "โดยปกติขั้นตอนวิเคราะห์และออกแบบโครงสร้างเอกสารจะใช้เวลา 1–3 วันทำการ หลังจากได้รับข้อมูลครบถ้วน และมีการตรวจสอบซ้ำก่อนส่งมอบทุกครั้ง",
        },
      ],
    },
    {
      id: "visa",
      icon: <Plane size={20} className="text-blue-500" />,
      title: "บริการวีซ่าและที่พัก",
      questions: [
        {
          q: "ตั๋วเครื่องบินและโรงแรมที่จัดให้ ตรวจสอบได้จริงหรือไม่?",
          a: "ตรวจสอบได้ 100% ผ่านระบบ Global Distribution System (GDS) พร้อมรหัส PNR ที่สามารถตรวจสอบได้โดยตรงจากสายการบินหรือโรงแรม",
        },
        {
          q: "มีบริการร่างจดหมายชี้แจงสถานะ (Cover Letter) หรือไม่?",
          a: "มีครับ เราร่างจดหมายภาษาอังกฤษเชิงทางการ เพื่ออธิบายจุดอ่อนของเคสหรือความสัมพันธ์สำหรับวีซ่าสปอนเซอร์โดยเฉพาะ",
        },
      ],
    },
    {
      id: "trust",
      icon: <ShieldCheck size={20} className="text-emerald-500" />,
      title: "ความปลอดภัยและความเป็นส่วนตัว",
      questions: [
        {
          q: "ข้อมูลส่วนตัวและเอกสารจะถูกเก็บเป็นความลับหรือไม่?",
          a: "ข้อมูลทั้งหมดถูกใช้เฉพาะเพื่อการดำเนินงาน และจะถูกจัดการภายใต้นโยบายความปลอดภัยระดับสูงสุด พร้อมทำลายข้อมูลเมื่อสิ้นสุดกระบวนการ",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF9] pb-24">
      {/* =====================
       * Header
       * ===================== */}
      <Header
        title="Professional Support"
        description="คำถามที่พบบ่อยเกี่ยวกับระบบจัดการเอกสารและวีซ่า"
        centered
      />

      <div className="container relative z-10 mx-auto -mt-12 px-4">
        <div className="mx-auto max-w-4xl space-y-10">
          {faqCategories.map((category) => (
            <section
              key={category.id}
              className="rounded-[3rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12"
            >
              <div className="mb-10 flex items-center gap-4">
                <div className="rounded-[1.2rem] bg-slate-50 p-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#0A192F]">
                  {category.title}
                </h3>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={`${category.id}-${index}`}
                    value={`${category.id}-${index}`}
                    className="rounded-[1.5rem] border border-slate-100 px-8 transition-all data-[state=open]:border-blue-100 data-[state=open]:bg-blue-50/30"
                  >
                    <AccordionTrigger className="py-6 text-left text-lg font-black text-slate-800 hover:text-blue-600">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 text-base font-medium leading-relaxed text-slate-500">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}

          {/* =====================
           * CTA
           * ===================== */}
          {lineUrl && (
            <section className="relative mt-20 overflow-hidden rounded-[4rem] bg-[#0A192F] p-10 text-center text-white shadow-2xl md:p-16">
              <div className="relative z-10">
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                  <HelpCircle size={40} className="text-blue-500" />
                </div>

                <H2 className="mb-6 border-none p-0 text-3xl font-black italic uppercase tracking-tight text-white md:text-5xl">
                  ต้องการปรึกษา <br className="md:hidden" />
                  <span className="text-blue-500">เคสเฉพาะบุคคล?</span>
                </H2>

                <P className="mx-auto mb-12 max-w-xl text-lg font-medium text-slate-400">
                  ทีม {SITE_CONFIG.shortName}
                  พร้อมให้คำปรึกษาเชิงลึกผ่านช่องทางส่วนตัว
                  ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุด
                </P>

                <Button
                  asChild
                  className="rounded-[2rem] bg-[#06C755] px-12 py-8 text-xl font-black shadow-2xl shadow-emerald-900/30 transition-all hover:bg-[#05b34c] active:scale-95"
                >
                  <Link
                    href={lineUrl}
                    target="_blank"
                    className="flex items-center gap-3"
                  >
                    <MessageCircle size={24} fill="white" />
                    LINE CONSULT
                  </Link>
                </Button>
              </div>

              <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
