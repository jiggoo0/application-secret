// lib/validate.js
// Utility validators – ใช้ได้ทั้ง server และ client

/**
 * แปลง string หรือ number เป็นค่า numeric
 * รองรับ comma, currency symbol, whitespace
 * คืนค่า NaN ถ้าไม่ใช่ตัวเลข
 */
export function parseMoney(value) {
  if (typeof value === 'number') return value;
  if (value == null) return NaN;

  const cleaned = String(value)
    .trim()
    .replace(/[^\d.-]/g, '');
  if (cleaned === '' || cleaned === '.' || cleaned === '-' || cleaned === '-.') return NaN;

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

/**
 * ตรวจสอบค่าเงินไม่ติดลบ
 * คืนค่า { ok: boolean, value?: number, msg?: string }
 */
export function validateMoneyField(v) {
  const n = parseMoney(v);
  if (Number.isNaN(n)) return { ok: false, msg: 'ต้องเป็นตัวเลข' };
  if (n < 0) return { ok: false, msg: 'ต้องไม่เป็นค่าติดลบ' };
  return { ok: true, value: n };
}

/**
 * ตรวจสอบอีเมลพื้นฐาน
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * ตรวจสอบรหัสผ่าน
 * default: minLength 6
 * คืนค่า { ok: boolean, msg?: string }
 */
export function validatePassword(password, { minLength = 6 } = {}) {
  if (!password || typeof password !== 'string') {
    return { ok: false, msg: 'Password is required' };
  }
  if (password.length < minLength) {
    return {
      ok: false,
      msg: `รหัสผ่านต้องมีความยาวอย่างน้อย ${minLength} ตัวอักษร`,
    };
  }
  return { ok: true };
}

/**
 * ตรวจสอบ input สำหรับ register
 * คืนค่า null = ผ่าน / string = ข้อผิดพลาด
 */
export function validateRegisterInput({ email, password } = {}) {
  if (!email || !password) return 'Email and password are required';
  if (!isValidEmail(email)) return 'Invalid email';

  const pwCheck = validatePassword(password, { minLength: 6 });
  if (!pwCheck.ok) return pwCheck.msg;

  return null;
}
