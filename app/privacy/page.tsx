import { Metadata } from "next";
import Header from "@/components/shared/Header";
import { H2, H3, P } from "@/components/ui/typography";
import { ShieldCheck, Eye, Lock, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | JP-VISOUL.DOCS",
  description:
    "นโยบายความเป็นส่วนตัวและข้อตกลงการใช้งานข้อมูลส่วนบุคคลสำหรับผู้รับบริการ JP-VISOUL.DOCS",
};

export default function PrivacyPage() {
  const lastUpdated = "14 มกราคม 2569";

  const policies = [
    {
      icon: <Eye className="text-secondary" />,
      title: "การเก็บรวบรวมข้อมูล",
      description:
        "เราเก็บข้อมูลเท่าที่จำเป็นเพื่อการให้บริการ เช่น ชื่อ, อีเมล, เบอร์โทรศัพท์ และเอกสารประกอบการทำวีซ่าหรือจดทะเบียนธุรกิจ",
    },
    {
      icon: <Lock className="text-secondary" />,
      title: "ความปลอดภัยของข้อมูล",
      description:
        "ข้อมูลเอกสารสำคัญของคุณจะถูกจัดเก็บในระบบที่มีการเข้ารหัสขั้นสูง และจำกัดการเข้าถึงเฉพาะเจ้าหน้าที่ที่เกี่ยวข้องเท่านั้น",
    },
    {
      icon: <Globe className="text-secondary" />,
      title: "การเปิดเผยข้อมูล",
      description:
        "เราจะไม่ขายหรือเผยแพร่ข้อมูลของคุณให้แก่บุคคลภายนอก ยกเว้นเป็นการส่งต่อข้อมูลให้หน่วยงานราชการเพื่อดำเนินการตามที่คุณร้องขอ",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/30 pb-20">
      {/* 1. Page Header */}
      <Header
        title="Privacy Policy"
        description="นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล (PDPA)"
        centered={true}
      />

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 2. Key Highlights Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {policies.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* 3. Detailed Content Area */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-100 prose-thai">
            <div className="flex items-center gap-2 text-secondary mb-6">
              <ShieldCheck size={20} />
              <span className="text-sm font-bold tracking-widest uppercase">
                General Data Protection
              </span>
            </div>

            <section className="mb-12">
              <H2 className="text-2xl md:text-3xl font-black mb-6 border-none p-0">
                บทนำ
              </H2>
              <P className="text-slate-600 italic">
                อัปเดตล่าสุดเมื่อ: {lastUpdated}
              </P>
              <P>
                JP-VISOUL.DOCS ("เรา") ให้ความสำคัญกับความเป็นส่วนตัวของคุณ
                นโยบายนี้อธิบายถึงวิธีการที่เราเก็บรักษา
                และปกป้องข้อมูลที่คุณมอบให้เราผ่านเว็บไซต์และบริการงานเอกสารต่างๆ
                ของเรา
              </P>
            </section>

            <section className="mb-12">
              <H3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-slate-400" />
                ข้อมูลที่เราจัดเก็บ
              </H3>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
                <li>
                  ข้อมูลยืนยันตัวตน: ชื่อ-นามสกุล, เลขประจำตัวประชาชน, พาสปอร์ต
                </li>
                <li>ข้อมูลการติดต่อ: ที่อยู่, อีเมล, เบอร์โทรศัพท์, ID Line</li>
                <li>
                  ข้อมูลประกอบการใช้บริการ: เอกสารทางการเงิน, ประวัติการทำงาน
                  (สำหรับขอวีซ่า)
                </li>
                <li>
                  ข้อมูลทางเทคนิค: หมายเลข IP, ข้อมูลคุกกี้ (Cookies)
                  เพื่อการปรับปรุงเว็บไซต์
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <H3 className="text-xl font-bold mb-4">วัตถุประสงค์การใช้งาน</H3>
              <P>เราใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ต่อไปนี้เท่านั้น:</P>
              <ul className="list-decimal pl-6 space-y-3 text-slate-600">
                <li>
                  เพื่อดำเนินการยื่นคำขอวีซ่าหรือจดทะเบียนธุรกิจตามคำสั่งของคุณ
                </li>
                <li>เพื่อสื่อสารและแจ้งสถานะความคืบหน้าของงานเอกสาร</li>
                <li>เพื่อยืนยันตัวตนและป้องกันการทุจริตในธุรกรรมสำคัญ</li>
              </ul>
            </section>

            <section className="mb-12 p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <H3 className="text-xl font-bold mb-4">
                สิทธิของคุณตามกฎหมาย PDPA
              </H3>
              <P className="text-sm mb-4">
                คุณมีสิทธิตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                ดังนี้:
              </P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  ✅ สิทธิขอเข้าถึงข้อมูล
                </div>
                <div className="flex items-center gap-2">
                  ✅ สิทธิขอให้ลบหรือทำลายข้อมูล
                </div>
                <div className="flex items-center gap-2">
                  ✅ สิทธิขอแก้ไขข้อมูลให้ถูกต้อง
                </div>
                <div className="flex items-center gap-2">
                  ✅ สิทธิคัดค้านการเก็บรวบรวม
                </div>
              </div>
            </section>

            <div className="mt-16 pt-10 border-t border-slate-100 text-center">
              <P className="text-slate-500 mb-6">
                หากคุณมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว โปรดติดต่อเรา
              </P>
              <a
                href="mailto:support@jpvisouldocs.online"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-secondary transition-colors"
              >
                ติดต่อ Data Protection Officer
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
