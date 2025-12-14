'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReviewCard from '@/components/ui/ReviewCard';
import type { ReviewCardProps } from '@/components/ui/ReviewCard';

interface ReviewCarouselProps {
  initialLimit?: number;
  autoSlide?: boolean;
  interval?: number;
  continuous?: boolean;
}

interface ReviewApiResponse {
  reviews?: ReviewCardProps[];
  error?: string;
  count?: number;
  totalPages?: number;
}

export default function ReviewCarousel({
  initialLimit = 5,
  autoSlide = true,
  interval = 3000,
  continuous = true,
}: ReviewCarouselProps) {
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?page=${page}&limit=${initialLimit}`);
      if (!res.ok) throw new Error(`API failed with status ${res.status}`);
      const data: ReviewApiResponse = await res.json();
      const fetched = data.reviews || [];
      if (fetched.length === 0) {
        setHasMore(false);
      } else {
        setReviews((prev) => [...prev, ...fetched]);
        setPage((prev) => prev + 1);
        setHasMore(fetched.length === initialLimit);
      }
    } catch (err) {
      console.error('[ReviewCarousel] ❌', err);
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit, hasMore, loading]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const scrollOneCard = useCallback(() => {
    const container = containerRef.current;
    if (!container || reviews.length === 0) return;
    const card = container.querySelector('div > div');
    const cardWidth = card?.clientWidth || 320;
    container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
  }, [reviews]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('div > div');
    const cardWidth = card?.clientWidth || 320;
    container.scrollBy({
      left: dir === 'left' ? -cardWidth - 24 : cardWidth + 24,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      if (!hoverRef.current) scrollOneCard();
    }, interval);
    return () => clearInterval(timer);
  }, [autoSlide, scrollOneCard, interval]);

  if (reviews.length === 0 && !hasMore) {
    return (
      <section
        className="py-6 text-center text-gray-500 dark:text-gray-400"
        aria-label="รีวิวจากลูกค้า"
      >
        <p role="status" aria-live="polite">
          ยังไม่มีรีวิวให้แสดง
        </p>
      </section>
    );
  }

  if (reviews.length === 0 && loading) {
    return (
      <section className="py-12 text-center">
        <div className="flex h-40 w-full animate-pulse items-center justify-center rounded-lg bg-gray-200 text-gray-500 dark:bg-gray-800">
          กำลังโหลดรีวิว...
        </div>
      </section>
    );
  }

  return (
    <section className="group relative mx-auto max-w-6xl px-4 py-6" aria-label="รีวิวจากลูกค้า">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        aria-label="เลื่อนรีวิวไปทางซ้าย"
        className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group-hover:block dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <FaChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </button>
      <button
        onClick={() => scroll('right')}
        aria-label="เลื่อนรีวิวไปทางขวา"
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group-hover:block dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <FaChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent dark:from-gray-900" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent dark:from-gray-900" />

      {/* Review Cards */}
      <div
        ref={containerRef}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-2 transition-all duration-500 sm:px-3"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={`${review.id ?? review.name ?? idx}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="min-w-[320px] flex-shrink-0 snap-start sm:min-w-[340px] md:min-w-[360px]"
          >
            <ReviewCard {...review} />
          </motion.div>
        ))}

        {/* Load More / Loading */}
        {!continuous && hasMore && (
          <div className="flex min-w-[320px] snap-start items-center justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`btn-primary btn px-6 py-3 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-label="โหลดรีวิวเพิ่มเติม"
            >
              {loading ? 'กำลังโหลด...' : 'โหลดรีวิวเพิ่มเติม'}
            </button>
          </div>
        )}
        {continuous && hasMore && loading && (
          <div className="flex min-w-[320px] snap-start items-center justify-center">
            <p className="animate-pulse text-gray-500">กำลังโหลด...</p>
          </div>
        )}
      </div>
    </section>
  );
}
