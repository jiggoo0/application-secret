// app/page.tsx
// ----------------------------------------------------
// Server Component (RSC) สำหรับหน้า Home Page
// ----------------------------------------------------

import { Suspense } from 'react';
import type { Metadata } from 'next';

import HomePageClient from '@/components/HomePageClient';
import ServiceRSCWrapper from '@/components/ServiceRSCWrapper';
import ServiceListSkeleton from '@/components/ServiceListSkeleton';

import { getPosts } from '@/lib/blog';
import type { Post } from '@/types/blog';

// ----------------------------------------------------
// Rendering / Caching Config
// ----------------------------------------------------
export const dynamic = 'force-static'; // สั่งให้ Next.js ทำ static rendering แบบบังคับ

const MAX_HOME_POSTS = 3; // จำนวน blog posts แสดงที่หน้า Home

// ----------------------------------------------------
// Metadata
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'หน้าหลัก',
  description: 'บริการที่ปรึกษายื่นกู้สินเชื่อ เอกสารยื่นวีซ่า และการตลาด',
};

// ----------------------------------------------------
// Page Component
// ----------------------------------------------------
export default async function Page() {
  // 1️⃣ Fetch Blog Posts (RSC)
  const allPosts: Post[] = await getPosts();
  const latestPosts = allPosts.slice(0, MAX_HOME_POSTS);

  // 2️⃣ Service Section (RSC Payload with Suspense)
  const serviceSectionRSC = (
    <Suspense fallback={<ServiceListSkeleton />}>
      <ServiceRSCWrapper />
    </Suspense>
  );

  // 3️⃣ Pass data + RSC payload to Client Component
  return <HomePageClient serviceSection={serviceSectionRSC} latestPosts={latestPosts} />;
}
