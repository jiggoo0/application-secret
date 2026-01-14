import { Metadata } from "next";
import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Plane,
  FileText,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ) | JP-VISOUL.DOCS",
  description:
    "รวมคำถามที่พบบ่อยเกี่ยวกับบริการวีซ่า งานเอกสาร และการจดทะเบียนธุรกิจ",
};

export default function FAQPage() {
  const faqCategories = [
    {
      id: "visa",
      icon: <Plane className="text-secondary" size={20} />,
      title: "บริการวีซ่า",
      questions: [
        {
          q: "การขอวีซ่าญี่ปุ่นต้องใช้เวลานานเท่าไหร่?",
          a: "โดยปกติจะใช้เวลาประมาณ 5-7 วันทำการหลังจากยื่นเอกสารครบถ้วน ทั้งนี้ขึ้นอยู่กับประเภทของวีซ่าและดุลยพินิจของสถานทูต",
        },
        {
          q: "ถ้าโดนปฏิเสธวีซ่า สามารถยื่นใหม่ได้ทันทีหรือไม่?",
          a: "หากถูกปฏิเสธวีซ่าญี่ปุ่น โดยปกติจะต้องเว้นระยะเวลา 6 เดือนจึงจะสามารถยื่นใหม่ได้ในเหตุผลเดิม ยกเว้นกรณีที่มีการเปลี่ยนแปลงข้อมูลสำคัญอย่างมีนัยสำคัญ",
        },
      ],
    },
    {
      id: "documents",
      icon: <FileText className="text-blue-500" size={20} />,
      title: "งานเอกสารและแปลภาษา",
      questions: [
        {
          q: "เอกสารที่แปลต้องมีการรับรองจากกงสุลหรือไม่?",
          a: "ขึ้นอยู่กับวัตถุประสงค์การใช้งาน หากใช้ยื่นหน่วยงานราชการต่างประเทศ ส่วนใหญ่จำเป็นต้องผ่านการรับรองจากกรมการกงสุล กระทรวงการต่างประเทศ ซึ่งเรามีบริการดำเนินการให้ครบวงจรครับ",
        },
      ],
    },
    {
      id: "payment",
      icon: <ShieldCheck className="text-green-500" size={20} />,
      title: "การชำระเงินและความปลอดภัย",
      questions: [
        {
          q: "ช่องทางการชำระเงินมีอะไรบ้าง?",
          a: "เรามีบริการรับชำระผ่านการโอนเงินผ่านธนาคาร, บัตรเครดิต และมีใบเสร็จรับเงิน/ใบกำกับภาษี ออกให้ทุกครั้งเพื่อความโปร่งใส",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/30 pb-24">
      {/* 1. Header Section */}
      <Header
        title="Frequently Asked Questions"
        description="รวมคำตอบที่คุณสงสัยเกี่ยวกับบริการงานเอกสารและวีซ่า"
        centered={true}
      />

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 2. FAQ Categories & Items */}
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {category.title}
                  </h3>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      className="border border-slate-100 rounded-2xl px-6 transition-all data-[state=open]:border-secondary/30 data-[state=open]:bg-slate-50/50"
                    >
                      <AccordionTrigger className="hover:no-underline py-5 text-left font-bold text-slate-800">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed pb-6 thai-snug">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* 3. Still Have Questions? CTA */}

          <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-primary text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white" />
              <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-8 border-white" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} className="text-secondary" />
              </div>
              <H2 className="text-white border-none p-0 mb-4 text-3xl font-black">
                ยังไม่ได้คำตอบที่ต้องการ?
              </H2>
              <P className="text-slate-300 mb-10 max-w-lg mx-auto">
                หากคุณมีคำถามเฉพาะทาง หรือต้องการปรึกษาเคสวีซ่าเป็นการส่วนตัว
                ทีมงานของเราพร้อมให้บริการผ่านทุกช่องทาง
              </P>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-secondary hover:bg-white hover:text-primary py-7 px-10 rounded-full text-lg font-bold transition-all shadow-xl shadow-secondary/20"
                >
                  <Link
                    href="https://line.me"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={20} /> คุยผ่าน LINE
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 py-7 px-10 rounded-full text-lg font-bold text-white"
                >
                  <Link href="/contact">ติดต่อเจ้าหน้าที่</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
