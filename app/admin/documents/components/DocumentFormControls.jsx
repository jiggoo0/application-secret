// 🚀 File: app/admin/documents/components/DocumentFormControls.jsx (A11y Compliant)

'use client';

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FileText, Download, Loader2, Image, Save } from 'lucide-react';
import { exportToPdf, exportToPng, getExportFileName } from '@/utils/document-export';

/**
 * @component DocumentFormControls
 * @description ปุ่มควบคุมสำหรับการ Export เอกสารและ Action อื่นๆ
 */
const DocumentFormControls = ({ printRef, docTypeConfig, formData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Business Logic: สร้างชื่อไฟล์ที่เหมาะสม
  const fileName = getExportFileName(docTypeConfig, formData);

  /**
   * 📤 จัดการกระบวนการ Export เอกสาร (PDF/PNG)
   */
  const handleExport = useCallback(
    async (exporter) => {
      setIsExporting(true);

      // หน่วงเวลาเล็กน้อยเพื่อให้ UI แสดงสถานะ Loading
      await new Promise((resolve) => setTimeout(resolve, 50));

      try {
        await exporter(printRef, fileName);
      } catch (error) {
        console.error('Export Failed:', error);
        alert('เกิดข้อผิดพลาดในการส่งออกเอกสาร: ' + error.message);
      } finally {
        setIsExporting(false);
      }
    },
    [printRef, fileName],
  );

  /**
   * 💾 จัดการ Server Action สำหรับการบันทึกข้อมูล (ถ้ามี)
   */
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // จำลอง Server Action Delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Document Saved:', formData);
      alert('บันทึกข้อมูลเอกสารสำเร็จ!');
    } catch (error) {
      console.error('Save Action Failed:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const isDisabled = isExporting || isSaving;

  return (
    <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
      <h3 className="flex items-center text-xl font-semibold text-gray-800">
        {/* ICON: มี aria-hidden="true" แล้ว */}
        <Download className="mr-2 h-5 w-5 text-indigo-600" aria-hidden="true" />
        ควบคุมและส่งออกเอกสาร
      </h3>

      {isDisabled && (
        <div className="flex items-center rounded-lg bg-orange-50 p-3 font-medium text-orange-600 shadow-sm">
          {/* ICON: มี aria-hidden="true" แล้ว */}
          <Loader2 className="mr-3 h-5 w-5 animate-spin" aria-hidden="true" />
          {isExporting ? 'กำลังสร้างเอกสาร กรุณารอสักครู่...' : 'กำลังบันทึกข้อมูล...'}
        </div>
      )}

      {/* 1. ปุ่มควบคุมหลัก (Save/Submit) */}
      <div className="flex">
        <button
          onClick={handleSave}
          disabled={isDisabled}
          className="flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white shadow-lg transition duration-150 hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {isSaving ? (
            <>
              {/* ICON: มี aria-hidden="true" แล้ว */}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              กำลังบันทึก
            </>
          ) : (
            <>
              {/* ICON: มี aria-hidden="true" แล้ว */}
              <Save className="mr-2 h-5 w-5" aria-hidden="true" />
              บันทึกข้อมูล (Save Draft)
            </>
          )}
        </button>
      </div>

      {/* 2. ปุ่ม Export */}
      <div className="flex space-x-4 pt-2">
        {/* Button: Export to PDF (Primary Export) */}
        <button
          onClick={() => handleExport(exportToPdf)}
          disabled={isDisabled}
          className="flex flex-1 items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-bold text-white shadow-md transition duration-150 hover:bg-red-700 disabled:bg-red-400"
        >
          {/* ICON: มี aria-hidden="true" แล้ว */}
          <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
          Export PDF
        </button>

        {/* Button: Export to PNG (Secondary Export) */}
        <button
          onClick={() => handleExport(exportToPng)}
          disabled={isDisabled}
          className="flex flex-1 items-center justify-center rounded-lg bg-yellow-500 px-4 py-3 font-bold text-white shadow-md transition duration-150 hover:bg-yellow-600 disabled:bg-yellow-300"
        >
          {/* ICON: มี aria-hidden="true" แล้ว */}
          <Image className="mr-2 h-5 w-5" aria-hidden="true" />
          Export PNG
        </button>
      </div>

      <p className="pt-2 text-sm text-gray-500">
        ชื่อไฟล์ส่งออก: <span className="font-mono text-gray-700">{fileName}.(pdf/png)</span>
      </p>
    </div>
  );
};

DocumentFormControls.propTypes = {
  printRef: PropTypes.object.isRequired,
  docTypeConfig: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
};

export default DocumentFormControls;
