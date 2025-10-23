'use client';

import dynamic from 'next/dynamic';
import SEO from '@/components/SEO';
import AnnouncementBar from '@/components/AnnouncementBar';
import AlertBanner from '@/components/AlertBanner';
import Banner from '@/components/Banner';
import Section from '@/components/common/Section';
import Services from '@/components/Services';
import OurWorks from '@/components/OurWorks/OurWorks';
import About from '@/components/About';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// 🧠 Dynamic Imports (with better fallback + performance hint)
const Hero = dynamic(() => import('@/components/Hero/Hero'), {
  loading: () => (
    <div className="animate-pulse py-16 text-center text-gray-500 dark:text-gray-400">
      🔄 กำลังโหลด Hero...
    </div>
  ),
  ssr: false,
});

const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  loading: () => (
    <div className="animate-pulse py-16 text-center text-gray-500 dark:text-gray-400">
      💬 กำลังโหลดรีวิว...
    </div>
  ),
  ssr: false,
});

const Blog = dynamic(() => import('@/components/Blog/Blog'), {
  loading: () => (
    <div className="animate-pulse py-16 text-center text-gray-500 dark:text-gray-400">
      📰 กำลังโหลดบทความ...
    </div>
  ),
  ssr: false,
});

// 🧩 Section Config
const sections = [
  {
    id: 'hero',
    Component: Hero,
    props: {
      headline: 'ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ',
      highlightText: 'เจ้าป่า ชัดเจนไม่ขายฝัน',
      subtext: 'ยินดีร่วมงานทุกสายวงการ',
      ctaText: 'ดูบริการของเรา',
      ctaUrl: '#services',
      images: ['/images/hero/hero.webp', '/images/hero/hero2.webp', '/images/hero/hero3.webp'],
      slideInterval: 5000,
      metrics: [
        { label: 'ลูกค้า', value: '180+' },
        { label: 'โปรเจกต์', value: '80+' },
        { label: 'ปีที่ดำเนินธุรกิจ', value: '8 ปี' },
      ],
    },
  },
  { id: 'about', Component: About },
  { id: 'services', Component: Services },
  { id: 'works', Component: OurWorks },
  { id: 'reviews', Component: ReviewCarousel },
  { id: 'blog', Component: Blog },
];

export default function HomePage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <>
      {/* 🧭 SEO Metadata */}
      <SEO
        title="หน้าแรก | Application Secret"
        description="ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ ยินดีร่วมงานทุกสายวงการ"
        image="/images/og-image.webp"
        url="https://application-secret.vercel.app"
      />

      {/* 🔔 Global Announcements */}
      <AnnouncementBar />
      <AlertBanner />
      <Banner />

      {/* 🌍 Main Page */}
      <main
        id="main-content"
        role="main"
        aria-label="เนื้อหาหลัก"
        className="flex flex-col space-y-20 bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100 sm:space-y-28 lg:space-y-36"
      >
        {sections.map(({ id, Component, props }) => (
          <motion.section
            key={id}
            id={id}
            aria-labelledby={`section-${id}`}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Section
              id={id}
              ariaLabelledBy={`section-${id}`}
              className="scroll-mt-20 px-4 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <Component {...props} />
              </div>
            </Section>
          </motion.section>
        ))}
      </main>
    </>
  );
}
