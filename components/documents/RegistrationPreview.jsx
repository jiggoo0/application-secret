'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';

const DEFAULT_TEXT = '—';
const withFallback = (value) => (value?.trim() ? value : DEFAULT_TEXT);

export const RegistrationPreview = ({
  businessName,
  ownerName,
  registrationNumber,
  address = {},
  issuedDate,
  registrarPosition,
  registrarName,
}) => {
  const ref = useRef(null);

  const handleDownloadPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff',
    });
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [(canvas.width * 72) / 96, (canvas.height * 72) / 96],
    });
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      (canvas.width * 72) / 96,
      (canvas.height * 72) / 96,
    );
    pdf.save('registration-preview.pdf');
  };

  const handleDownloadPng = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff',
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'registration-preview.png';
    link.click();
  };

  return (
    <>
      {/* Preview section */}
      <section
        ref={ref}
        className="relative mx-auto w-full max-w-[800px] rounded-md border border-gray-400 bg-white p-12 shadow print:m-0 print:border print:p-8 print:shadow-none"
        style={{
          fontFamily: '"THSarabunNew", sans-serif',
          lineHeight: 1.8,
          fontSize: '18pt',
          minHeight: 1200,
        }}
      >
        {/* Top-left info */}
        <div className="absolute left-12 top-8 text-[14pt] leading-snug">
          <p className="mb-2">ทะเบียนเลขที่ {withFallback(registrationNumber)}</p>
          <p>
            คำขอที่{' '}
            <span className="inline-block h-[1.7em] min-w-[160px] border-b border-gray-300" />
          </p>
        </div>

        {/* Top-right form */}
        <div className="absolute right-12 top-8 text-right text-[14pt]">แบบ พค. 0403</div>

        {/* Logo / seal */}
        <div className="mb-6 mt-24 flex justify-center">
          <Image
            src="/fonts/krut.webp"
            alt="ตราครุฑ"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-[22pt] font-bold leading-none">
            กรมพัฒนาธุรกิจการค้า <br /> สำนักงานกลางทะเบียนพาณิชย์
          </p>
          <p className="mt-2 text-[28pt] font-bold leading-none underline decoration-[1.5px] underline-offset-4">
            ใบทะเบียนพาณิชย์
          </p>
          <p className="mt-4 text-[20pt]">ใบสำคัญนี้ออกให้เพื่อแสดงว่า</p>
        </div>

        {/* Owner & business info */}
        <div className="mt-6 space-y-4 text-center">
          <p className="text-[20pt]">{withFallback(ownerName)}</p>
          <p>ได้จดทะเบียนพาณิชย์ ตามพระราชบัญญัติทะเบียนพาณิชย์ พ.ศ. 2499</p>
          <p>เมื่อวันที่ {withFallback(issuedDate)}</p>
          <p className="mt-8">ชื่อที่ใช้ในการประกอบพาณิชยกิจ</p>
          <p className="text-[20pt] font-bold">{withFallback(businessName)}</p>
          <p className="mt-6">เขียนเป็นอักษรโรมัน</p>
          <p>{withFallback(businessName?.toUpperCase())}</p>

          <p className="mt-6 font-semibold">ที่ตั้งสถานประกอบการ</p>
          <p className="mx-auto max-w-[720px] text-left indent-12 leading-relaxed">
            เลขที่ {withFallback(address.houseNumber)} หมู่ที่ {withFallback(address.villageNo)}{' '}
            ตรอก/ซอย {withFallback(address.alley)} ตำบล/แขวง {withFallback(address.subDistrict)}{' '}
            อำเภอ/เขต {withFallback(address.district)} จังหวัด {withFallback(address.province)}
          </p>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-32 max-w-[720px] space-y-6 pr-10 text-right text-lg">
          <p>ออกให้ ณ วันที่ {withFallback(issuedDate)}</p>
          <p>ตำแหน่ง {withFallback(registrarPosition)}</p>
          <div className="mt-20">
            <p className="inline-block min-w-[250px] text-center text-[20pt] font-bold underline decoration-dotted">
              {withFallback(registrarName)}
            </p>
            <p className="mt-2">นายทะเบียนพาณิชย์</p>
          </div>
        </div>
      </section>

      {/* Download buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleDownloadPdf}
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadPng}
          className="rounded-md bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
        >
          Download PNG
        </button>
      </div>
    </>
  );
};
