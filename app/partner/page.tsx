// app/(marketing)/partner/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Wallet,
  Zap,
  ShieldCheck,
  Handshake,
  ArrowRight,
  Rocket,
} from "lucide-react";

import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Partner Program | ร่วมเป็นพันธมิตรกับ JP-VISOUL",
  description:
    "โอกาสทางธุรกิจสำหรับนายหน้าและเจ้าของธุรกิจ ร่วมเป็นส่วนหนึ่งของเครือข่ายจัดการเอกสารระดับมืออาชีพ",
};

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface PartnerType {
  title: string;
  type: string;
  requirement: string;
  highlight: string;
}

export default function PartnerPage() {
  const benefits: BenefitItem[] = [
    {
      icon: <Wallet className="text-emerald-600" />,
      title: "High Commission Rate",
      desc: "เรทส่วนแบ่งที่แข่งขันได้ พร้อมระบบจ่ายเงินตรงเวลาและโปร่งใส",
    },
    {
      icon: <Zap className="text-blue-600" />,
      title: "Back-office Support",
      desc: "คุณโฟกัสที่การหาลูกค้า เราดูแลทุกขั้นตอนของงานเอกสาร",
    },
    {
      icon: <ShieldCheck className="text-indigo-600" />,
      title: "Trusted Expertise",
      desc: "ทำงานภายใต้มาตรฐาน JP-VISOUL ที่พิสูจน์ผลลัพธ์มาแล้ว",
    },
  ];

  const partnerTypes: PartnerType[] = [
    {
      title: "Independent Agent (นายหน้าอิสระ)",
      type: "Commission Based",
      requirement:
        "บุคคลทั่วไปที่มีฐานลูกค้าด้านวีซ่า สินเชื่อ หรือเอกสารธุรกิจ",
      highlight: "รับส่วนแบ่งทันทีเมื่อจบงาน",
    },
    {
      title: "Business Partner (เจ้าของธุรกิจ)",
      type: "White Label / B2B",
      requirement: "บริษัททัวร์ เอเจนซี่เรียนต่อ หรือที่ปรึกษาทางการเงิน",
      highlight: "เรทราคาส่ง (Wholesale Rate)",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* 1. Hero */}
      <Header
        title="Business Partner"
        description="เปลี่ยนเครือข่ายของคุณให้เป็นรายได้ ด้วยระบบจัดการเอกสารระดับพรีเมียม"
        centered
      />

      <div className="container relative z-10 mx-auto -mt-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* 2. Benefits */}
          <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-white p-10 text-left shadow-xl shadow-slate-200/40 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-black italic uppercase tracking-tighter text-[#0A192F]">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>

          {/* 3. Value Statement */}
          <section className="mb-16 flex flex-col items-end justify-between gap-8 border-b border-slate-100 pb-12 md:flex-row">
            <div className="max-w-2xl">
              <Badge className="mb-4 rounded-md border border-blue-600/10 bg-blue-600/5 px-4 py-1.5 text-[9px] font-black uppercase italic tracking-[0.3em] text-blue-600">
                Opportunity
              </Badge>
              <H2 className="border-none p-0 text-3xl font-black italic uppercase tracking-tighter text-[#0A192F] md:text-5xl">
                คุณหาลูกค้า <br />
                <span className="text-blue-600">เราจัดการส่วนที่เหลือเอง</span>
              </H2>
            </div>
            <P className="max-w-sm text-lg font-medium italic text-slate-500">
              “ไม่ต้องลงทุนระบบ ไม่ต้องจ้างทีมงาน เพียงส่งงานมาในนามของคุณ”
            </P>
          </section>

          {/* 4. Partner Models */}
          <section className="mb-24 space-y-6">
            {partnerTypes.map((model, index) => (
              <div
                key={index}
                className="group flex flex-col justify-between rounded-xl border border-transparent bg-slate-50 p-8 transition-all duration-500 hover:border-blue-600/20 hover:bg-white hover:shadow-2xl md:flex-row md:items-center md:p-12"
              >
                <div className="mb-6 max-w-xl md:mb-0">
                  <div className="mb-4 flex items-center gap-3">
                    <Handshake size={20} className="text-blue-600" />
                    <span className="text-[11px] font-black uppercase italic tracking-widest text-blue-600">
                      {model.type}
                    </span>
                  </div>
                  <h4 className="mb-3 text-2xl font-black italic uppercase tracking-tighter text-[#0A192F] transition-colors group-hover:text-blue-600">
                    {model.title}
                  </h4>
                  <p className="mb-4 font-medium italic text-slate-500">
                    {model.requirement}
                  </p>
                  <span className="inline-block rounded-md bg-blue-600/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-700">
                    {model.highlight}
                  </span>
                </div>

                <Button
                  asChild
                  className="h-16 rounded-xl bg-[#0A192F] px-10 font-black italic uppercase tracking-widest text-white transition-all hover:bg-blue-600"
                >
                  <Link
                    href={`/contact?subject=Partner_${encodeURIComponent(
                      model.title,
                    )}`}
                  >
                    สมัครร่วมงาน
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </div>
            ))}
          </section>

          {/* 5. Final CTA */}
          <section className="relative overflow-hidden rounded-2xl bg-[#0A192F] p-10 text-white shadow-2xl md:p-20">
            <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge className="mb-8 rounded-full border border-blue-500/20 bg-blue-500/20 px-6 py-2 text-[10px] font-black uppercase italic tracking-[0.3em] text-blue-400">
                  Scale Your Business
                </Badge>
                <h2 className="mb-8 text-4xl font-black italic uppercase tracking-tighter leading-[0.95] md:text-6xl">
                  ยกระดับธุรกิจ <br />
                  <span className="text-3xl tracking-normal text-blue-500 md:text-5xl">
                    ด้วย Professional Protocol
                  </span>
                </h2>
                <p className="mb-10 max-w-md text-lg font-medium italic leading-relaxed text-slate-400">
                  สร้างรายได้อย่างยั่งยืน ด้วยทีมงานเบื้องหลังที่เชี่ยวชาญ
                  และการรักษาความลับของลูกค้าในระดับสูงสุด
                </p>
                <Button
                  asChild
                  className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-12 py-8 text-lg font-black italic uppercase tracking-widest text-white shadow-xl shadow-blue-900/40 transition-all hover:bg-blue-500 sm:w-auto"
                >
                  <Link href="/contact">ขอรับเรทราคาส่งสำหรับพาร์ทเนอร์</Link>
                </Button>
              </div>

              <div className="group flex h-[300px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-8 text-center md:h-[450px]">
                <div className="mb-8 rounded-full bg-blue-600/10 p-6 transition-transform duration-700 group-hover:scale-110">
                  <Rocket size={80} strokeWidth={1} className="text-blue-500" />
                </div>
                <h3 className="mb-4 text-2xl font-black italic uppercase tracking-tighter">
                  No Investment Required
                </h3>
                <p className="text-sm font-medium text-slate-400">
                  เริ่มต้นธุรกิจได้ทันที โดยไม่ต้องแบกรับต้นทุนระบบหรือทีมงาน
                </p>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          </section>
        </div>
      </div>
    </main>
  );
}
