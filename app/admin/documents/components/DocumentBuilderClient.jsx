// 🚀 File: app/admin/documents/components/DocumentBuilderClient.jsx

'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import DocumentSelector from './DocumentSelector';
import DocumentFormControls from './DocumentFormControls';
// 💡 DOC_TYPES และ DEFAULT_DOC_TYPE_KEY ควรเป็นโครงสร้างข้อมูลที่มีเสถียรภาพ
import { DOC_TYPES, DEFAULT_DOC_TYPE_KEY } from '../config/docTypes';
// ❌ FIXED: ลบ Unused Import - getExportFileName ควรอยู่ใน DocumentFormControls
// import { getExportFileName } from '@/utils/document-export';
// ✅ FIX: เปลี่ยน Path จาก common ไป ui ตามคำสั่ง Consolidate UI Components
import Section from '@/components/ui/Section';

/**
 * 💡 Component Client-side หลักที่จัดการ State และ Layout Grid 5:7
 * NOTE: หากฟอร์มมีความซับซ้อน ควรพิจารณาใช้ useReducer หรือ Context API
 * เพื่อจัดการ State แทนการส่ง Prop Drilling
 */
export default function DocumentBuilderClient() {
  const [selectedDocType, setSelectedDocType] = useState(DEFAULT_DOC_TYPE_KEY);
  // Initial Data มาจาก config ของ Document Type ที่ถูกเลือก
  const [data, setData] = useState(() => DOC_TYPES[DEFAULT_DOC_TYPE_KEY].initialData);

  const printRef = useRef(null);

  /**
   * 🔄 จัดการเมื่อมีการเปลี่ยนประเภทเอกสาร
   */
  const handleDocTypeChange = useCallback((newTypeKey) => {
    // รีเซ็ต state และโหลด initialData ใหม่
    setSelectedDocType(newTypeKey);
    setData(DOC_TYPES[newTypeKey].initialData);
  }, []);

  /**
   * ✍️ จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
   */
  const handleDataChange = useCallback((field, value) => {
    setData((prev) => ({
      ...prev,
      // 💡 Business Logic: แปลง Field ที่คาดว่าเป็นตัวเลข
      [field]: ['monthlySalary', 'capital', 'durationDays', 'amount'].includes(field)
        ? Number(value) || 0 // ใช้นิพจน์สั้นๆ เพื่อให้แน่ใจว่าเป็นตัวเลข
        : value,
    }));
  }, []);

  /**
   * ⚡️ ใช้ useMemo เพื่อป้องกันการ re-render Component ที่ไม่จำเป็น
   */
  const CurrentDoc = useMemo(() => DOC_TYPES[selectedDocType], [selectedDocType]);
  // ป้องกันการเข้าถึง undefined ในกรณีที่ config ผิดพลาด
  const currentDocName = CurrentDoc?.name || 'เอกสารไม่พบ';

  if (!CurrentDoc) {
    return (
      <Section className="py-20 text-center">
        <p className="text-xl text-red-600">
          ไม่พบการตั้งค่าสำหรับประเภทเอกสาร `{selectedDocType}`
        </p>
      </Section>
    );
  }

  return (
    <Section className="bg-gray-50 py-12">
      <div className="container mx-auto">
        {/* 1. Dropdown Selector */}
        <DocumentSelector selectedDocType={selectedDocType} onDocTypeChange={handleDocTypeChange} />

        {/* 2. Grid Layout 5:7 (Form:Preview) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* A. Form Column (5/12) */}
          <div className="space-y-6 rounded-xl border bg-white p-6 shadow-xl lg:col-span-5">
            <h2 className="mb-4 border-b pb-3 text-2xl font-bold text-indigo-700">
              แบบฟอร์ม: {currentDocName}
            </h2>

            {/* Render Form Component เฉพาะของเอกสารประเภทนั้น */}
            <CurrentDoc.Form data={data} onChange={handleDataChange} />

            {/* Controls: Save, Print, Export */}
            <DocumentFormControls printRef={printRef} docTypeConfig={CurrentDoc} formData={data} />
          </div>

          {/* B. Preview Column (7/12) */}
          <div className="space-y-6 lg:col-span-7">
            <h2 className="mb-4 border-b pb-3 text-2xl font-bold text-gray-800">
              ตัวอย่างเอกสาร: {currentDocName}
            </h2>

            {/* 💡 Template Preview Area */}
            <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300">
              {/* 🟢 FIXED: ใช้ max-w-xl และกำหนดสัดส่วนการพิมพ์ A4 */}
              <div className="mx-auto h-full w-full lg:max-w-xl">
                <div
                  ref={printRef}
                  // การตั้งค่าสำหรับ A4 ใน Web และ Print
                  className="relative mx-auto min-h-[29.7cm] w-[21cm] max-w-full overflow-hidden border border-gray-300 bg-white p-6 print:h-auto print:min-h-0 print:w-auto print:p-10 print:shadow-none"
                >
                  {/* Render Template Component */}
                  <CurrentDoc.Template data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
