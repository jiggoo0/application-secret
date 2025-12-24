// 🚀 File: app/letter-service/components/document-sections/ClosingSection.jsx
// 💡 UI Component: Closing Block (Sincerely, Signature, Full Name)

import React from 'react';
import PropTypes from 'prop-types';

/**
 * แสดงส่วนลงท้ายจดหมาย และพื้นที่สำหรับลายเซ็น
 * @param {object} props
 */
const ClosingSection = ({ applicantName }) => {
  return (
    <>
      {/* 10. CLOSING (Sincerely,) */}
      <div
        className="closing"
        style={{
          fontSize: '16px', // 12pt
          marginTop: '66px', // 🚨 50pt Margin Top (Space after last paragraph)
          marginBottom: '6.6px', // 🚨 5pt Margin Bottom (Space before Signature line)
        }}
      >
        Sincerely,
      </div>

      {/* 11. SIGNATURE AREA (Space for physical signature) */}
      <div
        className="signature-area"
        style={{
          marginTop: '80px', // 🚨 60pt Margin Top (Space for signature clearance)
        }}
      >
        (Space for Signature)
        <div
          style={{
            borderTop: '1px solid #000',
            paddingTop: '6.6px', // Space between line and name
            width: '250px',
            fontSize: '16px',
            marginTop: '6.6px',
          }}
        >
          {applicantName}
        </div>
      </div>
    </>
  );
};

ClosingSection.propTypes = {
  applicantName: PropTypes.string.isRequired,
};

export default ClosingSection;
