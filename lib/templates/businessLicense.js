/**
 * 🔐 Escape HTML เพื่อป้องกัน XSS
 */
function escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 📄 สร้าง HTML สำหรับใบรับรองการจดทะเบียนพาณิชย์
 * @param {Object} data
 * @returns {string} HTML string
 */
export function renderBusinessLicenseHTML(data) {
  const {
    businessName = '-',
    registrationNumber = '-',
    businessAddress = '-',
    issuedBy = 'สำนักงานพาณิชย์',
    issuedAt = new Date().toISOString(),
    notes = '',
  } = data;

  const issuedDate = new Date(issuedAt);
  const formattedDate = isNaN(issuedDate.getTime())
    ? '-'
    : issuedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return `
    <!DOCTYPE html>
    <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <title>ใบรับรองการจดทะเบียนพาณิชย์</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; line-height: 1.6; color: #333; }
          h1 { text-align: center; font-size: 1.5rem; margin-bottom: 2rem; }
          .section { margin-bottom: 1.5rem; }
          .signature { text-align: right; margin-top: 3rem; }
        </style>
      </head>
      <body>
        <h1>ใบรับรองการจดทะเบียนพาณิชย์</h1>

        <div class="section">
          <p>ชื่อกิจการ: ${escapeHTML(businessName)}</p>
          <p>เลขทะเบียนพาณิชย์: ${escapeHTML(registrationNumber)}</p>
          <p>ที่ตั้งสถานประกอบการ: ${escapeHTML(businessAddress)}</p>
          <p>ข้อมูลข้างต้นเป็นความจริงตามที่ปรากฏในระบบทะเบียนพาณิชย์ของกรมพัฒนาธุรกิจการค้า</p>
        </div>

        <div class="section">
          <p>ออกโดย: ${escapeHTML(issuedBy)}</p>
          <p>วันที่ออกใบรับรอง: ${formattedDate}</p>
        </div>

        <div class="signature">
          <p>ลงชื่อ.........................................................</p>
          <p>(${escapeHTML(issuedBy)})</p>
          <p>ตำแหน่ง: เจ้าหน้าที่ทะเบียนพาณิชย์</p>
        </div>

        ${
          notes?.trim()
            ? `<div class="section"><strong>หมายเหตุ:</strong><p>${escapeHTML(notes)}</p></div>`
            : ''
        }
      </body>
    </html>
  `;
}

/**
 * 🧾 สร้าง PDF ด้วย PDFKit สำหรับใบรับรองการจดทะเบียนพาณิชย์
 * @param {PDFDocument} doc
 * @param {Object} data
 */
export function renderBusinessLicensePDF(doc, data) {
  const {
    businessName = '-',
    registrationNumber = '-',
    businessAddress = '-',
    issuedBy = 'สำนักงานพาณิชย์',
    issuedAt = new Date().toISOString(),
    notes = '',
  } = data;

  const issuedDate = new Date(issuedAt);
  const formattedDate = isNaN(issuedDate.getTime())
    ? '-'
    : issuedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  doc.fontSize(18).text('ใบรับรองการจดทะเบียนพาณิชย์', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`ชื่อกิจการ: ${businessName}`);
  doc.text(`เลขทะเบียนพาณิชย์: ${registrationNumber}`);
  doc.text(`ที่ตั้งสถานประกอบการ: ${businessAddress}`);
  doc.text('ข้อมูลข้างต้นเป็นความจริงตามที่ปรากฏในระบบทะเบียนพาณิชย์ของกรมพัฒนาธุรกิจการค้า');
  doc.moveDown();

  doc.text(`ออกโดย: ${issuedBy}`);
  doc.text(`วันที่ออกใบรับรอง: ${formattedDate}`);
  doc.moveDown();

  doc.text('ลงชื่อ.........................................................', {
    align: 'right',
  });
  doc.text(`(${issuedBy})`, { align: 'right' });
  doc.text('ตำแหน่ง: เจ้าหน้าที่ทะเบียนพาณิชย์', { align: 'right' });

  if (notes?.trim()) {
    doc.moveDown();
    doc.font('Helvetica-Bold').text('หมายเหตุ:');
    doc.font('Helvetica').text(notes);
  }
}
