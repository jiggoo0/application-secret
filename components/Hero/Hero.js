'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import HeroBackground from './HeroBackground';
import HeroMetrics from './HeroMetrics';

/**
 * 🦁 Hero Section
 * - แสดงภาพพื้นหลังแบบ slideshow
 * - แสดงข้อความหลัก, ข้อความเน้น, subtext, CTA และ metrics
 */
export default function Hero({
  headline,
  highlightText = '',
  subtext = '',
  ctaText = 'เข้าสู่ระบบ',
  ctaUrl = '/login',
  images = ['/images/hero/hero.webp'],
  metrics = [],
  slideInterval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // 👉 เปลี่ยนภาพ background อัตโนมัติ
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [images.length, nextSlide, slideInterval]);

  // 🧠 ลด re-render ของ background และ metrics
  const background = useMemo(
    () => <HeroBackground images={images} currentIndex={currentIndex} />,
    [images, currentIndex],
  );

  const metricsBlock = useMemo(() => <HeroMetrics metrics={metrics} />, [metrics]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center md:px-12"
    >
      {background}

      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 🧠 Headline */}
        <motion.h1
          id="hero-heading"
          className="flex flex-wrap justify-center gap-2 text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>{headline}</span>
          {highlightText && (
            <LineShadowText className="ml-2" shadowColor="rgba(255,255,255,0.3)">
              {highlightText}
            </LineShadowText>
          )}
        </motion.h1>

        {/* 📄 Subtext */}
        {subtext && (
          <motion.p
            className="text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtext}
          </motion.p>
        )}

        {/* 🚀 CTA Button */}
        {ctaText && ctaUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ShinyButton
              onClick={(e) => {
                e.preventDefault();
                router.push(ctaUrl);
              }}
              className="mt-4"
              aria-label={`ไปยัง: ${ctaText}`}
            >
              {ctaText}
            </ShinyButton>
          </motion.div>
        )}

        {/* 📊 Metrics */}
        {metricsBlock}
      </motion.div>
    </section>
  );
}
