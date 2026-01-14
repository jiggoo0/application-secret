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
