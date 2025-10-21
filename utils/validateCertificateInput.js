/**
 * ตรวจสอบความถูกต้องของข้อมูลใบรับรองตามประเภทเอกสาร
 * @param {Object} data - ข้อมูลที่กรอกจากฟอร์ม
 * @returns {string|null} - ข้อความ error หรือ null ถ้าข้อมูลถูกต้อง
 */
export function validateCertificateInput(data) {
  if (!data || typeof data !== 'object') {
    return 'ข้อมูลไม่ถูกต้อง กรุณากรอกข้อมูลใหม่';
  }

  const { type = 'businessLicense' } = data;

  const schemas = {
    businessLicense: {
      required: ['businessName', 'registrationNumber', 'businessAddress', 'issuedBy'],
      labels: {
        businessName: 'ชื่อกิจการ',
        registrationNumber: 'เลขทะเบียนพาณิชย์',
        businessAddress: 'ที่ตั้งกิจการ',
        issuedBy: 'ชื่อผู้ที่ออกใบรับรอง',
      },
    },
    salaryCertificate: {
      required: ['employeeName', 'salaryAmount', 'salaryPeriod'],
      labels: {
        employeeName: 'ชื่อพนักงาน',
        salaryAmount: 'จำนวนเงินเดือน',
        salaryPeriod: 'ช่วงเวลา',
      },
    },
    // ✅ เพิ่มประเภทเอกสารอื่นได้ที่นี่
  };

  const schema = schemas[type];

  if (!schema) {
    return 'ประเภทเอกสารไม่รองรับ';
  }

  for (const field of schema.required) {
    const value = data[field];
    if (typeof value !== 'string' || value.trim() === '') {
      return `กรุณาระบุ${schema.labels[field]}`;
    }
  }

  return null;
}
