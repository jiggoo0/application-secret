'use client';

/**
 * 🏗️ JP-VISOUL: Industrial Alert Banner
 * Design: Industrial Neobrutalism (Yellow Hazard, Slate-900 borders, 0px radius)
 * Fix: Removed unused 'X' import & escaped '//' to pass ESLint
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal } from 'lucide-react'; // ✅ ลบ X ออก

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
          className="pointer-events-none fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-auto w-full max-w-2xl"
            initial={{ y: -100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            role="alert"
          >
            <div className="relative border-4 border-slate-900 bg-yellow-400 p-1 shadow-neo-lg">
              {/* Decorative Hazard Stripes (Top) */}
              <div className="h-3 w-full border-b-2 border-slate-900 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fbbf24_10px,#fbbf24_20px)]" />

              <div className="bg-white p-5 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  {/* Icon Station */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-slate-900 bg-yellow-400 shadow-neo-sm">
                    <ShieldAlert className="h-8 w-8 text-slate-900" strokeWidth={2.5} />
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Terminal size={12} />
                        <span>System_Security_Notice</span>
                      </div>
                      <h3 className="font-heading text-2xl font-black uppercase italic tracking-tighter text-slate-900 md:text-3xl">
                        Disclaimer_<span className="text-blue-600">Protocol</span>
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 font-sans text-sm font-bold leading-relaxed text-slate-700 md:text-base">
                      <p className="border-l-4 border-slate-900 pl-3">
                        เว็บไซต์นี้{' '}
                        <span className="bg-slate-900 px-1 text-white">ไม่ใช่สถาบันการเงิน</span>{' '}
                        และไม่มีบริการปล่อยสินเชื่อในทุกกรณี
                      </p>
                      <p>
                        <strong className="italic text-slate-900">JP-VISOUL</strong>{' '}
                        ดำเนินการประมวลผลเอกสารและให้คำปรึกษาเพื่อยกระดับโครงสร้างธุรกิจสู่มาตรฐานมืออาชีพเท่านั้น
                      </p>
                      {/* ✅ FIXED: ครอบด้วย {} เพื่อไม่ให้ ESLint มองว่าเป็น Comment ใน JSX */}
                      <p className="text-[11px] font-black uppercase italic tracking-widest text-slate-400">
                        {'//'} Customer_Confidentiality_is_Absolute {'//'}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={handleClose}
                      className="mt-2 w-full border-2 border-slate-900 bg-slate-900 py-3 font-heading text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-blue-600 active:translate-y-1 active:shadow-none"
                    >
                      Acknowledge_Terms
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Hazard Stripes (Bottom) */}
              <div className="h-3 w-full border-t-2 border-slate-900 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fbbf24_10px,#fbbf24_20px)]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
