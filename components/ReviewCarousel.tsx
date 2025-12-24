'use client';

/**
 * 🏗️ JP-VISOUL: Review Carousel (Industrial Edition)
 * Design: High-Contrast Neobrutalism (Slate-900 borders, Hard shadows)
 * Fix: Escaped '//' patterns to pass ESLint (react/jsx-no-comment-textnodes)
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReviewCard from '@/components/ui/ReviewCard';
import type { ReviewCardProps } from '@/components/ui/ReviewCard';
import { ChevronLeft, ChevronRight, Activity, Terminal } from 'lucide-react';

interface ReviewCarouselProps {
  initialLimit?: number;
  autoSlide?: boolean;
  interval?: number;
  continuous?: boolean;
}

export default function ReviewCarousel({
  initialLimit = 5,
  autoSlide = true,
  interval = 4000,
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
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      const fetched = data.reviews || [];
      if (fetched.length === 0) {
        setHasMore(false);
      } else {
        setReviews((prev) => [...prev, ...fetched]);
        setPage((prev) => prev + 1);
        setHasMore(fetched.length === initialLimit);
      }
    } catch (err) {
      console.error('[System_Error] Failed to load feedback:', err);
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit, hasMore, loading]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('div > div')?.clientWidth || 360;
    const offset = dir === 'left' ? -cardWidth - 24 : cardWidth + 24;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      if (!hoverRef.current) scroll('right');
    }, interval);
    return () => clearInterval(timer);
  }, [autoSlide, scroll, interval]);

  // ⚠️ Empty State: Industrial Warning
  if (reviews.length === 0 && !hasMore) {
    return (
      <div className="border-2 border-dashed border-slate-200 py-12 text-center">
        <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
          {'//'} NO_FEEDBACK_DATA_SYNCED {'//'}
        </p>
      </div>
    );
  }

  return (
    <section
      className="relative mx-auto max-w-[1440px] px-4 py-12"
      aria-label="Customer Success Reports"
    >
      {/* 🛠️ Section Header */}
      <div className="mb-10 flex items-end justify-between border-b-2 border-slate-900 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Activity size={14} strokeWidth={3} />
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em]">
              Operational_Proof
            </span>
          </div>
          <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter text-slate-900">
            SUCCESS <span className="text-primary">REPORTS</span>
          </h2>
        </div>

        {/* Navigation Console */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="border-2 border-slate-900 bg-white p-3 text-slate-900 shadow-neo-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="border-2 border-slate-900 bg-slate-900 p-3 text-white shadow-neo-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Review Cards Grid/Carousel */}
      <div
        ref={containerRef}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth py-4"
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="min-w-[320px] flex-shrink-0 snap-start sm:min-w-[380px]"
          >
            <ReviewCard {...review} />
          </motion.div>
        ))}

        {/* End of Line Loader */}
        {hasMore && (
          <div className="flex min-w-[200px] flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/50">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group flex flex-col items-center gap-2"
            >
              <div className="border-2 border-slate-900 bg-white p-4 shadow-neo-sm transition-all group-hover:shadow-neo">
                <Terminal size={24} className={loading ? 'animate-pulse' : ''} />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-900">
                {loading ? 'SYNCING...' : 'FETCH_MORE'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-grow bg-slate-100" />
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
          SYSTEM_REPORT: {reviews.length} ENTRIES_LOADED
        </span>
        <div className="h-px flex-grow bg-slate-100" />
      </div>
    </section>
  );
}
