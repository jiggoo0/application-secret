// ETicketgenerate_pdf.js
// PDF generation script with full Production Workflow (API Calls, PDF Generation, Storage Upload)
// *** Final Production-Ready CommonJS Syntax with Robust API Error Handling ***

// --- 1. CommonJS Requires & Setup ---\n
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { createClient } = require('@supabase/supabase-js');
const { Buffer } = require('buffer');
// 💡 NOTE: โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env (เช่น .env.local)
require('dotenv').config();

// --- Import Data and Components (CommonJS) ---
const { pdfFonts, pdfStyles } = require('./pdf_styles');
// 💡 อัปเดต: เปลี่ยนมาใช้ Template สำหรับ Single Page
const { buildETicketContent_SinglePage } = require('./blocks/eticket_template_SINGLE_PAGE');
const { mockETicketData } = require('./ETicketmock_data');

// --- 2. CONFIGURATION (ดึงค่าจาก Environment Variables) ---
/**
 * @type {string} Base URL สำหรับ API Call (เช่น https://yourdomain.com)
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jpvisouldocs.online';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
/** @type {string} ชื่อ Bucket สำหรับจัดเก็บไฟล์ PDF */
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET_NAME || 'user-uploads';

// --- 3. Supabase and File System Setup ---
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// --- 4. Helper Functions ---

/**
 * สร้าง QR Code ในรูปแบบ Base64 Data URL
 * @param {string} url - URL ที่จะนำไปใส่ใน QR Code
 * @returns {Promise<string|null>} Base64 Data URL
 */
async function generateQRCodeBase64(url) {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 500,
    });
    return dataUrl;
  } catch (error) {
    console.error('❌ Error generating QR Code:', error);
    return null;
  }
}

/**
 * อัปโหลด PDF Buffer ไปยัง Supabase Storage
 * @param {Buffer} pdfBuffer - PDF File Content
 * @param {string} document_id - ID ของเอกสารที่ใช้ตั้งชื่อไฟล์
 * @returns {Promise<string|null>} Public URL ของไฟล์ที่อัปโหลด
 */
async function uploadPdfToStorage(pdfBuffer, document_id) {
  const fileName = `etickets/JPAIR_${document_id}.pdf`;
  console.log(`\n☁️ Uploading PDF to Supabase Storage: ${fileName}`);

  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).upload(fileName, pdfBuffer, {
    contentType: 'application/pdf',
    upsert: true,
  });

  if (error) {
    console.error('❌ Supabase Upload Error:', error);
    return null;
  }

  // ดึง Public URL
  const { data: publicUrlData } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

/**
 * ฟังก์ชันหลัก: สร้าง PDF ในรูปแบบ Buffer (หน่วยความจำ)
 * @param {object} data - ข้อมูล Mock/Input Data
 * @param {string} verificationUrl - URL จาก API สำหรับสร้าง QR Code
 * @returns {Promise<Buffer>} PDF Buffer
 */
async function createPdfBuffer(data, verificationUrl) {
  const printer = new PdfPrinter(pdfFonts);
  const qrCodeDataUrl = await generateQRCodeBase64(verificationUrl);
  if (!qrCodeDataUrl) {
    throw new Error('Failed to generate QR Code Data URL.');
  }

  // 💡 อัปเดต: เรียกใช้ฟังก์ชัน Template ใหม่สำหรับ Single Page
  const content = buildETicketContent_SinglePage(data, qrCodeDataUrl);

  // การกำหนด Font Default ตามภาษา (แก้ไขปัญหา Font)
  const defaultFont = data.language === 'TH' ? 'THSarabunNew' : 'Roboto';

  const docDefinition = {
    content: content,
    styles: pdfStyles,
    defaultStyle: { ...pdfStyles.defaultStyle, font: defaultFont },
    // 💡 ปรับ Margin เพื่อช่วยให้จบในหน้าเดียว
    pageMargins: [30, 30, 30, 30],
  };

  return new Promise((resolve) => {
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.end();
  });
}

// --- 5. Full Workflow Function ---
/**
 * รัน Workflow การสร้าง E-Ticket ทั้งหมด
 * @param {object} inputData - ข้อมูลสำหรับ E-Ticket (ภาษา EN หรือ TH)
 * @param {boolean} isThai - เป็นเอกสารภาษาไทยหรือไม่
 */
async function runETicketGenerator(inputData, isThai) {
  // Clone data เพื่อไม่ให้กระทบ input data ต้นฉบับ
  const data = JSON.parse(JSON.stringify(inputData));
  if (isThai) {
    data.language = 'TH';
    data.booking.pnr = data.booking.pnr.replace('JP789E', 'JP789TH'); // เปลี่ยน PNR สำหรับภาษาไทย
  }

  const langCode = isThai ? 'TH' : 'EN';
  const displayPNR = data.booking.pnr;

  console.log(`\n=================================================`);
  console.log(`⚡ INITIALIZING DOCUMENT (${langCode}) - PNR: ${displayPNR}`);

  // 1. CALL API POST: สร้าง Record ใหม่ในฐานข้อมูล
  const apiPostResponse = await fetch(`${API_BASE_URL}/api/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pnr: data.booking.pnr,
      data: data, // เก็บข้อมูล JSON ทั้งหมด
    }),
  });

  if (!apiPostResponse.ok) {
    const errorText = await apiPostResponse.text();
    console.error(`❌ API Error Status: ${apiPostResponse.status}`);
    console.error('❌ Failed to initialize document via API POST. Check Server Logs.');
    console.error(errorText.substring(0, 500));
    return;
  }

  const apiPostData = await apiPostResponse.json();
  const document_id = apiPostData.document_id;
  const verify_token = apiPostData.token;
  const verify_url = `${API_BASE_URL}/verify?id=${document_id}&token=${verify_token}`;

  console.log(`✅ Document Initialized. ID: ${document_id}, Token: ${verify_token}`);

  // 2. GENERATE PDF BUFFER
  console.log(`\n🔨 Generating PDF Buffer...`);
  let pdfBuffer;
  try {
    pdfBuffer = await createPdfBuffer(data, verify_url);
    console.log(`✅ PDF Buffer created successfully. Size: ${pdfBuffer.length} bytes`);
  } catch (pdfError) {
    // 💡 หากเกิดข้อผิดพลาดในการสร้าง PDF ให้แสดงข้อความที่ชัดเจน
    console.error(`❌ Failed to create PDF Buffer: ${pdfError.message}`);

    // อัปเดตสถานะใน DB เป็น 'failed' (Optional แต่แนะนำ)
    await fetch(`${API_BASE_URL}/api/documents/${document_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'failed', error_message: pdfError.message }),
    });
    return;
  }

  // 3. UPLOAD PDF TO SUPABASE STORAGE
  const publicPdfUrl = await uploadPdfToStorage(pdfBuffer, document_id);

  if (!publicPdfUrl) {
    console.error('❌ Workflow aborted: Could not obtain Public PDF URL.');
    return;
  }

  // 4. CALL API PATCH: อัปเดตสถานะและ URL ในฐานข้อมูล
  console.log(`\n➡️ Calling API PATCH to update DB status...`);
  const apiPatchResponse = await fetch(`${API_BASE_URL}/api/documents/${document_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'verified',
      pdf_url: publicPdfUrl,
    }),
  });

  if (!apiPatchResponse.ok) {
    const errorText = await apiPatchResponse.text();
    console.error(`❌ API Error Status: ${apiPatchResponse.status}`);
    console.error('❌ Failed to update document status in DB. Check Server Logs on Vercel.');
    console.error(errorText.substring(0, 500));
    return;
  }

  console.log(`✅ Full Workflow Completed for Document ID: ${document_id}`);
  console.log(`🔗 Verification URL: ${verify_url}`);
  console.log(`🔗 PDF URL: ${publicPdfUrl}`);
  console.log(`=================================================`);
}

/**
 * ฟังก์ชันเริ่มต้นการทำงานของ Generator
 */
async function startGeneration() {
  console.log('--- FULL E-TICKET GENERATION WORKFLOW STARTING ---');

  // Run English
  await runETicketGenerator(mockETicketData, false);

  // Run Thai
  await runETicketGenerator(mockETicketData, true);

  console.log(`\n--- E-TICKET GENERATION WORKFLOW FINISHED ---`);
}

// Execution Start
startGeneration();
