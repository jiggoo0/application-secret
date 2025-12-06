// components/HomePageClient.js
'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

import AnnouncementBar from '@/components/AnnouncementBar';
import AlertBanner from '@/components/AlertBanner';
import Banner from '@/components/Banner';
import Section from '@/components/common/Section';

// โหลด Hero
const Hero = dynamic(() => import('@/components/Hero/Hero'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      🔄 กำลังโหลด Hero...
    </div>
  ),
  ssr: false,
});

// โหลด Carousel รีวิว
const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      💬 กำลังโหลดรีวิว...
    </div>
  ),
  ssr: false,
});

// โหลด Blog
const Blog = dynamic(() => import('@/components/Blog/Blog'), {
  loading: () => (
    <div className="animate-pulse py-24 text-center text-muted-foreground">
      📰 กำลังโหลดบทความ...
    </div>
  ),
  ssr: false,
});

// sections array สำหรับ Client Components/Dynamic Imports ที่เหลือ
const sections = [
  { id: 'hero', Component: Hero },
  { id: 'about', Component: dynamic(() => import('@/components/About'), { ssr: false }) },
  {
    id: 'works',
    Component: dynamic(() => import('@/components/OurWorks/OurWorks'), { ssr: false }),
  },
  { id: 'reviews', Component: ReviewCarousel },
  { id: 'blog', Component: Blog },
];

/**
 * HomePageClient: Client Component ที่รับ RSC Content มาแสดงผลผ่าน props
 * @param {React.ReactNode} serviceSection - เนื้อหา Service Section ที่ถูก Render มาจาก Server แล้ว
 */
export default function HomePageClient({ serviceSection }) {
  return (
    <>
      <AnnouncementBar />
      <AlertBanner />
      <Banner />

      <main
        id="main-content"
        role="main"
        aria-label="เนื้อหาหลัก"
        className="flex flex-col gap-20 bg-background text-foreground transition-colors duration-300 sm:gap-28 lg:gap-36"
      >
        {/* 1. Loop ผ่าน Client/Dynamic Components */}
        {sections.map(({ id, Component }) => (
          <Suspense
            key={id}
            fallback={
              <div className="flex h-40 items-center justify-center text-gray-500">
                Loading {id} section...
              </div>
            }
          >
            <motion.section
              id={id}
              aria-labelledby={`section-${id}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
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
          </Suspense>
        ))}

        {/* 2. แสดง Service Section ที่ถูกส่งมาจาก Server (ServiceRSCWrapper) */}
        <motion.section
          id="services"
          aria-labelledby="section-services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
          className="w-full"
        >
          {/* ✅ FIX: เรียกใช้ Service Section ที่ถูก Render มาแล้ว */}
          {serviceSection}
        </motion.section>
      </main>
    </>
  );
}
