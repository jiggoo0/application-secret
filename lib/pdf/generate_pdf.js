// /lib/pdf/generate_pdf.js

// 💡 FIX 1: เปลี่ยนไปใช้ puppeteer-core
import puppeteer from 'puppeteer-core';
// 💡 FIX 2: Import Chromium Binary สำหรับ Serverless
import chromium from '@sparticuz/chromium';
import { Buffer } from 'buffer';

// 💡 Import Template Functions & Utilities
import { generateVerifiedHtml } from '@/lib/html_templates/template_logic/generateVerifiedHtml';
import { formatThaiDate } from '@/lib/utils/formatters';

// ----------------------------------------------------
// 1. Utility: QR Code Generation (Mock)
// ----------------------------------------------------
function generateQrCodeBase64(url, size = 120) {
  const mockBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  return mockBase64;
}

// ----------------------------------------------------
// 2. CORE CONVERSION FUNCTION (USING PUPPETEER-CORE + SPARTICUZ/CHROMIUM)
// ----------------------------------------------------

/**
 * @description ฟังก์ชันหลักในการแปลง HTML String เป็น PDF Buffer โดยใช้ Puppeteer
 * @param {string} htmlContent - โค้ด HTML ที่จะแปลง
 * @returns {Promise<Buffer>} - PDF Document Buffer
 */
async function convertHtmlToPdfBuffer(htmlContent) {
  let browser;
  try {
    // 💡 FIX: ตั้งค่า launch options ให้ใช้ chromium binary ที่มากับ @sparticuz/chromium
    const launchOptions = {
      // ใช้ args ที่แนะนำสำหรับ Serverless
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      // 🎯 กำหนด executablePath ให้ชี้ไปที่ Chromium Binary ของ Serverless
      executablePath: await chromium.executablePath(),
      // 🎯 ใช้ Headless mode ที่กำหนดโดย @sparticuz/chromium
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    };

    // 1. Launch a Chromium browser instance
    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // 2. Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });

    // 3. Generate PDF Buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });

    return pdfBuffer;
  } catch (err) {
    console.error('Puppeteer PDF Generation Error:', err);
    // 💡 โยน Error พร้อมข้อความที่อ่านง่ายขึ้น
    throw new Error(`PDF Generation (Chromium) failed: ${err.message}`);
  } finally {
    // 4. Close the browser instance
    if (browser) {
      await browser.close();
    }
  }
}

// ----------------------------------------------------
// 3. Main Function: PDF Generation
// ----------------------------------------------------

/**
 * @description แปลง BookingSchema เป็น HTML String และแปลงเป็น Buffer ของไฟล์ PDF
 */
export async function generatePdfDocument(bookingData) {
  const pnr = bookingData.pnr_code || 'UNKNOWN';
  const type = (bookingData.project_id || '404').toUpperCase();

  // 1. Prepare Data & Generate HTML
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/verify/${pnr}`;
  const qrBase64 = generateQrCodeBase64(verificationUrl);
  const serverTimestamp = new Date();

  const dataForTemplate = {
    ...bookingData,
    QR_BASE64_IMAGE: qrBase64,
    DISPLAY_SERVER_TIMESTAMP: formatThaiDate(serverTimestamp),
    voucher_no: pnr,
  };

  // 💡 Note: แก้ไข console.log สำหรับ Project ID ที่ไม่รองรับ
  if (type === 'FLIGHT' && type !== 'FLIGHT') {
    console.warn(
      `Unsupported type for PDF generation: ${type}. Falling back to default template logic.`,
    );
  }

  // 💡 Assumption: generateVerifiedHtml returns a full HTML string
  const htmlContent = generateVerifiedHtml(type, dataForTemplate);

  // 2. Generate PDF Buffer (REAL LOGIC)
  console.log(`[PDF] Generating PDF Buffer for PNR: ${pnr} (Type: ${type})...`);

  try {
    const pdfBuffer = await convertHtmlToPdfBuffer(htmlContent);
    return pdfBuffer;
  } catch (error) {
    console.error('PDF Generation Failed:', error);
    throw new Error(`Failed to generate PDF document: ${error.message}`);
  }
}
