// components/ServiceList.js
// เป็น Server Component (Async Component) - ห้ามมี 'use client'

import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { getServicesData } from '@/data/services';
import { AlertCircle } from 'lucide-react';
import ServiceListSkeleton from '@/components/ServiceListSkeleton';

/**
 * Service List Component (RSC)
 * ดึงข้อมูลบน Server โดยตรง (Async/Await)
 */
const ServiceList = async () => {
  let services = null;
  let error = null;

  try {
    // RSC Data Fetching - Fast, no client-side JS needed for data fetching
    services = await getServicesData();
  } catch (err) {
    console.error('Failed to fetch services:', err);
    error = 'ไม่สามารถดึงข้อมูลบริการได้ โปรดลองใหม่อีกครั้ง';
  }

  // Error UI
  if (error) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border-l-4 border-red-500 bg-red-50 p-8 text-center text-red-700 shadow-lg">
        <AlertCircle className="mx-auto mb-3 h-8 w-8" />
        <h4 className="text-xl font-bold">เกิดข้อผิดพลาดในการโหลด</h4>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Loading UI Fallback (ในกรณีที่ไม่มีข้อมูล)
  if (!services) {
    return <ServiceListSkeleton />;
  }

  // Normal UI
  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <header className="mb-12">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
          บริการทั้งหมดของเรา: ครบวงจรสำหรับเอกสารและการเงิน
        </h2>

        <p className="mx-auto max-w-4xl text-center text-lg text-gray-600 md:text-xl">
          เลือกบริการที่ตอบโจทย์ความต้องการของคุณ ไม่ว่าจะเป็นเอกสารเฉพาะทาง การเงิน หรือการตลาด
          ด้วยมาตรฐานความน่าเชื่อถือระดับสูง
        </p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          // ServiceCard เป็น Client Component (use client) ที่รับ props มาจาก RSC
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="https://lin.ee/G8s8rKp" target="_blank">
          <Button className="transform rounded-lg bg-blue-700 px-10 py-3 text-lg text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-blue-800">
            ปรึกษาบริการทั้งหมดผ่าน Line Official
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ServiceList;
