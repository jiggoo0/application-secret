'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState('');

  const DATA_URL =
    'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Data/Banner.json';

  // Fetch banners from Supabase
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) setBanners(data);
      } catch (err) {
        console.error('❌ Failed to fetch banner:', err);
        setError('ไม่สามารถโหลดประกาศได้');
      }
    };
    fetchBanner();
  }, []);

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, [visible]);

  // Scroll lock when popup visible
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
  }, [visible]);

  if (!visible || error || banners.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="relative w-full max-w-lg rounded-xl border-2 border-red-600 bg-white p-6 shadow-xl dark:bg-gray-800">
            {banners.map((banner) => (
              <div key={banner.id}>
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400">
                  ⚠️ {banner.title}
                </h2>
                <p className="mb-4 text-gray-800 dark:text-gray-200">{banner.message}</p>
                <button
                  onClick={() => setVisible(false)}
                  className="animate-pulse rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  ปิด
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
