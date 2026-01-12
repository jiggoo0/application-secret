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
