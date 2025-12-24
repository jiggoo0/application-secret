'use client';

/**
 * 🏗️ JP-VISOUL: Hero Section (เจ้าป่า Edition - Revised)
 * ปรับปรุง: ภาษาไทยดุดันระดับตัวจริง ตัดคำฟุ่มเฟือย เน้นความน่าเชื่อถือ
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import { Terminal, Zap } from 'lucide-react';
import HeroBackground from './HeroBackground';
import HeroMetrics from './HeroMetrics';

export default function Hero() {
  const slideInterval = 6000;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const metrics = useMemo(
    () => [
      { label: 'บันทึกงานสำเร็จ', value: '180+' },
      { label: 'โครงการที่ดูแล', value: '80+' },
      { label: 'ชั่วโมงบิน', value: '8Y' }, // เปลี่ยนจาก ประสบการณ์ตรง เป็น ชั่วโมงบิน
    ],
    [],
  );

  const metricsBlock = useMemo(() => <HeroMetrics metrics={metrics} />, [metrics]);

  // ภาษาไทยสไตล์เจ้าป่า (แก้ไขให้ตรงไปตรงมาและดูแพงขึ้น)
  const headlinePrefix = 'เปลี่ยนงานเอกสารให้เป็น';
  const highlightText = 'อาวุธทางธุรกิจ';
  const subtext =
    'สถานีผลิตเอกสารเกรดวิศวกรรม แม่นยำทุกตัวอักษร ตรวจสอบได้จริง และรักษาความลับระดับสูงสุด';

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-b-8 border-slate-900 bg-white px-4 text-center sm:px-6 lg:px-12"
    >
      {background}

      {/* 🛠️ ลายตารางวิศวกรรม (Overlay Grid) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <motion.div
        className="relative z-20 flex w-full max-w-5xl flex-col items-center gap-8 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* สถานะระบบ: แก้ไขจาก Operational_Ready เป็น System_Online */}
        <div className="flex items-center gap-3 border-2 border-primary bg-slate-900/80 px-5 py-2 shadow-neo-sm backdrop-blur-md">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </div>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-white">
            Status: System_Online_Ready
          </span>
        </div>

        <motion.div className="space-y-6">
          <motion.h1
            id="hero-heading"
            className="flex flex-col items-center justify-center font-heading text-5xl font-black uppercase italic tracking-tighter sm:text-7xl lg:text-9xl"
          >
            <span className="leading-none text-white drop-shadow-2xl">{headlinePrefix}</span>
            <LineShadowText className="text-primary" shadowColor="rgba(0,0,0,0.8)">
              {highlightText}
            </LineShadowText>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-3xl font-sans text-lg font-bold leading-relaxed text-white drop-shadow-lg sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-slate-900/50 px-2">{subtext}</span>
          </motion.p>
        </motion.div>

        {/* ปุ่ม CTA: ปรับข้อความให้ชัดเจนและดูเป็นมืออาชีพ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex flex-col gap-6 sm:flex-row"
        >
          <Button
            asChild
            className="h-20 rounded-none border-4 border-slate-900 bg-primary px-12 text-sm font-black uppercase tracking-[0.2em] text-white shadow-neo transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
          >
            <a href="https://lin.ee/G8s8rKp" target="_blank" rel="noopener noreferrer">
              <span className="flex items-center gap-3">
                ดีลงานด่วนสายตรง <Zap size={20} fill="currentColor" />
              </span>
            </a>
          </Button>

          <Button
            variant="outline"
            className="h-20 rounded-none border-4 border-white bg-white/10 px-12 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 active:scale-95"
          >
            <span className="flex items-center gap-3">
              เช็คหน่วยบริการ <Terminal size={20} strokeWidth={3} />
            </span>
          </Button>
        </motion.div>

        {/* บันทึกสถิติ (Metrics) */}
        {metrics.length > 0 && (
          <div className="mt-12 flex w-full flex-wrap justify-center gap-8">{metricsBlock}</div>
        )}
      </motion.div>

      {/* แถบทางม้าลายเหลืองดำ (Hazard Stripe) */}
      <div className="absolute bottom-0 left-0 h-4 w-full bg-[repeating-linear-gradient(45deg,#000,#000_20px,#facc15_20px,#facc15_40px)] opacity-80" />
    </section>
  );
}
