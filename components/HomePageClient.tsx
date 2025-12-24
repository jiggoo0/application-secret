'use client';

/**
 * 🏗️ JP-VISOUL: HomePageClient (The Operator Station)
 * การประกอบร่างของหน่วยปฏิบัติการทั้งหมดภายใต้อัตลักษณ์เจ้าป่า
 * Update: ถอดหน่วย OurWorks ออกตามคำสั่งปฏิบัติการ
 */
import dynamic from 'next/dynamic';
import React, { Suspense, ReactNode } from 'react';
import type { Post } from '@/types/blog';

// ----------------------------
// Static Imports
// ----------------------------
import AnnouncementBar from '@/components/AnnouncementBar';
import AlertBanner from '@/components/AlertBanner';
import Banner from '@/components/Banner';
import Section from '@/components/ui/Section';
import ChunkErrorBoundary from '@/components/utils/ChunkErrorBoundary';

// ----------------------------
// Dynamic Imports (Optimized)
// ----------------------------
const Hero = dynamic(() => import('@/components/Hero/Hero'), { ssr: false });
const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), { ssr: false });
const Blog = dynamic(() => import('@/components/Blog/Blog'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false });
// ✅ ถอด OurWorks ออกจาก Dynamic Import เพื่อลด Bundle Size

// ----------------------------
// Type Definitions
// ----------------------------
interface HomePageClientProps {
  serviceSection: ReactNode;
  latestPosts: Post[];
}

interface SectionItem {
  id: string;
  title: string;
  Component?: React.ComponentType<any>;
  isServerComponent?: boolean;
  isTitleSrOnly?: boolean;
  hasPostsProp?: boolean;
}

// ----------------------------
// Configurations: ผังโครงสร้างหน้าแรก (Updated Config)
// ----------------------------
const SECTIONS_CONFIG: SectionItem[] = [
  { id: 'hero', title: 'ศูนย์บัญชาการ_MAIN', Component: Hero, isTitleSrOnly: true },
  { id: 'about', title: 'ตัวตนและมาตรฐาน_ABOUT_JP', Component: AboutSection },
  // 🚫 OurWorks ถูกถอดออกจากสารบบนี้แล้ว
  { id: 'services', title: 'หน่วยบริการเฉพาะทาง_SERVICES', isServerComponent: true },
  { id: 'reviews', title: 'เสียงตอบรับจากผู้ใช้จริง_CLIENT_REPORTS', Component: ReviewCarousel },
  { id: 'blog', title: 'คลังข้อมูลและกลยุทธ์_DATA_CENTER', Component: Blog, hasPostsProp: true },
];

// ----------------------------
// Main Assembler: ผู้รวบรวมระบบ
// ----------------------------
export default function HomePageClient({ serviceSection, latestPosts = [] }: HomePageClientProps) {
  // 🏗️ Industrial Loading Fallback
  const getSuspenseFallback = (id: string) => (
    <div className="mx-4 my-8 flex h-80 animate-pulse flex-col items-center justify-center border-4 border-slate-900 bg-slate-50 p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
      <div className="relative mb-6 flex h-16 w-16">
        <div className="absolute inset-0 border-4 border-slate-200"></div>
        <div className="absolute inset-0 animate-spin border-4 border-transparent border-t-primary"></div>
      </div>
      <span className="font-heading text-sm font-black uppercase italic tracking-[0.4em] text-slate-900">
        Loading_{id}_Module...
      </span>
      <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
        SYSTEM_INTEGRITY_CHECKING
      </p>
    </div>
  );

  const renderSectionContent = (
    id: string,
    Component?: React.ComponentType<any>,
    hasPostsProp?: boolean,
  ): ReactNode => {
    if (id === 'services') return serviceSection;
    if (!Component) return null;

    if (id === 'blog' || hasPostsProp) {
      return <Component posts={latestPosts} />;
    }

    return <Component />;
  };

  return (
    <>
      <AnnouncementBar />
      <AlertBanner />
      <Banner />

      <main
        id="main-content"
        role="main"
        className="flex flex-col bg-white text-slate-900 selection:bg-yellow-400 selection:text-black"
      >
        {SECTIONS_CONFIG.map(
          ({ id, title, Component, isServerComponent, isTitleSrOnly, hasPostsProp }) => {
            const content = renderSectionContent(id, Component, hasPostsProp);
            if (!content) return null;

            return (
              <ChunkErrorBoundary key={id}>
                <Section
                  id={id}
                  title={title}
                  isTitleSrOnly={isTitleSrOnly}
                  className="scroll-mt-28 overflow-hidden border-b-4 border-slate-900 px-4 py-24 last:border-0 sm:px-6 sm:py-32 lg:px-8 lg:py-40"
                >
                  {/* Label ข้าง Section สไตล์อุตสาหกรรม */}
                  {!isTitleSrOnly && (
                    <div className="pointer-events-none absolute left-8 top-10 hidden lg:block">
                      <span className="block origin-left rotate-90 font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
                        OP_UNIT_{id.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="mx-auto w-full max-w-[1440px]">
                    {isServerComponent ? (
                      content
                    ) : (
                      <Suspense fallback={getSuspenseFallback(id)}>{content}</Suspense>
                    )}
                  </div>
                </Section>
              </ChunkErrorBoundary>
            );
          },
        )}
      </main>
    </>
  );
}
