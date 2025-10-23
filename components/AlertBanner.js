'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';

/**
 * 🚨 AlertBanner
 * - แสดงประกาศสำคัญแบบ dismissible
 * - ใช้ localStorage เพื่อไม่แสดงซ้ำ
 * - รองรับ animation ด้วย Framer Motion
 */
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="w-full max-w-xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Alert
              variant="destructive"
              className="border-red-400/70 shadow-xl dark:border-red-700/70 dark:bg-red-900/40"
            >
              <div className="flex items-start gap-3">
                <Megaphone
                  className="mt-0.5 h-6 w-6 text-red-600 dark:text-red-400"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <AlertTitle className="text-lg font-bold text-red-700 dark:text-red-400">
                    🚨 ประกาศสำคัญจากทีม JP Visual & Docs
                  </AlertTitle>
                  <AlertDescription className="mt-1 space-y-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    <p>เว็บไซต์นี้ไม่ใช่สถาบันการเงิน และไม่มีบริการปล่อยสินเชื่อในทุกกรณี</p>
                    <p>
                      ทีม <strong>JP Visual & Docs</strong> ให้บริการเฉพาะด้านงานเอกสารดิจิทัล,
                      การออกแบบระบบ และการจัดการข้อมูลธุรกิจเท่านั้น
                    </p>
                    <p className="font-medium text-red-700 dark:text-red-400">
                      โปรดตรวจสอบข้อมูลก่อนติดต่อ เพื่อความปลอดภัยของท่าน 🙏
                    </p>
                  </AlertDescription>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="ปิดประกาศ"
                  className="ml-4 text-lg font-bold text-gray-600 transition hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  ✕
                </button>
              </div>
            </Alert>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
