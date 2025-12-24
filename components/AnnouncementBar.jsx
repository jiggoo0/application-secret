'use client';

/**
 * 🏗️ JP-VISOUL: Industrial Announcement Bar
 * Design: Industrial Neobrutalism (Slate-900 borders, 0px radius, Ticker Tape Style)
 * Fix: Removed raw '//' to pass ESLint jsx-no-comment-textnodes
 */
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';
import { Terminal, Activity } from 'lucide-react';

// กำหนดสีตาม status สไตล์ Industrial
const STATUS_COLORS = {
  updating: 'bg-yellow-400 text-slate-900 border-slate-900',
  ready: 'bg-emerald-500 text-white border-slate-900',
  active: 'bg-blue-600 text-white border-slate-900',
};

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/data/announcements.json');
        if (!res.ok) throw new Error('Load failed');
        const data = await res.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch {
        setAnnouncements([
          { text: 'SYSTEM_ERROR: UNABLE TO FETCH DATA PAYLOAD', status: 'active' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div
        className="flex justify-center border-b-2 border-slate-900 bg-white py-2"
        aria-busy="true"
      >
        <Loader size="sm" />
      </div>
    );
  }

  const repeated = [...announcements, ...announcements, ...announcements];

  return (
    <section
      className="relative flex items-center overflow-hidden border-b-2 border-slate-900 bg-white py-1"
      aria-label="System Ticker"
    >
      {/* 🛠️ Side Label */}
      <div className="z-20 flex items-center gap-2 border-r-2 border-slate-900 bg-slate-900 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-[4px_0_0_0_rgba(0,0,0,0.1)]">
        <Activity size={12} className="text-primary" />
        <span>LIVE_FEED</span>
      </div>

      <div
        className="animate-scroll flex items-center gap-8 whitespace-nowrap"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {repeated.map((item, idx) => {
          const colorClass =
            STATUS_COLORS[item.status] || 'bg-slate-100 text-slate-900 border-slate-900';
          return (
            <div key={idx} className="group flex items-center gap-4">
              {/* ✅ FIXED: ครอบด้วย {} เพื่อให้ ESLint รู้ว่าเป็น String ไม่ใช่ Comment Node */}
              <span className="font-mono text-xs text-slate-300">{'//'}</span>

              <span
                className={`flex items-center gap-2 border-2 px-3 py-0.5 text-[11px] font-black uppercase tracking-tighter shadow-neo-sm transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none ${colorClass}`}
              >
                <Terminal size={10} />
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 30s linear infinite;
          padding-left: 2rem;
        }
      `}</style>
    </section>
  );
}
