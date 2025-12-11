// 🚀 File: components/documents/templates/layouts/MedicalCertificateLayout.jsx
// 💡 Layout Wrapper สำหรับใบรับรองแพทย์

import React from 'react';
import PropTypes from 'prop-types';
import GarudaEmblem from '../shared/GarudaEmblem';
import SignatureBlock from '../shared/SignatureBlock';
import MedicalCertificateTemplate from '../MedicalCertificateTemplate'; // 💡 Import Content Component

const MedicalCertificateLayout = ({ data }) => {
  // 💡 เตรียมข้อมูลสำหรับ Signature Block
  const doctorSignature = {
    name: data.doctorName,
    position: 'แพทย์ผู้ตรวจรักษา',
    signatureDate: data.issueDate,
  };

  return (
    <div className="font-serif text-gray-900">
      <GarudaEmblem />

      {/* 1. CONTENT: ใช้ Template Component */}
      <MedicalCertificateTemplate data={data} />

      {/* 2. SIGNATURE BLOCK */}
      <SignatureBlock
        name={doctorSignature.name}
        position={doctorSignature.position}
        signatureDate={doctorSignature.signatureDate}
      />
    </div>
  );
};

MedicalCertificateLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MedicalCertificateLayout;
