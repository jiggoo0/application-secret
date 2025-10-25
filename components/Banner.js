'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import clsx from 'clsx';

export default function Banner() {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ โหลดข้อมูล Banner.json ทุกครั้ง (ไม่แคช)
  useEffect(() => {
    const loadBanner = async () => {
      try {
        const res = await fetch('/data/Banner.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch Banner.json');
        const json = await res.json();
        setData(json);
        setVisible(true);
        setIsLoaded(true);
      } catch (err) {
        console.error('❌ โหลด Banner.json ไม่สำเร็จ:', err);
      }
    };
    loadBanner();
  }, []);

  const handleClose = () => setVisible(false);

  if (!data || !visible) return null;

  // ✅ ดึงข้อมูลจาก JSON
  const {
    organization = '',
    representative = '',
    title = '',
    message = '',
    image = '',
    theme = {},
    layout = {},
    options = {},
  } = data;

  // ✅ aspect ratio
  const aspectRatio =
    layout.aspectRatio === '16/9'
      ? 16 / 9
      : layout.aspectRatio === '4/3'
        ? 4 / 3
        : layout.aspectRatio === '1/1'
          ? 1
          : 16 / 9;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex items-center justify-center px-4 backdrop-blur-sm transition-opacity duration-500 sm:px-6 md:px-8',
        isLoaded ? 'animate-fadeIn opacity-100' : 'opacity-0',
      )}
      style={{ backgroundColor: theme.overlay || 'rgba(0,0,0,0.6)' }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(
          'relative w-full rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-zinc-900 dark:ring-gray-800',
          options.centered ? 'text-center' : 'text-left',
        )}
        style={{
          fontFamily: theme.font || 'TH Sarabun New, sans-serif',
          backgroundColor: theme.background || '#ffffff',
          color: theme.text || '#222',
          padding: layout.padding || '2rem',
          borderRadius: layout.borderRadius || '12px',
          maxWidth: layout.width || '600px',
          boxShadow: layout.shadow ? '0 10px 30px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        {/* ปุ่มปิดมุมขวาบน */}
        {options.showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full bg-black/10 px-3 py-1 text-sm text-gray-800 transition hover:bg-black/20 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20"
            aria-label="ปิดแบนเนอร์"
          >
            ✕
          </button>
        )}

        {/* ภาพหลัก */}
        {options.showPortrait && image && (
          <AspectRatio ratio={aspectRatio} className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt="ภาพไว้อาลัย"
              fill
              className="object-cover grayscale dark:brightness-[0.3]"
              priority
              unoptimized
            />
          </AspectRatio>
        )}

        {/* ข้อความหัวเรื่อง */}
        <h1
          className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: theme.accent || '#000066' }}
        >
          {title}
        </h1>

        {/* ชื่อองค์กร / ผู้แทน */}
        {(organization || representative) && (
          <p className="mb-4 text-base font-semibold text-gray-600 dark:text-gray-300 sm:text-lg">
            {organization && <span>{organization}</span>}
            {organization && representative && ' — '}
            {representative && <span>{representative}</span>}
          </p>
        )}

        {/* ข้อความอาลัย */}
        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg md:text-xl">
          {message}
        </p>

        {/* ปุ่มปิดด้านล่าง */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleClose}
            className="rounded-lg bg-blue-900 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 sm:text-base"
            aria-label="ปิดแบนเนอร์ไว้อาลัย"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
