// lib/pdf/generate_pdf.js
'use server';

// 💡 Import the actual PDF generation library (ต้องติดตั้ง npm install html-pdf-node และ puppeteer)
import htmlPdfNode from 'html-pdf-node';

// 💡 Import Schema: ถูกใช้ใน JSDoc/อ้างอิงเท่านั้นในไฟล์ .js นี้ (เนื่องจากเราลบ Type Annotation ออกไปแล้ว)
import { BookingSchema } from '@/types/booking-types';

// 💡 Import Utilities and Layout
import { generateBaseLayout } from '../html_templates/PdfBaseLayout';
import { getTemplateComponent } from '@/lib/html_templates/template_logic/getTemplateComponent';

// 💡 นำเข้า Templates ทั้งหมดโดยใช้ 'import * as'
import * as FlightTemplate from '@/lib/html_templates/templates/FlightTemplate';
import * as HotelTemplate from '@/lib/html_templates/templates/HotelTemplate';
import * as TourTemplate from '@/lib/html_templates/templates/TourTemplate';
import * as NotFoundTemplate from '@/lib/html_templates/generateNotFoundHtml';

// ----------------------------------------------------
// 1. UTILITIES: Resolve Component Default/Named Export
// ----------------------------------------------------

/**
 * @description ดึง Component/Function ที่แท้จริงออกมาจาก Module ที่ถูก Transpile (แก้ปัญหา g.default)
 * @param {any} ComponentModule - Module ที่ Import เข้ามา
 * @returns {function} Component หรือ Function ที่แท้จริง
 */
const resolveComponent = (ComponentModule) => {
  if (
    ComponentModule &&
    typeof ComponentModule === 'object' &&
    'default' in ComponentModule &&
    ComponentModule.default
  ) {
    return ComponentModule.default;
  }
  return ComponentModule;
};

// ----------------------------------------------------
// 2. CORE PDF GENERATION ACTION
// ----------------------------------------------------

/**
 * @title generatePdfDocument
 * @description ฟังก์ชันหลักในการรับ BookingSchema และสร้างเอกสาร PDF (ส่งกลับเป็น Buffer)
 * @param {BookingSchema} bookingData ข้อมูลการจองที่ส่งมาจาก Server Action
 * @returns {Promise<Buffer>} Buffer ของไฟล์ PDF
 */
// 💡 FINAL FIX: ลบ Type Annotations ออกทั้งหมดเพื่อให้เป็น Pure JavaScript
export async function generatePdfDocument(bookingData) {
  if (!bookingData.pnr_code || !bookingData.project_id) {
    throw new Error('Booking data is incomplete for PDF generation (PNR or Project ID missing).');
  }

  const projectId = bookingData.project_id;

  // ----------------------------------------------------
  // 2.1. Server Dependency Check
  // ----------------------------------------------------

  try {
    require('react-dom/server');
  } catch (e) {
    console.error('[PDF] Failed to load react-dom/server dependency:', e);
    throw new Error(
      'Failed to load PDF rendering dependencies. This action must run on the server.',
    );
  }

  // ----------------------------------------------------
  // 2.2. Select Template Component & Render HTML
  // ----------------------------------------------------

  const templates = {
    FlightTemplate: resolveComponent(FlightTemplate),
    HotelTemplate: resolveComponent(HotelTemplate),
    TourTemplate: resolveComponent(TourTemplate),
    NotFoundTemplate: resolveComponent(NotFoundTemplate),
  };

  let TemplateFunction = getTemplateComponent(projectId, templates);

  // เตรียม data สำหรับ 404 template หากไม่พบ
  if (TemplateFunction === templates.NotFoundTemplate) {
    const notFoundErrorData = {
      title: 'UNSUPPORTED BOOKING TYPE',
      message: `ไม่สามารถแสดงผล Template สำหรับ Project ID: ${projectId} ได้`,
      error_code: 'TPL-404',
      reference_id: bookingData.pnr_code,
    };
    bookingData.notFoundData = notFoundErrorData;
  }

  if (typeof TemplateFunction !== 'function') {
    throw new Error(`[PDF] Template for ${projectId} is not a valid function or component.`);
  }

  // Render Content
  const contentHtml = TemplateFunction(bookingData);

  // Wrap Content with Base Layout
  const fullHtml = generateBaseLayout(contentHtml, bookingData);

  // ----------------------------------------------------
  // 2.3. Generate PDF Buffer (ACTUAL IMPLEMENTATION)
  // ----------------------------------------------------

  // 1. กำหนด HTML content
  const file = { content: fullHtml };

  // 2. กำหนด Options สำหรับ PDF
  const options = {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm',
    },
    // 💡 หาก Deploy บนสภาพแวดล้อมที่ไม่มี Chromium (เช่น Vercel) อาจต้องใช้ puppeteer-core
    // และตั้งค่า executablePath ให้ชี้ไปที่ Binary ของ Chromium
  };

  try {
    console.log('✅ Starting HTML to PDF conversion using html-pdf-node...');

    // 3. Generate the PDF Buffer
    const pdfBuffer = await htmlPdfNode.generatePdf(file, options);

    console.log('✅ PDF Buffer successfully generated.');

    return pdfBuffer;
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    throw new Error('PDF Generation failed. Check server logs for Puppeteer/html-pdf-node errors.');
  }
}
