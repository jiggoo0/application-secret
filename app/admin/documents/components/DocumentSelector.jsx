// 🚀 File: app/admin/documents/components/DocumentSelector.jsx (FIXED)

import React from 'react';
import PropTypes from 'prop-types'; // 🟢 เพิ่ม Import นี้
import { FileText } from 'lucide-react';
import { DOC_TYPES } from '../config/docTypes';

const DocumentSelector = ({ selectedDocType, onDocTypeChange }) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-xl">
      <h1 className="mb-4 border-b pb-2 text-3xl font-bold text-gray-900">
        <FileText className="mr-3 inline h-7 w-7 text-primary" />
        จัดการเอกสารราชการ (Admin Document Builder)
      </h1>
      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold text-gray-700">เลือกประเภทเอกสาร:</label>
        <select
          value={selectedDocType}
          onChange={(e) => onDocTypeChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-md transition duration-150 focus:border-primary focus:ring-primary"
        >
          {/* Loop ผ่าน DOC_TYPES ทั้งหมดเพื่อสร้าง Option */}
          {Object.entries(DOC_TYPES).map(([key, doc]) => (
            <option key={key} value={key}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// 💡 แก้ไขชื่อ Prop ให้ตรงกับที่ใช้ในโค้ดล่าสุด (selectedDocType)
DocumentSelector.propTypes = {
  selectedDocType: PropTypes.string.isRequired,
  onDocTypeChange: PropTypes.func.isRequired,
};

export default DocumentSelector;
