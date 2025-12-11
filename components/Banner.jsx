'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
          'relative w-full rounded-lg border border-border bg-background text-foreground shadow-xl',
          options.centered ? 'text-center' : 'text-left',
        )}
        style={{
          fontFamily: theme.font || 'TH Sarabun New, sans-serif',
          backgroundColor: theme.background || 'var(--background)',
          color: theme.text || 'var(--foreground)',
          padding: layout.padding || '2rem',
          borderRadius: layout.borderRadius || '12px',
          maxWidth: layout.width || '600px',
          boxShadow: layout.shadow ? '0 10px 30px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        {options.showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
            aria-label="ปิดแบนเนอร์"
          >
            ✕
          </button>
        )}

        {options.showPortrait && image && (
          <AspectRatio ratio={aspectRatio} className="mb-6 overflow-hidden rounded-md">
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

        <h1
          className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: theme.accent || 'var(--primary)' }}
        >
          {title}
        </h1>

        {(organization || representative) && (
          <p className="mb-4 text-base font-medium text-muted-foreground sm:text-lg">
            {organization && <span>{organization}</span>}
            {organization && representative && ' — '}
            {representative && <span>{representative}</span>}
          </p>
        )}

        <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          {message}
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleClose}
            className="hover:bg-primary-hover rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition sm:text-base"
            aria-label="ปิดแบนเนอร์ไว้อาลัย"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
