'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * HeroBackground
 * แสดงภาพพื้นหลังแบบ slideshow พร้อม overlay
 * รองรับ animation fade-in/out ด้วย Framer Motion
 */
export default function HeroBackground({ images, currentIndex }) {
  if (!images?.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
          aria-hidden="true"
        />
      ))}

      {/* Overlay สีดำโปร่งแสง */}
      <motion.div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
      />
    </div>
  );
}

// 🔹 PropTypes
HeroBackground.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

// 🔹 DefaultProps (Optional แต่เพิ่มความปลอดภัย)
HeroBackground.defaultProps = {
  images: [],
  currentIndex: 0,
};
