/** @format */
// 🛰️ RESOLVED: ใช้ Named Import ให้ตรงกับ Named Export ในไฟล์ต้นทาง
import { MainLayout } from '@/components/layout/MainLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
