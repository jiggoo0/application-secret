🤖 AI Context: JP-VISOUL-DOCS Project Spec
Project Name: JP-VISOUL-DOCS (High-Fidelity Document Factory)
Tech Stack: Next.js 15 (App Router), TypeScript/JSX, Tailwind CSS, Supabase, PDFKit/PDFMake.

1. Design Tokens (Industrial Neobrutalism)

- Visual Identity: Bold, Engineered, High-Contrast.
- Border: 2px or 4px solid #0f172a (Slate-900). No rounded corners (rounded-none).
- Shadow: Hard shadows ONLY. box-shadow: 4px 4px 0px 0px #0f172a; (No blur).
- Typography: \* Headlines: Font Prompt, Black (900), Italic, Tracking-tighter.
  - Body: Font Inter, Medium (500).
  - Documents: Font TH Sarabun New (Standard Thai Formal).
- Palette: Background #ffffff, Accents #2563eb (Electric Blue), Neutral #0f172a.

2. Architecture Context

- Directory Structure:
  - /app: Next.js 15 App Router (UI & Logic).
  - /generator: Independent Node.js PDF Engine (PDFKit/PDFMake).
  - /components/ui: Custom Shadcn-style neobrutalist components.
  - /components/business: Domain-specific logic (DTI Calc, File Upload).
- Data Flow: Uses Server Actions for DTI & Lead Management. Integrated with Supabase API for storage and DB persistence.
- Verification System: Token-based document verification via verify/[token] routes.

3. Coding Principles

- Layer Separation: Business logic (Data) must be normalized (normalize.ts) before reaching the View layer (Variant Templates).
- Performance: Use next/image for all assets. Implement loading.tsx and error.tsx for all dynamic routes.
- SEO: Metadata must include JSON-LD (Schema.org) for ProfessionalServices and dynamic OpenGraph images.
  🛠️ Quick Command for AI Implementation
  "Based on the JP-VISOUL-DOCS context, create a [Component Name] that follows the Industrial Neobrutalism design (Slate-900 borders, hard shadows, 0px radius). Ensure it is compatible with Next.js 15 Server Components and uses Tailwind CSS utility classes."
  Next Step:
  ตอนนี้ AI ตัวโปรดของคุณจะเข้าใจแล้วว่า "ห้ามใช้มน (Rounded)" และ "ต้องมีเส้นขอบหนา" เสมอ
  คุณต้องการให้ผมช่วยร่างชุดคำสั่ง (System Prompt) สำหรับเอาไปใส่ใน Custom GPT เพื่อให้มันเป็น "JP-VISOUL Specialist" เลยไหมครับ?
