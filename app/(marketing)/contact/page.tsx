import { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/theme";
import { H1, Lead, H2 } from "@/components/ui/typography";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `ติดต่อเรา | ${SITE_CONFIG.name}`,
  description:
    "ปรึกษาเรื่องวีซ่าและเอกสารธุรกิจ ติดต่อทีมงาน JP-VISOUL ได้ทันที",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      label: "เบอร์โทรศัพท์",
      value: SITE_CONFIG.contact.phone,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      label: "อีเมล",
      value: SITE_CONFIG.contact.email,
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: MessageCircle,
      label: "LINE Official",
      value: SITE_CONFIG.contact.line,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: MapPin,
      label: "สถานที่ตั้ง",
      value: SITE_CONFIG.contact.address,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="bg-primary text-white pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <H1 className="text-white border-none p-0 mb-6">ติดต่อเรา</H1>
          <Lead className="text-slate-300">
            มีคำถามหรือต้องการคำปรึกษา? ทีมงานของเราพร้อมให้บริการคุณเสมอ
          </Lead>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, i) => (
            <Card
              key={i}
              className="p-8 text-center border-none shadow-xl rounded-[2rem] hover:-translate-y-2 transition-transform"
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-2">
                {item.label}
              </h3>
              <p className="font-bold text-primary">{item.value}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-5xl mx-auto bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            {/* หากต้องการใส่ Contact Form เพิ่มเติมสามารถ import มาใช้ที่นี่ */}
            <div className="text-center">
              <H2 className="mb-6">ส่งข้อความหาเรา</H2>
              <p className="text-slate-500 mb-8">
                กรุณากรอกข้อมูลด้านล่าง แล้วเราจะติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              {/* [Insert ServiceRequestForm or a generic Contact Form component here] */}
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400 italic">
                  ฟอร์มติดต่อสอบถามกำลังถูกเตรียมใช้งาน...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
