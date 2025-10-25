'use client';

import { useEffect, useState } from 'react';
import Loader from './common/Loader';

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/data/announcements.json');
        if (!res.ok) {
          throw new Error('ไม่สามารถโหลดประกาศได้');
        }

        const data = await res.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (err) {
        setAnnouncements([{ text: '⚠️ ไม่สามารถโหลดประกาศได้ในขณะนี้ กรุณาลองใหม่ภายหลัง' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div
        className="flex justify-center bg-yellow-100 py-2"
        aria-busy="true"
        aria-label="กำลังโหลดประกาศ"
      >
        <Loader variant="dots" size="sm" color="text-yellow-800" />
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div
        className="bg-yellow-100 py-2 text-center font-semibold text-yellow-900"
        role="status"
        aria-label="ไม่มีประกาศ"
      >
        ไม่มีประกาศ
      </div>
    );
  }

  const repeated = [...announcements, ...announcements];

  return (
    <section
      className="relative overflow-hidden bg-yellow-100 py-2"
      aria-label="แถบประกาศ"
      aria-live="polite"
    >
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-yellow-100 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-yellow-100 to-transparent" />

      {/* Scrolling ticker */}
      <div
        className="animate-scroll flex gap-8 whitespace-nowrap px-6"
        style={{
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {repeated.map((item, idx) => (
          <span key={idx} className="font-semibold text-yellow-900">
            {item.text}
          </span>
        ))}
      </div>
    </section>
  );
}
