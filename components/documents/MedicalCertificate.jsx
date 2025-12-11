// 📄 components/documents/MedicalCertificate.jsx
'use client';

import React, { useRef, useCallback, useMemo, memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileText, Stethoscope } from 'lucide-react';

// =================================================================
// CONSTANTS
// =================================================================

const DEFAULT_MEDICAL_DATA = {
  patientName: 'นาย สมชาย รักดี',
  patientAge: 35,
  dateExamined: '9 ธันวาคม 2568',
  diagnosis: 'ไข้หวัดใหญ่สายพันธุ์ A (Influenza A)',
  recommendation: 'พักผ่อนและรับประทานยาตามแพทย์สั่ง',
  restDays: 3,
  restUntilDate: '12 ธันวาคม 2568',
  doctorName: 'พญ. พรพิมล จิตต์แพทย์',
  doctorLicense: 'พ. 123456',
  hospitalName: 'โรงพยาบาลรุ่งอรุณ',
  hospitalAddress: '123 ถนนสุขุมวิท เขตบางนา กรุงเทพฯ 10260',
  certificateNumber: 'MC2568012345',
};

// =================================================================
// COMPONENT (NO TS TYPES)
// =================================================================

const MedicalCertificate = ({ data = {} }) => {
  const mergedData = useMemo(() => ({ ...DEFAULT_MEDICAL_DATA, ...data }), [data]);

  const {
    patientName,
    patientAge,
    dateExamined,
    diagnosis,
    recommendation,
    restDays,
    restUntilDate,
    doctorName,
    doctorLicense,
    hospitalName,
    hospitalAddress,
    certificateNumber,
  } = mergedData;

  const ref = useRef(null);

  const getCanvas = useCallback(async () => {
    const element = ref.current;
    if (!element) return null;

    const originalMinHeight = element.style.minHeight;
    element.style.minHeight = element.scrollHeight + 50 + 'px';

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    element.style.minHeight = originalMinHeight;
    return canvas;
  }, []);

  const downloadPDF = useCallback(async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const ratio = pdfWidth / imgWidth;
    const heightScaled = imgHeight * ratio;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, heightScaled);
    pdf.save(`ใบรับรองแพทย์_${patientName}.pdf`);
  }, [getCanvas, patientName]);

  const downloadPNG = useCallback(async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `ใบรับรองแพทย์_${patientName}.png`;
    link.click();
  }, [getCanvas, patientName]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-center gap-4" role="group" aria-label="Download options">
        <button
          onClick={downloadPDF}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Download className="h-5 w-5" /> ดาวน์โหลด PDF
        </button>

        <button
          onClick={downloadPNG}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <FileText className="h-5 w-5" /> ดาวน์โหลด PNG
        </button>
      </div>

      <div
        ref={ref}
        id="medical-certificate"
        className="relative bg-white p-12 pb-10 font-[THSarabunNew] text-[16pt] leading-[1.6] text-black shadow-2xl"
        style={{ width: '794px', minHeight: '1123px', boxSizing: 'border-box' }}
      >
        <header className="mb-10 text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-blue-600" />
          <p className="mt-2 text-[20pt] font-bold">{hospitalName}</p>
          <p className="text-[15pt]">{hospitalAddress}</p>
          <p className="mt-4 text-[14pt] text-gray-600">เลขที่ใบรับรอง: {certificateNumber}</p>
        </header>

        <h1 className="mb-8 text-center text-[24pt] font-extrabold underline decoration-2 underline-offset-4">
          ใบรับรองแพทย์
        </h1>

        <main className="space-y-4 text-justify indent-10">
          <p>
            หนังสือฉบับนี้รับรองว่า <b>{patientName}</b> อายุ <b>{patientAge}</b> ปี
            ได้เข้ารับการตรวจรักษาที่ {hospitalName} เมื่อวันที่ <b>{dateExamined}</b>
          </p>

          <div className="flex">
            <span className="w-40 shrink-0 font-bold">การวินิจฉัยโรค:</span>
            <span className="flex-1">
              <b>{diagnosis}</b>
            </span>
          </div>

          <div className="flex">
            <span className="w-40 shrink-0 font-bold">คำแนะนำแพทย์:</span>
            <span className="flex-1">{recommendation}</span>
          </div>

          <p>
            ผู้ป่วยจำเป็นต้องหยุดพักรักษาตัวเป็นเวลา <b>{restDays}</b> วัน ตั้งแต่วันที่{' '}
            {dateExamined} ถึงวันที่ <b>{restUntilDate}</b>
          </p>

          <p>สามารถกลับมาปฏิบัติงานได้ในวันที่ {restUntilDate}</p>
        </main>

        <section className="mt-20 text-right leading-[1.6]">
          <p>ลงชื่อ ............................................</p>
          <p className="mt-4 text-[18pt] font-bold">({doctorName})</p>
          <p>แพทย์ผู้ทำการรักษา</p>
          <p>ใบประกอบโรคศิลปะเลขที่ {doctorLicense}</p>
          <p className="mt-6 text-[15pt]">ออกให้ ณ วันที่ {dateExamined}</p>
        </section>

        <section className="absolute bottom-10 left-12 right-12 border-t border-gray-300 pt-4 text-[14pt] text-gray-700">
          <p className="font-bold underline">หมายเหตุ</p>
          <p className="mt-1">
            ใบรับรองฉบับนี้ใช้เพื่อประกอบการลาป่วยหรือยืนยันการรักษาพยาบาลเท่านั้น
          </p>
        </section>
      </div>
    </div>
  );
};

export default memo(MedicalCertificate);
