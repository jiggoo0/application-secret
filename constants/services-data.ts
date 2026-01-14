/**
 * Interface สำหรับข้อมูลบริการ (Service Item)
 * ใช้สำหรับแสดงผลในหน้า List, Cards และรายละเอียดบริการ
 */
export interface Service {
  id: string;
  slug: string;
  title: string;
  category: "visa" | "legal" | "translation";
  description: string;
  longDescription: string;
  features: string[]; // บังคับเป็น Array ของ string เพื่อป้องกันปัญหาตอน .map()
  iconName: string; // ชื่อ Icon ที่จะนำไป Map กับ Lucide Icons ใน Component
  priceTag?: string; // เพิ่ม optional สำหรับป้ายราคา (ถ้ามี)
}

/**
 * Type Alias สำหรับเรียกใช้ใน ServiceCard (เพื่อความยืดหยุ่นในการทำ Type Mapping)
 */
export type ServiceItem = Service;

/**
 * รายการข้อมูลบริการทั้งหมดภายในระบบ
 */
export const SERVICES: Service[] = [
  {
    id: "tourist-visa",
    slug: "tourist-visa",
    title: "วีซ่าท่องเที่ยว",
    category: "visa",
    description: "บริการเตรียมเอกสารยื่นวีซ่าท่องเที่ยวทั่วโลก",
    longDescription:
      "ทีมงานมืออาชีพช่วยเตรียมเอกสาร วางแผนการเดินทาง และให้คำปรึกษาเพื่อให้การขอวีซ่าของคุณมีโอกาสผ่านสูงสุด",
    features: [
      "ตรวจเช็คเอกสาร",
      "จองคิวสัมภาษณ์",
      "วางแผนการเงิน",
      "เขียนจดหมายแนะนำตัว",
    ],
    iconName: "globe", // ใช้พิมพ์เล็กตามมาตรฐาน Mapping ที่เราทำใน ServiceCard
  },
  {
    id: "business-registration",
    slug: "business-registration",
    title: "จดทะเบียนบริษัท",
    category: "legal",
    description: "เริ่มต้นธุรกิจอย่างถูกต้องตามกฎหมาย",
    longDescription:
      "บริการจดทะเบียนบริษัทนิติบุคคล แก้ไขทะเบียนรายชื่อผู้ถือหุ้น และให้คำปรึกษาด้านโครงสร้างธุรกิจ",
    features: [
      "จดทะเบียน DBD",
      "ขอเลขผู้เสียภาษี",
      "เปิดบัญชีบริษัท",
      "จดทะเบียนภาษีมูลค่าเพิ่ม",
    ],
    iconName: "building",
  },
  {
    id: "certified-translation",
    slug: "certified-translation",
    title: "แปลเอกสารรับรอง",
    category: "translation",
    description: "แปลภาษาพร้อมรับรองโดยผู้เชี่ยวชาญ",
    longDescription:
      "บริการแปลเอกสารราชการ เอกสารกฎหมาย พร้อมรับรองจากกงสุลหรือสถานทูต เพื่อใช้ในต่างประเทศ",
    features: [
      "แปลไทย-อังกฤษ-จีน",
      "รับรองกงสุล",
      "รับรองสถานทูต",
      "Notary Public",
    ],
    iconName: "languages",
  },
];

/**
 * Helper function สำหรับดึงข้อมูล Service ตาม Slug
 */
export const getServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find((service) => service.slug === slug);
};
