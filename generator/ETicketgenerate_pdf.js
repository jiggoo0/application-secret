// ETicketgenerate_pdf.js (หรือ /generator/index.js)
// Full Production Workflow Script for E-Ticket Generation (Node.js Standalone)

// --- 1. CommonJS Requires & Setup ---
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const QRCode = require('qrcode');
const { createClient } = require('@supabase/supabase-js');
const { Buffer } = require('buffer');
// 💡 โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env (ที่อยู่ใน Root Directory)
require('dotenv').config();

// --- Import Data and Components ---
// ไฟล์เหล่านี้ควรอยู่ในโฟลเดอร์ /generator/
const { pdfFonts, pdfStyles } = require('./pdf_styles');
// ไฟล์เหล่านี้ควรอยู่ในโฟลเดอร์ /generator/blocks/
const { buildETicketContent_SinglePage } = require('./blocks/eticket_template_SINGLE_PAGE');
const { mockETicketData } = require('./blocks/ETicketmock_data');

// --- 2. CONFIGURATION ---
/** @type {string} Base URL สำหรับ API Call (Fallback เป็น Production URL) */
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jpvisouldocs.online';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
/** @type {string} ชื่อ Bucket สำหรับจัดเก็บไฟล์ PDF */
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET_NAME || 'user-uploads';

// --- 3. Supabase and File System Setup ---
// 💡 ใช้ Service Role Key เพื่อบายพาส RLS สำหรับการอัปโหลด Storage
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// --- 4. Helper Functions ---

/**
 * สร้าง QR Code ในรูปแบบ Base64 Data URL
 * @param {string} url - URL ที่จะนำไปใส่ใน QR Code (verify_url)
 * @returns {Promise<string|null>} Base64 Data URL
 */
async function generateQRCodeBase64(url) {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 1,
      scale: 4,
    });
    return dataUrl;
  } catch (error) {
    console.error('❌ Error generating QR Code:', error.message);
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

  const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(fileName, pdfBuffer, {
    contentType: 'application/pdf',
    upsert: true,
  });

  if (error) {
    console.error('❌ Supabase Upload Error:', error.message);
    return null;
  }

  // ดึง Public URL
  const { data: publicUrlData } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);

  if (!publicUrlData.publicUrl) {
    console.error('❌ Could not retrieve public URL after upload. Check RLS policy.');
    return null;
  }

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
    console.warn(
      '⚠️ Failed to generate QR Code Data URL. PDF will contain non-functional QR Code.',
    );
  }

  // 💡 เรียกใช้ Template สำหรับ Single Page
  const content = buildETicketContent_SinglePage(data, qrCodeDataUrl);

  const defaultFont = data.language === 'TH' ? 'THSarabunNew' : 'Roboto';

  const docDefinition = {
    content: content,
    styles: pdfStyles,
    defaultStyle: { ...pdfStyles.defaultStyle, font: defaultFont },
    // 💡 การปรับ Margin ให้เหมาะสมกับ Template Single Page
    pageMargins: [20, 30, 20, 30],
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
 * @param {object} inputData - ข้อมูลสำหรับ E-Ticket
 * @param {boolean} isThai - เป็นเอกสารภาษาไทยหรือไม่
 */
async function runETicketGenerator(inputData, isThai) {
  // 💡 ใช้ JSON.parse/stringify เพื่อ Clone data ป้องกัน Mutation
  const data = JSON.parse(JSON.stringify(inputData));
  if (isThai) {
    data.language = 'TH';
    // 💡 เปลี่ยน PNR สำหรับภาษาไทยเพื่อไม่ให้ซ้ำกับภาษาอังกฤษใน DB
    data.booking.pnr = data.booking.pnr.replace('JP456G', 'JP456H');
  }

  const langCode = isThai ? 'TH' : 'EN';
  const displayPNR = data.booking.pnr;

  console.log(`\n=================================================`);
  console.log(`⚡ INITIALIZING DOCUMENT (${langCode}) - PNR: ${displayPNR} - API: ${API_BASE_URL}`);

  // 1. CALL API POST: สร้าง Record ใหม่ในฐานข้อมูล
  let apiPostResponse;
  try {
    apiPostResponse = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref_id: data.booking.pnr,
        type: 'JPAIR_ETICKET',
        data: data,
      }),
    });
  } catch (networkError) {
    console.error('❌ Network Error: Could not connect to API server.');
    console.error(`Please ensure the server at ${API_BASE_URL} is running and accessible.`);
    return;
  }

  if (!apiPostResponse.ok) {
    const errorText = await apiPostResponse.text();
    console.error(`❌ API Error Status: ${apiPostResponse.status}`);
    console.error('❌ Failed to initialize document via API POST. Check Vercel Logs.');
    console.error(errorText.substring(0, 500));
    return;
  }

  let apiPostData;
  try {
    apiPostData = await apiPostResponse.json();
  } catch (e) {
    console.error('❌ FAILED TO PARSE API JSON RESPONSE. Server might be misconfigured.');
    return;
  }

  const { document_id, qr_token, verify_url } = apiPostData;

  if (!document_id || !qr_token || !verify_url) {
    console.error(
      '❌ FATAL: API response is missing critical keys (document_id, qr_token, or verify_url).',
    );
    return;
  }

  console.log(`✅ Document Initialized. ID: ${document_id}, Token: ${qr_token}`);

  // 2. GENERATE PDF BUFFER
  console.log(`\n🔨 Generating PDF Buffer...`);
  let pdfBuffer;
  try {
    pdfBuffer = await createPdfBuffer(data, verify_url);
    console.log(`✅ PDF Buffer created successfully. Size: ${pdfBuffer.length} bytes`);
  } catch (pdfError) {
    console.error(`❌ Failed to create PDF Buffer: ${pdfError.message}`);

    // 💡 Rollback: อัปเดตสถานะใน DB เป็น 'canceled' เมื่อสร้าง PDF ไม่สำเร็จ
    await fetch(`${API_BASE_URL}/api/documents/${document_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'canceled',
        error_message: `PDF Generation Failed: ${pdfError.message}`,
      }),
    });
    return;
  }

  // 3. UPLOAD PDF TO SUPABASE STORAGE
  const publicPdfUrl = await uploadPdfToStorage(pdfBuffer, document_id);

  if (!publicPdfUrl) {
    console.error('❌ Workflow aborted: Could not obtain Public PDF URL. Document remains in DB.');
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
    console.error('❌ Failed to update document status in DB (Step 4). Manual review required.');
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
  // 💡 ตรวจสอบ ENV Config ก่อนเริ่ม
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY || !API_BASE_URL) {
    console.error(
      'FATAL: Missing critical environment variables (SUPABASE_URL, SUPABASE_SECRET_KEY, or API_BASE_URL).',
    );
    return;
  }

  console.log('--- FULL E-TICKET GENERATION WORKFLOW STARTING ---');

  // Run English
  await runETicketGenerator(mockETicketData, false);

  // Run Thai
  await runETicketGenerator(mockETicketData, true);

  console.log(`\n--- E-TICKET GENERATION WORKFLOW FINISHED ---`);
}

// Execution Start
startGeneration();
