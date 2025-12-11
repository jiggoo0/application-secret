module.exports = {
  // === Prettier Core Rules ===
  semi: true, // ทำให้โค้ดมี Semicolon ตามข้อกำหนดของ ESLint ในรอบก่อน
  singleQuote: true, // ใช้ Single Quote (สอดคล้องกับ ESLint 'quotes: off' ที่เปิดในรอบก่อน)
  trailingComma: 'all', // คั่น comma ท้าย Object/Array เสมอ (ช่วยในการทำ Git diff)
  printWidth: 100, // ความยาวบรรทัดสูงสุด (100-120 คือค่ามาตรฐานที่ดี)

  // === Plugins ===
  plugins: ['prettier-plugin-tailwindcss'], // ใช้ปลั๊กอิน Tailwind CSS
};
