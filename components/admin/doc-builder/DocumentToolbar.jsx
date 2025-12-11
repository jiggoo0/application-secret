// 🚀 File: components/admin/doc-builder/DocumentToolbar.jsx
'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types'; // 💡 เพิ่ม PropTypes
import { handleExport } from '@/utils/document-export';
import { Download, Image as ImageIcon } from 'lucide-react'; // Import icons & rename Image to ImageIcon

/**
 * @component DocumentToolbar
 * @description ปุ่มควบคุมการ Export เอกสาร (PNG/PDF).
 * @param {React.RefObject} printRef - Ref ที่ชี้ไปยัง Template Component
 * @param {string} fileName - ชื่อไฟล์สำหรับ Export
 */
const DocumentToolbar = ({ printRef, fileName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const onExport = async (type) => {
    if (isExporting) return; // ป้องกันการคลิกซ้ำขณะกำลัง Export

    setIsExporting(true);
    try {
      // เรียกใช้ Logic การ Export จาก utils/document-export
      await handleExport(printRef, fileName, type);
    } catch (error) {
      console.error('Export failed:', error);
      // 💡 สามารถเพิ่มการเรียกใช้ useToast() ที่นี่เพื่อแสดง error message ได้
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-700">
      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Export Document</h3>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        {' '}
        {/* 💡 ปรับ layout สำหรับ mobile */}
        {/* Export to PDF Button */}
        <button
          onClick={() => onExport('pdf')}
          disabled={isExporting}
          className="flex flex-1 items-center justify-center rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition duration-150 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
        >
          <Download className="mr-2 h-5 w-5" aria-hidden="true" />
          {isExporting ? 'กำลังสร้าง PDF...' : 'Export to PDF'}
        </button>
        {/* Export to PNG Button */}
        <button
          onClick={() => onExport('png')}
          disabled={isExporting}
          className="flex flex-1 items-center justify-center rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition duration-150 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
        >
          {/* 💡 เปลี่ยนชื่อ Image เป็น ImageIcon เพื่อป้องกันการชนกับ Image จาก Next.js หากมีการ Import ในอนาคต */}
          <ImageIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Export to PNG
        </button>
      </div>
    </div>
  );
};

// 💡 เพิ่ม PropTypes สำหรับ Type Checking
DocumentToolbar.propTypes = {
  printRef: PropTypes.object.isRequired, // React Ref เป็น object
  fileName: PropTypes.string.isRequired,
};

export default DocumentToolbar;
