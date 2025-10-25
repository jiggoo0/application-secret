'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import clsx from 'clsx';

const Banner = () => {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load JSON and check localStorage
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenBanner');
    if (hasSeen === 'true') return;

    fetch('/data/Banner.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setVisible(true);
        setIsLoaded(true);
      })
      .catch((err) => console.error('โหลด Banner.json ไม่สำเร็จ:', err));
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('hasSeenBanner', 'true');
  };

  if (!data || !visible) return null;

  const {
    title = 'น้อมอาลัย',
    message = '',
    image = '',
    theme = {},
    layout = {},
    options = {},
  } = data;

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
        'fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 transition-opacity duration-500 sm:px-6 md:px-8',
        isLoaded ? 'animate-fadeIn opacity-100' : 'opacity-0',
      )}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(
          'w-full max-w-[90vw] rounded-xl bg-white shadow-xl transition-all dark:bg-zinc-900 sm:max-w-lg md:max-w-2xl',
          options.centered ? 'text-center' : 'text-left',
        )}
        style={{
          fontFamily: theme.font || 'TH Sarabun New, sans-serif',
          color: theme.text || '#222',
          padding: layout.padding || '2rem',
          borderRadius: layout.borderRadius || '12px',
        }}
      >
        {options.showPortrait && image && (
          <AspectRatio ratio={aspectRatio} className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt="พระบรมฉายาลักษณ์"
              fill
              className="object-cover grayscale dark:brightness-[0.3]"
              priority
              unoptimized
            />
          </AspectRatio>
        )}

        <h1
          className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: theme.accent || '#000066' }}
        >
          {title}
        </h1>

        <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          {message}
        </p>

        {options.showCloseButton && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClose}
              className="rounded-md bg-blue-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-800 sm:text-base"
              aria-label="ปิดแบนเนอร์ไว้อาลัย"
            >
              ปิด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
