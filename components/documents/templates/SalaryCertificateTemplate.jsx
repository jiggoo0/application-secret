// 🚀 File: components/documents/templates/SalaryCertificateTemplate.jsx

import React from 'react';
import PropTypes from 'prop-types';

const SalaryCertificateTemplate = ({ data }) => {
  // 💡 สามารถใช้ utils function ในการ format เงินเดือนเป็นตัวอักษรได้
  const formattedSalary = data.monthlySalary.toLocaleString('th-TH');

  return (
    <div className="space-y-6 text-lg">
      <h1 className="mb-8 text-center text-2xl font-bold underline">หนังสือรับรองเงินเดือน</h1>

      <p className="indent-8 leading-relaxed">
        เรียน ผู้จัดการ <span className="font-semibold">{data.purpose}</span>
      </p>

      <p className="indent-8 leading-relaxed">
        บริษัท [ชื่อบริษัทของคุณ] ขอรับรองว่า{' '}
        <span className="font-bold text-primary underline">{data.employeeName}</span>
        ปฏิบัติงานในตำแหน่ง <span className="font-semibold">
          {data.position}
        </span> ตั้งแต่วันที่ <span className="font-medium">{data.startDate}</span> จนถึงปัจจุบัน
      </p>

      <p className="indent-8 leading-relaxed">
        พนักงานท่านนี้ได้รับเงินเดือน/ค่าจ้างรายเดือนรวมเป็นจำนวน{' '}
        <span className="font-bold text-primary">{formattedSalary}</span> บาท
        (ห้าหมื่นห้าพันบาทถ้วน) โดยใช้เอกสารนี้เพื่อประกอบการ{' '}
        <span className="font-bold italic underline">{data.purpose}</span>
      </p>

      <p className="pt-6 text-right font-semibold">จึงเรียนมาเพื่อโปรดพิจารณา</p>
    </div>
  );
};

SalaryCertificateTemplate.propTypes = {
  data: PropTypes.shape({
    employeeName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    monthlySalary: PropTypes.number.isRequired,
    startDate: PropTypes.string,
    purpose: PropTypes.string,
    managerName: PropTypes.string,
  }).isRequired,
};

export default SalaryCertificateTemplate;
