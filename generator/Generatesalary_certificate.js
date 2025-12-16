// Generatesalary_certificate.js (หรือ /generator/index_salary.js)
// Full Production Workflow Script for Salary Certificate Generation (Node.js Standalone)

// --- 1. CommonJS Requires & Setup ---
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { Buffer } = require('buffer');
// 💡 โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
require('dotenv').config();

// --- Import Data and Components ---
// ต้องมั่นใจว่าไฟล์เหล่านี้อยู่ใน /generator/ และ /generator/blocks/
const { pdfFonts, pdfStyles } = require('./pdf_styles');
const { buildSalaryCertificateContent } = require('./blocks/salary_certificate_template');
const { mockSalaryCertificateData } = require('./blocks/SalaryMock_data');

// --- 2. CONFIGURATION ---
/** @type {string} Base URL สำหรับ API Call (Fallback เป็น Production URL) */
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.jpvisouldocs.online';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
/** @type {string} ชื่อ Bucket สำหรับจัดเก็บไฟล์ PDF */
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET_NAME || 'user-uploads';

// --- 3. Supabase Setup ---
// 💡 ใช้ Service Role Key เพื่อบายพาส RLS สำหรับการอัปโหลด Storage
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// --- 4. Helper Functions ---

/**
 * อัปโหลด PDF Buffer ไปยัง Supabase Storage
 * @param {Buffer} pdfBuffer - PDF File Content
 * @param {string} document_id - ID ของเอกสารที่ใช้ตั้งชื่อไฟล์
 * @param {string} language - รหัสภาษา (TH/EN)
 * @returns {Promise<string|null>} Public URL ของไฟล์ที่อัปโหลด
 */
async function uploadPdfToStorage(pdfBuffer, document_id, language) {
  const fileName = `salary_certificates/JPVISOUL_${language}_${document_id}.pdf`;
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
 * @param {object} data - ข้อมูล Input Data (พนักงาน, เงินเดือน, บริษัท)
 * @returns {Promise<Buffer>} PDF Buffer
 */
async function createPdfBuffer(data) {
  const printer = new PdfPrinter(pdfFonts);

  // 💡 เรียกใช้ Template สำหรับ Salary Certificate
  const content = buildSalaryCertificateContent(data);

  const defaultFont = data.language === 'TH' ? 'THSarabunNew' : 'Roboto';

  const docDefinition = {
    content: content,
    styles: pdfStyles,
    defaultStyle: { ...pdfStyles.defaultStyle, font: defaultFont },
    // A4 Default Margins (Top, Bottom, Left, Right) - ปรับตามมาตรฐานเอกสารทางการ
    pageMargins: [60, 40, 60, 40],
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
 * รัน Workflow การสร้าง Salary Certificate ทั้งหมด
 * @param {object} inputData - ข้อมูลสำหรับใบรับรองเงินเดือน
 * @param {boolean} isThai - เป็นเอกสารภาษาไทยหรือไม่
 */
async function runSalaryGenerator(inputData, isThai) {
  // 💡 ใช้ JSON.parse/stringify เพื่อ Clone data ป้องกัน Mutation
  const data = JSON.parse(JSON.stringify(inputData));

  // ปรับภาษาและ ID ชั่วคราวเพื่อแยกแยะระหว่าง TH/EN ใน DB/Storage
  const langCode = isThai ? 'TH' : 'EN';
  data.language = langCode;

  // สร้าง Ref ID ชั่วคราวจากชื่อและวันที่
  const ref_id = `SALARY_${langCode}_${data.employee.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;

  console.log(`\n=================================================`);
  console.log(`⚡ INITIALIZING SALARY CERTIFICATE (${langCode}) - Employee: ${data.employee.name}`);

  // 1. CALL API POST: สร้าง Record ใหม่ในฐานข้อมูล
  let apiPostResponse;
  try {
    apiPostResponse = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref_id: ref_id,
        type: 'JPVISOUL_SALARY_CERT',
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
    console.error('❌ Failed to initialize document via API POST. Check Server Logs.');
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

  const { document_id, verify_url } = apiPostData;

  if (!document_id || !verify_url) {
    console.error('❌ FATAL: API response is missing critical keys (document_id or verify_url).');
    return;
  }

  console.log(`✅ Document Initialized. ID: ${document_id}`);

  // 2. GENERATE PDF BUFFER
  console.log(`\n🔨 Generating PDF Buffer...`);
  let pdfBuffer;
  try {
    pdfBuffer = await createPdfBuffer(data);
    console.log(`✅ PDF Buffer created successfully. Size: ${pdfBuffer.length} bytes`);
  } catch (pdfError) {
    console.error(`❌ Failed to create PDF Buffer: ${pdfError.message}`);

    // 💡 Rollback: อัปเดตสถานะใน DB เป็น 'failed' เมื่อสร้าง PDF ไม่สำเร็จ
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
  const publicPdfUrl = await uploadPdfToStorage(pdfBuffer, document_id, langCode);

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

  console.log('--- FULL SALARY CERTIFICATE GENERATION WORKFLOW STARTING ---');

  // 💡 Clone Mock data เพื่อให้สามารถแก้ไขภาษาได้โดยไม่กระทบต้นฉบับ
  const enData = JSON.parse(JSON.stringify(mockSalaryCertificateData));
  enData.language = 'EN';
  enData.employee.title = 'Ms.';
  enData.employee.name = 'Kritsana Charoensuk';
  enData.employee.startDate = '10 March 2019';
  enData.issueDate = '16 December 2025';
  enData.purpose = 'Applying for a real estate loan with Kasikorn Bank.';
  enData.salary.baseInWords = 'Seventy-Five Thousand Baht Only';
  enData.salary.totalInWords = 'Eighty Thousand Baht Only';

  // Run Thai
  await runSalaryGenerator(mockSalaryCertificateData, true);

  // Run English
  await runSalaryGenerator(enData, false);

  console.log(`\n--- SALARY CERTIFICATE GENERATION WORKFLOW FINISHED ---`);
}

// Execution Start
startGeneration();
