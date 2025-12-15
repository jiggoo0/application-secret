// ETicketgenerate_pdf.js
// PDF generation script with full Production Workflow (API Calls, PDF Generation, Storage Upload)
// *** Final CommonJS Syntax with Robust API Error Handling ***

// --- 1. CommonJS Requires ---
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { createClient } = require('@supabase/supabase-js');
const { Buffer } = require('buffer');
// 💡 NOTE: dotenv.config() จะโหลดตัวแปรจากไฟล์ .env โดยอัตโนมัติ
require('dotenv').config();

// --- Import Data and Components (CommonJS) ---
const { pdfFonts, pdfStyles } = require('./pdf_styles');
const { buildETicketContent } = require('./blocks/eticket_template');
const { mockETicketData } = require('./ETicketmock_data');

// 💡 CONFIGURATION (ดึงค่าจาก Environment Variables)
// ใช้ http://localhost:3000 เป็น Default เมื่อรัน Local
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// *** FIX: ใช้ชื่อ Bucket ที่ถูกต้องของคุณ (user-uploads) เป็นค่าเริ่มต้น ***
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET_NAME || 'user-uploads';

// 💡 Initialize Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

/**
 * 💡 ฟังก์ชันสร้าง QR Code Base64 Data URL
 * @param {string} url - URL ที่ต้องการให้ QR Code สแกนไป
 * @returns {Promise<string>} Base64 Data URL string
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
  } catch (err) {
    console.error('Error generating QR Code:', err);
    return null;
  }
}

/**
 * 💡 ฟังก์ชันหลัก: สร้าง PDF ในรูปแบบ Buffer (หน่วยความจำ)
 * @param {object} data - Mock data
 * @param {string} verificationUrl - URL จาก API
 * @returns {Promise<Buffer>} PDF Buffer
 */
async function createPdfBuffer(data, verificationUrl) {
  // 💡 ต้องมั่นใจว่า pdfFonts ถูกโหลดอย่างถูกต้อง
  const printer = new PdfPrinter(pdfFonts);

  // 1. สร้าง QR Code Data URL
  const qrCodeDataUrl = await generateQRCodeBase64(verificationUrl);

  // 2. Build Document Definition
  const content = buildETicketContent(data, qrCodeDataUrl);

  // *** FIX: การกำหนดชื่อ Font เพื่อแก้ไขปัญหา ENOENT ***
  const defaultFont = data.language === 'TH' ? 'THSarabunNew' : 'Roboto';

  const docDefinition = {
    content: content,
    styles: pdfStyles,
    defaultStyle: { ...pdfStyles.defaultStyle, font: defaultFont },
    pageMargins: [40, 40, 40, 40],
  };

  // 3. สร้าง PDF Kit Document
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise((resolve) => {
    const chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.end();
  });
}

/**
 * 💡 ฟังก์ชันอัปโหลด PDF ไปยัง Supabase Storage
 * @param {Buffer} pdfBuffer - ไฟล์ PDF ในรูปแบบ Buffer
 * @param {string} documentId - ID ของเอกสาร (ใช้เป็นชื่อไฟล์)
 * @returns {Promise<string|null>} Public URL ของไฟล์ หรือ null ถ้า Error
 */
async function uploadPdfToStorage(pdfBuffer, documentId) {
  const filePath = `etickets/${documentId}.pdf`;

  // 1. อัปโหลดไฟล์ (Overwrite: true)
  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    console.error('❌ Supabase Storage Upload Error:', uploadError.message);
    return null;
  }

  // 2. ดึง Public URL ของไฟล์ที่เพิ่งอัปโหลด
  const { data: publicUrlData } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(filePath);

  // ตรวจสอบ Policy (ถ้า Policy SELECT ถูกบล็อก จะไม่สามารถดึง URL ได้)
  if (!publicUrlData || !publicUrlData.publicUrl) {
    console.error(
      '❌ Failed to get Public URL after upload. Check Supabase RLS/Policy (Policy SELECT).',
    );
    return null;
  }

  return publicUrlData.publicUrl;
}

// --- Main Execution Block (Production Workflow) ---
async function runETicketGenerator(inputData, isThai) {
  // ตรวจสอบ Config
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error('⚠️ ERROR: Supabase configuration is missing or invalid.');
    return;
  }

  const data = isThai
    ? {
        ...inputData,
        language: 'TH',
        agency: { ...inputData.agency, name: 'ตัวแทนท่องเที่ยวฟลายไฮ' },
        passenger: { ...inputData.passenger, name: 'นาย จโยติ รัญจัน ราย' },
      }
    : inputData;

  // 1. CALL API POST: สร้าง Token และ ID
  console.log(`\n=================================================`);
  console.log(`⚡ INITIALIZING DOCUMENT (${data.language})`);

  const apiPostResponse = await fetch(`${API_BASE_URL}/api/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'ETicket',
      ref_id: data.booking.pnr,
    }),
  });

  if (!apiPostResponse.ok) {
    const errorText = await apiPostResponse.text();
    console.error(`❌ API Error Status: ${apiPostResponse.status}`);
    console.error('❌ Failed to initialize document in DB. Raw Response Text (first 500 chars):');
    console.error(errorText.substring(0, 500));
    return;
  }

  // *** ตรวจสอบ JSON Parse Error ***
  let responseBody;
  try {
    responseBody = await apiPostResponse.json();
  } catch (e) {
    const errorText = await apiPostResponse.text();
    console.error('❌ FAILED TO PARSE JSON RESPONSE (Unexpected end of JSON input).');
    console.error(
      `Status: ${apiPostResponse.status}. Server might have sent an empty or HTML response.`,
    );
    console.error('Raw Response Text (first 500 chars):', errorText.substring(0, 500));
    return;
  }
  // ------------------------------------

  const { qr_token, verify_url, document_id } = responseBody;
  console.log(`✅ Document Initialized. ID: ${document_id}, Token: ${qr_token}`);

  // 2. GENERATE PDF: สร้างไฟล์ PDF ในหน่วยความจำ (Buffer)
  console.log(`\n🔨 Generating PDF Buffer...`);
  const pdfBuffer = await createPdfBuffer(data, verify_url);

  // 💡 บันทึกไฟล์ลง Local เพื่อตรวจสอบ (Optional)
  const localFileName = `ETicket_Local_${data.language}_${document_id}.pdf`;
  fs.writeFileSync(localFileName, pdfBuffer);
  console.log(`💾 Saved to Local: ${localFileName}`);

  // 3. UPLOAD TO STORAGE: อัปโหลด Buffer ไปยัง Supabase Storage
  console.log(`\n☁️ Uploading to Supabase Storage...`);
  const publicPdfUrl = await uploadPdfToStorage(pdfBuffer, document_id);

  if (!publicPdfUrl) {
    console.error('❌ Failed to get Public URL after upload. Check Supabase RLS/Policy.');
    return;
  }
  console.log(`✅ Upload Complete. URL: ${publicPdfUrl}`);

  // 4. CALL API PATCH: อัปเดตสถานะและ URL ในฐานข้อมูล
  console.log(`\n➡️ Calling API PATCH to update DB status...`);
  const apiPatchResponse = await fetch(`${API_BASE_URL}/api/documents/${document_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // *** FIX: เปลี่ยน 'completed' เป็น 'verified' เพื่อให้สอดคล้องกับ Check Constraint ***
      status: 'verified',
      pdf_url: publicPdfUrl,
    }),
  });

  if (!apiPatchResponse.ok) {
    const errorText = await apiPatchResponse.text();
    console.error(`❌ API Error Status: ${apiPatchResponse.status}`);
    console.error(
      '❌ Failed to update document status in DB. Raw Response Text (first 500 chars):',
    );
    console.error(errorText.substring(0, 500));
    return;
  }

  // *** MODIFICATION: เพิ่ม Log PDF URL ในข้อความสุดท้าย ***
  console.log(`✅ Full Workflow Completed for Document ID: ${document_id}`);
  console.log(`🔗 PDF URL: ${publicPdfUrl}`);
  console.log(`=================================================`);
}

async function startGeneration() {
  console.log('--- FULL E-TICKET GENERATION WORKFLOW STARTING ---');

  // Run English
  await runETicketGenerator(mockETicketData, false);

  // Run Thai
  await runETicketGenerator(mockETicketData, true);

  console.log('\n--- FULL E-TICKET GENERATION WORKFLOW FINISHED ---');
}

startGeneration();
