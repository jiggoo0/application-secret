// app/page.tsx

import HeroSection from "@/components/shared/HeroSection";
import BlogSection from "@/components/shared/BlogSection";
import FaqSection from "@/components/shared/FaqSection";

import ServiceSection from "@/components/home/ServiceSection";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

import { SERVICES } from "@/constants/services-data";
import { FAQ_DATA } from "@/content/faq-data";

/**
 * HomePage (Production-ready)
 * - โครงสร้างหน้าแบบ Section-based ชัดเจน
 * - ใช้ Single Source of Truth จาก constants / content
 * - ปลอดภัยต่อ Runtime (ทุก section มี guard ภายใน)
 */
export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. SERVICES */}
      <ServiceSection services={SERVICES} />

      {/* 3. VALUE / TRUST */}
      <ValuePropositionSection />

      {/* 4. PROCESS / PROTOCOL */}
      <ProcessSection />

      {/* 5. BLOG / KNOWLEDGE */}
      <BlogSection />

      {/* 6. FAQ */}
      <FaqSection items={FAQ_DATA} />

      {/* 7. FINAL CTA */}
      <CTASection />
    </main>
  );
}
