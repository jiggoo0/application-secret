// lib/pdf/generate_pdf.js

// 💡 FIX 1: เปลี่ยน 'import type' เป็น 'import' เพื่อรองรับไฟล์ .js (หากไม่เปลี่ยนเป็น .ts)
import { BookingSchema } from '@/types/booking-types'; 

// 💡 นำเข้า Dependencies ที่จำเป็นสำหรับการเลือก Template
import getTemplateComponent from '@/lib/html_templates/template_logic/getTemplateComponent'; 

// 💡 นำเข้า Templates (ตามที่คุณระบุว่า Unchanged)
import FlightTemplate from '@/lib/html_templates/templates/FlightTemplate';
import HotelTemplate from '@/lib/html_templates/templates/HotelTemplate';
import TourTemplate from '@/lib/html_templates/templates/TourTemplate';

/**
 * @title generatePdfDocument
 * @description ฟังก์ชันหลักในการรับ BookingSchema และสร้างเอกสาร PDF (ส่งกลับเป็น Buffer)
 * @param {BookingSchema} bookingData ข้อมูลการจองที่ส่งมาจาก Server Action
 * @returns {Promise<Buffer>} Buffer ของไฟล์ PDF
 */
export async function generatePdfDocument(bookingData) {
  if (!bookingData.pnr_code || !bookingData.project_id) {
    throw new Error('Booking data is incomplete for PDF generation.');
  }
  
  const projectId = bookingData.project_id;

  // ----------------------------------------------------
  // 1. DYNAMICALLY LOAD/REQUIRE ReactDOMServer (THE FIX)
  // 💡 FIX 2: ใช้ require() ภายในฟังก์ชันเพื่อหลีกเลี่ยง Next.js Build Flag
  // การเรียกใช้จะเกิดขึ้นจริงบน Server Environment เท่านั้น
  // ----------------------------------------------------
  let renderToStaticMarkup;
  try {
      // require() is a standard Node.js function available on the server
      const ReactDOMServer = require('react-dom/server');
      renderToStaticMarkup = ReactDOMServer.renderToStaticMarkup;
  } catch (e) {
      console.error("Failed to load react-dom/server on the server:", e);
      throw new Error("PDF Generation setup failed: React DOM Server dependency is missing.");
  }

  // ----------------------------------------------------
  // 2. เลือกและ Render Template เป็น HTML String
  // ----------------------------------------------------
  
  // 2.1. ใช้ getTemplateComponent เพื่อเลือก Component
  const TemplateComponent = getTemplateComponent(projectId, {
      FlightTemplate,
      HotelTemplate,
      TourTemplate,
  });

  if (!TemplateComponent) {
      throw new Error(`PDF Template not found for Project ID: ${projectId}`);
  }

  // 2.2. Render React Component เป็น Static HTML String
  const htmlContent = renderToStaticMarkup(
      // 💡 ส่งข้อมูลการจองทั้งหมดเข้าไปใน Template Component
      // ต้องมั่นใจว่า TemplateComponent เป็น React Component ที่ถูกต้อง
      <TemplateComponent data={bookingData} /> 
  );

  // ----------------------------------------------------
  // 3. แปลง HTML เป็น PDF Buffer
  // ----------------------------------------------------

  // 💡 หมายเหตุ: โค้ดส่วนนี้ยังคงเป็น MOCK เพื่อให้ Build ผ่าน
  // คุณต้องเปลี่ยนไปใช้ไลบรารีสร้าง PDF ที่แท้จริง (เช่น Puppeteer, html-pdf)
  
  const fullHtml = `
    <html>
      <head>
          <title>Booking Confirmation - ${bookingData.pnr_code}</title>
          <style>/* ใส่ Global CSS ที่จำเป็นสำหรับการพิมพ์ที่นี่ */</style>
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h1 style="color: #4f46e5;">Booking Document: ${bookingData.pnr_code}</h1>
              ${htmlContent}
          </div>
      </body>
    </html>
  `;
  
  // **แทนที่บรรทัดนี้ด้วยการเรียกใช้ไลบรารีสร้าง PDF ของคุณ**
  // เช่น: const pdfBuffer = await createPdfFromHtml(fullHtml);
  
  const pdfBuffer = Buffer.from(fullHtml, 'utf-8'); 

  return pdfBuffer; 
}
