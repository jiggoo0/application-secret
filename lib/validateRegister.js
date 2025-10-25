/** Basic email validation */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Password validation */
export function validatePassword(password, { minLength = 6 } = {}) {
  if (!password || typeof password !== 'string') return { ok: false, msg: 'Password is required' };
  if (password.length < minLength)
    return { ok: false, msg: `Password ต้องมีอย่างน้อย ${minLength} ตัวอักษร` };
  return { ok: true };
}

/** Validate register input */
export function validateRegisterInput({ email, password } = {}) {
  if (!email || !password) return 'Email และ password ต้องมี';
  if (!isValidEmail(email)) return 'Email ไม่ถูกต้อง';
  const pw = validatePassword(password);
  if (!pw.ok) return pw.msg;
  return null;
}
