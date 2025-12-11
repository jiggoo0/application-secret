// 🚀 File: app/letter-service/components/document-sections/DocumentBodySection.jsx
// 💡 UI Component: Main Content Block (Constructs all paragraphs)

import React from 'react';
import PropTypes from 'prop-types';
import BodyParagraph from './BodyParagraph.jsx'; // 🚨 ใช้ Component นี้เพื่อควบคุม Spacing

/**
 * แสดงเนื้อหาหลักของจดหมาย โดยแบ่งเป็นย่อหน้าตามวัตถุประสงค์
 * @param {object} props
 */
const DocumentBodySection = ({ applicantData, travelData, financialData, tieData, salutation }) => {
  const { fullName, passportNumber, jobTitle, companyName } = applicantData;
  const { visaType, destinationCountry, entryDate, departureDate, purpose, accommodationName } =
    travelData;
  const { fundingSource } = financialData;
  const { returnTiesDescription } = tieData;

  const formattedEntryDate = new Date(entryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDepartureDate = new Date(departureDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* 5. SALUTATION (ถูกจัดการใน DocumentBodySection) */}
      <div
        className="salutation"
        style={{
          fontSize: '16px', // 12pt
          marginBottom: '26.6px', // 🚨 20pt Margin Bottom
        }}
      >
        {salutation || 'Dear Sir/Madam,'}
      </div>

      {/* 6. PARAGRAPH 1: Introduction and Purpose */}
      <BodyParagraph>
        I am writing to formally request a **{visaType} Visa** for my intended travel to **
        {destinationCountry}**. The purpose of my visit is **{purpose}**. I plan to enter{' '}
        {destinationCountry} on **{formattedEntryDate}** and depart on **{formattedDepartureDate}**,
        resulting in a total stay of 15 days.
      </BodyParagraph>

      {/* 7. PARAGRAPH 2: Professional and Financial Status */}
      <BodyParagraph>
        I am currently employed as a **{jobTitle}** at **{companyName}**. My finances for this trip
        are sound, and all expenses, including travel, accommodation, and daily expenditures in{' '}
        {destinationCountry}, will be covered by **{fundingSource}**. I have enclosed my bank
        statements as supporting evidence of my financial stability.
      </BodyParagraph>

      {/* 8. PARAGRAPH 3: Itinerary and Accommodation */}
      <BodyParagraph>
        During my stay in {destinationCountry}, I have arranged accommodation at **
        {accommodationName}**. My complete itinerary, including flight reservations, is attached to
        this application package for your reference.
      </BodyParagraph>

      {/* 9. PARAGRAPH 4: Return Ties (Ensuring no intention to overstay) */}
      <BodyParagraph>
        I have strong ties to my home country, Thailand, which assure my return. These ties include
        **{returnTiesDescription}**. I will strictly adhere to the terms and conditions of the visa
        and will return before the expiry of the requested duration.
      </BodyParagraph>

      {/* 10. PARAGRAPH 5: Conclusion and Closing Request */}
      <BodyParagraph>
        Thank you for considering my application. I look forward to your positive response and am
        prepared to provide any additional information required.
      </BodyParagraph>
    </>
  );
};

DocumentBodySection.propTypes = {
  applicantData: PropTypes.object.isRequired,
  travelData: PropTypes.object.isRequired,
  financialData: PropTypes.object.isRequired,
  tieData: PropTypes.object.isRequired,
  salutation: PropTypes.string.isRequired,
};

export default DocumentBodySection;
