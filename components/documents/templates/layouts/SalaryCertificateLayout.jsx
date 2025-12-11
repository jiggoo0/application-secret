// 🚀 File: components/documents/templates/layouts/SalaryCertificateLayout.jsx
// 💡 Layout Wrapper สำหรับใบรับรองเงินเดือน

import React from 'react';
import PropTypes from 'prop-types';
import GarudaEmblem from '../shared/GarudaEmblem';
import SignatureBlock from '../shared/SignatureBlock';
import SalaryCertificateTemplate from '../SalaryCertificateTemplate'; // 💡 Import Content Component

const SalaryCertificateLayout = ({ data }) => {
  // 💡 เตรียมข้อมูลสำหรับ Signature Block
  const managerSignature = {
    name: data.managerName,
    position: 'ผู้จัดการฝ่ายบุคคล (Human Resources Manager)',
    signatureDate: new Date().toISOString().split('T')[0], // วันที่ออก
  };

  return (
    <div className="font-serif text-gray-900">
      <GarudaEmblem />

      {/* 1. CONTENT: ใช้ Template Component */}
      <SalaryCertificateTemplate data={data} />

      {/* 2. SIGNATURE BLOCK */}
      <SignatureBlock
        name={managerSignature.name}
        position={managerSignature.position}
        signatureDate={managerSignature.signatureDate}
      />

      <p className="mt-8 text-center text-xs text-gray-500">
        **หมายเหตุ:** เอกสารนี้ออกให้เพื่อใช้ตามวัตถุประสงค์ที่ระบุไว้เท่านั้น
      </p>
    </div>
  );
};

SalaryCertificateLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SalaryCertificateLayout;
