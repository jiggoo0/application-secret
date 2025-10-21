import path from 'path';
import fs from 'fs';

/**
 * สร้างเนื้อหาใบรับรองทะเบียนพาณิชย์
 * @param {PDFKit.PDFDocument} doc - เอกสาร PDF
 * @param {Object} data - ข้อมูลกิจการ
 */
export function renderBusinessLicense(doc, data) {
  const {
    businessName = '',
    registrationNumber = '',
    businessAddress = '',
    issuedBy = 'สำนักงานพาณิชย์',
    issuedAt = new Date().toISOString(),
    notes = '',
  } = data;

  // ✅ ป้องกัน fallback ไป Helvetica
  doc.font('THSarabunNew');

  const emblemPath = path.join(process.cwd(), 'public/images/krut.webp');

  // 🖼️ โลโก้ครุฑกลางหน้า
  if (fs.existsSync(emblemPath)) {
    try {
      const pageWidth = doc.page.width;
      const imageWidth = 80;
      const xPos = (pageWidth - imageWidth) / 2;
      doc.image(emblemPath, xPos, 40, { width: imageWidth });
    } catch {
      doc.fontSize(12).fillColor('red').text('[ไม่สามารถแสดงโลโก้ครุฑได้]', { align: 'center' });
    }
  }

  doc.moveDown(5);

  // 🧾 หัวเรื่อง
  doc.fontSize(20).fillColor('black').text('ใบรับรองการจดทะเบียนพาณิชย์', {
    align: 'center',
    underline: true,
  });

  doc.moveDown(2);
  doc.fontSize(14).fillColor('black');

  // 📄 เนื้อหา
  doc.text('สำนักงานขอรับรองว่า');
  doc.moveDown(1);
  doc.text(`ชื่อกิจการ: ${businessName || '-'}`);
  doc.text(`เลขทะเบียนพาณิชย์: ${registrationNumber || '-'}`);
  doc.text(`ที่ตั้งสถานประกอบการ: ${businessAddress || '-'}`);
  doc.moveDown(1.5);
  doc.text('ข้อมูลข้างต้นเป็นความจริงตามที่ปรากฏในระบบทะเบียนพาณิชย์ของกรมพัฒนาธุรกิจการค้า');
  doc.moveDown(2);

  // 📅 วันที่ออก
  let issuedDate = new Date(issuedAt);
  if (isNaN(issuedDate.getTime())) {
    issuedDate = new Date();
  }

  const formattedDate = issuedDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  doc.text(`ออกโดย: ${issuedBy}`);
  doc.text(`วันที่ออกใบรับรอง: ${formattedDate}`);
  doc.moveDown(3);

  // 🖊️ ลายเซ็น
  doc.text('ลงชื่อ.........................................................', { align: 'right' });
  doc.text(`(${issuedBy})`, { align: 'right' });
  doc.text('ตำแหน่ง: เจ้าหน้าที่ทะเบียนพาณิชย์', { align: 'right' });

  // 📝 หมายเหตุ
  if (notes?.trim()) {
    doc.moveDown(2);
    doc.fontSize(12).fillColor('black').text('หมายเหตุ:', { underline: true });
    doc.text(notes);
  }
}
