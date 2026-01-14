import { Metadata } from "next";
import Header from "@/components/shared/Header";
import { H2, P } from "@/components/ui/typography";
import {
  MessageCircle,
  Mail,
  Phone,
  FileSearch,
  CreditCard,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // ✅ ใช้ cn จาก lib ส่วนกลางเพื่อมาตรฐานเดียวกัน

export const metadata: Metadata = {
  title: "ศูนย์ช่วยเหลือ | JP-VISOUL.DOCS",
  description:
    "ศูนย์ช่วยเหลือและติดต่อสอบถามข้อมูลบริการวีซ่า เอกสาร และจดทะเบียนธุรกิจ",
};

// ✅ กำหนด Interface สำหรับข้อมูล เพื่อหลีกเลี่ยง any
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
        centered={true}
      />

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* 2. Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((item, idx) => (
              <a
                href={item.link}
                key={idx}
                className="group flex items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-1 hover:border-secondary"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mr-5 transition-colors",
                    item.color,
                  )}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {item.title}
                  </p>
                  <p className="font-black text-slate-900 group-hover:text-secondary transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* 3. Help Categories */}
          <div className="text-center mb-12">
            <H2 className="border-none p-0 text-3xl font-black mb-4">
              หัวข้อที่ช่วยคุณได้
            </H2>
            <P className="text-slate-500">เลือกหมวดหมู่ที่ต้องการค้นหาคำตอบ</P>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {helpCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <Link
                  href="/faq"
                  className="text-secondary font-bold text-sm inline-flex items-center gap-2 hover:underline"
                >
                  อ่านเพิ่มเติม <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* 4. CTA Section */}
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -mr-32 -mt-32" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                หาคำตอบที่ต้องการไม่เจอใช่ไหม?
              </h2>
              <p className="text-slate-300 mb-10 text-lg">
                ส่งข้อความหาเราโดยตรง
                ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและแก้ไขปัญหาให้คุณทันที
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-secondary hover:bg-white hover:text-primary py-7 px-10 rounded-full text-lg font-bold transition-all text-primary"
                >
                  <Link href="/services/request">ส่งคำขอรับบริการ</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 py-7 px-10 rounded-full text-lg font-bold text-white"
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
