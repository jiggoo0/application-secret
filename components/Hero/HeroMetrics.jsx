'use client';

/**
 * 📊 JP-VISOUL: HeroMetrics (ฉบับเจ้าป่า - Tactical Dashboard)
 * Fix: Removed unused 'Users', 'Calendar', and 'ShieldCheck' imports to pass ESLint
 */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Briefcase, Cpu, Activity, Target } from 'lucide-react'; // ✅ ลบไอคอนที่ไม่ได้ใช้ออก

export default function HeroMetrics({ metrics }) {
  if (!metrics?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // 🧠 Icon Map สไตล์หน่วยปฏิบัติการ
  const iconMap = {
    บันทึกงานสำเร็จ: <Target size={18} strokeWidth={3} />,
    โครงการที่ดูแล: <Briefcase size={18} strokeWidth={3} />,
    ประสบการณ์ตรง: <Activity size={18} strokeWidth={3} />,
  };

  return (
    <motion.dl
      className="mt-10 flex flex-wrap justify-center gap-4 text-left sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="System Metrics"
    >
      {metrics.map(({ label, value }, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="group relative flex min-w-[150px] flex-col border-2 border-white/20 bg-slate-900/60 p-5 backdrop-blur-xl transition-all hover:border-primary hover:bg-slate-900/80 sm:min-w-[200px]"
          role="group"
          aria-label={label}
        >
          {/* 🧩 มาตรวัดด้านบน (Sensor Header) */}
          <div className="mb-4 flex items-center justify-between border-b-2 border-white/10 pb-3">
            <div className="text-primary transition-transform duration-300 group-hover:scale-110">
              {iconMap[label] || <Cpu size={18} strokeWidth={3} />}
            </div>
            {/* Status Light */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-[8px] font-black uppercase tracking-widest text-primary/60">
                Live_Data
              </span>
            </div>
          </div>

          {/* 🔢 ตัวเลขสถิติ (Engineered Value) */}
          <dt className="font-heading text-4xl font-black uppercase italic tracking-tighter text-white transition-colors group-hover:text-primary sm:text-5xl">
            {value}
          </dt>

          {/* 🏷️ ชื่อเรียกสถานะ (Label) */}
          <dd className="mt-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-white">
            {label}
          </dd>

          {/* 🛠️ ขีดบอกระดับ (Decorative Gauge Lines) */}
          <div className="mt-4 flex gap-1 opacity-30 transition-opacity group-hover:opacity-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-1 w-full ${i < 4 ? 'bg-primary' : 'bg-white/20'}`} />
            ))}
          </div>

          {/* มุมกล่อง (Corner Bracket) */}
          <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-primary opacity-0 transition-all group-hover:opacity-100" />
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
