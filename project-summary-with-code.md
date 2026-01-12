# 📑 รายงานสรุปโปรเจกต์และบริบท AI (Full Context)
_สร้างเมื่อ: 2026-01-12 09:12:48_
> **Status:** Fresh Scan | รวมข้อมูลวิเคราะห์ Route & Code

## 🔴 1. สถานะสุขภาพโปรเจกต์ล่าสุด
✅ **READY FOR DEPLOY** (ผ่านการตรวจสอบทุกขั้นตอน)

### 📍 Production Route Map
```text
```text
Route (app)                                        Size  First Load JS
┌ ○ /                                           49.4 kB         180 kB
├ ○ /_not-found                                   143 B         102 kB
├ ○ /contact                                    3.08 kB         112 kB
├ ○ /contact/success                            2.59 kB         112 kB
├ ○ /manifest.webmanifest                         143 B         102 kB
├ ƒ /pass/[id]                                    143 B         102 kB
├ ○ /privacy                                      143 B         102 kB
├ ○ /robots.txt                                   143 B         102 kB
├ ○ /services                                   2.88 kB         133 kB
├ ○ /showcase                                   2.52 kB         114 kB
├ ● /showcase/[slug]                            2.63 kB         115 kB
├   ├ /showcase/retirement-asset-protocol
├   ├ /showcase/sponsor-relationship-proof
├   ├ /showcase/baac-home-acquisition-recovery
├   └ [+3 more paths]
├ ○ /sitemap.xml                                  143 B         102 kB
├ ○ /terms                                        143 B         102 kB
└ ○ /verify                                     4.79 kB         114 kB
+ First Load JS shared by all                    102 kB
  ├ chunks/3c4078ff-db1510ea385e11c8.js         54.2 kB
  ├ chunks/667-fc91a2d66fb02623.js              45.6 kB
  └ other shared chunks (total)                 1.93 kB
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
```

## 📊 2. สถิติไฟล์แบ่งตามนามสกุล
```text
     59 tsx
     25 ts
      6 webp
      4 sh
      2 svg
      2 png
      2 jpg
      1 ico
      1 css
```

## 📁 3. โครงสร้างโฟลเดอร์ (Tree)
```text
📂 app
  📂 (legal)
    📄 layout.tsx
    📂 privacy
      📄 page.tsx
    📂 terms
      📄 page.tsx
  📂 (main)
    📂 contact
      📄 page.tsx
      📂 success
        📄 page.tsx
    📄 layout.tsx
    📄 loading.tsx
    📄 page.tsx
    📂 services
      📄 page.tsx
    📂 showcase
      📂 [slug]
        📄 page.tsx
      📄 page.tsx
    📂 verify
      📄 page.tsx
  📂 actions
    📄 lead-actions.ts
  📄 favicon.ico
  📄 globals.css
  📄 layout.tsx
  📄 manifest.ts
  📄 not-found.tsx
  📂 pass
    📂 [id]
      📄 page.tsx
  📄 providers.tsx
  📄 robots.ts
  📄 sitemap.ts
📂 components
  📄 Footer.tsx
  📄 Header.tsx
  📄 MobileMenu.tsx
  📂 form
    📄 ContactForm.tsx
  📂 hero
    📄 CapabilityItem.tsx
    📄 StatsCard.tsx
    📄 heroData.ts
  📂 layout
    📄 MainLayout.tsx
  📂 section
    📄 AboutSection.tsx
    📄 CaseGridCard.tsx
    📄 FAQSection.tsx
    📄 HeroSection.tsx
    📄 ProcessStep.tsx
    📄 ServiceGrid.tsx
    📄 ServicesSection.tsx
    📄 ShowcaseGrid.tsx
    📄 TrustPartner.tsx
  📂 seo
    📄 JsonLd.tsx
  📂 services
    📄 ServiceCard.tsx
    📄 ServiceFilter.tsx
    📄 ServiceHeader.tsx
    📄 serviceData.ts
  📂 shared
    📄 SkeletonCard.tsx
  📂 showcase
    📄 CaseSectionPreview.tsx
    📄 EvidenceBoard.tsx
    📄 MetricsPanel.tsx
    📄 OperationalLog.tsx
  📂 ui
    📄 CaseCard.tsx
    📄 accordion.tsx
    📄 audit-stamp.tsx
    📄 badge.tsx
    📄 button.tsx
    📄 card.tsx
    📄 dialog.tsx
    📄 input-otp.tsx
    📄 input.tsx
    📄 separator.tsx
    📄 sheet.tsx
    📄 sidebar.tsx
    📄 skeleton.tsx
    📄 sonner.tsx
    📄 table.tsx
    📄 textarea.tsx
    📄 tooltip.tsx
📂 lib
  📄 fonts.ts
  📄 mail.ts
  📂 supabase
    📄 constants.ts
    📄 server.ts
  📄 utils.ts
📂 hooks
  📄 use-mobile.tsx
  📄 useServiceAction.ts
📂 scripts
  📄 generate-ai-context.ts
  📂 dev
    📄 backup-project.sh
    📄 project-summary.sh
    📄 tree-projects.sh
  📄 pre-deploy-check.sh
📂 public
  📄 apple-touch-icon.png
  📄 grid-pattern.svg
  📄 grid.svg
  📂 images
    📄 Logo.webp
    📂 blog
      📄 default-hero.webp
      📄 placeholder.webp
    📄 default-avatar.webp
    📂 hero
      📄 HeroBackground.png
    📄 og-image.jpg
    📄 placeholder.webp
    📂 service
      📄 placeholder.webp
  📄 og-showcase.jpg
📂 data
  📄 faqData.ts
📂 config
  📄 navigation.ts
  📄 showcase-types.ts
  📂 showcase
    📄 all-cases.ts
    📄 case-1.ts
    📄 case-2.ts
    📄 case-3.ts
    📄 case-4.ts
    📄 case-5.ts
    📄 case-6.ts
  📄 site.ts
  📄 theme.ts
```

## 📄 4. เนื้อหาโค้ดและบริบททางเทคนิค
#### 🔍 Path: ai-context.md
```markdown
#!/usr/bin/env ts-node
/\*\*

- AI-Context Auto-Generator + Template
- ***
- Prepend strict AI-Context block to all .tsx pages/components
- JP-VisualDocs – Global Page Template
  \*/

import fs from 'fs'
import path from 'path'
import glob from 'glob'

// CONFIG
const PROJECT*ROOT = process.cwd()
const FILE_PATTERN = '\**/\_.tsx'
const VERSION = '2026.1.12'

// Utility: Convert file path to page/component name
const getPageName = (filePath: string) => {
const base = path.basename(filePath, '.tsx')
return base.replace(/\[|\]/g, '') || 'UnknownPage'
}

// Generate AI-Context block
const generateContext = (pageName: string) => {
const timestamp = new Date().toISOString()
return `/\*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version ${VERSION}
@timestamp ${timestamp}
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA

- PageName: ${pageName} // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE] // ตัวอย่าง: Document Hub, Service Portal
- Version: ${VERSION}
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE] // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

🧩 1. CORE MISSION

- Platform: JP-VisualDocs – High-End Documentation Hub
- Supported Documents: Visa, Financial, Certificates, Business Docs
- Value: Integrity, Efficiency, Trustworthiness
- Outcome: เอกสารต้องตรวจสอบย้อนกลับและรับรองผลได้ทันที
- Real-Time Feedback: Mandatory

🎨 2. DESIGN & UX PRINCIPLES

- Style: Modern Enterprise Minimal
- Colors:
  - primary: #0F172A
  - secondary: #1E293B
  - accent: #059669
  - background: #FAFAF9
- Typography:
  - Font-Sans: H1-H2
  - Font-Thai: Body Text
  - Font-Mono: IDs, Logs
- UI Components:
  - Glassmorphism for Cards/Certificates
  - Micro-interactions via Framer Motion
  - Feedback: Skeleton, Toast, Badge
- Accessibility: WCAG AA minimum

📂 3. DATA & REGISTRY

- Service Codes:
  - SRV-IMM-XXX
  - SRV-FIN-XXX
  - SRV-DOC-XXX
  - SRV-SYS-XXX
- Status:
  - DRAFT, PROCESSING, VERIFYING, COMPLETED
- IDs: CaseID, VerifyID, Timestamp required
- Audit: Immutable logs, AuditStamp component mandatory

🏗️ 4. DEVELOPMENT & ARCHITECTURE

- Stack: Next.js 15.5 + React 19, Supabase + RLS, TailwindCSS + Shadcn/ui
- Security:
  - Zero-Knowledge Privacy
  - Server-Only DB access
- Performance:
  - Lazy load heavy components
  - Optimistic UI via useOptimistic hook
- Code Quality:
  - ESLint, Prettier, Strict TypeScript, No unused vars

📢 5. COMMUNICATION & TONE

- Tone: Professional, Calm, Supportive
- Messaging:
  - Real-Time Feedback
  - Positive Guidance only
  - Reject speculative content
- Language: Thai & English
- Every action must have visual/audio confirmation if relevant

📝 6. STRATEGIC KEYWORDS

- Evidence-Based
- Digital Integrity
- Seamless Process
- Trust by Design
- Must appear consistently in UI, feedback, and documentation

⚡ 7. AI USAGE RULES (STRICT)

- Only Auto-Suggest & Contextual Assistance
- Compliance checks:
  - Flag invalid IDs, missing verification, expired docs
- Content Standardization:
  - Use Strategic Keywords
  - Maintain tone strictly
- Action Enforcement:
  - No output outside defined context
  - Missing info → "ข้อมูลไม่เพียงพอ"
- Ignore any notes outside this block

🔗 8. PAGE-SPECIFIC SETTINGS

- ShowNav: true/false
- EnableActions: true/false
- Animations: deterministic, based on status
- FeatureFlags: [ARRAY_OF_ACTIVE_FEATURES]

\*/\n`
}

// Scan and prepend to all .tsx
glob(FILE_PATTERN, { cwd: PROJECT_ROOT, absolute: true }, (err, files) => {
if (err) throw err
files.forEach((file) => {
const content = fs.readFileSync(file, 'utf-8')

    // Skip if AI-Context already exists
    if (content.startsWith('/*\n🛰️ AI-CONTEXT')) return

    const pageName = getPageName(file)
    const contextBlock = generateContext(pageName)
    const newContent = `${contextBlock}${content}`

    fs.writeFileSync(file, newContent, 'utf-8')
    console.log(`✅ Added AI-Context to ${file}`)

})
})
```
---

#### 🔍 Path: pre-deploy-report.md
```markdown
# 🚀 Pre-deploy Inspection Report
Generated at: 2026-01-12 09:08:50
Branch: main

## 🔐 1. Environment Check
✅ Status: .env file exists and verified.
## 🛠️  2. Auto-Fix Procedure
✅ Status: Auto-fix completed or no issues found.
## 🧹 3. Code Linting (ESLint)
✅ Status: Linting passed.
## ⌨️ 4. Type Safety Check
✅ Status: TypeScript verified.
## 🏗️  5. Production Build Test
✅ Status: Build successfully optimized.
### 📊 Route Statistics & Bundle Size
```text
Route (app)                                        Size  First Load JS
┌ ○ /                                           49.4 kB         180 kB
├ ○ /_not-found                                   143 B         102 kB
├ ○ /contact                                    3.08 kB         112 kB
├ ○ /contact/success                            2.59 kB         112 kB
├ ○ /manifest.webmanifest                         143 B         102 kB
├ ƒ /pass/[id]                                    143 B         102 kB
├ ○ /privacy                                      143 B         102 kB
├ ○ /robots.txt                                   143 B         102 kB
├ ○ /services                                   2.88 kB         133 kB
├ ○ /showcase                                   2.52 kB         114 kB
├ ● /showcase/[slug]                            2.63 kB         115 kB
├   ├ /showcase/retirement-asset-protocol
├   ├ /showcase/sponsor-relationship-proof
├   ├ /showcase/baac-home-acquisition-recovery
├   └ [+3 more paths]
├ ○ /sitemap.xml                                  143 B         102 kB
├ ○ /terms                                        143 B         102 kB
└ ○ /verify                                     4.79 kB         114 kB
+ First Load JS shared by all                    102 kB
  ├ chunks/3c4078ff-db1510ea385e11c8.js         54.2 kB
  ├ chunks/667-fc91a2d66fb02623.js              45.6 kB
  └ other shared chunks (total)                 1.93 kB


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

```

---
## 🏆 Summary Result
### ✅ READY FOR DEPLOY
All protocols verified: Lint passed, Types safe, and Build successful. Deployment is highly recommended.
```
---

#### 🔍 Path: app/globals.css
```css
/** @format */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* =========================================================
 * BASE — JP-VISUALDOCS (CALM / TRUST / DOCUMENT)
 * ========================================================= */
@layer base {
  :root {
    /* CORE */
    --background: #fafaf9; /* Stone-50 */
    --foreground: #0f172a; /* Slate-900 */
    --border: #e5e7eb;

    /* ACCENT (Verified / Completed only) */
    --accent: #059669; /* Emerald-600 */

    /* SIDEBAR */
    --sidebar-background: 210 20% 98%;
    --sidebar-foreground: 222 47% 11%;
    --sidebar-primary: 222 47% 11%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 220 14% 96%;
    --sidebar-accent-foreground: 222 47% 11%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 158 64% 52%;
  }

  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
    background-color: var(--background);
  }

  body {
    @apply bg-[var(--background)] text-[var(--foreground)] antialiased;
    min-height: 100dvh;
    text-rendering: optimizeLegibility;
  }

  * {
    border-color: var(--border);
  }

  /* SCROLLBAR — QUIET */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}

/* =========================================================
 * COMPONENTS — DOCUMENT SYSTEM
 * ========================================================= */
@layer components {
  /* FORM */
  .form-label {
    @apply mb-1 block text-xs font-medium text-slate-600;
  }

  .form-input {
    @apply w-full rounded-md border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20;
  }

  /* BUTTON */
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 rounded-md border bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50;
  }

  /* CARD */
  .card {
    @apply rounded-xl border bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)];
  }

  .card-header {
    @apply flex flex-col space-y-1.5 p-6;
  }

  .card-title {
    @apply font-semibold leading-none tracking-tight;
  }

  .card-description {
    @apply text-muted-foreground text-sm;
  }

  .card-content {
    @apply p-6 pt-0;
  }

  .card-footer {
    @apply flex items-center p-6 pt-0;
  }

  /* STATUS */
  .status-draft {
    @apply text-slate-500;
  }

  .status-processing {
    @apply text-blue-600;
  }

  .status-verifying {
    @apply text-amber-600;
  }

  .status-completed {
    @apply text-emerald-600;
  }

  /* GLASS (LIMITED USE) */
  .glass {
    @apply rounded-xl border border-white/20 bg-white/10 backdrop-blur-[12px];
  }
}

/* =========================================================
 * UTILITIES
 * ========================================================= */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  /* CUSTOM SCROLLBAR FOR COMPONENTS */
  .scrollbar-quiet::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .scrollbar-quiet::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .scrollbar-quiet::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 999px;
  }

  .scrollbar-quiet::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}
```
---

#### 🔍 Path: app/layout.tsx
```typescript
/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.774Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: layout          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/**
 * @format
 * @description ROOT_LAYOUT: Master Architecture — JP-VISUALDOCS
 * ✅ CORE_SYSTEM: โครงสร้างพื้นฐาน + ฟอนต์
 * ✅ ENTERPRISE_CALM: สุภาพ น่าเชื่อถือ เน้นเอกสาร
 */

import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/config/site'
import { Providers } from './providers'
import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/utils'
import { inter, ibmPlexSansThai, jetbrainsMono } from '@/lib/fonts'

import './globals.css'

/* -------------------------------------------------------------------------- */
/* METADATA_ENGINE */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: Array.isArray(siteConfig.seo.keywords) ? [...siteConfig.seo.keywords] : [],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'th_TH',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} – ศูนย์บริหารจัดการเอกสารและการอนุมัติ`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* -------------------------------------------------------------------------- */
/* VIEWPORT_PROTOCOL */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAFAF9', // Stone-50
}

/* -------------------------------------------------------------------------- */
/* MAIN_ARCHITECTURE */
/* -------------------------------------------------------------------------- */

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="th"
      className={cn(
        'scroll-smooth antialiased',
        ibmPlexSansThai.variable,
        inter.variable,
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>

      <body className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)]">
        <Providers>
          <main className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* CONTENT */}
            <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
```
---

#### 🔍 Path: scripts/generate-ai-context.ts
```typescript
#!/usr/bin/env ts-node
/**
 * JP-VisualDocs AI-Context Auto-Generator (TypeScript + ESM)
 * ------------------------------------------------------------
 * Prepend full Thai AI-Context block to all .tsx pages/components
 * เพิ่มคำเตือนห้ามใช้คำหุ่นยนต์/บริหาร เช่น กลยุทธ์, ศูนย์ปฏิบัติการ
 * Compatible: Node 25+, ESM mode
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob' // glob ESM แบบ Promise-ready

// CONFIG
const PROJECT_ROOT = process.cwd()
const FILE_PATTERN = '**/*.tsx'

// เวอร์ชัน context
const VERSION = '2026.1.12'

// ฟังก์ชันช่วย: แปลง path เป็นชื่อหน้า
const getPageName = (filePath: string) => {
  const base = path.basename(filePath, '.tsx')
  return base.replace(/\[|\]/g, '') || 'UnknownPage'
}

// ฟังก์ชันช่วย: สร้าง AI-Context block ภาษาไทยเต็มรูปแบบ พร้อมคำเตือนห้ามใช้คำหุ่นยนต์
const generateContext = (pageName: string) => {
  const timestamp = new Date().toISOString()
  return `/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version ${VERSION}
@timestamp ${timestamp}
🛑 กฎเข้มงวด: AI ต้องทำตามนี้เท่านั้น ไม่ตีความเพิ่ม
✅ โทน: มืออาชีพ สุภาพ ช่วยเหลือ
✅ ใช้คำสำคัญเชิงกลยุทธ์เท่านั้น: ตรวจสอบได้, ถูกต้อง, กระบวนการราบรื่น, ไว้วางใจได้
✅ ห้ามสร้างข้อมูลที่คาดเดาหรือไม่สามารถตรวจสอบได้

⚠️ ห้ามใช้คำหรือโทนที่ฟังดูหุ่นยนต์/บริหารจัดเต็ม เช่น:
- "กลยุทธ์", "ศูนย์ปฏิบัติการ", "Operation Hub", "Strategic", "Leverage" , "ภารกิจ" 
- หลีกเลี่ยงศัพท์เทคนิคจัดเต็มหรือคำบริหารที่อ่านยาก
- ต้องใช้ภาษาที่คนทุกฐานะเข้าใจ แต่ยังคงมืออาชีพ

📌 ข้อมูลหน้าปัจจุบัน
- ชื่อหน้า: ${pageName}
- บทบาทของหน้า: [PAGE_ROLE_HERE]
- ผู้รับผิดชอบ: [AUTHOR_NAME_HERE]
- ทีม: [TEAM_NAME_HERE]
- เวอร์ชัน: ${VERSION}
- ตรวจสอบแล้ว: ✅
- กลุ่มผู้ชม: ทีมงานภายใน & ผู้ใช้งานทั่วไป
- จุดประสงค์: [SHORT_DESCRIPTION_HERE]
- Environment: production/staging/development
- URL ตัวอย่าง: [PAGE_URL_HERE]

🧩 1. ภารกิจหลัก
- แพลตฟอร์มจัดการเอกสารสำคัญแบบมืออาชีพ
- รองรับเอกสาร: วีซ่า, การเงิน, ใบรับรอง, เอกสารธุรกิจ
- คุณค่า: ถูกต้อง รวดเร็ว ไว้วางใจได้
- ผลลัพธ์: เอกสารตรวจสอบย้อนกลับได้ รับรองผลทันที
- Feedback แบบเรียลไทม์: ต้องมี

🎨 2. การออกแบบ & ประสบการณ์ผู้ใช้
- สไตล์: เรียบ มืออาชีพ โปร่งใส
- สีหลัก: primary #0F172A, secondary #1E293B, accent #059669, background #FAFAF9
- ฟอนต์: Sans หัวข้อ, Thai เนื้อหา, Mono รหัส/Log
- UI: การ์ดโปร่งแสง, แอนิเมชันเล็กๆ, Feedback (Skeleton, Toast, Badge)
- การเข้าถึง: รองรับมาตรฐาน WCAG AA

📂 3. ข้อมูล & การลงทะเบียน
- รหัสบริการ: SRV-IMM-XXX, SRV-FIN-XXX, SRV-DOC-XXX, SRV-SYS-XXX
- สถานะเอกสาร: DRAFT, PROCESSING, VERIFYING, COMPLETED
- ต้องมี: CaseID, VerifyID, Timestamp
- Audit: บันทึกไม่แก้ไขได้, ต้องมี AuditStamp component
- Data Sensitivity: Low/Medium/High
- Privacy Notes: Zero-Knowledge enforced
- Audit Required: true/false

🏗️ 4. พัฒนา & สถาปัตยกรรม
- เทคโนโลยี: Next.js + React, Supabase + RLS, TailwindCSS + Shadcn/ui
- ความปลอดภัย: ข้อมูลสำคัญไม่ถูกเปิดเผย, Database เข้าถึงได้เฉพาะ Server
- ประสิทธิภาพ: โหลดชิ้นส่วนหนักแบบ Lazy, ใช้ Optimistic UI
- คุณภาพโค้ด: ESLint, Prettier, Strict TypeScript, ไม่มีตัวแปรไม่ได้ใช้
- Dependencies: [ARRAY_OF_DEPENDENCIES]

📢 5. การสื่อสาร & โทน
- โทน: มืออาชีพ สุภาพ ช่วยเหลือ
- ข้อความ: แจ้งผลทันที, คำแนะนำชัดเจน, ห้ามคาดเดา
- ภาษา: ไทย & อังกฤษ
- ทุกการกระทำต้องมี feedback เห็นหรือฟังได้

📝 6. คำสำคัญเชิงกลยุทธ์
- ตรวจสอบได้
- ถูกต้อง
- กระบวนการราบรื่น
- ไว้วางใจได้
- ต้องปรากฏใน UI, feedback, เอกสาร

⚡ 7. กฎการใช้งาน AI (STRICT)
- ช่วยเสนอขั้นตอนถัดไปและตรวจสอบ context เท่านั้น
- ตรวจสอบ ID, การยืนยัน, เอกสารหมดอายุ
- ปฏิบัติตามโทนและคำสำคัญเคร่งครัด
- หากขาดข้อมูล → แสดง "ข้อมูลไม่เพียงพอ"
- Expected User Actions: [ARRAY_OF_ACTIONS]
- Expected System Feedback: [ARRAY_OF_FEEDBACKS]

📈 8. การวัดผล & Monitoring
- Metrics: LoadTime, UserClicks, FormSubmissions
- Tracking: Enabled/Disabled

🛠️ 9. การจัดการข้อผิดพลาด & Fallback
- ErrorHandling: Skeleton/Toast/ErrorPage
- Fallback: DefaultContent/Redirect

🔗 10. การตั้งค่าเฉพาะหน้า
- แสดงเมนู: true/false
- เปิดการกระทำ: true/false
- แอนิเมชัน: deterministic ตาม status
- ฟีเจอร์พิเศษ: [ARRAY_OF_ACTIVE_FEATURES]

*/
`
}

// MAIN
async function run() {
  try {
    const files = await glob(FILE_PATTERN, { cwd: PROJECT_ROOT, absolute: true })

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')

      // ข้ามไฟล์ที่มี AI-Context แล้ว
      if (content.startsWith('/*\n🛰️ AI-CONTEXT')) continue

      const pageName = getPageName(file)
      const contextBlock = generateContext(pageName)
      const newContent = `${contextBlock}${content}`

      fs.writeFileSync(file, newContent, 'utf-8')
      console.log(`✅ Added AI-Context to ${file}`)
    }
  } catch (err) {
    console.error('❌ Error:', err)
    process.exit(1)
  }
}

run()
```
---

#### 🔍 Path: config/site.ts
```typescript
/** @format */

// 🛠️ IMPORT
import { services } from '@/components/services/serviceData'
import { ALL_CASES } from '@/config/showcase/all-cases'

// 🌐 BASE URL (LOCKED – no trailing slash)
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://jpvisouldocs.online').replace(
  /\/$/,
  '',
)

/**
 * SITE CONFIG — JP VISUAL DOCS
 * DESIGN PRINCIPLE:
 * - จริงจัง / ตรวจสอบได้ / ไม่ขายฝัน
 * - สื่อสารแบบมืออาชีพที่ทำงานหน้างานจริง
 * - ใช้เป็น Single Source of Truth สำหรับ SEO / UI / System Signal
 */
export const siteConfig = {
  // 🏷️ BRAND CORE
  name: 'JP Visual Docs',
  shortName: 'JPVD',
  domain: 'jpvisouldocs.online',
  url: baseUrl,

  // 🎯 BRAND POSITIONING
  description:
    'JP Visual Docs ให้คำปรึกษาและจัดการเอกสารด้านวีซ่าและสินเชื่อ โดยยึดเกณฑ์พิจารณาจริงของหน่วยงานเป็นหลัก วิเคราะห์เคสตรงจุด วางโครงสร้างข้อมูลอย่างมีเหตุผล และควบคุมคุณภาพงานทุกขั้นตอน',

  locale: 'th-TH',
  language: ['th', 'en'] as const,

  // 📦 SERVICE & SHOWCASE
  services,
  showcaseRegistry: ALL_CASES,

  // 👤 AUTHORITY SIGNAL
  author: {
    name: 'เจ้าป่า',
    brand: 'JP Visual Docs',
    role: 'ที่ปรึกษาด้านเอกสารวีซ่าและสินเชื่อ',
    email: 'contact@jpvisouldocs.online',
    contacts: {
      phone: '091-054-0710',
      email: 'contact@jpvisouldocs.online',
    },
  },

  // ⚙️ SYSTEM STATUS (ใช้กับ UI / Footer / Badge)
  system: {
    status: 'ACTIVE',
    label: 'เปิดรับปรึกษาตามปกติ',
    version: '3.3.0',
    indicatorColor: '#FCDE09',
  },

  // 📞 CONTACT
  contact: {
    phone: '091-054-0710',
    phoneFull: '+66910540710',
    lineId: '@462fqtfc',
    lineLink: 'https://lin.ee/ZYTzBaIE',
    email: 'contact@jpvisouldocs.online',
    address: 'กรุงเทพมหานคร, ประเทศไทย',
  },

  // 🌐 SOCIAL
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61575050976562',
    messenger: 'https://m.me/61575050976562',
    line: 'https://lin.ee/ZYTzBaIE',
  },

  // 🔍 SEO / OPEN GRAPH (โทนผู้เชี่ยวชาญ ไม่โอ้อวด)
  seo: {
    titleTemplate: '%s | JP Visual Docs',
    defaultTitle: 'JP Visual Docs – ที่ปรึกษาเอกสารวีซ่าและสินเชื่อ วิเคราะห์เคสตามเกณฑ์จริง',
    description:
      'วิเคราะห์เคสรายบุคคล วางโครงสร้างเอกสารตามเงื่อนไขพิจารณาจริง และดูแลโดยทีมงานที่เชี่ยวชาญงานเอกสารโดยตรง ตรวจสอบได้ทุกขั้นตอน',

    keywords: [
      'ที่ปรึกษาเอกสารวีซ่า',
      'วิเคราะห์เคสวีซ่า',
      'จัดเอกสารวีซ่า',
      'แก้เคสวีซ่าไม่ผ่าน',
      'ที่ปรึกษาสินเชื่อ',
      'จัดเอกสารสินเชื่อ',
      'Visa Consultant Thailand',
      'JP Visual Docs',
    ],

    openGraph: {
      type: 'website',
      locale: 'th_TH',
      url: baseUrl,
      siteName: 'JP Visual Docs',
      title: 'ที่ปรึกษาเอกสารวีซ่าและสินเชื่อ | JP Visual Docs',
      description:
        'บริการวิเคราะห์และจัดการเอกสารโดยยึดเกณฑ์พิจารณาจริง ลดความเสี่ยง และเพิ่มความน่าเชื่อถือของเคส',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'JP Visual Docs – Professional Documentation & Visa Consulting',
        },
      ],
    },
  },

  // 🖼️ ASSETS
  assets: {
    ogImage: `${baseUrl}/images/og-image.jpg`,
    favicon: '/favicon.ico',
    appleTouch: '/apple-touch-icon.png',
    logo: '/images/Logo.webp',
    hero: '/images/hero/HeroBackground.png',
    grid: '/grid-pattern.svg',
  },
} as const

export type SiteConfig = typeof siteConfig
```
---

#### 🔍 Path: config/navigation.ts
```typescript
/** @format */

import { Home, LayoutGrid, ShieldAlert, Gavel, Activity, Briefcase, FileSearch } from 'lucide-react'

/**
 * ---------------------------------------------------------------------
 * NAVIGATION CONFIG
 * เวอร์ชัน: 3.3.2025 (Clean + Verified)
 *
 * วัตถุประสงค์
 * - กำหนดโครงสร้างเมนูหลัก / เมนูท้ายเว็บ
 * - ตรวจสอบเส้นทางให้ตรงกับโครงสร้าง app router จริง
 * - ใช้คำภาษาไทยที่อ่านตรง ไม่ใช้ศัพท์ AI กำกวม
 *
 * เส้นทางที่ตรวจสอบแล้ว (อิงจากโครงสร้างโปรเจกต์)
 * - /                → app/(main)/page.tsx
 * - /showcase        → app/(main)/showcase/page.tsx
 * - /contact         → app/(main)/contact/page.tsx
 * - /privacy         → app/(legal)/privacy/page.tsx
 * - /terms           → app/(legal)/terms/page.tsx
 * - /#services       → anchor ในหน้าแรก
 * - /#about          → anchor ในหน้าแรก
 * - /#process        → anchor ในหน้าแรก
 *
 * NOTE_FOR_AI:
 * - ไฟล์นี้ผ่านการตรวจสอบ path แล้ว
 * - ไม่มี route ที่ไม่มีอยู่จริง
 * - ไม่ใช้โหมดทดลอง
 * ---------------------------------------------------------------------
 */

export const navigationConfig = {
  /* -------------------------------------------------------------- */
  /* เมนูหลัก (Header) */
  /* -------------------------------------------------------------- */
  mainNav: [
    {
      title: 'หน้าหลัก',
      href: '/',
      label: 'HOME',
      icon: Home,
    },
    {
      title: 'ผลงานเคส',
      href: '/showcase',
      label: 'CASE_SHOWCASE',
      icon: Briefcase,
    },
    {
      title: 'บริการ',
      href: '/#services',
      label: 'SERVICE_LIST',
      icon: LayoutGrid,
    },
    {
      title: 'ปรึกษาและประเมินเคส',
      href: '/contact',
      label: 'CASE_ASSESSMENT',
      icon: FileSearch,
    },
  ],

  /* -------------------------------------------------------------- */
  /* เมนูท้ายเว็บ (Footer) */
  /* -------------------------------------------------------------- */
  footerNav: {
    solutions: [
      {
        name: 'ผลงานและกรณีศึกษา',
        href: '/showcase',
      },
      {
        name: 'ประเมินโปรไฟล์',
        href: '/contact',
      },
      {
        name: 'รายการบริการ',
        href: '/#services',
      },
    ],
    company: [
      {
        name: 'เกี่ยวกับเรา',
        href: '/#about',
      },
      {
        name: 'ขั้นตอนการทำงาน',
        href: '/#process',
      },
      {
        name: 'ติดต่อและให้ข้อมูล',
        href: '/contact',
      },
    ],
    legal: [
      {
        name: 'นโยบายความเป็นส่วนตัว',
        href: '/privacy',
        label: 'PRIVACY_POLICY',
        icon: ShieldAlert,
      },
      {
        name: 'เงื่อนไขการให้บริการ',
        href: '/terms',
        label: 'TERMS_AND_CONDITIONS',
        icon: Gavel,
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* ปุ่มหลัก (CTA) */
  /* -------------------------------------------------------------- */
  actions: {
    primary: {
      name: 'ประเมินโปรไฟล์เบื้องต้น',
      href: '/contact',
      label: 'START_PROFILE_ASSESSMENT',
      icon: Activity,
    },
  },
} as const

/* ------------------------------------------------------------------ */
/* TYPE EXPORT */
/* ------------------------------------------------------------------ */

export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.mainNav)[number]
export type FooterNavItem = (typeof navigationConfig.footerNav.solutions)[number]
```
---

#### 🔍 Path: config/theme.ts
```typescript
/** @format */

export const DESIGN_TOKENS = {
  /* ------------------------------------------------------------------
   * COLOR SYSTEM — JP-VISUALDOCS (TRUST / DOCUMENT / ENTERPRISE)
   * ------------------------------------------------------------------ */
  colors: {
    // แกนหลักของระบบ
    primary: '#0F172A', // Slate-900
    secondary: '#1E293B', // Slate-800
    background: '#FAFAF9', // Stone-50

    // ตัวอักษร
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',

    // เส้น / พื้นผิว
    white: '#FFFFFF',
    border: '#E5E7EB',

    // สถานะ (ใช้เชิงความหมายเท่านั้น)
    status: {
      draft: '#64748B',
      processing: '#2563EB',
      verifying: '#D97706',
      completed: '#059669',
      error: '#EF4444',
    },

    // Accent (ใช้เฉพาะ Verified / Completed)
    accent: '#059669',
  },

  /* ------------------------------------------------------------------
   * TYPOGRAPHY — CALM / PROFESSIONAL / READABLE
   * ------------------------------------------------------------------ */
  typography: {
    // หัวข้อหลัก
    h1: 'font-sans text-4xl md:text-5xl font-semibold tracking-tight text-primary',

    // หัวข้อรอง
    h2: 'font-sans text-2xl md:text-3xl font-semibold tracking-tight text-primary',

    // ป้ายอ้างอิง / รหัส / Log
    label: 'font-mono text-xs uppercase tracking-widest text-muted',

    // เนื้อหาหลัก
    body: 'font-thai text-base leading-relaxed text-textSecondary',
  },

  /* ------------------------------------------------------------------
   * DEPTH & SURFACE — SOFT / TRUSTED
   * ------------------------------------------------------------------ */
  shadows: {
    soft: 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
    subtle: 'shadow-[0_4px_12px_rgba(0,0,0,0.06)]',
  },

  /* ------------------------------------------------------------------
   * INTERACTION — QUIET / RESPONSIVE
   * ------------------------------------------------------------------ */
  interaction: {
    transition: 'transition-all duration-200 ease-out',
    hover: 'hover:opacity-90',
  },

  /* ------------------------------------------------------------------
   * GLASS (LIMITED USE)
   * ------------------------------------------------------------------ */
  glass: {
    base: 'bg-white/10 backdrop-blur-[12px] border border-white/20 rounded-xl',
  },
} as const

/* ------------------------------------------------------------------
 * TYPE EXPORT
 * ------------------------------------------------------------------ */
export type DesignTokens = typeof DESIGN_TOKENS
```
---

#### 🔍 Path: config/showcase-types.ts
```typescript
/** @format */

/* ------------------------------------------------------------------ */
/* ENUM / UNION PROTOCOL                                              */
/* ------------------------------------------------------------------ */

export type ArtifactType = 'document' | 'code' | 'diagram' | 'link' | (string & {})

export type ActivityStatus =
  | 'success'
  | 'warning'
  | 'info'
  | 'ANALYZED'
  | 'EXECUTED'
  | 'VERIFIED'
  | (string & {})

export type ClientCategory =
  | 'FREELANCE'
  | 'FAMILY'
  | 'INDIVIDUAL'
  | 'SME_OWNER'
  | 'HNWI'
  | (string & {})

export type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | (string & {})

/* ------------------------------------------------------------------ */
/* ARTIFACT                                                           */
/* ------------------------------------------------------------------ */
/**
 * MODE A: Strict Alignment with Data Files
 * - บังคับ label / type / description
 * - title / url เป็น optional เพื่อรองรับข้อมูลเดิม
 */
export interface Artifact {
  label: string
  type: ArtifactType
  description: string
  title?: string
  url?: string
}

/* ------------------------------------------------------------------ */
/* ACTIVITY LOG                                                       */
/* ------------------------------------------------------------------ */
/**
 * - ใช้ status แบบ Enum-like string
 * - รองรับการ map สีใน UI
 */
export interface ActivityLog {
  day: number
  event: string
  status: ActivityStatus
}

/* ------------------------------------------------------------------ */
/* CASE SHOWCASE                                                      */
/* ------------------------------------------------------------------ */
/**
 * MODE A: Flexible Schema Protocol
 * - ฟิลด์ที่ไม่อยู่ครบทุกไฟล์กำหนดเป็น optional
 * - แก้ปัญหา TS2740 จาก data ไม่ครบ schema
 */
export interface CaseShowcase {
  id: string
  slug: string
  title: string
  executive_summary: string
  client_category: ClientCategory

  /* ---------------- Optional Meta ---------------- */
  description?: string
  date?: string
  status?: string
  category?: string
  tags?: string[]
  image?: string

  /* ---------------- Performance ------------------ */
  stats?: {
    docs_processed?: number | string
    complexity_level: ComplexityLevel
    processing_time?: string
  }

  /* ---------------- Outcome ---------------------- */
  business_outcome?: {
    verdict: string
    authority: string
    official_ref: string
  }

  /* ---------------- Core Data -------------------- */
  technical_strategy: string[]
  artifacts: Artifact[]
  logs: ActivityLog[]
}
```
---

#### 🔍 Path: app/actions/lead-actions.ts
```typescript
/** @format */
'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_UNIFIED_LEAD
 * VERSION: 3.3.1 (Production Ready)
 * ✅ Strategic Keywords: Digital Integrity, Trust by Design, Seamless Process
 */

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ EMAIL_SYSTEM_OFFLINE: Missing RESEND_API_KEY')
    return null
  }
  return new Resend(apiKey)
}

interface LeadData {
  full_name: string
  phone: string
  email: string
  service_type: string
  details: string
  line_id?: string
  assessment_data?: {
    country?: string
    occupation?: string
    history?: string
    target_date?: string
  }
}

interface ActionResponse {
  success: boolean
  ticketId?: string
  name?: string
  error?: string
}

export async function createLead(formData: LeadData): Promise<ActionResponse> {
  try {
    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'

    // Evidence-Based Validation
    if (!supabaseServer) throw new Error('DATABASE_NOT_AVAILABLE')
    if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error('APP_URL_NOT_CONFIGURED')

    // 🎫 TICKET_GENERATION: สร้างรหัสอ้างอิงภายใต้มาตรฐานระบบ
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    const ticketId = `JPV-${randomCode}`

    const { error: dbError } = await supabaseServer.from('leads').insert([
      {
        name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        message: formData.details,
        category: formData.service_type,
        status: 'pending_verification',
        metadata: {
          transmitted_at: new Date().toISOString(),
          protocol_version: 'v3.3.1-unified',
          ticket_id: ticketId,
          verification_level: 0,
          source_type: 'UNIFIED_CONTACT_PORTAL',
          case_profile: formData.assessment_data || null,
          network_context: {
            ip_address: ip,
            user_agent: userAgent,
          },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_INSERT_FAILED: ${dbError.message}`)

    /**
     * 📧 EMAIL_DISPATCH_SYSTEM (Trust by Design)
     */
    if (formData.email) {
      const resend = getResendClient()

      // เราจะไม่ขัดขวาง Process หลักหากระบบอีเมลขัดข้อง แต่จะบันทึก Log แทน
      if (resend) {
        const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?id=${ticketId}&name=${encodeURIComponent(
          formData.full_name,
        )}&verified=true`

        await resend.emails.send({
          from: 'JP Visual & Docs <noreply@jpvisouldocs.online>',
          to: [formData.email],
          subject: `ยืนยันข้อมูลเพื่อเริ่มการประเมินเคส | รหัสอ้างอิง ${ticketId}`,
          html: `  
            <div style="font-family: sans-serif; background:#ffffff; padding:40px 20px; color:#020617;">  
              <div style="max-width:500px; margin:0 auto; border:4px solid #020617; padding:40px;">  
                <h1 style="font-size:24px; font-weight:900; text-transform:uppercase; font-style:italic; margin-bottom:20px;">Verification_Required</h1>
                <p style="font-size:14px; line-height:1.6;">เรียน คุณ ${formData.full_name}</p>
                <p style="font-size:14px; line-height:1.6;">โปรดยืนยันข้อมูลผ่านลิงก์ด้านล่างเพื่อเริ่มกระบวนการวิเคราะห์เคส:</p>
                <div style="margin:30px 0;">
                  <a href="${verifyUrl}" style="background:#020617; color:#FCDE09; padding:15px 25px; text-decoration:none; font-weight:bold; display:inline-block;">CONFIRM_IDENTITY</a>
                </div>
                <p style="font-size:12px; color:#64748b;">Ticket ID: ${ticketId}</p>
              </div>
            </div>  
          `,
        })
      }
    }

    revalidatePath('/admin/leads')

    return {
      success: true,
      ticketId,
      name: formData.full_name,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_SYSTEM_ERROR'
    console.error('🚨 ACTION_CRITICAL_FAILURE:', message)

    return {
      success: false,
      error: message,
    }
  }
}
```
---

#### 🔍 Path: components/services/serviceData.ts
```typescript
/** @format */
import {
  FileSearch,
  PenTool,
  Plane,
  TrendingUp,
  Layers,
  CreditCard,
  FileText,
  LucideIcon,
} from 'lucide-react'

// --- 1. DATA_INTERFACES (Type Safety Full Coverage) ---
export interface ServicePrice {
  base: string
  suffix?: string
}

export interface ServiceTechnical {
  highlight: string
  protocol: string[]
  status: 'OPERATIONAL' | 'HIGH_DEMAND' | 'DEVELOPMENT' | 'SYSTEM_CHECK'
}

export interface ServiceItem {
  id: string
  code: string
  category: 'IMMIGRATION' | 'FINANCIAL' | 'DOCUMENTATION' | 'INFRASTRUCTURE' | 'SYSTEMS'
  type: string
  icon: LucideIcon
  image: string
  title: string
  description: string
  price: ServicePrice
  cta: {
    label: string
    action: string
  }
  technical: ServiceTechnical
}

// --- 2. CORE_SERVICE_REGISTRY v3.3.1 ---
export const services: ServiceItem[] = [
  {
    id: 'loan-strategy-001',
    code: 'SRV-FIN-01',
    category: 'FINANCIAL',
    type: 'GEN_ASSET',
    icon: TrendingUp,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ที่ปรึกษาสินเชื่อส่วนบุคคลและธุรกิจ',
    description:
      'ช่วยวิเคราะห์โปรไฟล์และเลือกแผนที่เหมาะสมที่สุด จัดชุดเอกสารให้ครบตามเงื่อนไขแบงก์ ดูแลการยื่นกู้ให้แบบมืออาชีพโดยที่คุณไม่ต้องจัดการเอง',
    price: { base: 'X,XXX' },
    cta: { label: 'คุยแผนการกู้', action: '/contact?ref=loan' },
    technical: {
      highlight: 'LOAN_STRATEGY',
      protocol: ['เช็กโปรไฟล์', 'เตรียมเอกสาร', 'ส่งยื่นมืออาชีพ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'travel-booking-001',
    code: 'SRV-IMM-01',
    category: 'IMMIGRATION',
    type: 'VISA_ASSET',
    icon: Plane,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ตั๋วเครื่องบินและโรงแรม (ตรวจสอบได้จริง)',
    description:
      'จัดการจองตั๋วและที่พักทั่วโลก พร้อม E-booking และ Google ค้นหาสถานะจริง การันตีงานด่วนจบไวภายใน 1 วัน',
    price: { base: 'ราคาพิเศษ' },
    cta: { label: 'เช็กราคาห้องพัก/ตั๋ว', action: '/contact?ref=booking' },
    technical: {
      highlight: 'REAL_TIME_BOOKING',
      protocol: ['จองผ่านระบบ', 'ยืนยันสถานะ', 'ส่งใบจองทางการ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'legal-writing-001',
    code: 'SRV-DOC-01',
    category: 'DOCUMENTATION',
    type: 'GEN_ASSET',
    icon: PenTool,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ร่างจดหมายสำคัญโดยผู้เชี่ยวชาญ',
    description:
      'รับเขียนจดหมาย Cover Letter หรือจดหมายรับรอง/สปอนเซอร์ ทั้งไทยและอังกฤษ ปรับโทนให้น่าเชื่อถือ เพิ่มโอกาสผ่านได้จริง',
    price: { base: '1,000' },
    cta: { label: 'เริ่มร่างเนื้อหา', action: '/contact?ref=writing' },
    technical: {
      highlight: 'PROFESSIONAL_CONTENT',
      protocol: ['คุยเนื้อหาหลัก', 'เรียบเรียงภาษา', 'ส่งเล่มจริง'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'visa-work-001',
    code: 'SRV-IMM-02',
    category: 'IMMIGRATION',
    type: 'VISA_ASSET',
    icon: FileSearch,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ดูแลเอกสารยื่นวีซ่า (สายทำงาน)',
    description:
      'จัดชุดเอกสารครบและเนี้ยบที่สุด ปรับข้อมูลให้สอดคล้องเกณฑ์ประเทศปลายทาง ผลลัพธ์ผ่านฉลุยไม่มีสะดุด',
    price: { base: 'X,XXX' },
    cta: { label: 'ปรึกษาการยื่น', action: '/contact?ref=visa' },
    technical: {
      highlight: 'VISA_PREPARATION',
      protocol: ['เช็กเอกสารเดิม', 'เติมส่วนขาด', 'จัดชุดพร้อมยื่น'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'doc-creation-001',
    code: 'SRV-DOC-02',
    category: 'DOCUMENTATION',
    type: 'GEN_ASSET',
    icon: FileText,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'แก้ไขและจัดหาเอกสารเฉพาะทาง',
    description:
      'ปรับแก้หรือสร้างเอกสารใหม่ตามโจทย์ จัดหาเอกสารแม่นยำ งานเนียนและรวดเร็ว สำหรับงานด่วนพิเศษ',
    price: { base: '450', suffix: '- 8XX' },
    cta: { label: 'ส่งโจทย์ให้แอดมิน', action: '/contact?ref=doc-fix' },
    technical: {
      highlight: 'CUSTOM_DOCUMENT',
      protocol: ['รับบรีฟละเอียด', 'ดำเนินการผลิต', 'เช็กความถูกต้อง'],
      status: 'HIGH_DEMAND',
    },
  },
  {
    id: 'vifily-system-001',
    code: 'SRV-SYS-01',
    category: 'SYSTEMS',
    type: 'GEN_ASSET',
    icon: Layers,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'เอกสารรับรองดิจิทัล (Vifily)',
    description:
      'สร้างความมั่นใจระดับสากลด้วย Vifily ออกเอกสารรับรองพร้อม QR Code ตรวจสอบโปรไฟล์ได้ทั่วโลก',
    price: { base: 'XXX', suffix: '- X,XXX' },
    cta: { label: 'เปิดระบบ Vifily', action: '/contact?ref=vifily' },
    technical: {
      highlight: 'DIGITAL_VERIFY',
      protocol: ['อัปโหลดฐานข้อมูล', 'สร้าง QR พิเศษ', 'เปิดระบบเช็กสถานะ'],
      status: 'OPERATIONAL',
    },
  },
  {
    id: 'card-production-001',
    code: 'SRV-INF-01',
    category: 'INFRASTRUCTURE',
    type: 'GEN_ASSET',
    icon: CreditCard,
    image:
      'https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/Service/mail-service.webp',
    title: 'ผลิตบัตรจริงเกรดพรีเมียม',
    description:
      'งานพิมพ์คุณภาพสูง พร้อมระบบจัดส่งรัดกุมและเป็นส่วนตัว เพื่อความปลอดภัยและเป็นความลับสูงสุด',
    price: { base: 'X,XXX' },
    cta: { label: 'ดูตัวอย่างบัตร', action: '/contact?ref=card' },
    technical: {
      highlight: 'SECURE_PRODUCTION',
      protocol: ['สรุปแบบบัตร', 'ผลิตชิ้นงานจริง', 'ส่งมอบส่วนตัว'],
      status: 'OPERATIONAL',
    },
  },
]
```
---

#### 🔍 Path: tailwind.config.ts
```typescript
/** @format */
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      /* ===============================
       * JP-VISUALDOCS COLOR SYSTEM
       * =============================== */
      colors: {
        primary: '#0F172A', // Slate-900
        secondary: '#1E293B', // Slate-800
        accent: '#059669', // Emerald-600 (Verified / Completed only)
        background: '#FAFAF9', // Stone-50

        border: '#E5E7EB',
        muted: '#64748B',

        status: {
          draft: '#64748B',
          processing: '#2563EB',
          verifying: '#D97706',
          completed: '#059669',
        },
      },

      /* ===============================
       * TYPOGRAPHY
       * =============================== */
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-thai)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      /* ===============================
       * GLASS & DEPTH SYSTEM
       * =============================== */
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        subtle: '0 4px 12px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '14px',
      },

      /* ===============================
       * MOTION SYSTEM (CALM / PROFESSIONAL)
       * =============================== */
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate],
}

export default config
```
---

#### 🔍 Path: tsconfig.json
```json
/** @format */
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node", // หรือใช้ "bundler" สำหรับ Next.js 15
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/config/*": ["config/*"],
      "@/components/*": ["components/*"],
      "@/data/*": ["data/*"],
      "@/app/*": ["app/*"],
      "@/types/*": ["types/*"],
      "@/lib/*": ["lib/*"],
      "@/content/*": ["content/*"],
      "@/*": ["*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "config/**/*.ts",
    "content/**/*.ts",
    "app/**/*.ts", // เพิ่มเพื่อให้มั่นใจว่าไฟล์ใน app router ถูก track ทั้งหมด
    "components/**/*.tsx"
  ],
  "exclude": ["node_modules"]
}
```
---

#### 🔍 Path: package.json
```json
{
  "name": "jp-visouldocs",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.89.0",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.26",
    "glob": "^13.0.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.468.0",
    "next": "15.5.7",
    "next-themes": "^0.4.6",
    "papaparse": "^5.5.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-hook-form": "^7.69.0",
    "resend": "^6.6.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^13.0.0",
    "zod": "^4.2.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.3",
    "@eslint/js": "^9.39.2",
    "@next/eslint-plugin-next": "15.5.7",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20.17.10",
    "@types/papaparse": "^5.5.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "@typescript-eslint/eslint-plugin": "^8.50.1",
    "@typescript-eslint/parser": "^8.50.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.39.2",
    "eslint-config-next": "15.5.7",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1",
    "globals": "^16.5.0",
    "knip": "^5.77.1",
    "postcss": "^8.4.49",
    "postcss-load-config": "^6.0.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2"
  }
}
```
---

#### 🔍 Path: next.config.ts
```typescript
import type { NextConfig } from 'next'

/**
 * @description THE_MASTER_ARCHITECT_CONFIG:
 * ปรับแต่งเพื่อความเนียนระดับ Industrial Sharp และความปลอดภัยสูงสุด
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    // 🟢 เน้นคุณภาพรูปภาพที่เหมาะสมสำหรับงาน High-end Visuals
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      // 🟢 จัดการช่องโหว่การดึงภาพจาก Supabase ทั้งโปรเจกต์เก่าและใหม่
      {
        protocol: 'https',
        hostname: 'dpgmfbnzyhnhwzyozoxe.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'ksiobbrextlywypdzaze.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.jpvisouldocs.online',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // 🟢 ทางลัดพิเศษ: ลด Bundle Size โดยการ Optimize การดึงไอคอน
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
```
---

#### 🔍 Path: components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```
---

#### 🔍 Path: .env
```text
# .env.local

# = "********"
# Supabase Client (Public - ใช้ใน Browser / Next.js Client)
# = "********"

NEXT_PUBLIC_BASE_URL= "********"

NEXT_PUBLIC_SUPABASE_URL= "********"
NEXT_PUBLIC_SUPABASE_ANON_KEY= "********"

# = "********"
# Supabase Server (Secret - ใช้ใน Server Actions / API Routes)
# = "********"
SUPABASE_URL= "********"
# Key ที่ถูกต้อง (251 ตัวอักษร) สำหรับ Service Role
SUPABASE_SERVICE_ROLE_KEY= "********"
SUPABASE_JWT_SECRET= "********"

# = "********"
# NextAuth (ถ้าใช้)
# = "********"
NEXTAUTH_URL= "********"
NEXTAUTH_SECRET= "********"

# = "********"
# PostgreSQL Database URLs & Credentials
# = "********"
# มั่นใจว่า URL ที่ซับซ้อนถูกคร่อมด้วยอัญประกาศคู่เสมอ
POSTGRES_URL= "********"
POSTGRES_URL_NON_POOLING= "********"
POSTGRES_PRISMA_URL= "********"

# Credentials
POSTGRES_USER= "********"
POSTGRES_PASSWORD= "********"
POSTGRES_HOST= "********"
POSTGRES_DATABASE= "********"

# = "********"
# Application Settings (FIXED & REQUIRED for new code)
# = "********"

# 1. รหัสลับสำหรับตรวจสอบสิทธิ์ Admin ใน Middleware (Cookie Check)
ADMIN_SECRET_ID_TOKEN= "********"

# 2. API Key สำหรับการออกเอกสาร (POST /api/issue-document)
ADMIN_API_KEY= "********"

# 3. ชื่อ Bucket สำหรับการจัดเก็บไฟล์ PDF (ต้องตรงกับชื่อใน Supabase Storage)
SUPABASE_BUCKET_NAME= "********"

# = "********"
# Resend Email Service
# = "********"
RESEND_API_KEY= "********"
NEXT_PUBLIC_APP_URL= "********"
```
---

## 📝 บทสรุป
การสแกนเสร็จสิ้น ข้อมูลถูกจัดรูปแบบให้ AI ประมวลผลได้ทันที
. Format code in: Optimized
