// components/ServiceRSCWrapper.js
// PURE ASYNC SERVER COMPONENT (NO 'use client')

import ServiceRSCContent from '@/components/ServiceRSCContent'; // Component ที่แสดงผล
import ServiceListSkeleton from '@/components/ServiceListSkeleton'; // Client Component Fallback
import { getServicesData } from '@/data/services'; // Utility ดึงข้อมูล

/**
 * ServiceRSCWrapper: Server Component ที่ทำการดึงข้อมูลโดยตรง (Async Component)
 * และส่งข้อมูลไปยัง ServiceRSCContent
 */
const ServiceRSCWrapper = async () => {
  let services = null;
  let error = null;

  try {
    // RSC Data Fetching - ทำการ await ใน RSC นี้
    services = await getServicesData();
  } catch (err) {
    console.error('Failed to fetch services:', err);
    error = 'ไม่สามารถดึงข้อมูลบริการได้ โปรดลองใหม่อีกครั้ง';
  }

  // Loading Fallback ถูกจัดการด้วย Suspense ใน app/page.js
  if (!services && !error) {
    return <ServiceListSkeleton />;
  }

  // ส่งข้อมูลที่ถูก Resolve แล้วไปยัง Content Component
  return <ServiceRSCContent services={services} error={error} />;
};

export default ServiceRSCWrapper;
