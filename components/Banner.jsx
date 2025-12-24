'use client';

/**
 * 🏗️ JP-VISOUL: Industrial Banner Component
 * Design: Industrial Neobrutalism
 * Fix: Escaped '//' patterns to pass ESLint (react/jsx-no-comment-textnodes)
 */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Terminal, X, Bell } from 'lucide-react';
import clsx from 'clsx';

export default function Banner() {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const res = await fetch('/data/Banner.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch Banner.json');
        const json = await res.json();
        setData(json);
        // หน่วงเวลาเล็กน้อยเพื่อให้ Animation ทำงานสวยๆ
        setTimeout(() => {
          setVisible(true);
          setIsLoaded(true);
        }, 300);
      } catch (err) {
        console.error('❌ โหลด Banner.json ไม่สำเร็จ:', err);
      }
    };
    loadBanner();
  }, []);

  const handleClose = () => {
    setIsLoaded(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!data || !visible) return null;

  const {
    organization = 'JP-VISOUL',
    representative = 'JAO-PA',
    title = 'SYSTEM_ANNOUNCEMENT',
    message = '',
    image = '',
    theme = {},
    layout = {},
    options = {},
  } = data;

  const aspectRatio = layout.aspectRatio === '1/1' ? 1 : 16 / 9;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300',
        isLoaded ? 'opacity-100 backdrop-blur-md' : 'opacity-0 backdrop-blur-0',
      )}
      style={{ backgroundColor: theme.overlay || 'rgba(0,0,0,0.85)' }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(
          'relative w-full border-4 border-slate-900 bg-white shadow-neo transition-all duration-500',
          isLoaded ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95',
          options.centered ? 'text-center' : 'text-left',
        )}
        style={{
          maxWidth: layout.width || '550px',
          padding: layout.padding || '2.5rem',
          borderRadius: '0px',
        }}
      >
        {/* 🛠️ Header Indicator */}
        <div className="absolute left-0 top-0 flex items-center gap-2 bg-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
          <Bell size={12} strokeWidth={3} />
          <span>Priority_Signal</span>
        </div>

        {/* ✕ Close Button */}
        {options.showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center border-2 border-slate-900 bg-white text-slate-900 shadow-neo-sm transition-all hover:bg-primary hover:text-white"
            aria-label="ปิด"
          >
            <X size={20} strokeWidth={3} />
          </button>
        )}

        {/* 🖼️ Featured Visual */}
        {options.showPortrait && image && (
          <div className="mb-8 overflow-hidden border-2 border-slate-900 shadow-neo-sm">
            <AspectRatio ratio={aspectRatio}>
              <Image
                src={image}
                alt="Banner Visual"
                fill
                className="object-cover contrast-125 grayscale"
                priority
                unoptimized
              />
            </AspectRatio>
          </div>
        )}

        {/* 📝 Content */}
        <div className="space-y-4">
          <h1 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-slate-900 sm:text-4xl">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-2 border-y-2 border-slate-100 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <p className="font-mono text-xs font-black uppercase tracking-widest text-slate-400">
              {/* ✅ FIXED: Escaped // pattern */}
              {organization} {' // '} {representative}
            </p>
          </div>

          <p className="whitespace-pre-line font-sans text-base font-bold leading-relaxed text-slate-600 sm:text-lg">
            {message}
          </p>
        </div>

        {/* 🔘 Control Button */}
        <div className="mt-10">
          <button
            onClick={handleClose}
            className="group relative w-full border-2 border-slate-900 bg-slate-900 py-4 font-heading text-sm font-black uppercase italic tracking-[0.2em] text-white shadow-neo transition-all hover:bg-primary hover:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ACKNOWLEDGEMENT <Terminal size={16} />
            </span>
          </button>
        </div>

        {/* 🏁 Footer Tag */}
        <p className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300">
          {/* ✅ FIXED: Escaped // pattern */}
          End_Of_Transmission {' // '} Data_Secure_Vault
        </p>
      </div>
    </div>
  );
}
