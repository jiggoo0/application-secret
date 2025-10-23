import PDFDocument from 'pdfkit';
import fs from 'fs/promises';
import path from 'path';

import { renderSalaryCertificatePDF } from './templates/salaryCertificate';
import { renderBusinessLicensePDF } from './templates/businessLicense';
import { renderLicenseTemplatePDF } from './templates/licenseTemplate';

import { validateCertificateInput } from '@/lib/validators/validateCertificateInput';
import { validateLicenseInput } from '@/lib/validators/validateLicenseInput';

/**
 * 🧾 สร้าง PDF จาก template ที่เลือก
 * @param {string} type - ประเภทเอกสาร ('salary' | 'business' | 'license')
 * @param {Object} data - ข้อมูลที่ใช้ใน template
 * @returns {Promise<string|null>} - path สำหรับ preview หรือ null ถ้าล้มเหลว
 */
export async function renderTemplate(type, data) {
  if (!isValidInput(type, data)) {
    console.error('[PDF] ❌ Invalid type or data:', { type, data });
    return null;
  }

  const validationError = validateInputByType(type, data);
  if (validationError) {
    console.warn('[PDF] ⚠️ Validation failed:', validationError);
    return null;
  }

  const fileName = `${sanitizeFileName(data.id || 'preview')}.pdf`;
  const filePath = path.join(process.cwd(), 'public', 'preview', fileName);

  try {
    const buffer = await generatePDFBuffer(type, data);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);
    return `/preview/${fileName}`;
  } catch (err) {
    console.error('[PDF] ❌ Failed to generate or write PDF:', err);
    return null;
  }
}

/**
 * 🧠 ตรวจสอบ input
 */
function isValidInput(type, data) {
  return (
    typeof type === 'string' &&
    ['salary', 'business', 'license'].includes(type) &&
    data &&
    typeof data === 'object'
  );
}

/**
 * ✅ ตรวจสอบข้อมูลตามประเภท template
 */
function validateInputByType(type, data) {
  switch (type) {
    case 'salary':
    case 'business':
      return validateCertificateInput(data);
    case 'license':
      return validateLicenseInput(data);
    default:
      return 'ไม่รองรับประเภทเอกสารนี้';
  }
}

/**
 * 🧾 สร้าง PDF buffer จาก template
 */
function generatePDFBuffer(type, data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    try {
      switch (type) {
        case 'salary':
          renderSalaryCertificatePDF(doc, data);
          break;
        case 'business':
          renderBusinessLicensePDF(doc, data);
          break;
        case 'license':
          renderLicenseTemplatePDF(doc, data);
          break;
        default:
          console.warn('[PDF] ⚠️ Unknown template type:', type);
          renderLicenseTemplatePDF(doc, data); // fallback
      }
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 🧼 ป้องกันชื่อไฟล์ไม่ปลอดภัย
 */
function sanitizeFileName(name) {
  return String(name).replace(/[^a-zA-Z0-9-_]/g, '_');
}
