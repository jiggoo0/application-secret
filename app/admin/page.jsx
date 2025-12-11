import { Metadata } from 'next';
// 💡 Server Component Container ที่รับผิดชอบการดึงข้อมูล (Data Layer)
import DashboardWidgets from '@/components/admin/DashboardWidgets';

// 1. Metadata for SEO/Title (Standard Practice for App Router)
/** @type {Metadata} */
export const metadata = {
  title: 'Admin Dashboard - Feature Overview',
  description:
    'แผงควบคุมหลักสำหรับการเข้าถึงฟีเจอร์ต่างๆ ของระบบ เช่น การสร้างเอกสาร และการจัดการข้อมูล',
};

// 2. Main Page Component (Pure Server Component)
export default function AdminRootPage() {
  return (
    // 💡 ใช้ Class Name ที่ปรับปรุงให้รองรับ Dark/Light Mode และมี Spacing ที่สม่ำเสมอ
    <div className="container mx-auto p-6 md:p-10">
      {/* 2.1 Standardized Header */}
      <h1 className="mb-8 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Admin Feature Overview
      </h1>

      {/* 2.2 Server Component Container (ส่งผ่าน props data จาก Server ไปยัง Client UI) */}
      <DashboardWidgets />
    </div>
  );
}
