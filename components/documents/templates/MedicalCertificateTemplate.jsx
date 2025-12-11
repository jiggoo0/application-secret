// 🚀 File: components/documents/templates/MedicalCertificateTemplate.jsx

import React from 'react';
import PropTypes from 'prop-types';

const MedicalCertificateTemplate = ({ data }) => {
  return (
    <div className="space-y-6 text-lg">
      <h1 className="mb-8 text-center text-2xl font-bold">ใบรับรองแพทย์</h1>

      <p>
        <span className="font-semibold">เรียน ผู้ที่เกี่ยวข้อง,</span>
      </p>
      <p className="indent-8 leading-relaxed">
        ข้าพเจ้า <span className="font-bold underline">{data.doctorName}</span>{' '}
        แพทย์ประจำโรงพยาบาล/คลินิก ขอรับรองว่า
        <span className="font-bold text-primary underline">{data.patientName}</span>
        หมายเลขบัตรประชาชน <span className="font-medium">{data.idNumber}</span> ได้มาตรวจรักษาอาการ
        <span className="font-bold italic text-red-700 underline"> {data.reason} </span>
        ในวันที่ <span className="font-medium">{data.issueDate}</span>
      </p>

      <p className="indent-8 leading-relaxed">
        มีความจำเป็นต้องหยุดพักรักษาตัวเป็นเวลา{' '}
        <span className="font-bold text-primary">{data.daysOff}</span> วัน (ตั้งแต่วันที่{' '}
        {data.issueDate} ถึง {/** ควรมี function คำนวณวันที่หยุด */} )
        และสามารถกลับไปปฏิบัติงานได้ตามปกติในวันถัดไป
      </p>

      <p className="pt-6 text-right font-semibold">จึงเรียนมาเพื่อโปรดทราบ</p>
    </div>
  );
};

MedicalCertificateTemplate.propTypes = {
  data: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    idNumber: PropTypes.string,
    issueDate: PropTypes.string,
    reason: PropTypes.string.isRequired,
    daysOff: PropTypes.number.isRequired,
    doctorName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MedicalCertificateTemplate;
