// 🚀 File: app/letter-service/components/document-sections/DocumentChecklist.jsx
// 💡 UI Component: Enclosure List (Formal Appendix)

import React from 'react';
import PropTypes from 'prop-types';

/**
 * แสดงรายการเอกสารที่แนบมาพร้อมกับจดหมาย (Enclosures)
 * @param {object} props
 */
const DocumentChecklist = ({ checklistItems }) => {
  if (!checklistItems || checklistItems.length === 0) {
    return null;
  }

  return (
    <div
      className="document-checklist"
      style={{
        marginTop: '40px', // Space after the signature block
        fontSize: '16px', // 12pt
      }}
    >
      <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '10px' }}>
        Enclosures:
      </div>
      <ul style={{ paddingLeft: '20px' }}>
        {checklistItems.map((item, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

DocumentChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DocumentChecklist;
