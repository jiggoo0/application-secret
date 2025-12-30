/** @format */

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'SERVICE' | 'DOCUMENT' | 'TRUST'
}

export const faqData: FAQItem[] = [
  {
    id: 'FAQ_01',
    category: 'SERVICE',
    question: 'บริการของเราแตกต่างจากเอเจนซี่ทั่วไปอย่างไร?',
    answer:
      'เราไม่ใช้แค่การกรอกฟอร์ม แต่เราใช้เทคนิค "แต่งตัวเลขและโน้มน้าวใจ" (Document Orchestration) เพื่อปิดจุดบอดและเพิ่มโอกาสสำเร็จสูงสุดด้วยมาตรฐานเจ้าป่าครับ',
  },
  {
    id: 'FAQ_02',
    category: 'DOCUMENT',
    question: 'ข้อมูลลูกค้าจะถูกเก็บเป็นความลับแค่ไหน?',
    answer:
      'ความลับลูกค้าคือที่หนึ่ง เราใช้ระบบ Encryption และนโยบายล้างข้อมูลทันทีหลังจบเคส ข้อมูลของคุณจะปลอดภัยในพื้นที่สีเทาที่เราดูแล',
  },
  {
    id: 'FAQ_03',
    category: 'TRUST',
    question: 'ถ้าเคสมีปัญหาหรือถูกปฏิเสธ จะจัดการอย่างไร?',
    answer:
      'เรามีการวิเคราะห์หลังบ้าน (Post-Mortem) ทันทีเพื่อหาทางลัดพิเศษและปั้นเคสใหม่ให้เนียนกว่าเดิม เราไม่ทิ้งงานจนกว่าจะผ่านฉลุยครับ',
  },
]
