import fs from 'fs/promises';
import path from 'path';

/**
 * 🔒 ป้องกัน XSS ด้วยการ escape HTML
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 🧼 ป้องกันชื่อไฟล์ไม่ปลอดภัย
 */
function sanitizeFileName(name) {
  return String(name).replace(/[^a-zA-Z0-9-_]/g, '_');
}

/**
 * 📄 สร้าง HTML สำหรับใบอนุญาตทั่วไป
 * @param {Object} license
 * @returns {Promise<string|null>} - path สำหรับ preview หรือ null ถ้าล้มเหลว
 */
export async function renderLicenseTemplate(license) {
  if (!license || typeof license !== 'object') {
    console.warn('[LicenseTemplate] ⚠️ license object ไม่ถูกต้อง:', license);
    return null;
  }

  const { id, name = '-', type = '-', issuedAt = new Date().toISOString() } = license;

  if (typeof id !== 'string' || !id.trim()) {
    console.warn('[LicenseTemplate] ⚠️ license.id ไม่ถูกต้อง:', id);
    return null;
  }

  const safeId = sanitizeFileName(id);
  const safeName = escapeHtml(name);
  const safeType = escapeHtml(type);
  const issuedDate = new Date(issuedAt);
  const formattedDate = isNaN(issuedDate.getTime())
    ? '-'
    : issuedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const html = `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบอนุญาตทั่วไป</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; line-height: 1.6; color: #333; }
          h1 { text-align: center; font-size: 1.5rem; margin-bottom: 2rem; }
          .section { margin-bottom: 1.5rem; }
          .signature { text-align: right; margin-top: 3rem; }
        </style>
      </head>
      <body>
        <h1>ใบอนุญาตทั่วไป</h1>

        <div class="section">
          <p>ชื่อ: ${safeName}</p>
          <p>ประเภท: ${safeType}</p>
          <p>รหัสใบอนุญาต: ${safeId}</p>
          <p>วันที่ออกใบอนุญาต: ${formattedDate}</p>
        </div>

        <div class="signature">
          <p>ลงชื่อ.........................................................</p>
          <p>(เจ้าหน้าที่ออกใบอนุญาต)</p>
          <p>ตำแหน่ง: เจ้าหน้าที่ทะเบียน</p>
        </div>
      </body>
    </html>
  `;

  try {
    const filePath = path.join(process.cwd(), 'public', 'preview', `${safeId}.html`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html, 'utf-8');
    return `/preview/${safeId}.html`;
  } catch (err) {
    console.error('[LicenseTemplate] ❌ สร้าง HTML preview ล้มเหลว:', err);
    return null;
  }
}

/**
 * 🧾 สร้าง PDF ด้วย PDFKit สำหรับใบอนุญาตทั่วไป
 * @param {PDFDocument} doc
 * @param {Object} license
 */
export function renderLicenseTemplatePDF(doc, license) {
  const { id = '-', name = '-', type = '-', issuedAt = new Date().toISOString() } = license;

  const issuedDate = new Date(issuedAt);
  const formattedDate = isNaN(issuedDate.getTime())
    ? '-'
    : issuedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  doc.fontSize(18).text('ใบอนุญาตทั่วไป', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`ชื่อ: ${name}`);
  doc.text(`ประเภท: ${type}`);
  doc.text(`รหัสใบอนุญาต: ${id}`);
  doc.text(`วันที่ออกใบอนุญาต: ${formattedDate}`);
  doc.moveDown();

  doc.text('ลงชื่อ.........................................................', {
    align: 'right',
  });
  doc.text('(เจ้าหน้าที่ออกใบอนุญาต)', { align: 'right' });
  doc.text('ตำแหน่ง: เจ้าหน้าที่ทะเบียน', { align: 'right' });
}
