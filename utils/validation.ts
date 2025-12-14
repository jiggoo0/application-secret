// /data/data/com.termux/files/home/project/utils/validation.ts

/**
 * แปลงสตริงการเงินให้เป็นตัวเลข
 * เช่น "1,234.50" -> 1234.5
 * @param v ค่าที่รับ อาจมี ,
 * @returns ตัวเลข (number)
 */
export function parseMoney(v: string | number | null | undefined): number {
  if (v === null || v === undefined) return NaN;
  if (typeof v === 'number') return v;
  // ลบเครื่องหมายจุลภาค (,) ออกก่อนแปลงเป็นตัวเลข
  const cleanValue = v.toString().replace(/,/g, '');
  return Number(cleanValue);
}

/**
 * จัดรูปแบบตัวเลขให้เป็นสกุลเงิน (มีจุลภาคและทศนิยม 2 ตำแหน่ง)
 * 🚀 เพิ่มประสิทธิภาพ: ใช้ Intl.NumberFormat เพื่อรองรับมาตรฐานสากล
 * @param v ตัวเลขที่ต้องการจัดรูปแบบ
 * @param locale Locale (เช่น 'en-US', 'th-TH')
 * @returns สตริงรูปแบบสกุลเงิน
 */
export function formatMoney(
  v: number | string | null | undefined,
  locale: string = 'th-TH',
): string {
  const n = parseMoney(v);
  if (Number.isNaN(n)) return '';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/**
 * ตรวจสอบความถูกต้องของช่องข้อมูลการเงิน
 * @param v ค่าที่ต้องการตรวจสอบ
 * @returns { ok: boolean, msg?: string, value?: number }
 */
export function validateMoneyField(v: string | number | null | undefined): {
  ok: boolean;
  msg?: string;
  value?: number;
} {
  const n = parseMoney(v);

  if (Number.isNaN(n)) return { ok: false, msg: 'ต้องเป็นตัวเลขที่ถูกต้อง' };
  if (n < 0) return { ok: false, msg: 'ต้องไม่เป็นค่าติดลบ' };

  // ส่งคืนค่าตัวเลขที่ผ่านการประมวลผลแล้ว
  return { ok: true, value: n };
}

/**
 * ตรวจสอบอีเมลพื้นฐาน
 * @param email อีเมล
 * @returns boolean
 */
export function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') return false;
  // ปรับ RegEx ให้ครอบคลุมมากขึ้นตามมาตรฐาน Production
  // [FIX] แก้ Unnecessary escape character: \. (บรรทัด 62:15)
  // \. ใน [w\.-]+ ต้อง Escape
  // \. ใน ([\w-]+\.)+ ต้อง Escape
  // เปลี่ยนเป็น RegEx Pattern ที่ชัดเจนขึ้น
  return /^[\w.-]+@([\w-]+\.)+[\w]{2,4}$/.test(email.trim());
}

/**
 * ตรวจสอบรหัสผ่าน
 * @param password รหัสผ่าน
 * @param options minLength = ความยาวขั้นต่ำ
 * @returns { ok: boolean, msg?: string }
 */
export function validatePassword(
  password: string | null | undefined,
  { minLength = 6 }: { minLength?: number } = {},
): { ok: boolean; msg?: string } {
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
 * @param input - { email, password }
 * @returns null = ผ่าน / string = ข้อผิดพลาด
 */
export function validateRegisterInput({
  email,
  password,
}: { email?: string; password?: string } = {}): string | null {
  if (!email || !password) return 'Email and password are required';

  if (!isValidEmail(email)) return 'Invalid email format';

  const pwCheck = validatePassword(password);
  if (!pwCheck.ok) return pwCheck.msg || 'Password validation failed';

  return null;
}
