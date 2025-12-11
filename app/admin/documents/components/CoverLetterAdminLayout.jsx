// 🚀 File: app/admin/documents/components/CoverLetterAdminLayout.jsx
// 💡 Layout Wrapper สำหรับ Admin: ไม่มีลายน้ำ (No Watermark)

import React from 'react';
import PropTypes from 'prop-types';
// 💡 Assumption: Shared components are available at these paths
import GarudaEmblem from '@/components/documents/templates/shared/GarudaEmblem';
import SignatureBlock from '@/components/documents/templates/shared/SignatureBlock';
import CoverLetterContent from '@/components/documents/templates/CoverLetterContent'; // 🟢 Clean Content

/**
 * @component CoverLetterAdminLayout
 * @description Layout สำหรับ Cover Letter ในหน้า Admin (เน้นคุณภาพงานพิมพ์)
 */
const CoverLetterAdminLayout = ({ data }) => {
  // 💡 เตรียมข้อมูลสำหรับ Signature Block จาก data
  const signatureDetails = {
    // ใช้ managerName และ managerPosition จาก Form
    name: data.managerName || 'ผู้จัดการ/ผู้มีอำนาจลงนาม',
    position: data.managerPosition || 'ผู้จัดการทั่วไป',
    // ใช้ issueDate เป็นวันที่ลงนาม
    signatureDate: data.issueDate || new Date().toISOString().split('T')[0],
  };

  return (
    // min-h-[900px] ช่วยจำลองความสูงของ A4 และ text-gray-900 เพื่อการพิมพ์ที่คมชัด
    <div className="min-h-[900px] p-8 font-serif text-gray-900">
      {/* 1. ตราครุฑ (Header Logo) */}
      <GarudaEmblem />

      {/* 2. Content: เรียกใช้ Component เนื้อหาที่สะอาด */}
      {/* data ถูกส่งต่อไปยัง CoverLetterContent.jsx เพื่อ render เนื้อหาหลัก */}
      <CoverLetterContent data={data} />

      {/* 3. Signature Block */}
      <div className="mt-16">
        <SignatureBlock
          name={signatureDetails.name}
          position={signatureDetails.position}
          signatureDate={signatureDetails.signatureDate}
        />
      </div>
    </div>
  );
};

CoverLetterAdminLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CoverLetterAdminLayout;
