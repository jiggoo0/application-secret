'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';

/**
 * Carousel Component
 * Props:
 * - items: array of data
 * - renderItem: function to render each item
 * - autoPlay: boolean
 * - interval: number (ms)
 */
export default function Carousel({ items = [], renderItem, autoPlay = false, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const interactionRef = useRef(false);
  const containerRef = useRef(null);

  // Auto slide
  useEffect(() => {
    if (!autoPlay || items.length <= 1 || interactionRef.current) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  // Go to specific slide
  const goTo = useCallback(
    (index) => {
      interactionRef.current = true;
      if (index >= 0 && index < items.length) setActiveIndex(index);
    },
    [items.length],
  );

  // Keyboard navigation (ref-safe)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goTo((activeIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') goTo((activeIndex + 1) % items.length);
    };

    container.addEventListener('keydown', handleKey);
    return () => container.removeEventListener('keydown', handleKey);
  }, [activeIndex, goTo, items.length]);

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="แคโรเซล"
      className="relative w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="relative w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'absolute inset-0 transition-opacity duration-500 ease-in-out',
              idx === activeIndex ? 'relative opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={idx !== activeIndex}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={clsx(
                'h-3 w-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                idx === activeIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600',
              )}
              aria-label={`ไปยังสไลด์ที่ ${idx + 1}`}
              aria-current={idx === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}

Carousel.defaultProps = {
  autoPlay: false,
  interval: 5000,
};
