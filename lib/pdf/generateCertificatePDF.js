import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

import { renderSalaryCertificate } from './templates/salaryCertificate';
import { renderBusinessLicense } from './templates/businessLicense';

const FONT_DIR = path.join(process.cwd(), 'public/assets/fonts');
const FONT_REGULAR = path.join(FONT_DIR, 'THSarabunNew.ttf');
const FONT_BOLD = path.join(FONT_DIR, 'THSarabunNew-Bold.ttf');

const templates = {
  salaryCertificate: renderSalaryCertificate,
  businessLicense: renderBusinessLicense,
};

/**
 * สร้าง PDF ใบรับรองตามประเภทที่ระบุ
 * @param {Object} data - ข้อมูลใบรับรอง
 * @returns {Promise<Buffer>} - PDF buffer
 */
export function generateCertificatePDF(data) {
  return new Promise((resolve, reject) => {
    try {
      const { type = 'salaryCertificate' } = data;
      const renderTemplate = templates[type];

      if (!renderTemplate) {
        throw new Error(`ไม่รองรับประเภทเอกสาร "${type}"`);
      }

      if (!fs.existsSync(FONT_REGULAR) || !fs.existsSync(FONT_BOLD)) {
        throw new Error(`ไม่พบไฟล์ฟอนต์ที่ ${FONT_REGULAR} หรือ ${FONT_BOLD}`);
      }

      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 72, bottom: 72, left: 50, right: 50 },
      });

      // ✅ Register ฟอนต์ไทย
      doc.registerFont('THSarabunNew', FONT_REGULAR);
      doc.registerFont('THSarabunNew-Bold', FONT_BOLD);
      doc.font('THSarabunNew'); // ป้องกัน fallback ไป Helvetica

      const buffers = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // ✅ สร้างเนื้อหา PDF ตามประเภท
      renderTemplate(doc, data);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
