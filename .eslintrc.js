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
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': 'warn',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'react/prop-types': 'off',
  },
};
