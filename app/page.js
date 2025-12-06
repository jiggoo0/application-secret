// app/page.js
// PURE SERVER COMPONENT (NO 'use client')

import { Suspense } from 'react';

// Import Client Component ที่ถูก Refactor
import HomePageClient from '@/components/HomePageClient';
// Import Async RSC Wrapper ที่ดึงข้อมูล
import ServiceRSCWrapper from '@/components/ServiceRSCWrapper';
// Import Skeleton (Client Component)
import ServiceListSkeleton from '@/components/ServiceListSkeleton';

/**
 * Page: เป็น Server Component หลัก
 */
export default function Page() {
  const serviceSection = (
    // RSC ถูกห่อด้วย Suspense ใน Server Component นี้ ก่อนส่งไปยัง Client Component
    <Suspense fallback={<ServiceListSkeleton />}>
      <ServiceRSCWrapper />
    </Suspense>
  );

  return (
    // ส่ง RSC Content ที่ถูก Render/Suspended แล้ว เป็น prop ไปยัง Client Component
    <HomePageClient serviceSection={serviceSection} />
  );
}
