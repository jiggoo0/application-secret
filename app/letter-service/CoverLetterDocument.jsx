// 🚀 File: app/letter-service/CoverLetterDocument.jsx (Final Code)
'use client';

import React from 'react';
import PropTypes from 'prop-types';

// Components
import DocumentWatermark from './components/DocumentWatermark.jsx';
import HeaderSection from './components/document-sections/HeaderSection.jsx';
import DocumentSubjectLine from './components/document-sections/DocumentSubjectLine.jsx';
import DocumentBodySection from './components/document-sections/DocumentBodySection.jsx';
import ClosingSection from './components/document-sections/ClosingSection.jsx';
import DocumentChecklist from './components/document-sections/DocumentChecklist.jsx';

const CoverLetterDocument = ({ documentData, isDraft = false }) => {
  const { Applicant, Travel, Recipient, Financial, Ties, Checklist, documentDate } = documentData;

  // 🚨 ข้อความลายน้ำที่ถูกต้อง
  const WATERMARK_TEXT = 'JP-VISOUL & DOCS DRAFT - NOT VALID';

  const letterContainerStyles = {
    // A4 Dimension and Margins
    width: '21cm',
    maxWidth: '100%',
    minHeight: '29.7cm',
    padding: '2.5cm 3cm',
    margin: '20px auto',
    backgroundColor: '#fff',
    boxShadow: isDraft ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',

    // 💡 CRITICAL: ทำให้ A4 Container เป็น Parent สำหรับ Watermark
    position: 'relative',
  };

  // Font/Size/Line-height Standard
  const globalTypoClasses =
    'font-[Times_New_Roman,Times,serif] text-[16px] leading-[1.7] text-[#333]';

  return (
    <div className={`letter-container ${globalTypoClasses}`} style={letterContainerStyles}>
      {/* ลายน้ำถูกลงบนกระดาษ A4 */}
      {isDraft && <DocumentWatermark text={WATERMARK_TEXT} />}

      <HeaderSection
        applicantInfo={Applicant}
        recipientInfo={Recipient}
        documentDate={documentDate}
      />

      <DocumentSubjectLine
        visaType={Travel.visaType}
        destinationCountry={Travel.destinationCountry}
      />

      <DocumentBodySection
        applicantData={Applicant}
        travelData={Travel}
        financialData={Financial}
        tieData={Ties}
        salutation={Recipient.salutation}
      />

      <ClosingSection applicantName={Applicant.fullName} />

      <DocumentChecklist checklistItems={Checklist} />
    </div>
  );
};

CoverLetterDocument.propTypes = {
  documentData: PropTypes.object.isRequired,
  isDraft: PropTypes.bool,
};

export default CoverLetterDocument;
