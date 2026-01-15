import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ฟังก์ชันสำหรับรวม Tailwind Classes:
 * ช่วยให้การเขียนสไตล์ในแต่ละ Component มีระเบียบและจัดการเงื่อนไขได้ง่ายขึ้น
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ฟังก์ชันจัดรูปแบบเงินบาท (เช่น 1,500.00 ฿):
 * สื่อสารเรื่องค่าใช้จ่ายอย่างชัดเจน โปร่งใส และอ่านง่ายสำหรับทุกคน
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0, // ปรับให้ไม่แสดงทศนิยมถ้าไม่จำเป็น เพื่อให้ดูเป็นมิตรมากขึ้น
  }).format(amount);
}

/**
 * ฟังก์ชันจัดรูปแบบวันที่แบบไทย:
 * เปลี่ยนวันที่แบบสากลให้เป็นภาษาไทยที่คุ้นเคย สื่อถึงความใส่ใจในทุกรายละเอียด
 * ตัวอย่าง: 15 มกราคม 2569
 */
export function formatDateThai(date: string | Date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * ฟังก์ชันสร้างลิงก์ LINE (Helper):
 * ช่วยให้ลูกค้าเข้าถึงทีมที่ปรึกษาได้ง่ายที่สุดเพียงคลิกเดียว
 */
export function getLineContactLink(lineId: string) {
  // ตัดเครื่องหมาย @ ออกหากผู้ใช้งานใส่มา เพื่อป้องกันลิงก์เสีย
  const cleanId = lineId.replace("@", "");
  return `https://line.me/ti/p/~${cleanId}`;
}
