/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.934Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: page          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

import type { Metadata } from 'next'
import { HeroSection } from '@/components/section/HeroSection'
import { AboutSection } from '@/components/section/AboutSection'
import { ServiceGrid } from '@/components/section/ServiceGrid'
import { ProcessStep } from '@/components/section/ProcessStep'
import { TrustPartner } from '@/components/section/TrustPartner'
import { FAQSection } from '@/components/section/FAQSection'
import { CaseSectionPreview } from '@/components/showcase/CaseSectionPreview'

/**
 * SEO_METADATA — JP-VISUALDOCS
 * ---------------------------------------------------------------
 * - เน้น Document-first + ความน่าเชื่อถือเชิงวิชาชีพ
 * - Canonical ชัดเจน
 * - ไม่ผูกสี/ธีมกับ SEO
 */
export const metadata: Metadata = {
  title: 'JP Visual.Docs | ที่ปรึกษาด้านเอกสารและวีซ่ามืออาชีพ',
  description:
    'บริการให้คำปรึกษาและจัดการเอกสารวีซ่าโดยผู้เชี่ยวชาญ ลดความเสี่ยง เพิ่มอัตราความสำเร็จ และควบคุมทุกขั้นตอนอย่างเป็นระบบ',
  alternates: {
    canonical: '/',
  },
}

/**
 * PAGE — Home
 * MODE: Industrial / Sharp / Stable
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)]">
      {/* 01 — HERO */}
      <section id="home" className="scroll-mt-24">
        <HeroSection />
      </section>

      {/* 02 — ABOUT */}
      <section id="about" className="scroll-mt-24">
        <AboutSection />
      </section>

      {/* 03 — TRUST */}
      <section aria-labelledby="trust">
        <TrustPartner />
      </section>

      {/* 04 — SERVICES */}
      <section id="services" className="scroll-mt-24">
        <ServiceGrid />
      </section>

      {/* 05 — PROCESS */}
      <section id="process" className="scroll-mt-24">
        <ProcessStep />
      </section>

      {/* 06 — CASES */}
      <section id="cases" className="scroll-mt-24">
        <CaseSectionPreview />
      </section>

      {/* 07 — FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQSection />
      </section>
    </main>
  )
}
