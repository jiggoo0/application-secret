'use client';

import { memo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function SalaryCertificate({ data }) {
  const defaultData = {
    companyName: 'บริษัท บานโพธิ์ ก่อสร้างและวิศวกรรม จำกัด',
    companyNameEn: 'Banpho Construction and Engineering Co., Ltd.',
    certificateNumber: '',
    // อัปเดตข้อมูลพนักงาน
    employeeName: 'นางสาว กฤษณา เจริญสุข (BPS226488)',
    startDate: '4 ปี', // อัปเดตเป็นระยะเวลาทำงาน
    position: 'หัวหน้าฝ่ายขายประจำบริษัท',
    department: 'ฝ่ายขาย',
    // อัปเดตค่าตอบแทน
    salary: 36500,
    fuelAllowance: 3500, // เปลี่ยนเป็น ค่าน้ำมัน/ค่ายานพาหนะ
    costOfLiving: 500,
    annualBonus: 27400, // เพิ่ม โบนัสรายปี
    issueDate: '19 พฤศจิกายน 2568',
    signPosition: 'หัวหน้าแผนกทรัพยากรบุคคล',
    phone: '032-3726-2662',
    addressLine1: '52/8 หมู่ 1 ซอย 31 ตำบลหนองข้างคอก',
    addressLine2: 'อำเภอเมือง จังหวัดชลบุรี 20000',
  };

  const {
    companyName,
    companyNameEn,
    certificateNumber,
    employeeName,
    startDate,
    position,
    department,
    salary,
    fuelAllowance,
    costOfLiving,
    annualBonus,
    issueDate,
    signPosition,
    phone,
    addressLine1,
    addressLine2,
  } = { ...defaultData, ...data }; // ผสานข้อมูลที่ส่งเข้ามากับค่าเริ่มต้น

  const fullAddress = `${addressLine1}\n${addressLine2}`;

  const getCanvas = async () => {
    const element = document.getElementById('salary-certificate');
    if (!element) return null;

    // **การปรับปรุง:** ตรวจสอบให้แน่ใจว่าองค์ประกอบมีความสูงที่พอดีกับเนื้อหาก่อนแปลง
    const originalMinHeight = element.style.minHeight;
    element.style.minHeight = element.scrollHeight + 'px';

    const canvas = await html2canvas(element, {
      scale: 3, // ความคมชัดสูง
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    element.style.minHeight = originalMinHeight; // คืนค่าความสูงเดิม
    return canvas;
  };

  // **ฟังก์ชันที่ปรับปรุงใหม่เพื่อรองรับหลายหน้าและป้องกันการตัดขอบ**
  const downloadPDF = async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    // ใช้ image/jpeg เพื่อลดขนาดไฟล์ PDF แต่ยังคงคุณภาพ (quality 1.0)
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth(); // 595.28 pt (A4 Width)
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 841.89 pt (A4 Height)

    // คำนวณความสูงของภาพใน PDF เมื่อปรับให้พอดีกับความกว้าง
    const ratio = pdfWidth / imgWidth;
    const heightScaled = imgHeight * ratio;

    let heightLeft = heightScaled;
    let position = 0;

    // เพิ่มหน้าแรก
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, heightScaled);
    heightLeft -= pdfHeight;

    // วนซ้ำเพื่อเพิ่มหน้าที่เหลือ หากเนื้อหายาวกว่า 1 หน้า A4
    while (heightLeft > 0) {
      position -= pdfHeight; // เลื่อนตำแหน่งขึ้นไปบนหน้าใหม่
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, heightScaled);
      heightLeft -= pdfHeight;
    }

    pdf.save(`หนังสือรับรองเงินเดือน_${employeeName}.pdf`);
  };

  const downloadPNG = async () => {
    const canvas = await getCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `หนังสือรับรองเงินเดือน_${employeeName}.png`;
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
        {/* ส่วนหัว */}
        <header className="mb-8">
          <p className="text-[20pt] font-bold">{companyName}</p>
          <p className="text-[18pt] font-bold">{companyNameEn}</p>
          <p className="mt-4 text-[15pt]">เลขที่เอกสาร 89380019112568 {certificateNumber}</p>
        </header>

        {/* ชื่อเอกสาร */}
        <h1 className="mb-8 text-center text-[22pt] font-bold underline">หนังสือรับรองเงินเดือน</h1>

        {/* เนื้อหา */}
        <main className="text-justify indent-10">
          หนังสือฉบับนี้รับรองว่า
          <strong> {employeeName}</strong>, เป็นพนักงานของบริษัทฯ สังกัด{department},
          และได้ทำงานกับบริษัทฯ เป็นระยะเวลา {startDate}
          โดยดำรงตำแหน่งเป็น {position}
          <br />
          <br />
          พนักงานผู้นี้ได้รับค่าตอบแทนรายเดือนดังต่อไปนี้:
          {/* รายการค่าตอบแทน */}
          <div className="ml-10 mt-2">
            <div className="flex gap-3">
              <span>•</span>
              <span>เงินเดือนพื้นฐาน: {salary.toLocaleString()} บาท / เดือน</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>•</span>
              <span>ค่าน้ำมัน/ค่ายานพาหนะ: {fuelAllowance.toLocaleString()} บาท / เดือน</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>•</span>
              <span>ค่าครองชีพ: {costOfLiving.toLocaleString()} บาท / เดือน</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>•</span>
              <span>โบนัสรายปี (เฉลี่ย): {annualBonus.toLocaleString()} บาท / ปี</span>
            </div>
          </div>
          <br />
          ออกให้ ณ วันที่ {issueDate}
        </main>

        {/* ส่วนลงนาม */}
        <section className="mt-16 text-right leading-[1.6]">
          <p>ลงชื่อ ............................................</p>
          <p className="mt-4">{signPosition}</p>
        </section>

        {/* หมายเหตุ */}
        <section className="mt-10 text-[15pt]">
          <p className="font-bold underline">หมายเหตุ</p>
          <div className="ml-6 mt-2">
            <div className="flex gap-3">
              <span>1.</span>
              <span>หนังสือรับรองฉบับนี้ออกให้เพื่อใช้ยืนยันการเป็นพนักงานของบริษัทฯ เท่านั้น</span>
            </div>
            <div className="mt-1 flex gap-3">
              <span>2.</span>
              <span>หนังสือรับรองฉบับนี้จะต้องไม่มีการขูดลบหรือแก้ไขใดๆ</span>
            </div>
          </div>
        </section>

        {/* ข้อมูลติดต่อ */}
        <section className="mt-8 text-[15pt] leading-[1.5]">
          <p className="font-bold">ข้อมูลติดต่อฝ่ายทรัพยากรบุคคล</p>
          <p>โทรศัพท์: {phone}</p>
          <p className="mt-2">ที่อยู่บริษัท:</p>
          <div className="whitespace-pre-line">{fullAddress}</div>
        </section>
      </div>

      {/* ปุ่มดาวน์โหลด */}
      <div className="flex justify-center gap-4">
        <button
          onClick={downloadPDF}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          ดาวน์โหลด PDF
        </button>
        <button
          onClick={downloadPNG}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          ดาวน์โหลด PNG
        </button>
      </div>
    </div>
  );
}

export default memo(SalaryCertificate);
