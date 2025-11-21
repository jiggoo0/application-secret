'use client';

import { memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function SalaryCertificate({ data }) {
  const {
    companyName = 'BANPHO CONSTRUCTION AND ENGINEERING CO., LTD.',
    companyNameEn = 'Banpho Construction and Engineering Co., Ltd.',
    certificateNumber = '',
    employeeName = '',
    startDate = '9 January 2021',
    position = 'Sales Representative',
    department = 'Sales Department',
    salary = 43500,
    positionAllowance = 3500,
    costOfLiving = 500,
    issueDate = '19 November 2025',
    signPosition = 'Head of Human Resources Department',
    phone = '032-3726-2662',
    addressLine1 = '52/8 Moo 1, Soi 31, Nong Khangkaok Subdistrict',
    addressLine2 = 'Mueang District, Chonburi 20000',
  } = data || {};

  const fullAddress = `${addressLine1}\n${addressLine2}`;

  const getCanvas = async () => {
    const element = document.getElementById('salary-certificate');
    if (!element) return null;

    return await html2canvas(element, {
      scale: 3, // ความคมชัดสูง
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });
  };

  const downloadPDF = async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SalaryCertificate_${employeeName}.pdf`);
  };

  const downloadPNG = async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `SalaryCertificate_${employeeName}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* A4 PAPER fixed size, overflow visible */}
      <div
        id="salary-certificate"
        className="relative bg-white p-12 pb-10 font-[THSarabunNew] text-[16pt] leading-[1.6] text-black shadow-lg"
        style={{
          width: '794px', // A4 pixel
          minHeight: '1123px',
          overflow: 'visible',
          boxSizing: 'border-box',
        }}
      >
        {/* HEADER */}
        <header className="mb-8">
          <p className="text-[20pt] font-bold">{companyName}</p>
          <p className="text-[18pt] font-bold">{companyNameEn}</p>
          <p className="mt-4 text-[15pt]">Document No.89380019112568 {certificateNumber}</p>
        </header>

        {/* TITLE */}
        <h1 className="mb-8 text-center text-[22pt] font-bold underline">Salary Certificate</h1>

        {/* BODY */}
        <main className="text-justify">
          This is to certify that
          <strong> Mrs. Thanaporn Jorhaman (893800) {employeeName}</strong>, is an employee of the
          company under the {department} Department, and has been employed since {startDate},
          holding the position of {position}.
          <br />
          <br />
          The employee receives the following monthly compensation:
          {/* Bullet list */}
          <div className="ml-10 mt-2">
            <div className="flex gap-3">
              <span>•</span>
              <span>Base Salary: {salary.toLocaleString()} Baht / month</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>•</span>
              <span>Position Allowance: {positionAllowance.toLocaleString()} Baht / month</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>•</span>
              <span>Cost of Living Allowance: {costOfLiving.toLocaleString()} Baht / month</span>
            </div>
          </div>
          <br />
          Issued on {issueDate}
        </main>

        {/* SIGN */}
        <section className="mt-16 text-right leading-[1.6]">
          <p>Signature ............................................</p>
          <p className="mt-4">{signPosition}</p>
        </section>

        {/* NOTES */}
        <section className="mt-10 text-[15pt]">
          <p className="font-bold underline">Notes</p>
          <div className="ml-6 mt-2">
            <div className="flex gap-3">
              <span>1.</span>
              <span>This certificate is issued solely to verify employment with the company.</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>2.</span>
              <span>This certificate must not contain erasures or alterations.</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 text-[15pt] leading-[1.5]">
          <p className="font-bold">Human Resources Contact</p>
          <p>Phone: {phone}</p>
          <p className="mt-2">Company Address:</p>
          <div className="whitespace-pre-line">{fullAddress}</div>
        </section>
      </div>

      {/* BUTTONS */}
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
