// app/admin/booking-form/page.tsx
// (Server Component)

import { AdminBookingForm } from './AdminBookingForm';

/**
 * @component BookingFormPage
 * @description Server Component สำหรับหน้าบันทึกการจองใหม่ (Minimal Wrapper)
 * ✅ Pattern: ใช้ SC เป็นเพียง Container เพื่อให้ CC ทำงานได้อย่างรวดเร็ว
 */
export default function BookingFormPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* 💡 Note: หากต้องการดึงข้อมูลเริ่มต้นที่สำคัญ ควร Fetch ที่นี่ 
          (แต่โค้ด AdminBookingForm.tsx ปัจจุบันไม่มี props สำหรับรับข้อมูล)
          การทำ Minimal SC นี้ช่วยให้ Time-to-Interactive ดีขึ้น
      */}
      <AdminBookingForm />
    </main>
  );
}
