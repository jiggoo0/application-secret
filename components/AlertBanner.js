'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone } from 'lucide-react';

export default function AlertBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && localStorage.getItem('alertDismissed');
    if (!dismissed) setVisible(true);
  }, []);

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
          >
            <div className="relative flex flex-col items-start gap-4 rounded-xl border-2 border-red-700 bg-gradient-to-r from-red-600 to-red-500 p-5 shadow-2xl backdrop-blur-sm dark:border-red-800 dark:from-red-900 dark:to-red-800 md:flex-row md:items-center md:p-6">
              <Megaphone className="h-7 w-7 flex-shrink-0 text-white dark:text-red-200" />
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-white dark:text-red-200 md:text-xl">
                  🚨 ประกาศสำคัญจากทีม JP Visual & Docs
                </h3>
                <p className="mt-2 space-y-2 text-sm leading-relaxed text-white/90 dark:text-red-100 md:text-base">
                  เว็บไซต์นี้ <strong>ไม่ใช่สถาบันการเงิน</strong> และไม่มีบริการปล่อยสินเชื่อ
                  &quot;เจ้าป่า&quot;
                  <br />
                  เจ้าป่า ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ
                  <br />
                  เจ้าป่า ชัดเจนไม่ขายฝัน
                  <br />
                  ยินดีร่วมงานทุกสายวงการ
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="ปิดประกาศ"
                className="absolute right-2 top-2 text-xl font-bold text-white transition-transform hover:scale-125 hover:text-gray-100 dark:text-red-200 dark:hover:text-white md:static md:ml-4"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
