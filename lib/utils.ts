import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// สำหรับจัดการ Class Name ของ Tailwind 4
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// สำหรับจัดฟอร์แมตสกุลเงินบาท (เช่น 1,500.00 ฿)
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
}

// สำหรับจัดฟอร์แมตวันที่แบบไทย
export function formatDateThai(date: string | Date) {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
