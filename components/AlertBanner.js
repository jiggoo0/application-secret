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
            <div className="relative flex flex-col items-start gap-4 rounded-lg border border-destructive bg-gradient-to-r from-destructive to-red-500 p-5 text-destructive-foreground shadow-xl backdrop-blur-sm md:flex-row md:items-center md:p-6">
              <Megaphone className="h-7 w-7 flex-shrink-0 text-destructive-foreground" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold md:text-xl">
                  🚨 ประกาศสำคัญจากทีม JP Visual & Docs
                </h3>
                <p className="mt-2 space-y-2 text-sm leading-relaxed md:text-base">
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
                className="absolute right-2 top-2 text-xl font-bold transition-transform hover:scale-125 md:static md:ml-4"
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
