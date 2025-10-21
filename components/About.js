'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Signature from './common/Signature';

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      role="region"
      aria-label="เกี่ยวกับ JP Visual & Docs"
      className="relative z-10 mx-auto max-w-screen-lg px-4 py-16 text-neutral-800 dark:text-neutral-100"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 items-start gap-10 md:grid-cols-2"
      >
        {/* 🧾 Content */}
        <motion.div variants={fadeInUp} className="space-y-6 text-base leading-relaxed">
          <h2 id="about-title" className="text-3xl font-bold text-primary">
            เกี่ยวกับเรา
          </h2>

          <p>
            <strong>ทีมงานเจ้าป่า</strong>: “ยกระดับธุรกิจเฉพาะทางให้มีมาตรฐานระดับมืออาชีพ”
          </p>

          <p>
            <strong>JP - VISUAL & DOCS</strong> รวมทีมเชี่ยวชาญด้านออกแบบและสร้างภาพลักษณ์ดิจิทัล
            ให้ธุรกิจดูมืออาชีพ มีมาตรฐาน น่าเชื่อถือ และปลอดภัย
          </p>

          <p>
            แม้ธุรกิจอยู่นอกระบบกฎหมายทั่วไป แต่เราทำให้ดูดีได้ ในแบบที่หาไม่ได้จาก Google หรือ
            YouTube การันตีประสบการณ์มากกว่า 8 ปี
          </p>

          <p>ผมไม่ใช่คนเก่ง แต่ทีมงานผมเก่งแน่นอน</p>

          <p>
            <strong>ลายเซ็นความน่าเชื่อถือของ JP Visual & Docs</strong>
            <br />
            ยินดีร่วมงานทุกสาย กฎข้อแรกคือ <strong>ความลับของลูกค้า</strong>
          </p>

          {/* 🏷️ Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            {['8+ ปีประสบการณ์', 'ความลับลูกค้าเป็นอันดับหนึ่ง', 'ดีไซน์เฉพาะทาง'].map((text) => (
              <motion.div key={text} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge text={text} />
              </motion.div>
            ))}
          </div>

          {/* 📞 CTA Button */}
          <div className="pt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/contact" variant="primary">
                ติดต่อทีมงานเจ้าป่า
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ✒️ Signature */}
        <Signature
          src="/images/เจ้าป่า.webp"
          alt="ลายเซ็นเจ้าป่า JP Visual & Docs"
          quote="ผมไม่ใช่คนเก่ง แต่ทีมงานผมเก่งแน่นอน"
        />
      </motion.div>
    </section>
  );
}
