// app/(marketing)/contact/page.tsx

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site-config";
import { H1, H2, Lead } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import React from "react";

/* -------------------------------------------------------------------------- */
/*                                   Metadata                                 */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: `ติดต่อเรา | ${SITE_CONFIG.name}`,
  description:
    "ปรึกษาเรื่องวีซ่าและเอกสารธุรกิจ ติดต่อทีมงาน JP-VISOUL ได้ทันที",
};

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ContactInfoItem {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: Phone,
      label: "เบอร์โทรศัพท์",
      value: SITE_CONFIG.contact?.phone ?? "-",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      label: "อีเมล",
      value: SITE_CONFIG.contact?.email ?? "-",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: MessageCircle,
      label: "LINE Official",
      value: SITE_CONFIG.contact?.line ?? "-",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: MapPin,
      label: "สถานที่ตั้ง",
      value: SITE_CONFIG.contact?.address ?? "-",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* ------------------------------------------------------------------ */}
      {/* Hero Section                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#0A192F] pb-20 pt-24 text-white md:pb-32 md:pt-32">
        <div className="container mx-auto px-4 text-center">
          <H1 className="mb-6 border-none p-0 text-white">ติดต่อเรา</H1>
          <Lead className="text-slate-300">
            มีคำถามหรือต้องการคำปรึกษา? ทีมงานของเราพร้อมให้บริการคุณเสมอ
          </Lead>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Contact Information Cards                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="container relative z-10 mx-auto -mt-16 px-4">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="rounded-[2rem] border-none p-8 text-center shadow-xl transition-transform hover:-translate-y-2"
              >
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {item.label}
                </h3>

                <p className="font-bold text-[#0A192F]">{item.value}</p>
              </Card>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Contact Form Placeholder                                          */}
        {/* ------------------------------------------------------------------ */}
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-slate-100 bg-slate-50 p-8 md:p-16">
          <div className="text-center">
            <H2 className="mb-6">ส่งข้อความหาเรา</H2>
            <p className="mb-8 text-slate-500">
              กรุณากรอกข้อมูลด้านล่าง แล้วเราจะติดต่อกลับภายใน 24 ชั่วโมง
            </p>

            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12">
              <p className="italic text-slate-400">
                ฟอร์มติดต่อสอบถามกำลังถูกเตรียมใช้งาน...
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}