// 🚀 File: ./components/documents/templates/CoverLetterContent.jsx (Refactored for Generic Service Letter)
'use client';

import React from 'react';
import PropTypes from 'prop-types';
// 💡 ลบการ Import { documentDataShape, formatLongDate } เพราะใช้ Fields ทั่วไปแทน

/**
 * @component CoverLetterContent
 * @description แสดงผลเนื้อหาหลักของจดหมายบริการทั่วไป (Clean Content)
 * ใช้สำหรับจดหมายแนะนำตัว, จดหมายรับรอง หรือจดหมายสปอนเซอร์
 */
const CoverLetterContent = ({ data }) => {
  // 🟢 ใช้ Fields ที่มาจาก CoverLetterForm.jsx (ทั่วไป)
  const {
    issueDate,
    recipientTitle,
    recipientCompany,
    subject,
    bodyContent,
    managerName, // ชื่อผู้เชี่ยวชาญ/ผู้ลงนาม
    managerPosition, // ตำแหน่งผู้เชี่ยวชาญ
  } = data;

  // Helper: Format วันที่ให้เป็นรูปแบบที่อ่านง่าย (ถ้าไม่มี formatLongDate)
  const formattedIssueDate = issueDate
    ? new Date(issueDate).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="space-y-6 font-serif text-lg">
      {/* --- 1. HEADER / DATE --- */}
      <div className="text-right">
        <p className="text-sm">
          วันที่: <span className="font-medium">{formattedIssueDate}</span>
        </p>
      </div>

      {/* --- 2. RECIPIENT --- */}
      <div className="space-y-1 pt-4 text-base">
        <p>{recipientTitle || 'เรียน ท่านผู้จัดการ'}</p>
        <p>{recipientCompany || 'บริษัท/องค์กรเป้าหมาย'}</p>
      </div>

      {/* --- 3. SUBJECT --- */}
      <h2 className="pb-2 pt-6 text-center text-xl font-bold">
        เรื่อง: {subject || 'หัวข้อจดหมายที่จัดทำโดยผู้เชี่ยวชาญ'}
      </h2>

      {/* --- 4. BODY CONTENT --- */}
      {/* 💡 whitespace-pre-wrap สำคัญสำหรับการขึ้นบรรทัดใหม่จาก textarea */}
      <div className="pt-4 text-base leading-relaxed">
        {bodyContent ? (
          <p className="whitespace-pre-wrap indent-8">{bodyContent}</p>
        ) : (
          <p className="italic text-gray-400">
            [กรุณาใส่เนื้อหาจดหมายหลักที่ถูกเขียนโดยผู้เชี่ยวชาญ]
          </p>
        )}
      </div>

      {/* --- 5. CLOSING --- */}
      <div className="space-y-1 pt-10">
        <p className="text-base">ขอแสดงความนับถืออย่างสูง,</p>
      </div>

      {/* --- 6. SIGNATURE BLOCK (สำหรับผู้เชี่ยวชาญ/ผู้ลงนาม) --- */}
      {/* ส่วนลายเซ็นจะถูกจัดการใน CoverLetterAdminLayout.jsx แต่เราแสดงชื่อไว้ */}
      <div className="pt-16 text-center text-base">
        <p className="inline-block border-b border-dashed border-gray-400 px-10 font-semibold">
          {managerName || '[ชื่อผู้เชี่ยวชาญ/ผู้ลงนาม]'}
        </p>
        <p className="pt-1 text-sm">{managerPosition || '[ตำแหน่งผู้เชี่ยวชาญ/ที่ปรึกษา]'}</p>
      </div>
    </div>
  );
};

CoverLetterContent.propTypes = {
  // 💡 เปลี่ยนกลับมาใช้ PropTypes.object ธรรมดา เพราะเราไม่ได้ Import documentDataShape แล้ว
  data: PropTypes.object.isRequired,
};

export default CoverLetterContent;
