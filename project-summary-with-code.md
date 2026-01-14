# 📑 Project Context Summary (Full Scan)
_Generated on: **2026-01-15 03:20:10**_
> **Status:** Production-Ready Analysis | Full System Context | De-indexing Focus

## 🔴 1. Project Health & Deployment Readiness
✅ **READY FOR DEPLOY:** The project meets all production standards.

### 📍 Production Route Map
```text
```text
Route (app)                                 Size  First Load JS
┌ ○ /                                    11.1 kB         167 kB
├ ○ /_not-found                            995 B         103 kB
├ ○ /about                               3.16 kB         155 kB
├ ƒ /api/auth/callback                     129 B         102 kB
├ ○ /blog                                  173 B         110 kB
├ ƒ /blog/[slug]                           486 B         107 kB
├ ○ /careers                             1.08 kB         151 kB
├ ○ /contact                               129 B         102 kB
├ ○ /faq                                 3.66 kB         159 kB
├ ○ /privacy                             1.07 kB         148 kB
├ ○ /services                            4.82 kB         123 kB
├ ● /services/[slug]                       163 B         105 kB
├   ├ /services/tourist-visa
├   ├ /services/business-registration
├   └ /services/certified-translation
├ ƒ /services/request                    57.7 kB         195 kB
├ ○ /sitemap.xml                           129 B         102 kB
└ ○ /support                             1.08 kB         151 kB
+ First Load JS shared by all             102 kB
  ├ chunks/7f97a788-70f696b0503e8e6b.js  54.2 kB
  ├ chunks/919-cb094919e5c4c4d2.js       45.5 kB
  └ other shared chunks (total)          1.93 kB
ƒ Middleware                             80.2 kB
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
```

## 📊 2. File Statistics by Extension
```text
     44 tsx
     17 ts
      4 sh
      3 jpg
      1 mdx
      1 md
      1 css
```

## 📁 3. Directory Structure (Architecture Tree)
```text
📂 app/
  📂 (auth)/
  📂 (dashboard)/
  📂 services/
    📄 page.tsx
    📂 [slug]/
      📄 page.tsx
    📂 request/
      📄 page.tsx
    📂 _archive/
      📂 visa/
        📄 page.tsx
      📂 legal/
        📄 page.tsx
  📂 api/
    📂 auth/
      📂 callback/
        📄 route.ts
  📄 layout.tsx
  📄 page.tsx
  📄 globals.css
  📄 sitemap.ts
  📂 blog/
    📄 page.tsx
    📂 [slug]/
      📄 page.tsx
  📂 (marketing)/
    📂 about/
      📄 page.tsx
    📂 contact/
      📄 page.tsx
  📂 privacy/
    📄 page.tsx
  📂 careers/
    📄 page.tsx
  📂 support/
    📄 page.tsx
  📂 faq/
    📄 page.tsx
📂 actions/
  📄 documentActions.ts
  📄 authActions.ts
📂 components/
  📂 ui/
    📄 button.tsx
    📄 card.tsx
    📄 typography.tsx
    📄 accordion.tsx
    📄 badge.tsx
    📄 input.tsx
    📄 textarea.tsx
    📄 skeleton.tsx
    📄 navigation-menu.tsx
    📄 sonner.tsx
    📄 tabs.tsx
    📄 label.tsx
    📄 form.tsx
    📄 checkbox.tsx
    📄 tooltip.tsx
    📄 sheet.tsx
    📄 select.tsx
  📂 shared/
    📄 Navbar.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 HeroSection.tsx
    📄 FaqSection.tsx
    📄 AboutSection.tsx
    📄 Icons.tsx
  📂 forms/
    📄 ServiceRequestForm.tsx
  📂 cards/
    📄 ServiceCard.tsx
  📂 templates/
    📄 CategoryArchiveTemplate.tsx
  📂 seo/
    📄 JsonLd.tsx
📂 lib/
  📂 validations/
    📄 documentSchema.ts
  📄 utils.ts
  📂 supabase/
    📄 client.ts
    📄 server.ts
    📄 middleware.ts
  📄 mdx.ts
📂 hooks/
  📄 use-auth.ts
📂 types/
  📄 index.ts
  📄 database.types.ts
📂 scripts/
  📂 dev/
    📄 backup-project.sh
    📄 project-summary.sh
    📄 tree-projects.sh
  📄 pre-deploy-check.sh
📂 public/
  📂 fonts/
  📂 images/
    📂 blog/
      📄 visa-prep.jpg
      📄 business-reg.jpg
    📄 about-team.jpg
📂 data/
📂 constants/
  📄 theme.ts
  📄 navigation.ts
  📄 services-data.ts
📂 providers/
  📄 AppProvider.tsx
📂 content/
  📂 guides/
  📂 blog/
    📄 sample-post.mdx
    📄 first-post.md
  📄 faq-data.ts
```

## 📄 4. Critical Code Analysis & Environment
#### 🔍 Path: `ai-context.md`
```markdown
# Project Context: JP-VISOUL-DOCS
**Version:** 2.0.0 (Expanded)
**Last Updated:** 2026-01-14
**Scope:** Branding, Design System, Technical Architecture, and Operational Protocol

---

## 1. Project Identity & Vision (อัตลักษณ์และวิสัยทัศน์)
* **Name:** JP-VISOUL-DOCS
* **Core Concept:** "สะพานเชื่อมโอกาส ผ่านงานเอกสารที่โปร่งใส"
* **Mission:** ลดความเหลื่อมล้ำในการเข้าถึงบริการด้านเอกสาร ราชการ และกฎหมาย เปลี่ยนเรื่องซับซ้อนให้เป็นเรื่องง่ายที่ใครๆ ก็เข้าถึงได้ (Democratizing Document Services).
* **Target Audience:** ครอบคลุมทุก Segment ในไทย
    * **General:** พ่อค้าแม่ค้า, แรงงาน, ผู้สูงอายุ (เน้นคุยง่าย ไว้ใจได้)
    * **Pro:** นักศึกษา, คนทำงาน, เจ้าของธุรกิจ (เน้นความเร็ว ความถูกต้อง)

## 2. Persona & Voice (บุคลิกและน้ำเสียง)
**Persona:** "The Empathetic Expert" (ผู้เชี่ยวชาญที่เข้าใจหัวอกลูกค้า)
* **Tone:** สุภาพ (Polite), อบอุ่น (Warm), มั่นคง (Stable), ไม่ตัดสิน (Non-judgmental).
* **Language Rules:**
    * **Simplicity:** ห้ามใช้ศัพท์ราชการ/กฎหมาย โดยไม่มีคำแปลง่ายๆ กำกับ
    * **Standard:** ใช้ภาษาไทยมาตรฐาน สุภาพ แต่ไม่แข็งกระด้าง (Semi-formal)
    * **Directness:** บอกราคาและขั้นตอนตรงไปตรงมา ไม่หมกเม็ด
* **Keyword Strategy:** "ดูแล", "สบายใจ", "ถูกต้อง", "รวดเร็ว", "มาตรฐาน"
* **Forbidden:** คำสแลงวัยรุ่นเกินพอดี, คำขู่ให้กลัว, หรือการดูถูกความไม่รู้ของผู้ใช้

## 3. Design System & Visuals (ระบบการออกแบบ)
* **Theme Concept:** "Reliable Warmth" (ความน่าเชื่อถือที่สัมผัสได้)
* **Color Palette:**
    * **Primary:** `Navy Blue` (#0A192F) - สื่อถึงความมั่นคง กฎหมาย ความเป็นมืออาชีพ
    * **Secondary:** `Bright Blue` (#0070F3) - สื่อถึงเทคโนโลยีและความรวดเร็ว
    * **Accent/Action:** `Warm Amber` (#F59E0B) - สื่อถึงความเป็นมิตร พลังงาน และการบริการ
    * **Background:** `Off-White` (#FAFAF9) - ลดแสงสะท้อน อ่านสบายตากว่าสีขาวล้วน
* **Typography:**
    * **Headings:** `IBM Plex Sans Thai` (ทันสมัย เป็นสากล)
    * **Body:** `Sarabun` หรือ `Niramit` (คุ้นเคย อ่านง่ายสำหรับผู้ใหญ่ รองรับภาษาไทยได้ดีเยี่ยม)

## 4. UX/UI Architecture (สถาปัตยกรรมประสบการณ์ผู้ใช้)
* **Mobile-First:** ออกแบบให้ใช้งานบนมือถือเป็นหลัก (เนื่องจากกลุ่มเป้าหมายส่วนใหญ่ใช้มือถือ)
* **Navigation:** เมนูต้องไม่ซับซ้อน (Simple Hierarchy)
    * *Home / บริการของเรา / เช็คสถานะงาน / ติดต่อเรา*
* **Key Components:**
    * **Service Cards:** การ์ดเมนูขนาดใหญ่ ไอคอนชัดเจน
    * **Floating Action Button (FAB):** ปุ่มติดต่อด่วน (Line/โทร) มุมขวาล่างเสมอ
    * **Progress Tracker:** หน้าเช็คสถานะงานที่ดูง่ายเหมือนเช็คพัสดุ (Received > Processing > Completed)

## 5. Service Portfolio Structure (โครงสร้างบริการ)
จัดกลุ่มบริการให้สอดคล้องกับ "เป้าหมายชีวิต" ของลูกค้า มากกว่าชื่อเอกสาร:
1.  **กลุ่มเดินทาง & ต่างประเทศ:** วีซ่า (ท่องเที่ยว/คู่หมั้น), แปลเอกสาร, รับรองกงสุล
2.  **กลุ่มธุรกิจ & กฎหมาย:** จดทะเบียนบริษัท, จดทะเบียนการค้า, เครื่องหมายการค้า
3.  **กลุ่มครอบครัว & ส่วนตัว:** เปลี่ยนชื่อ-สกุล, จดทะเบียนสมรส/หย่า, พินัยกรรม
4.  **Special Services:** บริการเร่งด่วน (Fast Track), บริการรับ-ส่งเอกสาร (Messenger)

## 6. Security & Data Privacy (ความปลอดภัยและข้อมูลส่วนตัว)
**Priority:** สูงสุด (เนื่องจากจัดการข้อมูลอ่อนไหว)
* **Encryption:** ข้อมูลลูกค้าทั้งหมด (บัตร ปชช., พาสปอร์ต) ต้องเข้ารหัส (End-to-End Encryption) ทั้งขณะส่งและจัดเก็บ
* **Auto-Purge Policy:** มีระบบแจ้งลบไฟล์เอกสารอัตโนมัติเมื่อจบงานตามระยะเวลาที่กำหนด (PDPA Compliance)
* **Consent:** ขออนุญาตการใช้ข้อมูลอย่างชัดเจน ไม่ซ่อนในเงื่อนไขตัวเล็กๆ
* **User Trust:** แสดง Badge ความปลอดภัย (SSL, PDPA Verified) ให้เห็นชัดเจนในหน้าชำระเงินและหน้าอัปโหลด

## 7. Technical Stack (เทคโนโลยีที่ใช้)
* **Frontend:** Next.js 15 (App Router) - เพื่อ SEO และ Performance ระดับสูง
* **Styling:** Tailwind CSS 4.0 - เพื่อความคล่องตัวและไฟล์ขนาดเล็ก
* **UI Library:** Shadcn/UI + Lucide Icons - เรียบง่าย เข้าถึงได้ (Accessible)
* **Animation:** Framer Motion - ใช้ Micro-interaction นุ่มนวล ไม่หวือหวาจนเวียนหัว
* **Backend/Database:** Supabase หรือ PostgreSQL (เน้น Row Level Security)
* **Hosting:** Vercel (Edge Network เพื่อความเร็วทั่วไทย)

## 8. SEO & Content Strategy (กลยุทธ์เนื้อหา)
* **Goal:** เป็น "คลังความรู้สามัญประจำบ้าน" เรื่องเอกสาร
* **Content Type:**
    * **How-to Guides:** "วิธีขอวีซ่าญี่ปุ่น 2026", "จดทะเบียนร้านค้าต้องใช้อะไรบ้าง"
    * **FAQ:** ตอบคำถามที่คนไม่กล้าถามเจ้าหน้าที่รัฐ
* **SEO Structure:** ใช้ Schema Markup สำหรับ `Service` และ `FAQPage` เพื่อให้ Google แสดงผลได้ดีที่สุด
* **Tone in Content:** เหมือนพี่สอนน้อง หรือเพื่อนแนะนำเพื่อน ไม่ใช่ตำราเรียน

## 9. Customer Support Operations (ระบบดูแลลูกค้า)
* **Hybrid Model:** AI Chatbot (ตอบคำถามพื้นฐาน 24ชม.) + Human Agent (เคสซับซ้อน/ผู้สูงอายุ)
* **Channels:** เน้น Line OA เป็นหลัก (คนไทยถนัดสุด) รองลงมาคือ Facebook Messenger
* **Communication Standard:**
    * ตอบกลับภายใน 5 นาที (ในเวลาทำการ)
    * อัปเดตสถานะงานเชิงรุก (Proactive Update) ไม่ต้องรอให้ลูกค้าทวง

## 10. Developer & Implementation Protocol (ข้อปฏิบัติสำหรับนักพัฒนา)
* **Code Quality:** เขียน Code แบบ Clean Architecture แยก Logic ออกจาก UI
* **Accessibility (a11y):** ต้องรองรับ Screen Reader, สี Contrast ผ่านเกณฑ์ WCAG AA, ปุ่มต้องใหญ่พอสำหรับนิ้วมือ
* **Error Handling:** ห้ามโชว์ Error Code (เช่น 500, 404) ให้ User เห็น ให้ใช้ข้อความภาษาไทยที่สุภาพ เช่น "ขออภัย ระบบขัดข้องชั่วคราว ทีมงานกำลังแก้ไข"
* **Performance:** คะแนน Lighthouse (Mobile) ต้อง > 90 ในทุกหัวข้อ
```
---

#### 🔍 Path: `SupabaseSQL.md`
```sql
| table_name        | column_name   | data_type                | is_nullable | column_default               |
| ----------------- | ------------- | ------------------------ | ----------- | ---------------------------- |
| documents         | id            | uuid                     | NO          | gen_random_uuid()            |
| documents         | type          | text                     | NO          | null                         |
| documents         | ref_id        | text                     | NO          | null                         |
| documents         | status        | text                     | NO          | 'pending'::text              |
| documents         | qr_token      | text                     | NO          | null                         |
| documents         | pdf_url       | text                     | YES         | null                         |
| documents         | created_at    | timestamp with time zone | NO          | now()                        |
| documents         | updated_at    | timestamp with time zone | NO          | now()                        |
| documents         | metadata      | jsonb                    | YES         | null                         |
| leads             | id            | uuid                     | NO          | gen_random_uuid()            |
| leads             | created_at    | timestamp with time zone | NO          | timezone('utc'::text, now()) |
| leads             | name          | text                     | NO          | null                         |
| leads             | email         | text                     | YES         | null                         |
| leads             | phone         | text                     | YES         | null                         |
| leads             | message       | text                     | YES         | null                         |
| leads             | template_id   | text                     | YES         | null                         |
| leads             | category      | text                     | YES         | null                         |
| leads             | source_url    | text                     | YES         | null                         |
| leads             | status        | text                     | YES         | 'new'::text                  |
| leads             | admin_notes   | text                     | YES         | null                         |
| leads             | metadata      | jsonb                    | YES         | '{}'::jsonb                  |
| leads             | updated_at    | timestamp with time zone | YES         | timezone('utc'::text, now()) |
| product_stocks    | id            | uuid                     | NO          | uuid_generate_v4()           |
| product_stocks    | product_id    | uuid                     | YES         | null                         |
| product_stocks    | account_data  | text                     | NO          | null                         |
| product_stocks    | status        | text                     | YES         | 'available'::text            |
| product_stocks    | created_at    | timestamp with time zone | YES         | now()                        |
| product_stocks    | sold_at       | timestamp with time zone | YES         | null                         |
| products          | id            | uuid                     | NO          | uuid_generate_v4()           |
| products          | name          | text                     | NO          | null                         |
| products          | category      | text                     | NO          | null                         |
| products          | price         | double precision         | NO          | null                         |
| products          | description   | text                     | YES         | null                         |
| products          | created_at    | timestamp with time zone | YES         | now()                        |
| reviews           | id            | uuid                     | NO          | gen_random_uuid()            |
| reviews           | photo         | text                     | YES         | null                         |
| reviews           | name          | text                     | NO          | null                         |
| reviews           | author        | text                     | NO          | null                         |
| reviews           | text          | text                     | NO          | null                         |
| reviews           | rating        | smallint                 | NO          | null                         |
| reviews           | created_at    | timestamp with time zone | YES         | timezone('utc'::text, now()) |
| uploads           | id            | uuid                     | NO          | gen_random_uuid()            |
| uploads           | user_email    | text                     | NO          | null                         |
| uploads           | path          | text                     | NO          | null                         |
| uploads           | type          | text                     | YES         | null                         |
| uploads           | name          | text                     | YES         | null                         |
| uploads           | status        | text                     | YES         | 'pending'::text              |
| uploads           | created_at    | timestamp with time zone | YES         | now()                        |
| uploads           | extension     | text                     | YES         | null                         |
| uploads           | folder        | text                     | YES         | null                         |
| uploads           | size          | bigint                   | YES         | null                         |
| user_sessions     | id            | uuid                     | NO          | gen_random_uuid()            |
| user_sessions     | user_id       | text                     | NO          | null                         |
| user_sessions     | action        | text                     | NO          | null                         |
| user_sessions     | ip_address    | text                     | YES         | null                         |
| user_sessions     | user_agent    | text                     | YES         | null                         |
| user_sessions     | created_at    | timestamp with time zone | NO          | now()                        |
| users             | id            | uuid                     | NO          | gen_random_uuid()            |
| users             | email         | text                     | NO          | null                         |
| users             | password      | text                     | NO          | null                         |
| users             | name          | text                     | YES         | null                         |
| users             | role          | text                     | YES         | 'user'::text                 |
| users             | created_at    | timestamp with time zone | YES         | now()                        |
| users             | updated_at    | timestamp with time zone | YES         | now()                        |
| verification_docs | id            | uuid                     | NO          | uuid_generate_v4()           |
| verification_docs | verify_id     | text                     | NO          | null                         |
| verification_docs | case_id       | text                     | NO          | null                         |
| verification_docs | customer_name | text                     | NO          | null                         |
| verification_docs | doc_type      | text                     | NO          | null                         |
| verification_docs | status        | text                     | YES         | 'PROCESSING'::text           |
| verification_docs | issued_at     | timestamp with time zone | YES         | null                         |
| verification_docs | expired_at    | timestamp with time zone | YES         | null                         |
| verification_docs | created_at    | timestamp with time zone | YES         | now()                        |
| verification_docs | updated_at    | timestamp with time zone | YES         | now()                        |
| verifications     | id            | uuid                     | NO          | gen_random_uuid()            |
| verifications     | ticket_id     | text                     | NO          | null                         |
| verifications     | holder_name   | text                     | NO          | null                         |
| verifications     | document_type | text                     | NO          | null                         |
| verifications     | status        | text                     | NO          | 'PENDING'::text              |
| verifications     | metadata      | jsonb                    | YES         | '{}'::jsonb                  |
| verifications     | verified_by   | text                     | YES         | null                         |
| verifications     | issued_at     | timestamp with time zone | YES         | now()                        |
| verifications     | expires_at    | timestamp with time zone | YES         | null                         |
| verifications     | created_at    | timestamp with time zone | YES         | now()                        |
| verifications     | updated_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | id            | uuid                     | NO          | gen_random_uuid()            |
| wiki_posts        | slug          | text                     | NO          | null                         |
| wiki_posts        | title         | text                     | NO          | null                         |
| wiki_posts        | description   | text                     | YES         | null                         |
| wiki_posts        | content       | text                     | YES         | null                         |
| wiki_posts        | category      | text                     | YES         | 'General'::text              |
| wiki_posts        | author_name   | text                     | YES         | null                         |
| wiki_posts        | author_role   | text                     | YES         | null                         |
| wiki_posts        | tags          | ARRAY                    | YES         | null                         |
| wiki_posts        | image         | text                     | YES         | null                         |
| wiki_posts        | is_published  | boolean                  | YES         | false                        |
| wiki_posts        | created_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | updated_at    | timestamp with time zone | YES         | now()                        |
| wiki_posts        | published_at  | timestamp with time zone | YES         | now()                        |```
---

#### 🔍 Path: `pre-deploy-report.md`
```markdown
# 🚀 Pre-deploy Inspection Report
Generated at: 2026-01-15 03:16:59
Branch: N/A

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
Route (app)                                 Size  First Load JS
┌ ○ /                                    11.1 kB         167 kB
├ ○ /_not-found                            995 B         103 kB
├ ○ /about                               3.16 kB         155 kB
├ ƒ /api/auth/callback                     129 B         102 kB
├ ○ /blog                                  173 B         110 kB
├ ƒ /blog/[slug]                           486 B         107 kB
├ ○ /careers                             1.08 kB         151 kB
├ ○ /contact                               129 B         102 kB
├ ○ /faq                                 3.66 kB         159 kB
├ ○ /privacy                             1.07 kB         148 kB
├ ○ /services                            4.82 kB         123 kB
├ ● /services/[slug]                       163 B         105 kB
├   ├ /services/tourist-visa
├   ├ /services/business-registration
├   └ /services/certified-translation
├ ƒ /services/request                    57.7 kB         195 kB
├ ○ /sitemap.xml                           129 B         102 kB
└ ○ /support                             1.08 kB         151 kB
+ First Load JS shared by all             102 kB
  ├ chunks/7f97a788-70f696b0503e8e6b.js  54.2 kB
  ├ chunks/919-cb094919e5c4c4d2.js       45.5 kB
  └ other shared chunks (total)          1.93 kB


ƒ Middleware                             80.2 kB

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

#### 🔍 Path: `app/globals.css`
```css
@import "tailwindcss";

/* 1. Plugins Registration */
@plugin "tailwindcss-animate";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:where(.dark, .dark *));

/* 2. Tailwind v4 Theme Configuration */
@theme {
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

/* 3. Global CSS Variables (:root) */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.25 0.05 260);
  --secondary: oklch(0.65 0.2 30);
  --border: oklch(0.922 0.011 264.695);
  --input: oklch(0.922 0.011 264.695);
  --ring: oklch(0.707 0.022 264.695);

  /* นิยามค่าสำหรับภาษาไทยไว้ที่นี่เพื่อให้เรียกใช้ซ้ำได้ */
  --thai-line-height: 1.7;
}

/* 4. Utilities (ประกาศไว้ก่อนการใช้ @apply ใน layer อื่นๆ) */
@utility thai-snug {
  line-height: var(--thai-line-height);
  letter-spacing: 0.01em;
  text-underline-offset: 4px;
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* 5. Base Layers */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    /* แทนที่จะ @apply thai-snug เราใช้ค่า variable โดยตรงหรือปล่อยให้ utility ทำงานแยกไป */
    @apply bg-background text-foreground font-body antialiased;
    line-height: var(
      --thai-line-height
    ); /* ใช้ค่าโดยตรงเพื่อเลี่ยง Error @apply */
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
    text-rendering: optimizeLegibility;
  }
}

/* 6. Advanced Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@utility animate-entry {
  animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```
---

#### 🔍 Path: `app/layout.tsx`
```typescript
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, Sarabun } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AppProvider } from "@/providers/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

// 1. Font Configuration
const ibmPlexThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-heading",
  display: "swap",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-body",
  display: "swap",
});

// 2. Metadata & SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://jpvisouldocs.online"),
  title: {
    default: "JP-VISOUL.DOCS | บริการเอกสารและวีซ่าครบวงจร",
    template: "%s | JP-VISOUL.DOCS",
  },
  description:
    "สะพานเชื่อมโอกาส ผ่านงานเอกสารที่โปร่งใสและเข้าถึงง่าย ทั้งบริการวีซ่า แปลเอกสาร และจดทะเบียนธุรกิจ ทั่วประเทศไทย",
  keywords: [
    "ขอวีซ่า",
    "จดทะเบียนบริษัท",
    "แปลเอกสาร",
    "JP-VISOUL",
    "Legal Documents Thailand",
  ],
  authors: [{ name: "JP-VISOUL Team" }],
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://jpvisouldocs.online",
    siteName: "JP-VISOUL.DOCS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JP-VISOUL Services",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A192F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col font-body antialiased bg-white text-slate-900 selection:bg-secondary/20 selection:text-secondary",
          ibmPlexThai.variable,
          sarabun.variable,
        )}
      >
        <AppProvider>
          {/* --- TOP FIXED NAVIGATION ---
              เราเก็บไว้เฉพาะ Navbar เพื่อให้แถบเมนูกะทัดรัด (Slim) 
              และมีพื้นที่สำหรับอ่านเนื้อหามากขึ้น
          */}
          <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col shadow-sm bg-white/95 backdrop-blur-md">
            {/* นำ <Header /> ออกเพื่อให้ไปเรียกใช้ในรายหน้าแทน */}
            <Navbar />
          </div>

          {/* --- MAIN CONTENT AREA ---
              - pt-[64px]: เว้นระยะให้เท่ากับความสูงมาตรฐานของ Navbar
              - lg:pt-[72px]: ปรับขนาดตามหน้าจอ Desktop
          */}

          <main className="flex-grow pt-[64px] lg:pt-[72px] overflow-x-hidden animate-entry">
            {children}
          </main>

          <Footer />

          <Toaster
            position="top-center"
            richColors
            expand={false}
            closeButton
          />
        </AppProvider>
      </body>
    </html>
  );
}
```
---

#### 🔍 Path: `app/page.tsx`
```typescript
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

// Components
import HeroSection from "@/components/shared/HeroSection";
import AboutSection from "@/components/shared/AboutSection";
import FaqSection from "@/components/shared/FaqSection";
import ServiceCard from "@/components/cards/ServiceCard";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

// Data
import { SERVICES } from "@/constants/services-data";
import { FAQ_DATA } from "@/content/faq-data"; // Path ถูกต้องแล้ว

export default function HomePage() {
  // ดึงบริการเด่น 3 รายการ
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <main className="flex flex-col gap-0 overflow-x-hidden">
      {/* 1. Hero Section: จุดรับสายตาแรก */}
      <HeroSection />

      {/* 2. Featured Services Section */}
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        {/* ตกแต่งพื้นหลังเล็กน้อยเพื่อให้ดูมีมิติ */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-4"
              >
                <Star size={16} className="fill-current" /> Our Expertise
              </motion.div>
              <H2 className="border-none p-0 mb-4 text-3xl md:text-5xl font-black leading-[1.1]">
                บริการที่ <span className="text-secondary">ยอดนิยม</span> ของเรา
              </H2>
              <P className="text-slate-500 text-lg md:text-xl thai-snug">
                เราคัดสรรบริการที่ตอบโจทย์ความต้องการส่วนใหญ่
                เพื่อให้คุณเริ่มต้นจัดการงานเอกสารได้อย่างรวดเร็วและถูกต้อง
              </P>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                variant="outline"
                className="rounded-full h-14 px-10 group border-slate-200 bg-white hover:bg-secondary hover:text-white transition-all duration-300"
              >
                <Link href="/services">
                  ดูบริการทั้งหมด
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id || `service-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section: ความน่าเชื่อถือ */}
      <AboutSection />

      {/* 4. FAQ Section: แก้ไขปัญหาเบื้องต้น 
          ใช้ data={FAQ_DATA} หาก FaqSection ถูกออกแบบมาให้รับ Props
      */}
      <FaqSection items={FAQ_DATA} />

      {/* 5. Final CTA Section: ปิดการขาย (แนะนำให้เพิ่ม) */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <H2 className="text-white border-none mb-6">
            พร้อมเริ่มงานเอกสารกับเราหรือยัง?
          </H2>
          <P className="text-slate-300 mb-10 text-lg">
            ปรึกษาผู้เชี่ยวชาญฟรี ไม่มีค่าใช้จ่ายเบื้องต้น
          </P>
          <Button
            asChild
            className="bg-secondary hover:bg-white hover:text-primary text-white font-bold rounded-full px-12 py-7 text-lg transition-all"
          >
            <Link href="/contact">ติดต่อเราทันที</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
```
---

#### 🔍 Path: `mdx-components.tsx`
```typescript
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P } from "@/components/ui/typography"; // ✅ ลบ Lead ออกเนื่องจากไม่ได้ใช้งาน
import { cn } from "@/lib/utils";

/**
 * ฟังก์ชันสำหรับลงทะเบียน Components ให้กับ MDX
 * ช่วยให้คุณสามารถใช้คอมโพเนนต์อย่าง <Button /> ภายในไฟล์ .mdx ได้ทันที
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 1. Map HTML Elements มาเป็น UI Components (Typography)
    h1: ({ className, ...props }) => (
      <H1 className={cn("mt-12 mb-6 border-none", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <H2
        className={cn("mt-10 mb-4 border-none text-2xl md:text-3xl", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <H3
        className={cn("mt-8 mb-4 text-xl md:text-2xl", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <P
        className={cn("leading-relaxed mb-6 text-slate-600", className)}
        {...props}
      />
    ),

    // 2. Custom Components สำหรับการใช้งานในเนื้อหา
    Button: ({ className, ...props }: React.ComponentProps<typeof Button>) => (
      <div className="my-8 flex justify-center md:justify-start">
        <Button
          {...props}
          className={cn(
            "rounded-full px-8 font-bold shadow-lg shadow-primary/20",
            className,
          )}
        />
      </div>
    ),

    // 3. ปรับแต่งรูปภาพให้เป็น Responsive Image อัตโนมัติ
    img: (props) => (
      <span className="block my-10 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          width={1200}
          height={630}
          {...(props as ImageProps)}
          alt={props.alt || "JP-VISOUL content image"}
        />
      </span>
    ),

    // 4. ปรับแต่ง Link ให้ใช้ Next.js Link (Client-side Routing)
    a: ({ href, children, ...props }) => {
      const isInternal = href?.startsWith("/") || href?.startsWith("#");

      const linkClass =
        "text-secondary font-bold hover:underline underline-offset-4 transition-all";

      if (isInternal && href) {
        return (
          <Link href={href} className={linkClass} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...props}
        >
          {children}
        </a>
      );
    },

    // รวมคอมโพเนนต์อื่นๆ ที่ส่งผ่านมา
    ...components,
  };
}
```
---

#### 🔍 Path: `constants/navigation.ts`
```typescript
import {
  Home,
  Briefcase,
  BookOpen,
  Mail,
  // ✅ ลบ Globe, Languages, Stamp, Building2 ออกเพราะไม่ได้ถูกเรียกใช้ในตัวแปรด้านล่าง
  type LucideIcon,
} from "lucide-react";

/**
 * Interface สำหรับรายการเมนูนำทาง
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

/**
 * เมนูหลักส่วน Header
 */
export const MAIN_NAV: NavItem[] = [
  { title: "หน้าแรก", href: "/", icon: Home },
  { title: "บริการ", href: "/services", icon: Briefcase },
  { title: "บทความ", href: "/blog", icon: BookOpen },
  { title: "ติดต่อเรา", href: "/contact", icon: Mail },
];

/**
 * ลิงก์ส่วน Footer แบ่งตามหมวดหมู่
 */
export const FOOTER_LINKS = {
  company: [
    { title: "เกี่ยวกับเรา", href: "/about" },
    { title: "ร่วมงานกับเรา", href: "/careers" },
    { title: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
  ],
  support: [
    { title: "คำถามที่พบบ่อย", href: "/faq" },
    { title: "เช็คสถานะเอกสาร", href: "/track-status" },
    { title: "ศูนย์ช่วยเหลือ", href: "/support" },
  ],
};
```
---

#### 🔍 Path: `constants/theme.ts`
```typescript
export const SITE_CONFIG = {
  name: "JP-VISOUL.DOCS",
  shortName: "JP-VISOUL",
  description: "ศูนย์บริการเอกสาร วีซ่า และที่ปรึกษาธุรกิจครบวงจร",
  url: "https://jpvisouldocs.online",
  ogImage: "/og-image.jpg",
  contact: {
    email: "contact@jp-visoul.com",
    phone: "0XX-XXX-XXXX",
    line: "@jpvisouldocs",
    address: "กรุงเทพมหานคร, ประเทศไทย",
  },
};

export const BRAND_COLORS = {
  primary: "#0A192F", // Deep Navy (ความน่าเชื่อถือ)
  secondary: "#D4A373", // Gold/Sand (ความพรีเมียม)
  accent: "#E9EDC6", // Soft Green (ความโปร่งใส)
  slate: {
    50: "#F8FAFC",
    500: "#64748B",
    900: "#0F172A",
  },
};
```
---

#### 🔍 Path: `constants/services-data.ts`
```typescript
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
```
---

#### 🔍 Path: `actions/documentActions.ts`
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// กำหนดประเภทข้อมูลที่รับมาจาก Form ให้ตรงกับ Schema และสอดคล้องกับ Database
export interface ServiceRequestInput {
  name: string;
  email: string;
  phone: string;
  service_type: string; // ตรงกับคอลัมน์ใน DB
  details: string;      // ตรงกับคอลัมน์ใน DB
  urgency: "normal" | "urgent" | "express";
  privacyPolicy: boolean;
}

/**
 * Action สำหรับสร้างรายการคำขอรับบริการใหม่
 * รองรับมาตรฐาน JP-VISOUL-DOCS v2.0.0
 * แก้ไขปัญหา Linting: ลบ Unused variables เรียบร้อยแล้ว
 */
export async function createServiceRequest(values: ServiceRequestInput) {
  const supabase = await createClient();

  try {
    // 1. ตรวจสอบข้อมูลเบื้องต้น
    if (!values.privacyPolicy) {
      return { error: "โปรดยอมรับนโยบายความเป็นส่วนตัวเพื่อดำเนินการต่อ" };
    }

    // 2. บันทึกข้อมูลลงฐานข้อมูล
    const { data, error } = await supabase
      .from("service_requests")
      .insert([
        {
          full_name: values.name,
          email: values.email,
          phone: values.phone,
          service_type: values.service_type,
          details: { 
            content: values.details,
            urgency: values.urgency,
            submitted_at: new Date().toISOString()
          },
          status: "DRAFT",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error.message);
      return { 
        error: "ขออภัย ระบบขัดข้องชั่วคราว ทีมงานกำลังเร่งแก้ไข โปรดลองอีกครั้ง" 
      };
    }

    // 3. Update Cache (Revalidation)
    revalidatePath("/admin/requests");

    return { 
      success: true, 
      data, 
      message: "ได้รับข้อมูลของท่านแล้ว เจ้าหน้าที่ทีมงานจะติดต่อกลับโดยเร็วที่สุด" 
    };

  } catch {
    // แก้ไข Linting: ลบ (err) ออกเนื่องจากไม่ได้ถูกใช้งาน
    return { 
      error: "เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของท่าน" 
    };
  }
}
```
---

#### 🔍 Path: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    /* ✅ ปรับปรุงการตรวจสอบให้เข้มงวดแต่ยืดหยุ่นสำหรับ Next.js 15 */
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    /* ✅ แนะนำให้เพิ่ม (Optional) */
    "noFallthroughCasesInSwitch": true, // ป้องกันลืมใส่ break ใน switch case
    "strictPropertyInitialization": false // กรณีใช้กับพวก Class ที่ถูก init ภายหลัง
  },
  "include": [
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.md",
    "**/*.mdx"
  ],
  "exclude": ["node_modules", ".next"] // ✅ เพิ่ม .next ใน exclude เพื่อไม่ให้ตรวจสอบไฟล์ที่ถูก build แล้ว
}
```
---

#### 🔍 Path: `package.json`
```json
{
  "name": "test",
  "version": "0.1.0",
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
    "@img/sharp-wasm32": "^0.34.5",
    "@next/mdx": "^16.1.1",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.90.1",
    "@types/mdx": "^2.0.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.25.0",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.562.0",
    "next": "15.5.7",
    "next-mdx-remote": "^5.0.0",
    "next-themes": "^0.4.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.3.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.3",
    "@eslint/js": "^9.39.2",
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.23",
    "eslint": "^9",
    "eslint-config-next": "15.5.7",
    "postcss": "^8.5.6",
    "prettier": "^3.7.4",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
```
---

#### 🔍 Path: `next.config.ts`
```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* --- Core Settings --- */
  reactStrictMode: true,

  /* --- Image Optimization --- */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ["image/avif", "image/webp"],
  },

  /* --- Experimental Features (Next.js 15) --- */
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  /* --- MDX Support --- */
  // อนุญาตให้หน้าเว็บรองรับนามสกุลไฟล์ที่หลากหลาย
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  /* --- Optimization --- */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* --- External Packages --- */
  serverExternalPackages: ["sharp"],
};

// ตั้งค่า MDX Plugins (ถ้ามีในอนาคต เช่น remarkGfm)
const withMDX = createMDX({
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  // },
});

// ส่งออก Config ที่ถูก Wrap ด้วย withMDX
export default withMDX(nextConfig);
```
---

#### 🔍 Path: `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "slate",
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

#### 🔍 Path: `lib/mdx.ts`
```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

// 1. กำหนด Interface สำหรับ Post เพื่อแก้ปัญหา Property 'title' does not exist
export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  author?: string;
  category?: string;
  content: string;
  slug: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_PATH);

  const posts = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const { data, content } = matter(fileContent);

      // 2. Return ข้อมูลพร้อมการทำ Type Assertion
      return {
        slug: file.replace(/\.mdx?$/, ""),
        content: content,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        image: data.image || "/images/blog-placeholder.jpg",
        author: data.author || "JP-VISOUL",
        category: data.category || "สาระน่ารู้",
        ...data, // กระจาย data อื่นๆ ถ้ามี
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}
```
---

#### 🔍 Path: `types/database.types.ts`
```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      service_requests: {
        Row: {
          id: string;
          user_id: string | null;
          service_type: string;
          status: "pending" | "processing" | "completed" | "cancelled";
          details: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          service_type: string;
          status?: "pending" | "processing" | "completed" | "cancelled";
          details: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          service_type?: string;
          status?: "pending" | "processing" | "completed" | "cancelled";
          details?: Json;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
```
---

#### 🔍 Path: `types/index.ts`
```typescript
import { LucideIcon } from "lucide-react";

/**
 * 🛠️ Navigation Types
 */
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon: LucideIcon;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

/**
 * 📑 Service Types
 */
export type ServiceCategory = "visa" | "legal" | "translation" | "business";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ServiceCategory;
  iconName: string; // เก็บชื่อไอคอนเพื่อดึงจาก Icons.tsx หรือ Lucide
  price?: {
    amount: number;
    unit: string;
    isStartingPrice: boolean;
  };
  features?: string[];
}

/**
 * 💬 Content Types
 */
export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
  category: string;
}
```
---

#### 🔍 Path: `.env`
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

## 📝 Summary
Architecture scan and context compilation completed successfully. Focus maintained on Privacy & Security.
