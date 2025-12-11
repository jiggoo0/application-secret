module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 🔥 FIX: ลบ 'react-hooks' ออกจาก plugins เพราะถูกโหลดผ่าน 'extends' อยู่แล้ว
  plugins: ['react', 'prettier', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // === 1. การจัดรูปแบบ: ให้ Prettier จัดการ ===
    'prettier/prettier': 'warn', // คงให้ Prettier เป็นแค่ Warning
    semi: 'off', // ปิดกฎ Semicolon ของ ESLint
    quotes: 'off', // ปิดกฎ Quotes ของ ESLint (ป้องกันความขัดแย้งกับ Prettier)
    'quote-props': 'off', // ปิดกฎ Quotes ของ Props

    // === 2. การใช้งานทั่วไป: ลดความเข้มงวดในการพัฒนา ===
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off', // อนุญาตให้ใช้ console.log()
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn', // RELAXED: เปลี่ยนเป็น 'warn'

    // === 3. React/Component: ลดความเข้มงวดสำหรับ Components ซับซ้อน ===
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'warn',

    // 🔥 RELAXED (Hooks): ปิดการตรวจสอบ Dependency Array (เพื่อการสร้าง Components ที่ซับซ้อนได้ง่ายขึ้น)
    // กฎนี้จะยังคงถูกยกเลิกแม้จะไม่มี 'react-hooks' ใน plugins
    'react-hooks/exhaustive-deps': 'off',
  },
};
