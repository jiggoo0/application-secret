import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Mail,
  Phone,
  FileSearch,
  CreditCard,
  UserCheck,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ศูนย์ช่วยเหลือ | JP-VISOUL.DOCS",
  description:
    "ศูนย์ช่วยเหลือและติดต่อสอบถามข้อมูลบริการวีซ่า เอกสาร และจดทะเบียนธุรกิจ",
};

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  color: string;
}

interface HelpCategory {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function SupportPage() {
  const contactMethods: ContactMethod[] = [
    {
      icon: <MessageCircle className="text-green-500" />,
      title: "Line Official",
      value: "@jpvisoul",
      link: "https://line.me",
      color: "bg-green-50",
    },
    {
      icon: <Mail className="text-blue-500" />,
      title: "Email Support",
      value: "support@jpvisoul.com",
      link: "mailto:support@jpvisoul.com",
      color: "bg-blue-50",
    },
    {
      icon: <Phone className="text-secondary" />,
      title: "Hotline",
      value: "02-XXX-XXXX",
      link: "tel:02XXXXXXX",
      color: "bg-orange-50",
    },
  ];

  const helpCategories: HelpCategory[] = [
    {
      icon: <FileSearch size={24} />,
      title: "การยื่นขอวีซ่า",
      desc: "รวมขั้นตอนและเอกสารที่จำเป็นสำหรับวีซ่าแต่ละประเภท",
    },
    {
      icon: <CreditCard size={24} />,
      title: "การชำระเงิน",
      desc: "ช่องทางการชำระเงิน และการออกใบเสร็จรับเงิน",
    },
    {
      icon: <UserCheck size={24} />,
      title: "ติดตามสถานะ",
      desc: "วิธีการตรวจสอบความคืบหน้าของงานเอกสาร",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* 1. Hero Header */}
      <Header
        title="ศูนย์ช่วยเหลือ"
        description="เราพร้อมดูแลและตอบทุกข้อสงสัย เพื่อให้งานเอกสารของคุณเป็นเรื่องง่าย"
        centered
      />

      <div className="container relative z-10 mx-auto -mt-12 px-4">
        <div className="mx-auto max-w-6xl">
          {/* 2. Quick Contact */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {contactMethods.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="group flex items-center rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-1 hover:border-secondary"
              >
                <div
                  className={cn(
                    "mr-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
                    item.color,
                  )}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {item.title}
                  </p>
                  <p className="font-black text-slate-900 transition-colors group-hover:text-secondary">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* 3. Help Categories */}
          <div className="mb-12 text-center">
            <H2 className="mb-4 border-none p-0 text-3xl font-black">
              หัวข้อที่ช่วยคุณได้
            </H2>
            <P className="text-slate-500">เลือกหมวดหมู่ที่ต้องการค้นหาคำตอบ</P>
          </div>

          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {helpCategories.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{cat.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-500">
                  {cat.desc}
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
                >
                  อ่านเพิ่มเติม <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* 4. CTA */}
          <div className="relative overflow-hidden rounded-[3rem] bg-primary p-8 text-center text-white shadow-2xl shadow-primary/20 md:p-16">
            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-secondary/20 blur-[80px]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 text-3xl font-black leading-tight md:text-4xl">
                หาคำตอบที่ต้องการไม่เจอใช่ไหม?
              </h2>
              <p className="mb-10 text-lg text-slate-300">
                ส่งข้อความหาเราโดยตรง
                ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและแก้ไขปัญหาให้คุณทันที
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  className="rounded-full bg-secondary px-10 py-7 text-lg font-bold text-primary transition-all hover:bg-white"
                >
                  <Link href="/services/request">ส่งคำขอรับบริการ</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5 px-10 py-7 text-lg font-bold text-white hover:bg-white/10"
                >
                  <Link href="/contact">คุยกับเราตอนนี้</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
