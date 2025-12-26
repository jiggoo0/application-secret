/** @format */
import React from "react"
import {
  FileSearch,
  PenTool,
  Plane,
  TrendingUp,
  Layers,
  CreditCard,
  BarChart3,
} from "lucide-react"
import { ServiceItem } from "./types"

export const servicesData: ServiceItem[] = [
  {
    id: "visa-asset",
    type: "VISA_ASSET",
    icon: React.createElement(FileSearch, { size: 24 }),
    image: "/images/service/วีซ่า.webp",
    title: "รับจบเรื่องวีซ่า (สายตรง)",
    description:
      "จัดชุดเอกสารใหม่ให้เนียนกริ๊บ ตรงเงื่อนไขสถานทูตกำหนด เอกสารไม่ครบเราเติมให้จนเต็ม",
    price: "3,000.-",
    cta: "ทักแอดมิน (ลับ)",
    highlight: "สายงานตรง / สาวสายทำงาน",
  },
  {
    id: "gen-letter",
    type: "GEN_ASSET",
    icon: React.createElement(PenTool, { size: 24 }),
    image: "/images/service/บริการจดหมาย.webp",
    title: "รับร่างจดหมายสำคัญ",
    description:
      "Cover Letter แบบที่คนอ่านต้องเชื่อ หรือจดหมายสปอนเซอร์เพิ่มความน่าเชื่อถือระดับมือโปร",
    price: "1,000.-",
    cta: "สั่งร่างจดหมาย",
    highlight: "เพิ่มน้ำหนักตัวบุคคล",
  },
  {
    id: "visa-booking",
    type: "VISA_ASSET",
    icon: React.createElement(Plane, { size: 24 }),
    image: "/images/service/ตั๋วเครื่องบิน.webp",
    title: "ใบจองตั๋วเครื่องบิน · โรงแรม",
    description:
      "ระบบแท้ 100% เช็กชื่อได้ใน Google / Ebooking งานด่วน 1 วันเสร็จ รองรับทุกประเทศ",
    price: "1,000.-",
    cta: "Priority_System",
    highlight: "จ่ายครั้งเดียวจบ",
  },
  {
    id: "gen-loan",
    type: "GEN_ASSET",
    icon: React.createElement(TrendingUp, { size: 24 }),
    image: "/images/service/สินเชื่อ.webp",
    title: "ที่ปรึกษาปั้นเคสกู้เงิน",
    description:
      "วิเคราะห์โปรไฟล์ ปรับแต่งจุดอ่อนให้แบงก์ยอมปล่อยกู้ ปั้นเคสยากให้เป็นเคสง่าย",
    price: "3,000.-",
    cta: "ปรึกษาปั้นเคส",
    highlight: "บุคคลและธุรกิจ",
  },
  {
    id: "gen-modify",
    type: "GEN_ASSET",
    icon: React.createElement(Layers, { size: 24 }),
    image: "/images/service/แก้ไขเอกสาร.webp",
    title: "แก้-สร้าง-จัดหาเอกสาร",
    description:
      "อยากแก้จุดไหน สร้างใหม่ยังไง สั่งมา... งานเนียนระดับเซียน ตรงตามโจทย์ที่คุณต้องการ",
    price: "เริ่ม 400.-",
    cta: "สั่งงานสายตรง",
    highlight: "ได้ทุกโจทย์ตามสั่ง",
  },
  {
    id: "gen-card",
    type: "GEN_ASSET",
    icon: React.createElement(CreditCard, { size: 24 }),
    image: "/images/service/บัตร.webp",
    title: "ผลิตชิ้นงานบัตรแข็ง / อ่อน",
    description:
      "เน้นความปลอดภัยสูงสุด ชนมือทำก่อน จ่ายทีหลัง ส่งงานผ่าน Grab / รถทัวร์ เท่านั้น",
    price: "4,000.-",
    cta: "สั่งทำชิ้นงาน",
    highlight: "งานชนมือเท่านั้น",
  },
  {
    id: "gen-marketing",
    type: "GEN_ASSET",
    icon: React.createElement(BarChart3, { size: 24 }),
    image: "/images/service/ภาพลักษณ์.webp",
    title: "ดูแลการตลาดครบวงจร",
    description:
      "คุมภาพลักษณ์ธุรกิจให้ขลัง (สายขาว-เทา-ดำ) วิเคราะห์ฐานลูกค้า ปั้นคอนเทนต์ล่วงหน้า 3 เดือน",
    price: "3,000.-",
    cta: "ทักแชทคุยงาน",
    highlight: "เข้าใจคนทำงานทุกสาย",
  },
]
