/**
 * แปลงตัวเลขเป็นรูปแบบสกุลเงินไทย เช่น ฿12,345.67
 * รองรับ null, undefined, string, number และ fallback เมื่อไม่ใช่ตัวเลข
 * @param {string|number|null|undefined} value
 * @returns {string} สกุลเงินที่จัดรูปแบบแล้ว
 */
export function formatCurrency(value) {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : Number(value);

  if (isNaN(num) || num === null || num === undefined) {
    return '฿0.00';
  }

  return `฿${num.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
