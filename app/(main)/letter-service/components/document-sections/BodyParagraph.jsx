// 🚀 File: app/letter-service/components/document-sections/BodyParagraph.jsx
// 💡 UI Component: Paragraph Wrapper (Ensures consistent 18pt bottom margin)

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component Wrapper สำหรับย่อหน้าในเนื้อหาจดหมาย
 * @param {object} props
 */
const BodyParagraph = ({ children }) => {
  return (
    <div
      className="body-paragraph"
      style={{
        textAlign: 'justify', // จัดชิดขอบซ้ายขวา
        fontSize: '16px', // 12pt
        marginBottom: '24px', // 🚨 18pt Margin Bottom เพื่อควบคุม Vertical Rhythm
      }}
    >
      {children}
    </div>
  );
};

BodyParagraph.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BodyParagraph;
