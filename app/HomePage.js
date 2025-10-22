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

// 🧠 Dynamic imports with fallback UI
const Hero = dynamic(() => import('@/components/Hero/Hero'), {
  loading: () => (
    <div className="py-12 text-center text-gray-500 dark:text-gray-400">กำลังโหลด Hero...</div>
  ),
  ssr: false,
});

const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  loading: () => (
    <div className="py-12 text-center text-gray-500 dark:text-gray-400">กำลังโหลดรีวิว...</div>
  ),
  ssr: false,
});

const Blog = dynamic(() => import('@/components/Blog/Blog'), {
  loading: () => (
    <div className="py-12 text-center text-gray-500 dark:text-gray-400">กำลังโหลดบทความ...</div>
  ),
  ssr: false,
});

// 🧩 Section configuration
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
        className="space-y-24 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:space-y-32"
      >
        {sections.map(({ id, Component, props }) => (
          <Section
            key={id}
            id={id}
            ariaLabelledBy={`section-${id}`}
            className="scroll-mt-20 px-4 sm:px-6 lg:px-8"
          >
            <Component {...props} />
          </Section>
        ))}
      </main>
    </>
  );
}
