'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Users, Briefcase, CalendarCheck } from 'lucide-react'; // ✅ เพิ่มไอคอน

/**
 * 📊 HeroMetrics
 * - แสดงตัวเลข/สถิติสำคัญใน Hero section พร้อมไอคอน
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

  // 🧠 Map label → icon
  const iconMap = {
    ลูกค้า: <Users className="h-6 w-6 text-yellow-300" />,
    โปรเจกต์: <Briefcase className="h-6 w-6 text-yellow-300" />,
    ปีที่ดำเนินธุรกิจ: <CalendarCheck className="h-6 w-6 text-yellow-300" />,
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
          {/* 🔰 Icon */}
          <div className="mb-2">{iconMap[label] || null}</div>

          {/* 🔢 Value */}
          <dt className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">{value}</dt>

          {/* 🏷️ Label */}
          <dd className="mt-1 text-sm text-white/90 sm:text-base md:text-lg">{label}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}

HeroMetrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

HeroMetrics.defaultProps = {
  metrics: [],
};
