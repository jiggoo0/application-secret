'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReviewCard from './common/ReviewCard'; // ✅ ใช้ component เดิม

export default function ReviewCarousel({
  initialLimit = 5,
  autoSlide = true,
  interval = 3000,
  continuous = true,
}) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const hoverRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?page=${page}&limit=${initialLimit}`);
      const data = await res.json();

      if (!data.reviews?.length) {
        setHasMore(false);
        return;
      }

      setReviews((prev) => [...prev, ...data.reviews]);
      setPage((prev) => prev + 1);
      setHasMore(data.reviews.length === initialLimit);
    } catch (err) {
      console.error('[ReviewCarousel] ❌ Error loading reviews:', err);
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

    const cardWidth = container.querySelector('div > div')?.offsetWidth || 320;
    container.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
  }, [reviews]);

  const scroll = useCallback((direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector('div > div')?.offsetWidth || 320;
    const scrollAmount = cardWidth + 24;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const container = containerRef.current;
    if (!container) return;

    const timer = setInterval(() => {
      if (!hoverRef.current) {
        scrollOneCard();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, scrollOneCard, interval]);

  if (reviews.length === 0 && !hasMore) {
    return (
      <section
        aria-label="รีวิวจากลูกค้า"
        className="py-6 text-center text-gray-500 dark:text-gray-400"
      >
        <p role="status" aria-live="polite">
          ยังไม่มีรีวิวให้แสดง
        </p>
      </section>
    );
  }

  return (
    <section aria-label="รีวิวจากลูกค้า" className="group relative mx-auto max-w-6xl px-4 py-6">
      {/* 🔄 Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        aria-label="เลื่อนรีวิวไปทางซ้าย"
        className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group-hover:block dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <FaChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </button>

      <button
        onClick={() => scroll('right')}
        aria-label="เลื่อนรีวิวไปทางขวา"
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group-hover:block dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <FaChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      </button>

      {/* 🌗 Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent dark:from-gray-900" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent dark:from-gray-900" />

      {/* 🧩 Review Cards */}
      <div
        ref={containerRef}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-2 transition-all duration-500 sm:px-3"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={`${review.id ?? review.username}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="min-w-[320px] flex-shrink-0 snap-start sm:min-w-[340px] md:min-w-[360px]"
          >
            <ReviewCard {...review} />
          </motion.div>
        ))}

        {!continuous && hasMore && (
          <div className="flex min-w-[320px] snap-start items-center justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`btn btn-primary px-6 py-3 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-label="โหลดรีวิวเพิ่มเติม"
            >
              {loading ? 'กำลังโหลด...' : 'โหลดรีวิวเพิ่มเติม'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
