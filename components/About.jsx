'use client';

import { motion } from 'framer-motion';
// สมมติว่า '@/utils/animations' มีการ Export fadeInUp และ staggerContainer ถูกต้อง
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { Badge } from './ui/badge'; // Custom Component
import { Button } from './ui/button'; // Custom Component
import Image from 'next/image';

export default function AboutSection() {
  // เนื้อหาสำหรับ Badges
  const badgeContent = ['8+ ปีประสบการณ์', 'ความลับลูกค้าเป็นอันดับหนึ่ง', 'ดีไซน์เฉพาะทาง'];

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
        viewport={{ once: true, amount: 0.25 }} // Trigger เมื่อเห็น 25%
        variants={staggerContainer}
        className="grid grid-cols-1 gap-12 md:grid-cols-2"
      >
        {/* 🧾 Content Column */}
        <motion.div variants={fadeInUp} className="space-y-6 text-base leading-relaxed">
          <h2 id="about-title" className="text-h2 text-primary">
            เกี่ยวกับเรา
          </h2>

          <p>
            <strong>JP - VISUAL & DOCS</strong> มุ่งมั่นที่จะ
            “ยกระดับธุรกิจสีเทาให้มีมาตรฐานระดับมืออาชีพ”
          </p>

          <p>
            เราคือทีมงานมืออาชีพที่ช่วยให้ธุรกิจของคุณดูน่าเชื่อถือ มีมาตรฐาน และปลอดภัยสูงสุด
            ต่อทั้งผู้จ้างงานและผู้รับงาน
          </p>

          <p>
            แม้ธุรกิจจะอยู่นอกระบบกฎหมายทั่วไป
            แต่เราสามารถนำเสนอในแบบที่ดูดีและหาไม่ได้จากแหล่งข้อมูลสาธารณะ เจ้าป่า
            การันตีประสบการณ์มากกว่า 8 ปีในสายงานนี้
          </p>

          <p>ผมไม่ใช่คนเก่งที่สุด แต่รับประกันได้ว่าทีมงานของผม **เก่งกาจและเป็นมืออาชีพแน่นอน**</p>

          <p>
            <strong>ลายเซ็นความน่าเชื่อถือของ JP Visual & Docs</strong>
            <br />
            เรายินดีร่วมงานกับทุกสายงาน กฎข้อแรกที่เรายึดถือคือ <strong>ความลับของลูกค้า</strong>
            คือสิ่งสำคัญสูงสุด
          </p>

          {/* 🏷️ Badges */}
          <div className="flex flex-wrap gap-3 pt-6">
            {badgeContent.map((text) => (
              <motion.div
                key={text}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // ส่ง text เข้าไปใน Badge component
              >
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

        {/* 🖼️ Image Column */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center">
          <Image
            src="/images/เจ้าป่า.webp"
            alt="ภาพบุคคลในนาม เจ้าป่า ผู้ก่อตั้ง JP Visual & Docs" // Descriptive alt text
            width={400}
            height={400}
            sizes="(max-width: 768px) 100vw, 400px" // Optimization: Define sizes
            priority={true} // Optimization: Load image early
            className="rounded-xl border-4 border-primary/20 object-cover shadow-2xl"
            style={{ maxWidth: '100%', height: 'auto' }} // Responsive styling
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
