// app/page.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL HIGH-FIDELITY DOCUMENT FACTORY
// Server Component: Home Page (RSC)
// ----------------------------------------------------

import { Suspense } from 'react';
import type { Metadata } from 'next';

// 🏗️ Components (RSC/Shared)
import HomePageClient from '@/components/HomePageClient';
import ServiceRSCWrapper from '@/components/ServiceRSCWrapper';

// 🦴 Skeletons (Industrial Style)
import ServiceListSkeleton from '@/components/ServiceListSkeleton';

// 📚 Data Layer
import { getAllPosts } from '@/data/blog/all-posts';
import type { Post } from '@/types/blog';

// ----------------------------------------------------
// ⚙️ Rendering / Caching Config
// ----------------------------------------------------
export const dynamic = 'force-static';
export const revalidate = 3600; // อัปเดตข้อมูลทุก 1 ชั่วโมง

// ----------------------------------------------------
// 🔍 Metadata
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'JP-VISOUL | จบงานเอกสารแบบตัวจริง โดย เจ้าป่า',
  description:
    'บริการจัดการเอกสารและโปรไฟล์เฉพาะทาง วีซ่า สินเชื่อ และกลยุทธ์ธุรกิจ เน้นความเนียน แม่นยำ และรักษาความลับลูกค้าคือกฎข้อแรก',
  openGraph: {
    title: 'JP-VISOUL | Document Excellence by JAO-PA',
    description: 'จบทุกปัญหาเอกสารด้วยมาตรฐานระดับมืออาชีพ งานไว งานเนียน ตรวจสอบได้จริง',
    type: 'website',
  },
};

// ----------------------------------------------------
// 🚀 Page Component (RSC)
// ----------------------------------------------------
export default async function Page() {
  const MAX_HOME_POSTS = 3;

  /**
   * 1️⃣ Fetch Data Layer (RSC)
   * ดึงข้อมูลบทความจากคลัง Data Vault
   */
  let latestPosts: Post[] = [];
  try {
    const allPosts = await getAllPosts();

    // ✅ แก้ไข: ใช้ publishedAt แทน date และเพิ่มการตรวจสอบวันที่
    latestPosts = Array.isArray(allPosts)
      ? allPosts
          .sort((a, b) => {
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, MAX_HOME_POSTS)
      : [];
  } catch (error) {
    console.error('[System_Error] Failed to fetch blog logs:', error);
  }

  /**
   * 2️⃣ Service Section (RSC Payload)
   */
  const serviceSectionRSC = (
    <Suspense fallback={<ServiceListSkeleton />}>
      <ServiceRSCWrapper />
    </Suspense>
  );

  /**
   * 3️⃣ Final Composition
   */
  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-black">
      <HomePageClient serviceSection={serviceSectionRSC} latestPosts={latestPosts} />
    </main>
  );
}
