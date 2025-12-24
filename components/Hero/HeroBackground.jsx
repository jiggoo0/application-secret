'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * 🏗️ JP-VISOUL: HeroBackground (ฉบับเจ้าป่า - Tactical Command Center)
 * - เน้นความดิบของพื้นผิว (Texture)
 * - เอฟเฟกต์ภาพสไตล์กล้องวงจรปิดหน่วยความมั่นคง
 * - ระบบกริดแบบแปลนวิศวกรรม
 */
export default function HeroBackground({ images, currentIndex }) {
  if (!images?.length) return null;

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-slate-950" aria-hidden="true">
      {/* 🖼️ Image Slideshow (Tactical Feed) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: 'blur(10px) grayscale(100%)' }}
          animate={{
            opacity: 0.5,
            filter: 'blur(0px) grayscale(100%) contrast(150%)',
            scale: 1,
          }}
          exit={{ opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      {/* 🛠️ Tactical Overlays (เลเยอร์ความขลัง) */}

      {/* 1. Deep Night Tint - คุมโทนให้ดุดัน */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* 2. Engineering Blueprints Grid - ตารางแปลนงาน */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3. Tactical UI Overlay - เส้นเล็งเป้าหมาย (Crosshair Corner) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-20 w-20 border-l-2 border-t-2 border-primary" />
        <div className="absolute right-10 top-10 h-20 w-20 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-10 left-10 h-20 w-20 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-primary" />
      </div>

      {/* 4. CRT Digital Noise & Scanlines - เอฟเฟกต์หน้าจอคอมพิวเตอร์ยุคเก่า */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px, #fff 3px)`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* 5. Heavy Vignette (The "Focus" Effect) - บีบสายตาให้มองที่ข้อความตรงกลาง */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

      {/* 6. Static Noise Texture - เพิ่มความดิบแบบแผ่นฟิล์มหรือจอทีวีเสีย */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}

HeroBackground.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
};
