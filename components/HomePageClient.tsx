'use client';

import dynamic, { type LoadableComponent } from 'next/dynamic';
import React, { Suspense, ReactNode, type ComponentProps, Fragment, useMemo } from 'react';
import type { Post } from '@/types/blog';

// ----------------------------
// Static Imports (Client Components)
// ----------------------------
import AnnouncementBar from '@/components/AnnouncementBar';
import AlertBanner from '@/components/AlertBanner';
import Banner from '@/components/Banner';
import Section from '@/components/ui/Section';
import ChunkErrorBoundary from '@/components/utils/ChunkErrorBoundary';

// ----------------------------
// Dynamic Imports with Type Safety
// ----------------------------
// 💡 Note: ComponentProps should use the 'typeof' the default export path
type HeroProps = ComponentProps<typeof import('@/components/Hero/Hero').default>;
const Hero = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: false,
}) as LoadableComponent<HeroProps>;

type ReviewCarouselProps = ComponentProps<typeof import('@/components/ReviewCarousel').default>;
const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  ssr: false,
}) as LoadableComponent<ReviewCarouselProps>;

type BlogProps = ComponentProps<typeof import('@/components/Blog/Blog').default>;
const Blog = dynamic(() => import('@/components/Blog/Blog'), {
  ssr: false,
}) as LoadableComponent<BlogProps>;

type AboutProps = ComponentProps<typeof import('@/components/About').default>;
const About = dynamic(() => import('@/components/About'), {
  ssr: false,
}) as LoadableComponent<AboutProps>;

type OurWorksProps = ComponentProps<typeof import('@/components/OurWorks/OurWorks').default>;
const OurWorks = dynamic(() => import('@/components/OurWorks/OurWorks'), {
  ssr: false,
}) as LoadableComponent<OurWorksProps>;

// ----------------------------
// Types
// ----------------------------
interface SectionItem {
  id: string;
  title: string;
  // Component?: React.ComponentType<any> | LoadableComponent<any>; // ใช้ React.ElementType เพื่อความยืดหยุ่น
  Component?: React.ElementType;
  isServerComponent?: boolean;
  isTitleSrOnly?: boolean;
  // เพิ่ม Prop สำหรับ Blog โดยเฉพาะ
  hasPostsProp?: boolean;
}

interface HomePageClientProps {
  serviceSection: ReactNode;
  latestPosts: Post[];
}

// ----------------------------
// Config (ใช้ useMemo เพื่อให้แน่ใจว่าสร้างครั้งเดียว)
// ----------------------------
const sections: SectionItem[] = [
  { id: 'hero', title: 'Hero Section', Component: Hero, isTitleSrOnly: true },
  { id: 'about', title: 'เกี่ยวกับเรา', Component: About },
  { id: 'works', title: 'ผลงานของเรา', Component: OurWorks },
  { id: 'services', title: 'บริการ', isServerComponent: true }, // Server Component
  { id: 'reviews', title: 'รีวิวจากลูกค้า', Component: ReviewCarousel },
  { id: 'blog', title: 'บทความล่าสุด', Component: Blog, hasPostsProp: true }, // Dynamic Client Component
];

// ----------------------------
// Main Component
// ----------------------------
export default function HomePageClient({ serviceSection, latestPosts = [] }: HomePageClientProps) {
  // 💡 Refactored: ใช้ useMemo เพื่อจำค่าผลลัพธ์ของฟังก์ชันนี้
  const renderSectionContent = useMemo(
    () =>
      (id: string, Component?: React.ElementType): ReactNode => {
        // 1. Service Section (Server Component)
        if (id === 'services') return serviceSection;

        // 2. Blog Section (ต้องส่ง posts prop)
        const currentSection = sections.find((s) => s.id === id);
        if (id === 'blog' && Component) {
          // ใช้ currentSection.hasPostsProp เพื่อให้ Type Checker รู้
          return <Component posts={latestPosts} />;
        }

        // 3. Dynamic/Static Client Components ทั่วไป
        if (Component) return <Component />;

        return null; // ไม่มี Component หรือ Logic ที่เกี่ยวข้อง
      },
    [serviceSection, latestPosts],
  );

  const getSuspenseFallback = (id: string) => (
    <div className="flex h-40 animate-pulse items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-gray-500 dark:border-gray-700 dark:bg-gray-800">
      {id === 'blog' ? (
        <span className="text-sm font-medium">📰 กำลังโหลดบทความ...</span>
      ) : (
        <span className="text-sm">Loading {id} section...</span>
      )}
    </div>
  );

  return (
    <>
      <AnnouncementBar />
      <AlertBanner />
      <Banner />

      <main
        id="main-content"
        role="main"
        aria-label="เนื้อหาหลัก"
        className="flex flex-col gap-20 bg-background text-foreground sm:gap-28 lg:gap-36"
      >
        {sections.map(({ id, title, Component, isServerComponent, isTitleSrOnly }) => {
          // 💡 Call the memoized function
          const content = renderSectionContent(id, Component);
          const hasContent = content !== undefined && content !== null;

          // ไม่ render ถ้าไม่มี content
          if (!hasContent) return null;

          // 1. จัดเตรียม Children สำหรับ <Section>
          const sectionChildren = isServerComponent ? (
            <div className="mx-auto max-w-7xl">{content}</div>
          ) : (
            // สำหรับ Client Component (Dynamic or Static)
            <Suspense fallback={getSuspenseFallback(id)}>
              <div className="mx-auto max-w-7xl">{content}</div>
            </Suspense>
          );

          return (
            <ChunkErrorBoundary key={id}>
              {/* ✅ FIX: แก้ไข ESLint Error ด้วยการใช้ Nesting ปกติ */}
              <Section
                id={id}
                title={title}
                isTitleSrOnly={isTitleSrOnly}
                className="scroll-mt-28 px-4 sm:px-6 lg:px-8"
              >
                {/* ส่ง children เข้าไปในรูปแบบ Nesting
                  Section Component ควรจะถูกออกแบบให้รับ children: ReactNode
                */}
                {sectionChildren}
              </Section>
            </ChunkErrorBoundary>
          );
        })}
      </main>
    </>
  );
}
