// 🚀 File: app/letter-service/components/document-sections/DocumentSubjectLine.jsx
// 💡 UI Component: Subject Line (Formal Header)

import React from 'react';
import PropTypes from 'prop-types';

/**
 * แสดงผลหัวข้อจดหมาย (Subject Line)
 * @param {object} props
 */
const DocumentSubjectLine = ({ visaType, destinationCountry }) => {
  const subjectText = `SUBJECT: APPLICATION FOR A ${visaType.toUpperCase()} VISA TO ${destinationCountry.toUpperCase()}`;

  return (
    <div
      className="subject-line"
      style={{
        fontSize: '16px', // 12pt
        fontWeight: 'bold',
        textDecoration: 'underline',
        marginBottom: '26.6px', // 🚨 20pt Margin Bottom ก่อนเริ่ม Salutation
      }}
    >
      {subjectText}
    </div>
  );
};

DocumentSubjectLine.propTypes = {
  visaType: PropTypes.string.isRequired,
  destinationCountry: PropTypes.string.isRequired,
};

export default DocumentSubjectLine;
