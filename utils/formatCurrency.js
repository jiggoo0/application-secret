// utils/formatCurrency.js

/**
 * จัดรูปแบบตัวเลขให้เป็นสกุลเงินบาทไทย
 * @param {number} price - ราคาที่ต้องการจัดรูปแบบ
 * @returns {string} - สตริงที่จัดรูปแบบแล้ว เช่น "฿1,000"
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return 'N/A';
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
  }).format(price);
};
