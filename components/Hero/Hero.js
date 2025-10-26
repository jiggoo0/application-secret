'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import HeroBackground from './HeroBackground';
import HeroMetrics from './HeroMetrics';

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

  const metricsBlock = useMemo(() => <HeroMetrics metrics={metrics} />, [metrics]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center sm:px-6 lg:px-12"
    >
      {/* Background Slider */}
      {background}

      <motion.div
        className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-6 text-foreground sm:gap-8 md:gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Headline */}
        <motion.h1
          id="hero-heading"
          className="flex flex-wrap justify-center gap-2 text-h1 font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>{headline}</span>
          {highlightText && (
            <LineShadowText className="ml-2" shadowColor="rgba(0,0,0,0.1)">
              {highlightText}
            </LineShadowText>
          )}
        </motion.h1>

        {/* Subtext */}
        {subtext && (
          <motion.p
            className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtext}
          </motion.p>
        )}

        {/* CTA Button */}
        {ctaText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(ctaUrl || '/login');
              }}
              size="lg"
              variant="default"
              aria-label={`ไปยัง: ${ctaText}`}
            >
              {ctaText}
            </Button>
          </motion.div>
        )}

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="mt-6 flex w-full flex-wrap justify-center gap-4 sm:mt-8">
            {metricsBlock}
          </div>
        )}
      </motion.div>
    </section>
  );
}
