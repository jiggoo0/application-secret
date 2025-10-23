'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * 🖼️ HeroBackground
 * - แสดงภาพพื้นหลังแบบ slideshow
 * - รองรับ fade-in/out animation ด้วย Framer Motion
 * - มี overlay โปร่งแสงเพื่อเพิ่ม contrast
 */
export default function HeroBackground({ images, currentIndex }) {
  if (!images?.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* 🔳 Overlay สีดำโปร่งแสง */}
      <motion.div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
}

// ✅ PropTypes
HeroBackground.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

// ✅ Default props (เพิ่มความปลอดภัยเมื่อไม่มี props ส่งเข้า)
HeroBackground.defaultProps = {
  images: [],
  currentIndex: 0,
};
