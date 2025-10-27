'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      role="region"
      aria-label="เกี่ยวกับ JP Visual & Docs"
      className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-foreground"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-12 md:grid-cols-2"
      >
        {/* 🧾 Content */}
        <motion.div variants={fadeInUp} className="space-y-6 text-base leading-relaxed">
          <h2 id="about-title" className="text-h2 text-primary">
            เกี่ยวกับเรา
          </h2>

          <p>
            <strong>JP - VISUAL & DOCS</strong> “ยกระดับธุรกิจสีเทาให้มีมาตรฐานระดับมืออาชีพ”
          </p>

          <p>
            รวมทีมงาน ให้ธุรกิจดูมืออาชีพ มีมาตรฐาน น่าเชื่อถือ และปลอดภัย ต่อผู้จ้างงานและรับงาน
          </p>

          <p>
            แม้ธุรกิจอยู่นอกระบบกฎหมายทั่วไป แต่เราทำให้ดูดีได้ ในแบบที่หาไม่ได้จาก Google หรือ
            YouTube เจ้าป่า การันตีประสบการณ์มากกว่า 8 ปี
          </p>

          <p>ผมไม่ใช่คนเก่ง แต่ทีมงานผมเก่งแน่นอน</p>

          <p>
            <strong>ลายเซ็นความน่าเชื่อถือของ JP Visual & Docs</strong>
            <br />
            ยินดีร่วมงานทุกสาย กฎข้อแรกคือ <strong>ความลับของลูกค้า</strong>
          </p>

          {/* 🏷️ Badges */}
          <div className="flex flex-wrap gap-3 pt-6">
            {['8+ ปีประสบการณ์', 'ความลับลูกค้าเป็นอันดับหนึ่ง', 'ดีไซน์เฉพาะทาง'].map((text) => (
              <motion.div key={text} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge text={text} />
              </motion.div>
            ))}
          </div>

          {/* 📞 CTA Button */}
          <div className="pt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/contact" variant="default">
                ติดต่อทีมงานเจ้าป่า
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* 🖼️ Image */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center">
          <Image
            src="/images/เจ้าป่า.webp"
            alt="เจ้าป่า"
            width={400}
            height={400}
            className="rounded-xl object-cover shadow-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
