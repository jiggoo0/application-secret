/** @format */
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '**/*.d.ts',
      'eslint.config.mjs',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    // 🛠️ ปรึกษา Master: ต้องระบุ Namespace ให้ตรงกับที่ Next.js เรียกใช้ใน Rules
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,

      // ✅ ดึงกฎเหล็กของ Next.js 15 มาใช้งานโดยตรง
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // 🛡️ TYPE-SAFETY (ห้าม Any เด็ดขาด)
      '@typescript-eslint/no-explicit-any': 'error',

      // 🧹 CLEAN_CODE
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ⚛️ MASTER_STRICT_JSX
      'react/react-in-jsx-scope': 'off', // Next.js ไม่ต้องใช้
      'react/prop-types': 'off', // ใช้ TS แทนแล้ว
      '@next/next/no-img-element': 'error',
      'react/no-unescaped-entities': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]
