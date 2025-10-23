// config/themeKbank.js
export const KBankTheme = {
  colors: {
    primary: '#00A74E', // สีหลัก (ปุ่มหลัก, header)
    primaryLight: '#1AB75B', // hover/active ของปุ่มหลัก
    primaryDark: '#008F3B', // pressed state
    secondary: '#F3F3F3', // secondary background
    background: '#F9FAFB', // main background ของแอป
    cardBg: '#FFFFFF', // background ของ card
    textPrimary: '#111827', // สีข้อความหลัก
    textSecondary: '#6B7280', // สีข้อความรอง
    credit: '#22C55E', // เงินเข้า (สีเขียว)
    creditLight: '#DCFCE7', // background ของเงินเข้า
    debit: '#EF4444', // เงินออก (สีแดง)
    debitLight: '#FEE2E2', // background ของเงินออก
    border: '#E5E7EB', // border ปุ่ม, card
  },
  font: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    heading: ['Inter', 'ui-sans-serif', 'system-ui'],
    mono: ['Fira Code', 'monospace'],
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  borderRadius: {
    button: '0.5rem', // 8px
    card: '0.75rem', // 12px
    input: '0.375rem', // 6px
  },
  shadow: {
    inset: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    card: '0 2px 6px rgba(0,0,0,0.08)',
    hover: '0 4px 8px rgba(0,0,0,0.12)',
    button: '0 2px 4px rgba(0,0,0,0.08)',
    focus: '0 0 0 3px rgba(0,167,78,0.3)', // focus ring for primary button
  },
  transition: {
    default: 'all 0.15s ease-in-out',
    hover: 'all 0.2s ease-in-out',
  },
};
