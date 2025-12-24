// 🚀 File: app/letter-service/page.jsx (Final Code - เปิดใช้งานลายน้ำ & FIX Unused Import)
'use client';

import React, { useState } from 'react';
// 🚨 ลบ import PropTypes ออกแล้ว

// Components
import DocumentForm from './components/DocumentForm.jsx';
import DocumentPreviewPanel from './components/DocumentPreviewPanel.jsx';

// Logic Hook
import useCoverLetterGenerator from './hooks/useCoverLetterGenerator.js';

const INITIAL_FORM_DATA = {
  // สมมติว่านี่คือโครงสร้างข้อมูลเริ่มต้น
  applicantName: '',
  passportNumber: '',
  address: '',
  phone: '',
  email: '',
  jobTitle: '',
  companyName: '',
  visaType: '',
  destinationCountry: '',
  entryDate: '',
  departureDate: '',
  purpose: '',
  accommodationName: '',
  fundingSource: '',
  returnTiesDescription: '',
  supportingDocs: ['Passport Copy', 'Visa Application Form'], // ควรมีค่าเริ่มต้นเป็น Array
};

const LetterServicePage = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isFormMinimized, setIsFormMinimized] = useState(false);

  const { documentData } = useCoverLetterGenerator(formData);

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleToggleFormMinimize = () => {
    setIsFormMinimized((prev) => !prev);
  };

  // Responsive Width Calculation
  const formWidthClass = isFormMinimized ? 'w-[70px]' : 'w-full md:w-1/3';
  const previewWidthClass = isFormMinimized ? 'w-full md:w-[calc(100%-70px)]' : 'w-full md:w-2/3';

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 md:flex-row">
      {/* 1. Form Block */}
      <div
        className={`${formWidthClass} overflow-y-auto border-r border-gray-200 bg-white p-4 shadow-lg transition-all duration-300`}
      >
        {!isFormMinimized ? (
          <>
            <h2 className="mb-4 flex items-center justify-between text-xl font-bold">
              Document Inputs
              <button
                onClick={handleToggleFormMinimize}
                className="hidden p-2 text-gray-500 hover:text-gray-900 md:block"
              >
                ◀️
              </button>
            </h2>

            <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-gray-800">
              <p className="mb-1 font-bold">💡 เอกสารตัวอย่างและบริการจัดทำ</p>
              <p>แบบฟอร์มที่คุณกรอกคือ **รูปแบบตัวอย่าง** เพื่อใช้ในการแสดงผลพรีวิวเท่านั้น</p>
              <p className="mt-2">
                ถ้าท่านต้องการได้เอกสารตัวจริงที่มีความน่าเชื่อถือสูง ติดต่อทาง **Line Official**
                ของทางเรา เราสามารถจัดทำทุกภาษาทุกประเทศในรูปแบบการเขียนจดหมายมาตรฐานสากล
              </p>
            </div>

            <DocumentForm initialData={formData} onFieldChange={handleFormChange} />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={handleToggleFormMinimize}
              className="hover:text-900 p-2 text-gray-500"
              title="Expand Input Panel"
            >
              ▶️
            </button>
          </div>
        )}
      </div>

      {/* 2. Preview Block */}
      <div className={`${previewWidthClass} h-full p-4 transition-all duration-300`}>
        <DocumentPreviewPanel
          documentData={documentData}
          isDraftMode={true} // เปิดใช้งานลายน้ำที่นี่
          onToggleFormMinimize={handleToggleFormMinimize}
          isFormMinimized={isFormMinimized}
        />
      </div>
    </div>
  );
};

export default LetterServicePage;
