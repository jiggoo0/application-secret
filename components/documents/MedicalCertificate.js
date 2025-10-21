'use client';

import { useRef, memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const defaultText = '—';
const withFallback = (value) => (value?.trim() ? value.trim() : defaultText);

function MedicalCertificate({ data }) {
  const certRef = useRef(null);

  const {
    referenceNo,
    hospital,
    ministryOffice,
    date,
    doctorName,
    doctorLicenseNo,
    patientTitle,
    patientName,
    address,
    citizenId,
    examinedDate,
    diagnosis,
    doctorSummary,
    restFromDate,
    restToDate,
    otherNote,
    doctorSigner,
    patientSigner,
  } = data || {};

  const handleDownloadPNG = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'medical-certificate.png';
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('medical-certificate.pdf');
  };

  return (
    <div className="space-y-4">
      <div
        ref={certRef}
        className="relative h-full w-full overflow-hidden rounded-xl bg-white p-6 shadow-md"
        style={{ minHeight: 400 }}
      >
        <h2 className="mb-4 text-center text-xl font-bold">ใบรับรองแพทย์</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>เลขที่อ้างอิง:</strong> {withFallback(referenceNo)}
          </p>
          <p>
            <strong>โรงพยาบาล:</strong> {withFallback(hospital)}
          </p>
          <p>
            <strong>สำนักงานกระทรวง:</strong> {withFallback(ministryOffice)}
          </p>
          <p>
            <strong>วันที่ออก:</strong> {withFallback(date)}
          </p>
          <p>
            <strong>ชื่อแพทย์:</strong> {withFallback(doctorName)}
          </p>
          <p>
            <strong>หมายเลขใบอนุญาต:</strong> {withFallback(doctorLicenseNo)}
          </p>
          <p>
            <strong>ชื่อผู้ป่วย:</strong> {withFallback(patientTitle)} {withFallback(patientName)}
          </p>
          <p>
            <strong>ที่อยู่:</strong> {withFallback(address)}
          </p>
          <p>
            <strong>หมายเลขบัตรประชาชน:</strong> {withFallback(citizenId)}
          </p>
          <p>
            <strong>วันที่ตรวจ:</strong> {withFallback(examinedDate)}
          </p>
          <p>
            <strong>การวินิจฉัย:</strong> {withFallback(diagnosis)}
          </p>
          <p>
            <strong>สรุปความเห็นแพทย์:</strong> {withFallback(doctorSummary)}
          </p>
          <p>
            <strong>หยุดพัก:</strong> ตั้งแต่ {withFallback(restFromDate)} ถึง{' '}
            {withFallback(restToDate)}
          </p>
          {otherNote && (
            <p>
              <strong>อื่นๆ:</strong> {withFallback(otherNote)}
            </p>
          )}

          <div className="mt-4 space-y-1">
            <p>
              <strong>แพทย์ลงชื่อ:</strong> {withFallback(doctorSigner)}
            </p>
            <p>
              <strong>ผู้ป่วยลงชื่อ:</strong> {withFallback(patientSigner)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDownloadPDF}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadPNG}
          className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

export default memo(MedicalCertificate);
