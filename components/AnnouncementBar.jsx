// components/AnnouncementBar.jsx

'use client';

import { useEffect, useState } from 'react';
// ❌ BEFORE: import Loader from './common/Loader';
// ✅ AFTER: ใช้ Absolute Import Path ชี้ไปที่โฟลเดอร์ UI ที่ถูกยุบรวม
import Loader from '@/components/ui/Loader';

// กำหนดสีตาม status
const STATUS_COLORS = {
  updating: 'bg-yellow-500 text-black',
  ready: 'bg-green-600 text-white',
  active: 'bg-blue-600 text-white',
};

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // ... (ไม่เปลี่ยนแปลง)
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/data/announcements.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดประกาศได้');

        const data = await res.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch {
        setAnnouncements([
          { text: '⚠️ ไม่สามารถโหลดประกาศได้ในขณะนี้ กรุณาลองใหม่ภายหลัง', status: 'active' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-2" aria-busy="true" aria-label="กำลังโหลดประกาศ">
        {/* Loader ถูกเรียกใช้ต่อได้ทันที */}
        <Loader size="sm" />
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div className="py-2 text-center font-medium" role="status" aria-label="ไม่มีประกาศ">
        ไม่มีประกาศ
      </div>
    );
  }

  // ... (ส่วนที่เหลือของโค้ดไม่เปลี่ยนแปลง)
  const repeated = [...announcements, ...announcements];

  return (
    <section className="relative overflow-hidden py-2" aria-label="แถบประกาศ" aria-live="polite">
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent" />

      {/* Scrolling ticker */}
      <div
        className="animate-scroll flex gap-6 whitespace-nowrap px-6"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {repeated.map((item, idx) => {
          const colorClass = STATUS_COLORS[item.status] || 'bg-gray-200 text-gray-900';
          return (
            <span
              key={idx}
              className={`rounded-full px-4 py-1 text-sm font-medium ${colorClass} shadow-md`}
            >
              {item.text}
            </span>
          );
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
