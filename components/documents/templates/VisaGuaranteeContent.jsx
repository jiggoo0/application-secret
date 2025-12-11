// 🚀 File: components/documents/templates/VisaGuaranteeContent.jsx (VISA STANDARD)
'use client';

import React from 'react';
import PropTypes from 'prop-types';
// 💡 Assumption: Utilities for date formatting and shape validation are available
import { formatLongDate, documentDataShape } from '@/app/letter-service/utils/document';

/**
 * Component ย่อย: แสดงบล็อกข้อมูลติดต่อ (Address, Phone, Email)
 */
const DocumentContactBlock = ({ address, phone, email }) => (
  <div className="space-y-1 text-xs text-gray-600">
    <p>Address: {address}</p>
    <p>Phone: {phone}</p>
    <p>Email: {email}</p>
  </div>
);

DocumentContactBlock.propTypes = {
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

/**
 * @component VisaGuaranteeContent
 * @description เนื้อหาจดหมายรับรองและแนะนำตัวเพื่อยื่นวีซ่า
 */
const VisaGuaranteeContent = ({ data, currentDateFormatted }) => {
  const {
    applicantName,
    passportNumber,
    address,
    phone,
    email,
    visaType,
    destinationCountry,
    durationDays,
    entryDate,
    departureDate,
    purpose,
    fundingSource,
    managerName, // ชื่อผู้รับรอง (Expert/Manager)
  } = data;

  // Format วันที่เดินทาง
  const entryDateFormatted = formatLongDate(entryDate);
  const departureDateFormatted = formatLongDate(departureDate);

  return (
    <>
      {/* --- HEADER --- */}
      <header className="mb-8 border-b pb-4">
        <h1 className="mb-1 text-xl font-bold text-gray-800">
          LETTER OF INTRODUCTION AND GUARANTEE
        </h1>
        <p className="text-sm text-gray-600">
          To: The Visa Officer, {destinationCountry} Embassy/Consulate
        </p>
      </header>

      {/* --- DATE --- */}
      <p className="mb-6 text-right text-sm">
        Date: <span className="font-medium">{currentDateFormatted}</span>
      </p>

      {/* --- BODY --- */}
      <p className="mb-4 text-sm leading-relaxed">Dear Sir/Madam,</p>

      {/* Paragraph 1: Introduction */}
      <p className="mb-4 indent-8 text-sm leading-relaxed">
        I, <span className="font-semibold">{applicantName}</span> (Passport No.{' '}
        <span className="font-semibold">{passportNumber}</span>), am writing this letter to confirm
        my application for a <strong>{visaType}</strong> visa for my upcoming trip to{' '}
        <strong>{destinationCountry}</strong>.
      </p>

      {/* Travel Summary Block (Section Block) */}
      <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
        <h3 className="mb-2 font-bold text-gray-700">Travel Itinerary Summary:</h3>
        <ul className="ml-2 list-inside list-disc space-y-1">
          <li>Destination: {destinationCountry}</li>
          <li>Purpose: {purpose || 'Tourism and leisure'}</li>
          <li>Duration: {durationDays} days</li>
          <li>Entry Date: {entryDateFormatted}</li>
          <li>Departure Date: {departureDateFormatted}</li>
        </ul>
      </div>

      {/* Paragraph 2: Guarantee */}
      <p className="mb-4 indent-8 text-sm leading-relaxed">
        I confirm that all expenses during the stay in {destinationCountry} will be covered by{' '}
        <strong>{fundingSource || 'Personal Savings'}</strong>. I guarantee that I will abide by the
        local laws and return to my home country before the expiration of my authorized stay.
      </p>

      {/* Paragraph 3: Closing */}
      <p className="mb-6 indent-8 text-sm leading-relaxed">
        Thank you for considering my visa application. I have attached all required documents for
        your review and look forward to your positive response.
      </p>

      {/* --- FOOTER / Contact Block --- */}
      <div className="mt-8 border-t pt-4">
        <p className="mb-1 text-sm">Sincerely,</p>
        {/* ใช้ชื่อผู้รับรอง/ผู้เชี่ยวชาญ หากมี */}
        <p className="mb-4 text-base font-semibold">{managerName || applicantName}</p>
        <DocumentContactBlock address={address} phone={phone} email={email} />
      </div>
    </>
  );
};

VisaGuaranteeContent.propTypes = {
  data: documentDataShape.isRequired,
  currentDateFormatted: PropTypes.string, // currentDateFormatted อาจถูกส่งมาจาก Layout
};

export default VisaGuaranteeContent;
