// app/admin/booking-form/page.tsx

import { AdminBookingForm } from './AdminBookingForm';
// 💡 FIX: แก้ไขจาก import { Metadata } from 'next';
import type { Metadata } from 'next'; // ⬅️ ใช้ type-only import

// ----------------------------------------------------
// 1. METADATA (SEO/Title)
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'Create/Edit Booking | Admin Panel',
  description:
    'Admin interface for manual creation or update of booking records (Flight, Hotel, Tour).',
};

// ----------------------------------------------------
// 2. SERVER COMPONENT: IssueDocumentPage
// ----------------------------------------------------

/**
 * @component BookingFormPage
 * @description Server Component สำหรับหน้าจัดการข้อมูลการจอง
 * Component นี้ทำหน้าที่เป็น Page Layout และเตรียมข้อมูล/Props สำหรับ Client Component
 */
export default function BookingFormPage() {
  // 💡 ในการใช้งานจริง:
  // - หากต้องการแก้ไขการจอง: คุณอาจดึงข้อมูลการจองโดยใช้ searchParams หรือ PNR จาก URL
  //   const pnrToEdit = searchParams.pnr;
  //   const initialData = await fetchBookingDetails(pnrToEdit);

  // - เนื่องจากโค้ดนี้เป็นฟอร์มสำหรับ Insert/Upsert ผมจึงไม่ส่ง Props ใดๆ ที่เป็น Secret Key
  //   เนื่องจาก Server Action (saveBooking) จะจัดการ Supabase Service Role Key ด้วยตัวเอง

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold text-indigo-700">
        Booking Data Management (Upsert)
      </h1>

      {/* 💡 Client Component ทำหน้าที่จัดการ State และ Logic การเรียก Server Action */}
      <AdminBookingForm />
    </div>
  );
}
