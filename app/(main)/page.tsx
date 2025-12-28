/** @format */

import { Metadata } from "next"
import HeroSection from "@/components/section/HeroSection"
import AboutSection from "@/components/section/AboutSection"
import ServiceGrid from "@/components/section/ServiceGrid"
import ProcessStep from "@/components/section/ProcessStep"
import TrustPartner from "@/components/section/TrustPartner"
import { FAQSection } from "@/components/section/FAQSection"
import { CaseStudySlider } from "@/components/section/CaseStudySlider"

/**
 * 🔍 SEO_METADATA_PROTOCOL
 * ปรับแต่งเพื่อการค้นหาระดับสากลและสร้างความน่าเชื่อถือให้กับแบรนด์
 */
export const metadata: Metadata = {
  title: "Boutique Ops | Integrated Visa & Document Infrastructure",
  description:
    "ระบบจัดการวีซ่าและงานเอกสารมาตรฐานสากล ขับเคลื่อนด้วยกระบวนการที่มีประสิทธิภาพสูงสุด",
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* 🚀 01: FIRST_IMPRESSION [ID: home]
          ส่วนเปิดตัวแบรนด์และการสร้าง Impact แรกพบ
      */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 🏛️ 02: IDENTITY_CORE [ID: about]
          เล่าประวัติ ความเชี่ยวชาญ และความแตกต่างของเอเจนซี่
      */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 🛠️ 03: CAPABILITY_MATRIX [ID: services]
          เจาะลึกบริการต่างๆ พร้อมระบบ Filter ข้อมูล
      */}
      <section id="services">
        <ServiceGrid />
      </section>

      {/* 📐 04: OPERATIONAL_PROTOCOL [ID: process]
          แสดงขั้นตอนการทำงาน 1-2-3-4 ให้ลูกค้าเห็นภาพชัดเจน
      */}
      <section id="process">
        <ProcessStep />
      </section>

      {/* 🏆 05: PROOF_OF_EXCELLENCE [ID: cases]
          แสดงเคสตัวอย่างที่ประสบความสำเร็จเพื่อสร้างความเชื่อมั่น (Social Proof)
      */}
      <section id="cases">
        <CaseStudySlider />
      </section>

      {/* 📊 06: TRUST_NETWORK & STATS
          ส่วนแสดงโลโก้พันธมิตรและสถิติความสำเร็จขององค์กร
      */}
      <TrustPartner />

      {/* ❓ 07: KNOWLEDGE_BASE [ID: faq]
          ตอบข้อสงสัยเบื้องต้นเพื่อลดภาระแอดมินและช่วยเรื่อง SEO
      */}
      <section id="faq">
        <FAQSection />
      </section>
    </main>
  )
}
