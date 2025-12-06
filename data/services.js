// data/services.js

const escapeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
};

export const ALL_SERVICES = [
  {
    title: 'ที่ปรึกษายื่นกู้สินเชื่อส่วนบุคคลและธุรกิจ',
    images: ['/service/สินเชื่อ.webp'],
    features: [
      'วิเคราะห์โปรไฟล์ลูกค้าเพื่อเลือกสินเชื่อที่เหมาะสม',
      'จัดชุดเอกสารให้ครบถ้วนตามเงื่อนไขของแต่ละธนาคาร',
      'วางแผนการยื่นกู้แบบมืออาชีพ',
      'ตรวจสอบเงื่อนไขและปรับเอกสารให้สอดคล้อง',
      'ใช้เทคนิคหน้างานจริงด้วยมาตรฐานมืออาชีพ',
    ],
    price: 'เริ่มต้นที่ 3,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'รับดูแลเอกสารยื่นวีซ่า (สาวสายทำงานตรง)',
    images: ['/service/วีซ่า.webp'],
    features: [
      'ตรวจสอบและจัดชุดเอกสารให้ครบถ้วน',
      'แต่งเติมเอกสารที่ขาดให้ตรงเงื่อนไขประเทศปลายทาง',
      'คำแนะนำตรงตามข้อกำหนดของวีซ่าแต่ละประเทศ',
      'ออกแบบระบบรองรับกลุ่มลูกค้าสายทำงานตรง',
      'แนวทางจัดเอกสารผ่านเงื่อนไขมืออาชีพ',
    ],
    price: 'เริ่มต้นที่ 3,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'แก้ไข - สร้างใหม่ - จัดหาเอกสารทุกรูปแบบ',
    images: ['/service/แก้ไขเอกสาร.webp'],
    features: [
      'แก้ไขเอกสารและสร้างเอกสารใหม่ตามความต้องการ',
      'จัดหาเอกสารทุกชนิดแม่นยำและรวดเร็ว',
      'เหมาะสำหรับงานด่วนและตรงตามเงื่อนไข',
    ],
    price: 'แก้ไขเริ่มต้น 400 บาท / สร้างใหม่เริ่มต้น 700 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'ผลิตชิ้นงานจริง บัตรแข็ง / อ่อน',
    images: ['/service/บัตร.webp'],
    features: [
      'ดูตัวอย่างชิ้นงานจริงทางแอดมิน',
      'ชิ้นงานบางอย่างเซนเซอร์หากมีความเสี่ยง',
      'จัดส่งชิ้นงานจริงผ่าน Grab/รถทัวร์เท่านั้น',
      'ชนมือทำก่อนจ่ายทีหลัง',
      'การันตีผลงานคุณภาพสูง',
    ],
    price: 'เริ่มต้นที่ 4,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'ออกแบบโลโก้ / แบนเนอร์ / ทีม',
    images: ['/service/โลโก้.webp'],
    features: ['ออกแบบภาพลักษณ์แบรนด์คุณภาพสูง', 'ไฟล์ใช้งานครบ รองรับทุกแพลตฟอร์ม'],
    price: 'เริ่มต้น 300 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'โครงการให้น้องได้พักผ่อน',
    images: ['/service/น้องได้พัก.webp'],
    features: [
      'ออกแบบระบบกรองฐานลูกค้าให้ตรงกลุ่มเป้าหมาย',
      'ดึงลูกค้าจากแหล่งต่างๆ เช่น ThaiFriendly, Twitter 18+, Club Line',
      'เชื่อมต่อระบบ Line Official ของลูกค้า',
      'ระบบคัดกรองลูกค้าที่สนใจและส่งงานให้เลือกตอบรับ',
      'รองรับลูกค้าที่ลังเลผ่าน Telegram',
    ],
    price: 'เริ่มต้นที่ 3,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'รับดูแลการตลาดครบวงจรทุกสายอาชีพขาวดำเทา',
    images: ['/service/ภาพลักษณ์.webp'],
    features: [
      'คุมภาพลักษณ์ธุรกิจให้น่าเชื่อถือ',
      'วิเคราะห์กลุ่มเป้าหมาย การตลาด และฐานลูกค้า',
      'สร้างคอนเทนต์และแผนการตลาดล่วงหน้า 3 เดือน',
    ],
    price: 'เริ่มต้นที่ 3,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
  {
    title: 'ตั๋วเครื่องบิน · ตั๋วโรงแรม ทุกประเทศ',
    images: ['/service/ตั๋วเครื่องบิน.webp'],
    features: [
      'ตั๋วเครื่องบินได้ทุกประเทศ',
      'ตั๋วโรงแรมทั่วโลก ราคาคุ้มค่า',
      'ขึ้นในระบบ Ebooking.com · ค้นหา Google · รายชื่อโรงแรมรองรับงานไว 1 วันเสร็จ',
    ],
    price: 'เริ่มต้น 1,000 บาท',
    ctaText: 'สนใจบริการ',
    ctaUrl: 'https://lin.ee/G8s8rKp',
  },
];

export async function getServicesData() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const sanitizedServices = ALL_SERVICES.map((service) => ({
    ...service,
    title: escapeString(service.title),
    price: escapeString(service.price),
    ctaText: escapeString(service.ctaText),
    features: service.features.map((f) => escapeString(f)),
  }));

  return sanitizedServices;
}
