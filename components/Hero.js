'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

/**
 * HeroBackground
 * ภาพพื้นหลังแบบสลับภาพพร้อม overlay
 */
function HeroBackground({ images, currentIndex }) {
  return (
    <>
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          aria-hidden="true"
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
    </>
  );
}

/**
 * HeroMetrics
 * แสดงสถิติ/ตัวเลขสำคัญ
 */
function HeroMetrics({ metrics }) {
  if (!metrics?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.dl
      className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/80 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="ข้อมูลสถิติ"
    >
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="flex flex-col items-center"
          role="group"
          aria-label={metric.label}
        >
          <dt className="text-xl font-bold md:text-2xl">{metric.value}</dt>
          <dd>{metric.label}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

/**
 * Hero Component
 */
export default function Hero({
  headline,
  subtext = '',
  ctaText,
  ctaUrl,
  images = ['/images/hero/hero.webp'],
  metrics = [],
  slideInterval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || images.length <= 1) return;

    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [images.length, slideInterval, nextSlide]);

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
        <motion.h1
          id="hero-heading"
          className="text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {headline}
        </motion.h1>

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

        {ctaText && ctaUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              href={ctaUrl}
              className="mt-4 rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
              aria-label={`ไปยัง: ${ctaText}`}
            >
              {ctaText}
            </Button>
          </motion.div>
        )}

        {metricsBlock}
      </motion.div>
    </section>
  );
}
