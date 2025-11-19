'use client';

import { memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function SalaryCertificate({ data }) {
  const {
    companyName = 'BANPHO CONSTRUCTION AND ENGINEERING CO., LTD.',
    companyNameEn = 'บริษัท บ้านโพธิ์ คอนสตรัคชั่น แอนด์ เอ็นจิเนียริ่ง จำกัด',
    certificateNumber = '',
    employeeName = '',
    startDate = '',
    position = '',
    department = '',
    salary = 43500,
    positionAllowance = 3500,
    costOfLiving = 500,
    issueDate = '',
    signPosition = '(หัวหน้าแผนกทรัพยากรฝ่ายบุคคล)',
    phone = '032-3726-2662',
    addressLine1 = '52/8 ม.1 ซ.31 ต. หนองข้างคอก',
    addressLine2 = 'อ.เมือง จ.ชลบุรี 20000',
  } = data || {};

  const fullAddress = `${addressLine1}\n${addressLine2}`;

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
    <div className="flex flex-col items-center gap-6">
      {/* 📄 A4 PAPER */}
      <div
        id="salary-certificate"
        className="relative min-h-[297mm] max-w-[210mm] overflow-hidden bg-white p-12 pb-10 font-[THSarabunNew] text-[16pt] leading-[1.65] text-black shadow"
      >
        {/* HEADER */}
        <header className="mb-10">
          <p className="text-[20pt] font-bold">{companyName}</p>
          <p className="text-[18pt] font-bold">{companyNameEn}</p>
          <p className="mt-4 text-[15pt]">เลขที่เอกสาร 89380019112568 {certificateNumber}</p>
        </header>

        {/* TITLE */}
        <h1 className="mb-10 text-center text-[22pt] font-bold underline">
          หนังสือรับรองเงินเดือน
        </h1>

        {/* BODY */}
        <main className="text-justify tracking-wide">
          บริษัทฯ ขอรับรองว่า
          <strong> นางธนภร จรหมาน (893800) {employeeName}</strong>
          เป็นพนักงานของบริษัทฯ สังกัดแผนกฝ่ายขาย {department}
          โดยเริ่มปฏิบัติงานตั้งแต่วันที่ 9 มกราคม 2564 {startDate}
          ดำรงตำแหน่ง พนักงานขาย {position}
          <br />
          <br />
          โดยมีรายได้ประจำดังนี้:
          <ul className="ml-10 mt-2 list-disc">
            <li>เงินเดือนประจำ: {salary.toLocaleString()} บาท / เดือน</li>
            <li>ค่าตำแหน่ง: {positionAllowance.toLocaleString()} บาท / เดือน</li>
            <li>ค่าครองชีพ: {costOfLiving.toLocaleString()} บาท / เดือน</li>
          </ul>
          <br />
          ออกให้ ณ วันที่ 19 พฤษจิกายน 2568 {issueDate}
        </main>

        {/* SIGN */}
        <section className="mt-20 text-right leading-[1.6]">
          <p>ลงชื่อ ............................................</p>
          <p className="mt-4">{signPosition}</p>
        </section>

        {/* NOTES */}
        <section className="mt-14 text-[15pt]">
          <p className="font-bold underline">หมายเหตุ</p>
          <ol className="ml-6 mt-2 list-decimal">
            <li>หนังสือรับรองนี้ให้ไว้เพื่อยืนยันการเป็นพนักงานของบริษัทเท่านั้น</li>
            <li>หนังสือรับรองฉบับนี้ต้องไม่มีรอยขูด ขีด ลบ แต่อย่างใด</li>
          </ol>
        </section>

        {/* CONTACT */}
        <section className="mt-10 text-[15pt] leading-[1.5]">
          <p className="mb-1 font-bold">ติดต่อฝ่ายทรัพยากรบุคคล</p>
          <p>โทรศัพท์: {phone}</p>
          <p className="mt-2">ที่อยู่บริษัท:</p>
          <div className="whitespace-pre-line">{fullAddress}</div>
        </section>
      </div>

      {/* BUTTONS OUTSIDE PAPER */}
      <div className="flex justify-center gap-4">
        <button
          onClick={downloadPDF}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={downloadPNG}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

export default memo(SalaryCertificate);
