// 🚀 File: components/documents/templates/layouts/CommercialRegistrationLayout.jsx
// 💡 Layout Wrapper สำหรับใบทะเบียนพาณิชย์ (อาจเป็นเอกสารที่มีกรอบเฉพาะตัว)

import React from 'react';
import PropTypes from 'prop-types';
import CommercialRegistrationTemplate from '../CommercialRegistrationTemplate'; // 💡 Import Content Component

const CommercialRegistrationLayout = ({ data }) => {
  return (
    <div className="font-serif text-gray-900">
      <div className="border-4 border-double border-gray-900 p-8">
        {/* 1. HEADER (สามารถใส่โลโก้บริษัทแทนครุฑได้ หากต้องการ) */}
        <div className="mb-8 text-center">
          <p className="text-2xl font-extrabold text-blue-800">กระทรวงพาณิชย์</p>
          <p className="text-xl font-bold">กรมพัฒนาธุรกิจการค้า</p>
        </div>

        {/* 2. CONTENT: ใช้ Template Component */}
        <CommercialRegistrationTemplate data={data} />

        {/* 3. FOOTER/AUTHORITY */}
        <div className="mt-12 text-center text-sm">
          <p className="italic text-gray-700">(รับรองเอกสารโดย: เจ้าพนักงานผู้มีอำนาจ)</p>
          <p className="mt-2 text-xs text-gray-500">
            ออกให้ ณ วันที่ {new Date().toLocaleDateString('th-TH', { dateStyle: 'long' })}
          </p>
        </div>
      </div>
    </div>
  );
};

CommercialRegistrationLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CommercialRegistrationLayout;
