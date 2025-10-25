'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * 📊 HeroMetrics
 * - แสดงตัวเลข/สถิติสำคัญใน Hero section
 * - รองรับ animation fade-in + slide
 * - Responsive & accessible
 */
export default function HeroMetrics({ metrics }) {
  if (!metrics?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.dl
      className="mt-6 flex flex-wrap justify-center gap-6 text-center sm:gap-8 md:gap-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="ข้อมูลสถิติ"
    >
      {metrics.map(({ label, value }, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="flex min-w-[80px] flex-col items-center sm:min-w-[100px]"
          role="group"
          aria-label={label}
        >
          <dt className="text-xl font-bold text-white sm:text-2xl md:text-3xl">{value}</dt>
          <dd className="mt-1 text-sm text-white/70 sm:text-base md:text-lg">{label}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

// ✅ PropTypes
HeroMetrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

// ✅ Default Props
HeroMetrics.defaultProps = {
  metrics: [],
};
