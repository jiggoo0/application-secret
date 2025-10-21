/**
 * 🔒 ป้องกัน XSS ด้วยการ escape HTML
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
 * 📄 สร้าง HTML สำหรับหนังสือรับรองเงินเดือน
 * @param {Object} data
 * @returns {string} HTML string
 */
export function renderSalaryCertificateHTML(data) {
  const {
    employeeName = '-',
    employeePosition = '-',
    employeeID = '-',
    companyName = 'บริษัท JP Visual & Docs จำกัด',
    companyAddress = '123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110',
    salaryAmount = '-',
    salaryPeriod = '-',
    issuedAt = new Date().toISOString(),
    issuedBy = 'ฝ่ายทรัพยากรบุคคล',
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
        <title>หนังสือรับรองเงินเดือน</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; line-height: 1.6; color: #333; }
          h1 { text-align: center; font-size: 1.5rem; margin-bottom: 2rem; }
          .section { margin-bottom: 1.5rem; }
          .center { text-align: center; }
          .right { text-align: right; margin-top: 3rem; }
        </style>
      </head>
      <body>
        <h1>หนังสือรับรองเงินเดือน</h1>

        <div class="section center">
          <p>${escapeHTML(companyName)}</p>
          <p>${escapeHTML(companyAddress)}</p>
        </div>

        <div class="section">
          <p>หนังสือฉบับนี้ออกให้เพื่อรับรองว่า</p>
          <p>${escapeHTML(employeeName)} ตำแหน่ง ${escapeHTML(employeePosition)} รหัสพนักงาน ${escapeHTML(employeeID)}</p>
          <p>ได้รับเงินเดือนจำนวน ${escapeHTML(salaryAmount)} บาท (${escapeHTML(salaryPeriod)})</p>
          <p>ออกให้ ณ วันที่ ${formattedDate}</p>
        </div>

        <div class="right">
          <p>ลงชื่อ.................................................</p>
          <p>(${escapeHTML(issuedBy)})</p>
          <p>ตำแหน่ง: ฝ่ายทรัพยากรบุคคล</p>
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
 * 🧾 สร้าง PDF ด้วย PDFKit สำหรับหนังสือรับรองเงินเดือน
 * @param {PDFKit.PDFDocument} doc
 * @param {Object} data
 */
export function renderSalaryCertificatePDF(doc, data) {
  const {
    employeeName = '-',
    employeePosition = '-',
    employeeID = '-',
    companyName = 'บริษัท JP Visual & Docs จำกัด',
    companyAddress = '123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110',
    salaryAmount = '-',
    salaryPeriod = '-',
    issuedAt = new Date().toISOString(),
    issuedBy = 'ฝ่ายทรัพยากรบุคคล',
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

  doc.fontSize(18).text('หนังสือรับรองเงินเดือน', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(companyName, { align: 'center' });
  doc.text(companyAddress, { align: 'center' });
  doc.moveDown();

  doc.text('หนังสือฉบับนี้ออกให้เพื่อรับรองว่า');
  doc.text(`${employeeName} ตำแหน่ง ${employeePosition} รหัสพนักงาน ${employeeID}`);
  doc.text(`ได้รับเงินเดือนจำนวน ${salaryAmount} บาท (${salaryPeriod})`);
  doc.text(`ออกให้ ณ วันที่ ${formattedDate}`);
  doc.moveDown();

  doc.text('ลงชื่อ.................................................', { align: 'right' });
  doc.text(`(${issuedBy})`, { align: 'right' });
  doc.text('ตำแหน่ง: ฝ่ายทรัพยากรบุคคล', { align: 'right' });

  if (notes?.trim()) {
    doc.moveDown();
    doc.font('Helvetica-Bold').text('หมายเหตุ:');
    doc.font('Helvetica').text(notes);
  }
}
