export function renderSalaryCertificate(doc, data) {
  const {
    employeeName = '',
    employeePosition = '',
    employeeID = '',
    companyName = 'บริษัท JP Visual & Docs จำกัด',
    companyAddress = '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110',
    salaryAmount = '',
    salaryPeriod = '',
    issuedAt = new Date().toISOString(),
    issuedBy = 'ฝ่ายทรัพยากรบุคคล',
    notes = '',
  } = data;

  // 🧾 หัวเรื่อง
  doc.fontSize(20).fillColor('black').text('หนังสือรับรองเงินเดือน', {
    align: 'center',
    underline: true,
  });

  // 🏢 ข้อมูลบริษัท
  doc.moveDown(2);
  doc.fontSize(14).text(companyName, { align: 'center' });
  doc.text(companyAddress, { align: 'center' });

  // 📄 เนื้อหาใบรับรอง
  doc.moveDown(2);
  doc.fontSize(14).text('หนังสือฉบับนี้ออกให้เพื่อรับรองว่า');
  doc.moveDown(0.5);
  doc.text(
    `${employeeName || '-'} ตำแหน่ง ${employeePosition || '-'} รหัสพนักงาน ${employeeID || '-'}`,
  );
  doc.moveDown(1.5);
  doc.text(`ได้รับเงินเดือนจำนวน ${salaryAmount || '-'} บาท (${salaryPeriod || '-'})`);
  doc.moveDown(1.5);

  let issuedDate = new Date(issuedAt);
  if (isNaN(issuedDate.getTime())) {
    issuedDate = new Date();
  }

  const formattedDate = issuedDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  doc.text(`ออกให้ ณ วันที่ ${formattedDate}`);
  doc.moveDown(3);

  // 🖊️ ลายเซ็น
  doc.text('ลงชื่อ.................................................', { align: 'right' });
  doc.text(`(${issuedBy})`, { align: 'right' });
  doc.text('ตำแหน่ง: ฝ่ายทรัพยากรบุคคล', { align: 'right' });

  // 📝 หมายเหตุ (ถ้ามี)
  if (notes?.trim()) {
    doc.moveDown(2);
    doc.fontSize(12).fillColor('black').text('หมายเหตุ:', { underline: true });
    doc.text(notes);
  }
}
