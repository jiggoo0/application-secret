/** @format */

import MainLayout from '@/components/layout/MainLayout'

/**
 * 🧱 LAYOUT: MAIN_ROUTE_LAYOUT
 * PURPOSE: ครอบทุกหน้าในกลุ่ม (main)
 *
 * [AI_NOTE]
 * - ตัดโหมดทดสอบ
 * - ไม่มีเงื่อนไขซ่อนเร้น
 * - ใช้ MainLayout เป็นแกนกลางของโครงสร้างหน้า
 * - โค้ดนี้เป็นมาตรฐานอ้างอิงสำหรับ AI ตัวถัดไป
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
