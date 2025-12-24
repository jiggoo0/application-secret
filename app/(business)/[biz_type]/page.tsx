// app/(business)/[biz_type]/page.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Business Dispatcher Page
// Role: สวิตช์คัดแยก Template ตามประเภทธุรกิจ
// ----------------------------------------------------

import React from 'react'; // ✅ เพิ่มเพื่อความปลอดภัยของ Type Definition
import { notFound } from 'next/navigation';

// นำเข้า Template แยกตามธุรกิจ
import VisaTemplate from './_components/templates/VisaTemplate';
import LoanTemplate from './_components/templates/LoanTemplate';
import PropertyTemplate from './_components/templates/PropertyTemplate';

interface BusinessPageProps {
  params: Promise<{ biz_type: string }>;
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { biz_type } = await params;
  const type = biz_type.toLowerCase();

  // 1. ตรวจสอบสิทธิ์การเข้าถึงธุรกิจ (White-list)
  const allowedBiz = ['visa', 'loan', 'property'];
  if (!allowedBiz.includes(type)) return notFound();

  /**
   * 🛠️ Template Resolver
   * เลือก Render Component ตาม biz_type ที่รับมาจาก URL
   */
  const renderTemplate = () => {
    switch (type) {
      case 'visa':
        return <VisaTemplate />;
      case 'loan':
        return <LoanTemplate />;
      case 'property':
        return <PropertyTemplate />;
      default:
        return notFound();
    }
  };

  return (
    <div className="min-h-[80vh] selection:bg-blue-600 selection:text-white">
      {renderTemplate()}

      {/* 📟 System Status (Overlay สำหรับโหมดปฏิบัติการ) */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50">
        <div className="border border-white/20 bg-slate-900 px-2 py-1 font-mono text-[8px] text-white opacity-50 shadow-xl">
          {/* ✅ แก้ไข: ใช้ Template Literal เพื่อแสดงข้อความคอมเมนต์ใน UI */}
          {`LOGGED_IN_AS: ${type.toUpperCase()} // TEMPLATE_ACTIVE`}
        </div>
      </div>
    </div>
  );
}
