'use client';

import { memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function SalaryCertificate({ data }) {
  const {
    companyName = '',
    companyNameEn = '',
    certificateNumber = '',
    employeeName = '',
    startDate = '',
    position = '',
    department = '',
    salary = 0,
    positionAllowance = 0,
    costOfLiving = 0,
    issueDate = '',
    signPosition = '',
    phone = '',
    addressLine1 = '',
    addressLine2 = '',
  } = data || {};

  const downloadPDF = async () => {
    const element = document.getElementById('salary-certificate');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SalaryCertificate_${employeeName}.pdf`);
  };

  const downloadPNG = async () => {
    const element = document.getElementById('salary-certificate');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgData;
    link.download = `SalaryCertificate_${employeeName}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        id="salary-certificate"
        className="mx-auto h-[297mm] w-[210mm] max-w-full overflow-auto bg-white p-10 font-[THSarabunNew] text-[16pt] leading-[1.6] text-black shadow print:m-0 print:border print:p-8 print:shadow-none"
      >
        <header className="mb-6 flex items-start justify-between">
          <div className="text-right leading-tight">
            <p className="text-[18pt] font-bold">{companyName}</p>
            <p className="text-[16pt] font-bold">{companyNameEn}</p>
            <p>เลขที่ {certificateNumber}</p>
          </div>
        </header>

        <h1 className="my-6 text-center text-[20pt] font-bold underline">หนังสือรับรองเงินเดือน</h1>

        <main className="whitespace-pre-line text-justify tracking-wide">
          บริษัทฯ ขอรับรองว่า <strong>นาย {employeeName}</strong> เป็นพนักงานของบริษัทฯ
          โดยเริ่มปฏิบัติงานตั้งแต่วันที่ {startDate} จนถึงปัจจุบัน ดำรงตำแหน่ง {position}{' '}
          สังกัดแผนก {department}.
          <br />
          <br />
          โดยมีรายได้ประจำดังนี้:
          <ul className="ml-8 list-disc">
            <li>เงินเดือนประจำ: {salary.toLocaleString()} บาท / เดือน</li>
            <li>ค่าตำแหน่ง: {positionAllowance.toLocaleString()} บาท / เดือน</li>
            <li>ค่าครองชีพ: {costOfLiving.toLocaleString()} บาท / เดือน</li>
          </ul>
          <br />
          ออกให้ ณ วันที่ {issueDate} เพื่อใช้เป็นหลักฐานประกอบการยืนยันการเป็นพนักงานของบริษัทฯ
          เท่านั้น
        </main>

        <section className="mt-16 text-right">
          <p>ลงชื่อ.......................................................</p>
          <p>(นาย {employeeName})</p>
          <p>{signPosition}</p>
        </section>

        <section className="mt-10 text-[14pt]">
          <p className="font-bold underline">หมายเหตุ</p>
          <ol className="ml-6 list-decimal">
            <li>หนังสือรับรองนี้ให้ไว้เพื่อยืนยันการเป็นพนักงานของบริษัทเท่านั้น</li>
            <li>หนังสือรับรองฉบับนี้ต้องไม่มีรอยขูด ขีด ลบ แต่อย่างใด จึงจะถือว่าสมบูรณ์</li>
          </ol>
        </section>

        <section className="mt-6 text-[14pt]">
          <p className="mb-1 font-bold">ติดต่อฝ่ายทรัพยากรบุคคล</p>
          <p>โทรศัพท์: {phone}</p>
          <p className="mt-1">ที่อยู่บริษัท:</p>
          <p>{addressLine1}</p>
          <p>{addressLine2}</p>
        </section>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={downloadPDF}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={downloadPNG}
          className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

export default memo(SalaryCertificate);
