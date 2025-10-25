// .eslintrc.js
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
    'no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/prop-types': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: ['scripts/**/*.js', 'data/**/*.js'],
      rules: {
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
};
