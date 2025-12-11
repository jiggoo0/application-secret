// 🚀 File: components/modules/cover-letter/CoverLetterForm.jsx
'use client';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component CoverLetterForm
 * @description แบบฟอร์มสำหรับป้อนข้อมูลเพื่อสร้างจดหมายนำ (Cover Letter).
 * @param {object} data - ข้อมูลปัจจุบันของเอกสาร.
 * @param {function} onChange - Handler สำหรับอัปเดต state ของเอกสาร.
 */
const CoverLetterForm = ({ data, onChange }) => {
  // Handler หลัก: รับ name และ value แล้วส่งกลับไปอัปเดต state
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="space-y-6">
      {/* 1. Recipient Details (ผู้รับ) */}
      <div className="border-l-4 border-primary pl-3">
        <h4 className="text-lg font-semibold text-gray-800">รายละเอียดผู้รับ (บริษัท/องค์กร)</h4>

        {/* Recipient Title */}
        <div>
          <label htmlFor="recipientTitle" className="mb-1 block text-sm font-medium text-gray-700">
            ตำแหน่งผู้รับ (เช่น เรียน ผู้จัดการฝ่ายบุคคล)
          </label>
          <input
            type="text"
            id="recipientTitle"
            name="recipientTitle"
            value={data.recipientTitle || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="เรียน ผู้จัดการฝ่ายบุคคล"
            required
          />
        </div>

        {/* Recipient Company */}
        <div className="mt-4">
          <label
            htmlFor="recipientCompany"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            ชื่อบริษัท/องค์กรผู้รับ
          </label>
          <input
            type="text"
            id="recipientCompany"
            name="recipientCompany"
            value={data.recipientCompany || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="บริษัท เจริญก้าวหน้า จำกัด"
            required
          />
        </div>
      </div>

      {/* 2. Document Details */}
      <div className="border-l-4 border-green-500 pl-3">
        <h4 className="text-lg font-semibold text-gray-800">รายละเอียดเอกสาร</h4>

        {/* Issue Date */}
        <div>
          <label htmlFor="issueDate" className="mb-1 block text-sm font-medium text-gray-700">
            วันที่ออกเอกสาร
          </label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            // ใช้ค่าจาก data หรือ วันที่ปัจจุบัน
            value={data.issueDate || new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Subject */}
        <div className="mt-4">
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
            หัวข้อจดหมาย
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={data.subject || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 font-bold focus:border-green-500 focus:ring-green-500"
            placeholder="เรื่อง: การสมัครงานในตำแหน่ง..."
            required
          />
        </div>
      </div>

      {/* 3. Body Content (เนื้อหาหลัก) */}
      <div className="border-l-4 border-yellow-500 pl-3">
        <h4 className="mb-2 text-lg font-semibold text-gray-800">เนื้อหาหลักของจดหมาย</h4>
        <textarea
          id="bodyContent"
          name="bodyContent"
          rows="10"
          value={data.bodyContent || ''}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
          placeholder="ใส่เนื้อหาจดหมายหลักที่นี่ (รองรับการขึ้นบรรทัดใหม่)"
          required
        />
      </div>

      {/* 4. Manager Details (ผู้ลงนาม/ผู้เชี่ยวชาญ) */}
      <div className="border-l-4 border-red-500 pl-3">
        <h4 className="text-lg font-semibold text-gray-800">
          รายละเอียดผู้ลงนาม (ผู้เชี่ยวชาญ/ที่ปรึกษา)
        </h4>

        <div>
          <label htmlFor="managerName" className="mb-1 block text-sm font-medium text-gray-700">
            ชื่อผู้จัดการ/ผู้มีอำนาจลงนาม
          </label>
          <input
            type="text"
            id="managerName"
            name="managerName"
            value={data.managerName || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="managerPosition" className="mb-1 block text-sm font-medium text-gray-700">
            ตำแหน่งผู้ลงนาม
          </label>
          <input
            type="text"
            id="managerPosition"
            name="managerPosition"
            value={data.managerPosition || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        {/* 💡 เพิ่มช่องสำหรับผู้เขียน (employeeName) เพื่อให้สอดคล้องกับ initialData */}
        <div className="mt-4">
          <label htmlFor="employeeName" className="mb-1 block text-sm font-medium text-gray-700">
            ชื่อผู้เขียน (ถ้าไม่ใช่ผู้ลงนาม)
          </label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={data.employeeName || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-red-500"
            placeholder="นายบรรณสาร กิตติพงศ์"
          />
        </div>
      </div>
    </div>
  );
};

CoverLetterForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CoverLetterForm;
