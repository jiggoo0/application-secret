"use client";

import ServiceCard from "@/components/shared/ServiceCard";
import type { Service } from "@/constants/services-data";

interface ServiceSectionProps {
  services: Service[];
}

/**
 * ServiceSection
 * - แสดงรายการบริการหลัก
 * - Guard ป้องกัน data ว่าง
 * - Responsive + Production-ready
 */
export default function ServiceSection({ services }: ServiceSectionProps) {
  if (!Array.isArray(services) || services.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="services-heading" className="bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <header className="mb-14 text-center">
          <h2
            id="services-heading"
            className="text-3xl font-black tracking-tight text-[#0A192F] md:text-4xl"
          >
            บริการของเรา
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            โซลูชันด้านเอกสาร การเงิน และโครงสร้างโปรไฟล์
            ที่ออกแบบตามเป้าหมายของคุณ
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
