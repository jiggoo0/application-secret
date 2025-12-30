/** * @format
 * @description HERO_DATA_REGISTRY: The Central Source of Truth (V2.6)
 * ✅ ENFORCEMENT: Type-Safe Interface, Industrial Metadata
 */

import { ShieldCheck, Lock, Target, LucideIcon } from 'lucide-react'

export interface HeroSignal {
  icon: LucideIcon
  label: string
}

export interface HeroData {
  id: string
  version: string
  eyebrow: string
  headline: string
  highlight: string
  description: string
  signals: HeroSignal[]
  cta: {
    primary: string
    secondary?: string
  }
}

/**
 * 🛰️ REGISTRY: ข้อมูลหลักสำหรับ Hero Section
 * ปรับจูน Copywriting ให้มีน้ำหนัก (Gravitas) และดูเป็นทางการ
 */
export const HERO_REGISTRY: HeroData = {
  id: 'JPVD_CORE_STABLE',
  version: '2.6.0',
  eyebrow: 'JP Visual & Docs // Professional Identity',
  headline: 'Structured Solutions',
  highlight: 'For Sensitive Business',
  description:
    'ยกระดับธุรกิจนอกกรอบสู่มาตรฐานสากล ด้วยการออกแบบโครงสร้างเอกสารและภาพลักษณ์เชิงกลยุทธ์ เพื่อความมั่นคง ปลอดภัย และความน่าเชื่อถือระดับสูงสุด',
  signals: [
    { icon: ShieldCheck, label: 'Professional Standard' },
    { icon: Lock, label: 'Client Confidentiality' },
    { icon: Target, label: 'Result Oriented' },
  ],
  cta: {
    primary: 'START_INITIAL_AUDIT',
    secondary: 'VIEW_SERVICES',
  },
}
