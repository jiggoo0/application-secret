/** @format */
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

/**
 * @type {import('eslint').Linter.Config[]}
 * @description THE ARCHITECT'S FINAL ESLINT CONFIGURATION
 * แก้ไขปัญหา Parsing Error และ React Global สำหรับ Next.js 15
 */
export default [
  {
    // 🚫 IGNORE_RESOURCES
    ignores: [
      '._Z_Z_STORE_Z_Z/**',
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '**/*.d.ts',
      'eslint.config.mjs',
      'postcss.config.mjs',
      'tailwind.config.ts',
    ],
  },
  js.configs.recommended,
  {
    // 🛡️ TYPESCRIPT_AND_REACT_LOGIC
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json', // บังคับใช้ Type-Checking ลึกถึงระดับ Project
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly', // ✅ แก้ปัญหา 'React' is not defined
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...hooksPlugin.configs.recommended.rules,

      // 🛡️ TYPE-SAFETY: ห้ามใช้ 'any' และบังคับวินัยการเขียน Type
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // 🧹 UNUSED_VARIABLES: Clean Code Standard
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // ⚛️ REACT_STRICT_RULES
      'react/jsx-no-comment-textnodes': 'error',
      '@next/next/no-img-element': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'error', // ❗ ห้ามใช้ " หรือ ' ตรงๆ ใน JSX

      // ✅ NEXTJS_15_COMPATIBILITY
      'react-hooks/set-state-in-effect': 'off',
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
  {
    // ⚙️ CONFIG_FILES_HANDLING (Non-TS Project Files)
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // ปิดกฎที่ต้องใช้ TypeScript Parser สำหรับไฟล์ JS ทั่วไปเพื่อป้องกัน Parsing Error
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
