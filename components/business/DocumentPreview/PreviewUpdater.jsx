// components/business/DocumentPreview/PreviewUpdater.jsx
'use client';
// ต้องเป็น Client Component เพื่อรับ props ที่มีการเปลี่ยนแปลงและแสดงผล Real-Time

import { DollarSign, Percent, FileText, Upload, XCircle, CheckCircle } from 'lucide-react';

/**
 * Component สำหรับอัปเดตและแสดงผลข้อมูล Dynamic บน Template ของ PreviewRenderer
 *
 * @param {object} props
 * @param {number} props.dtiRatio - ผลลัพธ์ DTI Ratio ล่าสุด
 * @param {object} props.dtiAssessment - การประเมินผลลัพธ์ DTI
 * @param {File | null} props.uploadedFile - File Object ที่ถูกส่งมาจาก DtiClientWrapper (หรือ null)
 */
const PreviewUpdater = ({
  dtiRatio = 0,
  dtiAssessment = {
    status: 'รอการคำนวณ',
    message: 'กรุณาป้อนข้อมูล DTI',
    style: 'text-gray-500 bg-gray-100',
  },
  uploadedFile = null, // ✅ เปลี่ยนชื่อ Prop เป็น uploadedFile (File Object)
}) => {
  const isDtiHighRisk = dtiRatio > 43; // ใช้เกณฑ์ 43% เป็นตัวอย่าง

  // --- Logic เพื่อสร้าง File Summary จาก File Object ---
  let fileSummary;

  if (uploadedFile instanceof File) {
    const sizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(2);
    // เนื่องจาก FileUploadZone จัดการสถานะ isUploaded, isLoading, error แล้ว
    // ใน PreviewUpdater เราสามารถระบุสถานะได้แค่ว่า "มีไฟล์" หรือ "รอการบันทึก"

    fileSummary = {
      name: uploadedFile.name,
      // 💡 ในบริบทของ PreviewUpdater ใน DtiClientWrapper (ก่อนการ Submit)
      // เราควรรู้แค่ว่า "มีไฟล์พร้อมแนบ" หรือ "รอการอัปโหลด"
      status: 'พร้อมแนบไปกับรายงาน',
      isReady: true,
      size: `${sizeMB} MB`,
    };
  } else {
    fileSummary = {
      name: 'ยังไม่มีไฟล์',
      status: 'ไม่มีไฟล์แนบ',
      isReady: false,
      size: '',
    };
  }

  // --- UI Render ---
  return (
    <div className="space-y-8">
      {/* 1. DTI Calculation Preview */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-indigo-700">
          <DollarSign className="mr-2 h-5 w-5" />
          สรุปผลการคำนวณภาระหนี้ (DTI)
        </h3>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
          <div className="col-span-1 rounded-lg border bg-gray-50 p-3">
            <p className="font-medium text-gray-500">อัตราส่วน DTI</p>
            <p className="mt-1 text-3xl font-extrabold text-indigo-700">
              {dtiRatio.toFixed(2)}
              <Percent className="ml-1 inline h-5 w-5 align-top" />
            </p>
          </div>

          <div
            className={`col-span-2 flex flex-col justify-center rounded-lg p-3 transition-colors ${dtiAssessment.style}`}
          >
            <p className="flex items-center text-base font-bold">
              {isDtiHighRisk ? (
                <XCircle className="mr-2 h-5 w-5" />
              ) : (
                <CheckCircle className="mr-2 h-5 w-5" />
              )}
              สถานะการประเมิน: {dtiAssessment.status}
            </p>
            <p className="mt-1 text-sm">{dtiAssessment.message}</p>
          </div>
        </div>
      </div>

      {/* 2. Uploaded File Preview */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-indigo-700">
          <Upload className="mr-2 h-5 w-5" />
          ข้อมูลไฟล์ที่แนบมา
        </h3>
        <div
          className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${fileSummary.isReady ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 bg-gray-100'}`}
        >
          <div className="flex min-w-0 flex-grow items-center space-x-3">
            <FileText
              className={`h-5 w-5 ${fileSummary.isReady ? 'text-indigo-600' : 'text-gray-500'}`}
            />
            <span className="truncate font-medium text-gray-800">
              {fileSummary.name}
              {fileSummary.size && (
                <span className="ml-2 text-xs text-gray-500">({fileSummary.size})</span>
              )}
            </span>
          </div>
          <span
            className={`ml-4 flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              fileSummary.isReady
                ? 'bg-indigo-200 text-indigo-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            {fileSummary.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewUpdater;
