// 🚀 File: app/letter-service/components/document-sections/HeaderSection.jsx
// 💡 UI Component: Formal Header Block (Sender, Date, Recipient)

import React from 'react';
import PropTypes from 'prop-types';

/**
 * แสดงส่วนหัวจดหมาย ประกอบด้วยผู้ส่ง, วันที่ และผู้รับ
 * @param {object} props
 */
const HeaderSection = ({ applicantInfo, recipientInfo, documentDate }) => {
  const { fullName, passportNumber, address, phone, email } = applicantInfo;

  const { title, visaSection, embassyName, embassyAddress } = recipientInfo;

  return (
    <>
      {/* 1. SENDER DETAILS (Applicant Info) */}
      <div
        className="sender-info"
        style={{
          fontSize: '14.6px', // Approx 11pt
          lineHeight: 1.5,
          marginBottom: '33px', // 🚨 25pt Margin Bottom
        }}
      >
        {fullName}
        <br />
        {address}
        <br />
        {phone}
        <br />
        {email}
        <br />
        Passport No.: {passportNumber}
      </div>

      {/* 2. DATE (Formatted Date) */}
      <div
        className="date-line"
        style={{
          textAlign: 'right',
          fontSize: '16px', // 12pt
          marginBottom: '40px', // 🚨 30pt Margin Bottom
        }}
      >
        {documentDate}
      </div>

      {/* 3. RECIPIENT DETAILS (Embassy/Consulate Info) */}
      <div
        className="recipient-info"
        style={{
          fontSize: '16px', // 12pt
          lineHeight: 1.5,
          marginBottom: '40px', // 🚨 30pt Margin Bottom
        }}
      >
        {title}
        <br />
        {visaSection}
        <br />
        {embassyName}
        <br />
        {embassyAddress}
      </div>
    </>
  );
};

HeaderSection.propTypes = {
  applicantInfo: PropTypes.object.isRequired,
  recipientInfo: PropTypes.object.isRequired,
  documentDate: PropTypes.string.isRequired,
};

export default HeaderSection;
