/** @format */

import { Metadata } from 'next'
import { HeroSection } from '@/components/section/HeroSection'
import { AboutSection } from '@/components/section/AboutSection'
import { ServiceGrid } from '@/components/section/ServiceGrid'
import { ProcessStep } from '@/components/section/ProcessStep'
import { TrustPartner } from '@/components/section/TrustPartner'
import { FAQSection } from '@/components/section/FAQSection'
import { CaseSectionPreview } from '@/components/showcase/CaseSectionPreview'

/**
 * 🔍 SEO_METADATA_PROTOCOL
 * ยกระดับความน่าเชื่อถือผ่าน Search Engine ด้วยคำค้นหาเชิงกลยุทธ์
 */
export const metadata: Metadata = {
  title: 'JP Visual.Docs | ที่ปรึกษาด้านเอกสารและวีซ่ามืออาชีพ ครบถ้วนและรวดเร็ว',
  description:
    'บริการช่วยเตรียมเอกสารวีซ่าและงานเอกสารสำคัญ โดยที่ปรึกษาผู้เชี่ยวชาญ ช่วยลดความเสี่ยง เพิ่มความสำเร็จ และให้คุณมั่นใจในทุกขั้นตอน',
  alternates: {
    canonical: '/',
  },
}

/**
 * 🛰️ PAGE: HomePage
 * MODE: Industrial_Sharp_Stable
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🚀 01: HERO - อัตลักษณ์แรกที่สะท้อนความเชี่ยวชาญ */}
      <section id="home" className="scroll-mt-20">
        <HeroSection />
      </section>

      {/* 🏛️ 02: ABOUT - การนำเสนอพันธกิจและวิสัยทัศน์ */}
      <section id="about" className="scroll-mt-20">
        <AboutSection />
      </section>

      {/* 📊 03: TRUST & STATS - ข้อมูลยืนยันประสิทธิภาพ (Verified Data) */}
      <TrustPartner />

      {/* 🛠️ 04: SERVICES - การวิเคราะห์และนำเสนอโซลูชัน */}
      <section id="services" className="scroll-mt-20">
        <ServiceGrid />
      </section>

      {/* 📐 05: PROCESS - แผนผังการทำงานที่โปร่งใส (Operational Transparency) */}
      <section id="process" className="scroll-mt-20">
        <ProcessStep />
      </section>

      {/* 📂 06: SUCCESS_ARCHIVE - คลังข้อมูลผลลัพธ์ความสำเร็จ */}
      <section id="cases" className="scroll-mt-20">
        <CaseSectionPreview />
      </section>

      {/* ❓ 07: FAQ - การลดกำแพงความกังวลด้วยข้อมูลเชิงลึก */}
      <section id="faq" className="scroll-mt-20">
        <FAQSection />
      </section>
    </main>
  )
}
