import { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/theme";
import { H1, Lead, H2, P } from "@/components/ui/typography";
import AboutSection from "@/components/shared/AboutSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: `เกี่ยวกับเรา | ${SITE_CONFIG.name}`,
  description: "ทำความรู้จักกับ JP-VISOUL ทีมงานมืออาชีพด้านเอกสารและวีซ่า",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-slate-50 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <H1 className="mb-6 border-none p-0">
            มุ่งมั่นเพื่อ <span className="text-secondary">ความสำเร็จ</span>{" "}
            ของคุณ
          </H1>
          <Lead className="max-w-3xl mx-auto">
            เราคือที่ปรึกษาด้านเอกสารครบวงจร
            ที่ช่วยให้ขั้นตอนที่ยุ่งยากกลายเป็นเรื่องง่าย
            ด้วยประสบการณ์กว่าหลายปีในอุตสาหกรรม
          </Lead>
        </div>
      </section>

      {/* Main Section */}
      <AboutSection />

      {/* Team/Vision Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="/images/about-team.jpg"
              alt="ทีมงาน JP-VISOUL"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <H2 className="text-3xl font-bold">วิสัยทัศน์ของเรา</H2>
            <P className="text-lg text-slate-600">
              "เป็นผู้นำด้านการจัดการเอกสารและวีซ่าระดับประเทศ
              ที่ให้บริการด้วยความโปร่งใส รวดเร็ว และเป็นมืออาชีพที่สุด"
            </P>
            <ul className="space-y-4">
              {[
                "บริการด้วยความซื่อสัตย์และโปร่งใส",
                "ยึดถือความสำเร็จของลูกค้าเป็นที่หนึ่ง",
                "พัฒนาความรู้ด้านกฎหมายและระเบียบใหม่ๆ เสมอ",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
