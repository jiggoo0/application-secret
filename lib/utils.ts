/** @format */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 🛰️ UTILITY_PROTOCOL: cn (Classname Merger)
 * ----------------------------------------------------------------
 * จัดการรวมคลาส Tailwind CSS แบบมีเงื่อนไข (Conditional Classes)
 * และแก้ไขปัญหา Class Conflicts โดยใช้ลำดับความสำคัญล่าสุด (Last-win)
 * * @param inputs - รายการคลาสที่ต้องการประมวลผล (Strings, Objects, Arrays)
 * @returns ผลลัพธ์คลาสที่ผ่านการ Merge และ Deduplicate แล้ว
 * * @example
 * cn("px-4 py-2", isPrimary && "bg-brand", customClass)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
