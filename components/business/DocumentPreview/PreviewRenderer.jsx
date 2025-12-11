// components/business/DocumentPreview/PreviewRenderer.jsx
// Component นี้ตั้งใจให้เป็น Server Component (RSC) โดยหลักการ

import { FileText, Calendar, CheckCircle } from 'lucide-react';
// ถ้าใช้ next/image ต้อง Import
// import Image from 'next/image';

/**
 * Component สำหรับแสดงผล Template โครงสร้างเอกสาร/รายงานแบบ Static
 * ทำหน้าที่เป็นพื้นหลังและโครงที่โหลดได้รวดเร็ว (RSC)
 *
 * @param {object} props
 * @param {string} props.title - ชื่อหัวข้อรายงาน (เช่น "รายงานผลการคำนวณ DTI")
 * @param {string} props.reportType - ประเภทของรายงาน/เอกสาร
 * @param {JSX.Element} props.children - ส่วนที่ใช้สำหรับ Dynamic Data (PreviewUpdater จะมาอยู่ตรงนี้)
 */
const PreviewRenderer = ({
  title = 'รายงานสรุปเอกสารและการเงิน',
  reportType = 'Consulting Report',
  children,
}) => {
  // RSC Context: การคำนวณ Date/Time บน Server
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
      aria-label={`ตัวอย่างรายงาน: ${title}`}
    >
      {/* 1. Header และ Logo (Static Content) */}
      <header className="flex items-start justify-between bg-indigo-700 p-6 text-white">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 flex-shrink-0" />
          <h1 className="text-2xl font-extrabold leading-tight">{title}</h1>
        </div>

        {/* Placeholder สำหรับ Report Type */}
        <p className="whitespace-nowrap border-b border-white pb-0.5 pt-1 text-sm font-medium">
          {reportType}
        </p>
      </header>

      {/* 2. Metadata (Static/RSC-rendered) */}
      <div className="grid grid-cols-1 gap-4 border-b border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 sm:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 flex-shrink-0 text-indigo-500" />
          <span>
            วันที่ออกรายงาน: <span className="font-medium text-gray-800">{currentDate}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 flex-shrink-0 text-red-500" />{' '}
          {/* เปลี่ยนเป็นสีแดงสำหรับ Draft */}
          <span>
            สถานะ: <span className="font-semibold text-red-700">ฉบับร่าง (DRAFT)</span>
          </span>
        </div>
      </div>

      {/* 3. Dynamic Content Area (The Children) */}
      <section className="p-6 sm:p-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold text-gray-800">
          ข้อมูลสรุปและผลการประมวลผล
        </h2>

        {/* นี่คือจุดที่ PreviewUpdater (Client Component) จะถูกแทรกเข้ามา */}
        <div className="min-h-[150px] rounded-lg border-2 border-dashed border-indigo-300 bg-white p-4 sm:p-6">
          {children}
        </div>
      </section>

      {/* 4. Footer และข้อจำกัด (Static Content) */}
      <footer className="border-t border-gray-700 bg-gray-800 p-6 text-xs text-gray-300">
        <h3 className="mb-2 font-semibold text-white">ข้อสงวนสิทธิ์และคำเตือน:</h3>
        <p>
          รายงานฉบับนี้เป็นฉบับร่างเพื่อการตรวจสอบเท่านั้น ผลลัพธ์จากการคำนวณ DTI หรือการจัดทำเอกสาร
          ต้องผ่านการตรวจสอบและยืนยันข้อมูลโดยผู้เชี่ยวชาญของเราก่อนนำไปใช้จริง (Ref: {reportType} -{' '}
          {currentDate})
        </p>
      </footer>
    </div>
  );
};

export default PreviewRenderer;
