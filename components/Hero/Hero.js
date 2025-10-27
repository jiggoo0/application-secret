'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import HeroBackground from './HeroBackground';
import HeroMetrics from './HeroMetrics';

export default function Hero() {
  const router = useRouter();
  const slideInterval = 5000;
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🖼️ ภาพพื้นหลังแบบสไลด์
  const images = useMemo(
    () => ['/images/hero/hero.webp', '/images/hero/hero2.webp', '/images/hero/hero3.webp'],
    [],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [images.length, nextSlide, slideInterval]);

  const background = useMemo(
    () => <HeroBackground images={images} currentIndex={currentIndex} />,
    [images, currentIndex],
  );

  // 📊 Metrics
  const metrics = useMemo(
    () => [
      { label: 'ลูกค้า', value: '180+' },
      { label: 'โปรเจกต์', value: '80+' },
      { label: 'ปีที่ดำเนินธุรกิจ', value: '8 ปี' },
    ],
    [],
  );

  const metricsBlock = useMemo(() => <HeroMetrics metrics={metrics} />, [metrics]);

  // 🧾 เนื้อหา
  const headline = 'ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ';
  const highlightText = 'เจ้าป่า ชัดเจนไม่ขายฝัน';
  const subtext = 'ยินดีร่วมงานทุกสายวงการ';
  const ctaText = 'เข้าสู่ระบบ';
  const ctaUrl = '/login';

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center sm:px-6 lg:px-12"
    >
      {/* 🔲 พื้นหลัง */}
      {background}

      {/* 🧾 เนื้อหา */}
      <motion.div
        className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-6 text-white sm:gap-8 md:gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 🧠 Headline */}
        <motion.h1
          id="hero-heading"
          className="flex flex-wrap justify-center gap-2 text-h1 font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>{headline}</span>
          <LineShadowText className="ml-2 text-yellow-300" shadowColor="rgba(255,255,255,0.3)">
            {highlightText}
          </LineShadowText>
        </motion.h1>

        {/* 📄 Subtext */}
        <motion.p
          className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtext}
        </motion.p>

        {/* 🚪 CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-4"
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(ctaUrl);
            }}
            size="lg"
            variant="default"
            aria-label={`ไปยัง: ${ctaText}`}
          >
            {ctaText}
          </Button>
        </motion.div>

        {/* 📊 Metrics */}
        {metrics.length > 0 && (
          <div className="mt-6 flex w-full flex-wrap justify-center gap-4 sm:mt-8">
            {metricsBlock}
          </div>
        )}
      </motion.div>
    </section>
  );
}
