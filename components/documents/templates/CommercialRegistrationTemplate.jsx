// 🚀 File: components/documents/templates/CommercialRegistrationTemplate.jsx

import React from 'react';
import PropTypes from 'prop-types';

const CommercialRegistrationTemplate = ({ data }) => {
  return (
    <div className="space-y-6 text-lg">
      <h1 className="mb-8 text-center text-2xl font-bold underline">
        หนังสือรับรองการจดทะเบียนพาณิชย์
      </h1>

      <div className="space-y-3 pt-4">
        <p>
          <span className="font-semibold">ชื่อบริษัท:</span>{' '}
          <span className="font-bold text-primary">{data.companyName}</span>
        </p>
        <p>
          <span className="font-semibold">เลขทะเบียนพาณิชย์:</span>{' '}
          <span className="font-medium">{data.registrationNumber}</span>
        </p>
        <p>
          <span className="font-semibold">จดทะเบียนเมื่อ:</span>{' '}
          <span className="font-medium">{data.registeredDate}</span>
        </p>
        <p>
          <span className="font-semibold">ทุนจดทะเบียน:</span>{' '}
          <span className="font-medium">{data.capital.toLocaleString('th-TH')} บาท</span>
        </p>
        <p>
          <span className="font-semibold">ประเภทธุรกิจ:</span>{' '}
          <span className="font-medium">{data.businessType}</span>
        </p>
        <p>
          <span className="font-semibold">ที่ตั้งสำนักงาน:</span>{' '}
          <span className="font-medium">{data.address}</span>
        </p>
      </div>

      <p className="pt-8 text-sm italic text-gray-600">
        (เอกสารนี้ใช้สำหรับยืนยันการมีอยู่ของนิติบุคคลตามกฎหมายพาณิชย์)
      </p>
    </div>
  );
};

CommercialRegistrationTemplate.propTypes = {
  data: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    registrationNumber: PropTypes.string.isRequired,
    registeredDate: PropTypes.string,
    capital: PropTypes.number,
    businessType: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default CommercialRegistrationTemplate;
