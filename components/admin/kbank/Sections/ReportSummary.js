// components/admin/kbank/Sections/ReportSummary.js
'use client'; // <--- ✅ ถูกต้อง: Container Component ต้องเป็น Client Component เพราะเรียกใช้ Hook

import ReportSummary from './ReportSummary.jsx';
// 💡 Path ที่ถูกต้อง (แก้ไข Build Error ก่อนหน้า)
import { useFetchReportSummary } from '../hooks/useKBankData'; // ✅ ถูกต้อง: Relative Path แก้ไขแล้ว

/**
 * ReportSummaryContainer
 * Container component: จัดการ Logic การดึงข้อมูลและ State สำหรับ ReportSummary
 */
export const ReportSummaryContainer = () => {
  // 1. Logic: ใช้ Custom Hook ในการดึงข้อมูล (ถูกเรียกบน Client แล้ว)
  const { summaryData, isLoading, error } = useFetchReportSummary(); // ✅ ถูกต้อง: เรียกใช้ Client Hook ภายใน Client Component

  // 2. Logic: จัดการ Loading State
  if (isLoading) {
    // ✅ ถูกต้อง: จัดการสถานะ Loading ก่อนส่งต่อข้อมูล
    return <div className="p-4 text-center text-gray-500">Loading summary data...</div>;
  }

  // 3. Logic: จัดการ Error State
  if (error) {
    // ✅ ถูกต้อง: จัดการสถานะ Error ก่อนส่งต่อข้อมูล
    return (
      <div className="rounded-md border border-red-300 bg-red-50 p-4 text-center text-red-600">
        Error fetching report: {error.message}
      </div>
    );
  }

  // 4. Presentation: ส่ง Props ที่จำเป็นไปยัง UI Component
  // ✅ ถูกต้อง: ส่งมอบข้อมูลที่สะอาด (summaryData) ไปยัง Presentation Component
  return <ReportSummary summaryData={summaryData} />;
};
