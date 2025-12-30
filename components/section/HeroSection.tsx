/** * @format
 * @description HERO_SECTION: The Primary Entry Point (Industrial Stable V2.6)
 * ✅ RESOLVED: Background Sync & Utility Registry
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { HERO_REGISTRY } from '@/components/hero/heroData'
import { HeroFrame } from '@/components/hero/HeroFrame'
import { HeroContent } from '@/components/hero/HeroContent'

export const HeroSection = () => {
  return (
    <section id="hero-entry" className="relative overflow-hidden">
      <HeroFrame
        // 🏗️ DATA_INJECTION: ส่งมอบข้อมูลหลักจาก Registry
        left={<HeroContent data={HERO_REGISTRY} />}
        // 🎨 UI_STYLING: ปรับฐานสีให้เข้ากับ Global Blueprint Protocol
        className={cn(
          'min-h-[100dvh] bg-white',
          'selection:bg-brand selection:text-slate-950',
          'transition-all duration-700 ease-in-out',
        )}
      />

      {/* 📏 SECTION_TERMINATOR: เส้นกั้นบางๆ เพื่อระบุระยะสิ้นสุด Module */}
      <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-slate-100/60" />
    </section>
  )
}

export default HeroSection
