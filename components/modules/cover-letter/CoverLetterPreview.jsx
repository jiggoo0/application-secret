// components/modules/cover-letter/CoverLetterPreview.jsx
'use client';

import React, { useCallback } from 'react';
import { FileText, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
// Import Component เอกสารจาก Path เดิมที่ระบุในโครงสร้าง
import CoverLetterDocument from '@/app/letter-service/CoverLetterDocument';

/**
 * @param {object} props
 * @param {object} props.formData
 * @param {boolean} props.isLoading
 * @param {function} props.onContact
 */
export default function CoverLetterPreview({ formData, isLoading, onContact }) {
  const handleContactForService = useCallback(() => {
    onContact(); // เรียกใช้ Callback ที่ส่งมาจาก Page
  }, [onContact]);

  return (
    <div
      id="letter-preview-section"
      className="rounded-xl border-t-8 border-green-500 bg-white p-8 shadow-2xl transition duration-300"
    >
      <h2 className="mb-6 flex items-center border-b-2 pb-3 text-2xl font-bold text-gray-800">
        <FileText className="mr-3 h-6 w-6 text-green-500" />
        ตัวอย่างจดหมายแนะนำตัว (Preview)
      </h2>

      {isLoading ? (
        // === Loading State (Skeleton) ===
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-semibold text-gray-800">
            กำลังจัดเตรียมเอกสารตามข้อมูลที่คุณระบุ...
          </p>
          <div className="mt-6 w-full max-w-xl space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        </div>
      ) : (
        <>
          {/* === Call-to-Action for Conversion === */}
          <div className="mb-6 flex flex-col items-center justify-center space-y-3 rounded-xl border border-green-300 bg-green-50 p-4 shadow-md md:flex-row md:justify-between md:space-x-4 md:space-y-0">
            <p className="text-base font-medium text-green-800 md:text-lg">
              <span className="font-bold">ตรวจสอบเนื้อหาเรียบร้อยแล้วใช่หรือไม่?</span>{' '}
              ติดต่อเพื่อรับฉบับสมบูรณ์ (ไม่มีลายน้ำ)
            </p>
            <Button
              onClick={handleContactForService}
              className="flex items-center justify-center px-6 py-3 font-bold shadow-lg transition duration-200"
              variant="success"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              รับฉบับสมบูรณ์ (LINE)
            </Button>
          </div>

          {/* === Document Preview Area === */}
          <div className="max-h-[600px] overflow-y-scroll rounded-lg border-2 border-gray-300 bg-white p-4 shadow-inner md:p-8">
            <CoverLetterDocument data={formData} isDraft={true} />
          </div>
        </>
      )}
    </div>
  );
}
