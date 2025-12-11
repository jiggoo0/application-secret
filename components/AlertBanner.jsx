'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react'; // นำเข้า Icon X สำหรับปุ่มปิด

/**
 * @fileoverview AlertBanner Component
 * ปรับปรุง: แก้ไข Error react/no-unescaped-entities, ปรับปรุงปุ่มปิด (UX)
 */
export default function AlertBanner() {
  const [visible, setVisible] = useState(false);

  // 1. Logic: ตรวจสอบสถานะการปิดแบนเนอร์ใน localStorage
  useEffect(() => {
    // ต้องตรวจสอบ window ก่อนเข้าถึง localStorage สำหรับ Next.js Hydration
    const dismissed = typeof window !== 'undefined' && localStorage.getItem('alertDismissed');
    if (!dismissed) setVisible(true);
  }, []);

  // 2. Logic: จัดการการปิดแบนเนอร์และบันทึกสถานะ
  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alertDismissed', 'true');
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // Fixed positioning & high Z-index for the container
          className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="pointer-events-auto w-full max-w-xl"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="alert" // Accessibility
          >
            {/* Design: Indigo/Yellow for Professional Authority */}
            <div className="relative flex flex-col items-start gap-4 rounded-xl border-2 border-yellow-400 bg-indigo-950/95 p-5 text-white shadow-2xl backdrop-blur-sm md:flex-row md:items-center md:p-6">
              {/* Icon */}
              <Megaphone className="h-7 w-7 flex-shrink-0 text-yellow-400" />

              <div className="flex-1">
                {/* Header */}
                <h3 className="text-lg font-bold text-yellow-300 md:text-xl">
                  🚨 ประกาศสำคัญ: ชี้แจงสถานะจาก JP Visual &amp; Docs
                </h3>
                {/* Content */}
                <div className="mt-2 space-y-2 text-sm leading-relaxed md:text-base">
                  <p>
                    เว็บไซต์นี้ <strong>ไม่ใช่สถาบันการเงิน</strong> และไม่มีบริการปล่อยสินเชื่อใด ๆ
                  </p>
                  <p>
                    <span className="font-semibold text-cyan-300">
                      &apos;เจ้าป่า&apos; ดำเนินธุรกิจโดยยกระดับธุรกิจสีเทาให้มีมาตรฐานระดับมืออาชีพ
                    </span>
                    และให้คำปรึกษาด้านเอกสารและการนำเสนอข้อมูลเท่านั้น
                  </p>
                  <p>
                    <span className="font-bold">เจ้าป่า ชัดเจนไม่ขายฝัน</span>
                    ยินดีร่วมงานกับทุกสายวงการ และให้ความสำคัญกับ **ความลับของลูกค้าสูงสุด**
                  </p>
                </div>
              </div>

              {/* Close Button (Optimized for both mobile/desktop placement) */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="ปิดประกาศ"
                className="absolute right-3 top-3 rounded-full p-1 text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:static md:ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
