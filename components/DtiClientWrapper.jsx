// components/DtiClientWrapper.jsx
'use client';

import { useState, useCallback } from 'react';
import { submitDtiAssessment } from '@/app/actions/dti';
import DtiCalculatorForm from '@/components/business/DtiCalculator/DtiCalculatorForm';
import PreviewRenderer from '@/components/business/DocumentPreview/PreviewRenderer';
import PreviewUpdater from '@/components/business/DocumentPreview/PreviewUpdater';
import FileUploadZone from '@/components/business/FileUploadZone/FileUploadZone';
import { CheckCircle, Loader2 } from 'lucide-react';

/**
 * DtiClientWrapper: Client Component Shell สำหรับหน้า DTI
 *
 * @param {object} props
 * @param {boolean} props.saveEnabled - เปิด/ปิด ฟังก์ชันการบันทึกข้อมูล
 */
export default function DtiClientWrapper({ saveEnabled }) {
  // 1. State for Calculation results
  const initialAssessment = {
    status: 'รอการคำนวณ',
    message: 'กรุณาป้อนข้อมูลเพื่อประเมิน DTI',
    style: 'text-gray-500 bg-gray-100',
  };

  const [calculationResult, setCalculationResult] = useState({
    ratio: 0,
    assessment: initialAssessment,
  });

  // 2. State for Submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // 3. State for File Upload (ใช้ File Object โดยตรงเพื่อส่งใน FormData)
  const [uploadedFile, setUploadedFile] = useState(null);

  // 4. Handler ที่รับผลลัพธ์จาก DtiCalculatorForm
  const handleCalculationUpdate = useCallback((ratio, assessment) => {
    setCalculationResult({ ratio, assessment });
    // รีเซ็ตสถานะการบันทึกเมื่อข้อมูลมีการเปลี่ยนแปลง
    setSubmissionSuccess(false);
    setSubmissionError(null);
  }, []);

  // 5. Handler สำหรับ File Upload (รับ File Object หรือ null)
  const handleFileStatusChange = useCallback((file) => {
    setUploadedFile(file);
    // รีเซ็ตสถานะการบันทึกเมื่อไฟล์มีการเปลี่ยนแปลง
    setSubmissionSuccess(false);
    setSubmissionError(null);
  }, []);

  // 6. Handler สำหรับการส่งข้อมูล (ใช้งาน Server Action จริง)
  const handleSubmit = useCallback(async () => {
    const { ratio, assessment } = calculationResult;

    // Validation
    if (ratio <= 0 || assessment.status === 'รอการคำนวณ') {
      setSubmissionError('กรุณากรอกข้อมูลรายได้และภาระหนี้ที่ถูกต้องก่อนบันทึก');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    // 1. สร้าง FormData
    const formData = new FormData();
    formData.append('ratio', ratio.toString());
    formData.append('assessmentStatus', assessment.status);

    // 2. แนบไฟล์ (ถ้ามี)
    if (uploadedFile) {
      // ใช้ชื่อ field 'documentFile' ตามที่ Server Action คาดหวัง
      formData.append('documentFile', uploadedFile);
    }

    try {
      // 3. เรียกใช้ Server Action
      const result = await submitDtiAssessment(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      console.log('Server Response:', result);
      setSubmissionSuccess(true);
      setSubmissionError(null);
    } catch (e) {
      // จัดการ Error ที่มาจาก Server Action หรือข้อผิดพลาดด้านเครือข่าย
      setSubmissionError(e.message || 'การบันทึกล้มเหลวที่ Server. โปรดตรวจสอบ Console');
      setSubmissionSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [calculationResult, uploadedFile]);

  // กำหนดเงื่อนไขการปิดใช้งานปุ่มบันทึก
  const isSaveDisabled =
    !saveEnabled ||
    isSubmitting ||
    calculationResult.ratio <= 0 ||
    calculationResult.assessment.status === 'รอการคำนวณ';

  // Flag สำหรับ UI
  const isFileUploadOptional = true;

  return (
    <div className="space-y-8">
      {/* 1. ส่วน Form และ Input */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-indigo-700">ป้อนข้อมูลทางการเงิน</h2>
        <DtiCalculatorForm onCalculate={handleCalculationUpdate} />
      </div>

      {/* 1.5 File Upload Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-indigo-700">อัปโหลดเอกสาร (เป็นทางเลือก)</h2>
        <FileUploadZone
          onFileStatusChange={handleFileStatusChange}
          documentName="เอกสารแสดงรายได้"
          isOptional={isFileUploadOptional}
        />
      </div>

      {/* 2. ส่วน Preview ผลลัพธ์ */}
      <PreviewRenderer title="ผลการประเมิน DTI (ฉบับร่าง)" reportType="DTI Assessment">
        <PreviewUpdater
          dtiRatio={calculationResult.ratio}
          dtiAssessment={calculationResult.assessment}
          uploadedFile={uploadedFile} // ส่ง File Object ไปให้ PreviewUpdater
        />
      </PreviewRenderer>

      {/* 3. ส่วน Action Button (Save/Submit) */}
      <div className="flex justify-center pt-4" aria-live="polite">
        {submissionSuccess ? (
          <div className="flex items-center rounded-xl bg-green-50 p-3 text-lg font-semibold text-green-600 shadow-md transition-all">
            <CheckCircle className="mr-2 h-5 w-5" />
            บันทึกผลการประเมินสำเร็จ!
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSaveDisabled}
            className={`flex items-center rounded-xl px-8 py-3 text-lg font-bold shadow-md transition-all ${
              !isSaveDisabled
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            } `}
            aria-disabled={isSaveDisabled}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              'บันทึกผลการประเมินและเอกสาร'
            )}
          </button>
        )}
      </div>

      {submissionError && (
        <div
          className="mx-auto mt-4 max-w-md rounded-xl border border-red-300 bg-red-100 p-3 text-center text-sm text-red-600"
          role="alert"
          aria-live="assertive"
        >
          {submissionError}
        </div>
      )}

      {!saveEnabled && (
        <div className="rounded bg-gray-50 p-2 text-center text-sm text-gray-500">
          *การบันทึกข้อมูลถูกปิดใช้งานตามการตั้งค่าระบบ (`NEXT_PUBLIC_DTI_SAVE=false`)
        </div>
      )}
    </div>
  );
}
