/** @format */
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 1. ตั้งค่าไฟล์ที่จะไม่ตรวจสอบ (Ignores)
  {
    ignores: [
      ".next/*",
      "node_modules/*",
      "out/*",
      "public/*",
      "**/*.d.ts",
      "eslint.config.mjs",
    ],
  },

  // 2. ใช้ compat.extends เพื่อดึงค่ามาตรฐานของ Next.js
  // สิ่งนี้จะทำให้ Warning "Next.js plugin not detected" หายไป
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 3. กำหนดกฎเพิ่มเติม (Custom Rules)
  {
    rules: {
      // ✅ แก้ไขปัญหา 'React' is not defined (สำหรับ React 19 / JSX Transform)
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // ✅ กฎความเข้มงวดของ TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // ✅ ประสิทธิภาพ (Performance)
      "@next/next/no-img-element": "error", // บังคับใช้ <Image /> เท่านั้น
      "react/no-unescaped-entities": "off",
    },
  },
];
