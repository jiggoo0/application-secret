"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

// Components
import HeroSection from "@/components/shared/HeroSection";
import AboutSection from "@/components/shared/AboutSection";
import FaqSection from "@/components/shared/FaqSection";
import ServiceCard from "@/components/cards/ServiceCard";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

// Data
import { SERVICES } from "@/constants/services-data";
import { FAQ_DATA } from "@/content/faq-data"; // Path ถูกต้องแล้ว

export default function HomePage() {
  // ดึงบริการเด่น 3 รายการ
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <main className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. Hero Section: จุดรับสายตาแรก */}
      <HeroSection />

      {/* 2. Featured Services Section */}
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        {/* ตกแต่งพื้นหลังเล็กน้อยเพื่อให้ดูมีมิติ */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-4"
              >
                <Star size={16} className="fill-current" /> Our Expertise
              </motion.div>
              <H2 className="border-none p-0 mb-4 text-3xl md:text-5xl font-black leading-[1.1]">
                บริการที่ <span className="text-secondary">ยอดนิยม</span> ของเรา
              </H2>
              <P className="text-slate-500 text-lg md:text-xl thai-snug">
                เราคัดสรรบริการที่ตอบโจทย์ความต้องการส่วนใหญ่
                เพื่อให้คุณเริ่มต้นจัดการงานเอกสารได้อย่างรวดเร็วและถูกต้อง
              </P>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                variant="outline"
                className="rounded-full h-14 px-10 group border-slate-200 bg-white hover:bg-secondary hover:text-white transition-all duration-300"
              >
                <Link href="/services">
                  ดูบริการทั้งหมด
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id || `service-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section: ความน่าเชื่อถือ */}
      <AboutSection />

      {/* 4. FAQ Section: แก้ไขปัญหาเบื้องต้น 
          ใช้ data={FAQ_DATA} หาก FaqSection ถูกออกแบบมาให้รับ Props
      */}
      <FaqSection items={FAQ_DATA} />

      {/* 5. Final CTA Section: ปิดการขาย (แนะนำให้เพิ่ม) */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <H2 className="text-white border-none mb-6">
            พร้อมเริ่มงานเอกสารกับเราหรือยัง?
          </H2>
          <P className="text-slate-300 mb-10 text-lg">
            ปรึกษาผู้เชี่ยวชาญฟรี ไม่มีค่าใช้จ่ายเบื้องต้น
          </P>
          <Button
            asChild
            className="bg-secondary hover:bg-white hover:text-primary text-white font-bold rounded-full px-12 py-7 text-lg transition-all"
          >
            <Link href="/contact">ติดต่อเราทันที</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
