// app/letter-service/CoverLetterDocument.js หรือตามที่คุณจัดเก็บ
import React from 'react';

/**
 * @typedef {object} LetterData
 * @property {string} applicantName
 * @property {string} passportNumber
 * @property {string} address
 * @property {string} phone
 * @property {string} email
 * @property {string} visaType
 * @property {string} destinationCountry
 * @property {number} durationDays
 * @property {string} entryDate - YYYY-MM-DD format
 * @property {string} departureDate - YYYY-MM-DD format
 * @property {string} purpose
 * @property {string} fundingSource
 */

/**
 * @typedef {object} CoverLetterDocumentProps
 * @property {LetterData} data
 * @property {boolean} [isDraft=false] - เพิ่ม prop สำหรับเปิด/ปิดลายน้ำ
 */

const formatDate = (dateString) => {
  // ต้องระบุ 'T00:00:00' เพื่อป้องกันปัญหา Timezone บนเบราว์เซอร์บางตัว
  if (!dateString) return '';
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * @param {CoverLetterDocumentProps} props
 */
const CoverLetterDocument = ({ data, isDraft = true }) => {
  // 💡 กำหนดให้เป็น Draft (มีลายน้ำ) เป็นค่าเริ่มต้น
  // 💡 ข้อมูล Mock สำหรับสถานทูต: ใช้ชื่อ JP-VISOUL-DOCS แทนที่อยู่จริง เพื่อเป็นเทมเพลต
  // คำแนะนำ: ผู้ใช้ต้องแก้ไขข้อความที่อยู่ใน [วงเล็บ] ให้เป็นข้อมูลจริง
  const embassyAddress = `[PLACEHOLDER: REPLACE ENTIRE BLOCK WITH REAL EMBASSY ADDRESS]

*** Document Prepared by JP-VISOUL-DOCS Template Service ***

Consulate General of ${data.destinationCountry}
[Embassy Address Line 1: e.g. 100 Sathorn Road]
[Embassy Address Line 2: e.g. Bangkok 10500, Thailand]`;

  // วันที่ออกจดหมาย คือ วันที่ปัจจุบัน
  const currentDate = formatDate(new Date().toISOString().split('T')[0]);

  return (
    // 💡 ID นี้ใช้สำหรับการอ้างอิงของ html2pdf (ห้ามเปลี่ยน)
    <div
      id="cover-letter-content" // ใช้ single quote
      className="relative bg-white p-8 font-serif text-[12pt] leading-relaxed text-gray-800 shadow-xl" // ใช้ single quote
      style={{ width: '210mm', minHeight: '297mm', margin: 'auto', border: '1px solid #ccc' }}
    >
      {/* 💡 WATERMARK LAYER - แสดงเฉพาะเมื่อเป็น Draft */}
      {isDraft && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden" // ใช้ single quote
          // สร้างลายน้ำซ้ำ ๆ ด้วย CSS (ใช้ single quote สำหรับ string ใน style object)
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 150px, transparent 150px, transparent 300px)',
            opacity: 0.8, // ลดความโปร่งใสของพื้นหลัง (ลายเส้น)
          }}
        >
          <div
            className="absolute inset-0 flex -rotate-45 transform items-center justify-center" // ใช้ single quote
            style={{ opacity: 0.15 }} // ลายน้ำหลัก
          >
            <span
              className="text-9xl font-extrabold tracking-widest text-red-500"
              style={{ letterSpacing: '0.5em', fontSize: '100px' }}
            >
              DRAFT COPY
            </span>
            <span className="absolute left-1/4 top-1/4 rotate-12 transform text-5xl text-blue-500">
              JP-VISOUL-DOCS PREVIEW
            </span>
          </div>
        </div>
      )}
      {/* 💡 END WATERMARK LAYER */}

      {/* Content (Z-Index 20 เพื่ออยู่ด้านบนลายน้ำ) */}
      <div className="relative z-20">
        <p className="mb-10 text-right">{currentDate}</p>

        {/* Recipient Address */}
        <div className="mb-8">
          <p className="font-bold">To: The Visa Officer,</p>
          {/* 💡 แสดงข้อมูล JP-VISOUL-DOCS ในส่วน Recipient และเน้นสีแดงเพื่อแจ้งเตือนให้แก้ไข */}
          <p className="whitespace-pre-wrap font-medium text-red-700">{embassyAddress}</p>
          <p>Subject: **Application for a {data.visaType} Visa**</p>
        </div>

        {/* Salutation */}
        <p className="mb-6">Dear Visa Officer,</p>

        {/* Introduction Paragraph */}
        <p className="mb-6 indent-8">
          I am writing this letter to formally request the grant of a **{data.visaType} Visa** for
          my planned trip to **{data.destinationCountry}** and the Schengen area. My primary purpose
          for visiting is **{data.purpose}**. The entire application package has been prepared with
          meticulous attention to detail to ensure full compliance with your consulate&apos;s
          guidelines. {/* ⬅️ แก้ไข ' เป็น &apos; */}
        </p>

        {/* Travel Details Paragraph */}
        <p className="mb-6 indent-8">
          My itinerary is planned for **{data.durationDays} days**, commencing on **
          {formatDate(data.entryDate)}** and concluding on **{formatDate(data.departureDate)}**. I
          will be returning to my home country, Thailand, immediately upon the completion of my
          trip, as I have strong ties and professional commitments here.
        </p>

        {/* Financial and Accommodation Paragraph */}
        <p className="mb-6 indent-8">
          All expenses related to my travel, accommodation, and personal needs during the stay will
          be fully covered by **{data.fundingSource}**, as evidenced by the attached bank statements
          and other financial proofs. All bookings and financial documentation are confirmed and
          enclosed herewith for your review.
        </p>

        {/* Document Checklist (Crucial for Visa) */}
        <p className="mb-3 mt-8 font-bold">LIST OF DOCUMENTS ENCLOSED:</p>
        <ul className="list-disc space-y-1 pl-8 text-sm">
          <li>
            Application package prepared using the JP-VISOUL-DOCS template for compliance
            verification.
          </li>
          <li>Duly completed and signed Visa Application Form.</li>
          <li>Valid Passport (No. {data.passportNumber}) and photograph.</li>
          <li>Detailed Flight Reservations (Round-trip ticket).</li>
          <li>Confirmed Hotel Booking Confirmation for the entire stay.</li>
          <li>Travel Medical Insurance (covering minimum required amount).</li>
          <li>Proof of sufficient funds (Bank Statement / Certificate).</li>
          <li>
            Employment / Business documents (e.g., Leave Approval Letter, Business Registration).
          </li>
          <li>Copy of Residence Registration (for verification of home ties).</li>
        </ul>

        {/* Closing */}
        <p className="mb-2 mt-8">
          Thank you for your time and consideration of my application. I look forward to your
          favorable response.
        </p>
        <p className="mb-10">Yours faithfully,</p>

        {/* Signature Block */}
        <p className="mt-12 font-bold">_________________________</p>
        <p className="font-bold">{data.applicantName.toUpperCase()}</p>
        <p>Passport No: {data.passportNumber}</p>
        <p>
          Contact: {data.phone} | {data.email}
        </p>
      </div>
    </div>
  );
};

export default CoverLetterDocument;
