'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import SEO from '@/components/SEO';
import AnnouncementBar from '@/components/AnnouncementBar';
import AlertBanner from '@/components/AlertBanner';
import Banner from '@/components/Banner';
import Section from '@/components/common/Section';

const Hero = dynamic(() => import('@/components/Hero/Hero'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      🔄 กำลังโหลด Hero...
    </div>
  ),
  ssr: false,
});

const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      💬 กำลังโหลดรีวิว...
    </div>
  ),
  ssr: false,
});

const Blog = dynamic(() => import('@/components/Blog/Blog'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      📰 กำลังโหลดบทความ...
    </div>
  ),
  ssr: false,
});

const sections = [
  {
    id: 'hero',
    Component: Hero, // ✅ ไม่มี props แล้ว
  },
  {
    id: 'about',
    Component: dynamic(() => import('@/components/About'), { ssr: false }),
  },
  {
    id: 'services',
    Component: dynamic(() => import('@/components/Services'), { ssr: false }),
  },
  {
    id: 'works',
    Component: dynamic(() => import('@/components/OurWorks/OurWorks'), { ssr: false }),
  },
  {
    id: 'reviews',
    Component: ReviewCarousel,
  },
  {
    id: 'blog',
    Component: Blog,
  },
];

export default function HomePage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <>
      <SEO
        title="หน้าแรก | Application Secret"
        description="ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ ยินดีร่วมงานทุกสายวงการ"
        image="/images/og-image.webp"
        url="https://application-secret.vercel.app"
      />

      <AnnouncementBar />
      <AlertBanner />
      <Banner />

      <main
        id="main-content"
        role="main"
        aria-label="เนื้อหาหลัก"
        className="flex flex-col gap-20 bg-background text-foreground transition-colors duration-300 sm:gap-28 lg:gap-36"
      >
        {sections.map(({ id, Component }) => (
          <motion.section
            key={id}
            id={id}
            aria-labelledby={`section-${id}`}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
          >
            <Section
              id={id}
              ariaLabelledBy={`section-${id}`}
              className="scroll-mt-20 px-4 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-7xl">
                <Component />
              </div>
            </Section>
          </motion.section>
        ))}
      </main>
    </>
  );
}
