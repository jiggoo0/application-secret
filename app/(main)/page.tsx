/** @format */

import { Metadata } from 'next'
// 🛰️ FIX: Changed to Named Imports to resolve TS2613 errors
import { HeroSection } from '@/components/section/HeroSection'
import { AboutSection } from '@/components/section/AboutSection'
import { ServiceGrid } from '@/components/section/ServiceGrid'
import { ProcessStep } from '@/components/section/ProcessStep'
import { TrustPartner } from '@/components/section/TrustPartner'
import { FAQSection } from '@/components/section/FAQSection'
import { CaseSectionPreview } from '@/components/showcase/CaseSectionPreview'

/**
 * 🔍 SEO_METADATA_PROTOCOL
 * Industrial Standard for Professional Documentation Services
 */
export const metadata: Metadata = {
  title: 'JP Visual.Docs | ที่ปรึกษาด้านเอกสารและวีซ่ามืออาชีพ ครบถ้วนและรวดเร็ว',
  description:
    'บริการช่วยเตรียมเอกสารวีซ่าและงานเอกสารสำคัญ โดยที่ปรึกษาผู้เชี่ยวชาญ ช่วยลดความเสี่ยง เพิ่มความสำเร็จ และให้คุณมั่นใจในทุกขั้นตอน',
}

/**
 * 🛰️ PAGE: HomePage
 * MODE: Industrial_Sharp_Stable
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-brand selection:text-slate-950">
      {/* 🚀 01: HERO - สื่อสารความมั่นใจตั้งแต่แรกเห็น */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 🏛️ 02: ABOUT - สร้างตัวตนในฐานะคู่คิดที่เป็นมืออาชีพ */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 📊 03: TRUST & STATS - ตอกย้ำความน่าเชื่อถือด้วยข้อมูลจริง */}
      <TrustPartner />

      {/* 🛠️ 04: SERVICES - นำเสนอบริการที่ตอบโจทย์ปัญหาลูกค้า */}
      <section id="services">
        <ServiceGrid />
      </section>

      {/* 📐 05: PROCESS - แสดงความโปร่งใสของขั้นตอนการทำงาน */}
      <section id="process">
        <ProcessStep />
      </section>

      {/* 📂 06: SUCCESS_ARCHIVE
          เน้นผลลัพธ์ที่จับต้องได้ เพื่อลดความลังเลใจของลูกค้า
      */}
      <section id="cases">
        <CaseSectionPreview />
      </section>

      {/* ❓ 07: FAQ - ตอบข้อสงสัยและลดความกังวลใจสุดท้ายก่อนตัดสินใจ */}
      <section id="faq">
        <FAQSection />
      </section>
    </main>
  )
}
