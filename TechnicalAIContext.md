​💻 [Coding Protocol: JP Visual Docs Project]
​Standard Stack:
​Framework: Next.js 14+ (App Router)
​Language: TypeScript (Strict Mode)
​Styling: Tailwind CSS (Utility-first)
​Icons: Lucide React
​Animation: Framer Motion (หากมีการขยับ UI)
​Database/Auth: Supabase
​✅ เน้นการเขียน (Do's)
​Component-Based: แยก UI ออกเป็นส่วนย่อยใน components/section/ (เช่น HeroSection.tsx) และใช้ components/ui/ สำหรับอะไหล่พื้นฐาน (Button, Input)
​Type Safety: ต้องนิยาม Interface หรือ Type ทุกครั้ง ไม่ใช้ any เด็ดขาด
​Single Source of Truth: ดึงข้อมูลจาก config/ (site.ts, theme.ts, navigation.ts) มาใช้เสมอ เช่นการเรียกค่าสีหรือชื่อแบรนด์
​Clean Logic: แยก Client Component ('use client') ออกจาก Server Component อย่างชัดเจน (ใช้ Client เฉพาะเมื่อจำเป็น เช่น Event Listener หรือ Framer Motion)
​Mobile First: เขียน Tailwind ให้รองรับ Mobile ก่อนเสมอ (Responsive Design)
​❌ ห้ามการเขียน (Don'ts)
​Hard-coded Values: ห้ามพิมพ์สี Hex Code หรือข้อความสำคัญลงใน Component โดยตรง (ให้ดึงจาก Config หรือสร้างเป็นค่าคงที่)
​Large Components: ห้ามเขียน Code เกิน 200-300 บรรทัดในไฟล์เดียว หากยาวเกินไปให้แตกไฟล์ย่อย
​Implicit Imports: ห้าม Import แบบสะเปะสะปะ ให้ใช้ @/ alias ตามที่ตั้งไว้ใน tsconfig.json
​Fake Logic: ห้ามเขียนฟังก์ชันที่ดูขายฝัน หรือระบบที่ซับซ้อนเกินจำเป็นโดยไม่มีฐานข้อมูลรองรับจริง
​⚠️ ระวังการเขียน (Cautions)
​Naming Convention: การตั้งชื่อไฟล์ต้องสื่อถึงหน้าที่ (เช่น ServiceTerminal.tsx สื่อถึงระบบจัดการ) และใช้ PascalCase สำหรับ Component
​Industrial Theme: ระวังเรื่องการใช้สี อย่าให้ฉูดฉาดเกินไป ให้คุมโทน Slate/Industrial ตาม theme.ts เพื่อรักษาความ "ขรึมและขลัง"
​Semantic HTML: ระวังการใช้ <div> ฟุ่มเฟือย ให้ใช้ <section>, <article>, <nav> เพื่อผลดีต่อ SEO และ Accessibility
​Performance: ระวังการใช้ภาพขนาดใหญ่ใน public/images/ (ควรแนะนำให้ใช้ next/image พร้อมระบุ priority สำหรับ Hero)
​💡 ตัวอย่างการสั่งงานด้วย Context นี้:
​"จาก Coding Protocol ช่วยสร้าง Component SuccessGrid.tsx ไว้ใน components/section/ โดยดึงข้อมูลประวัติการทำงานจาก Supabase มาโชว์ในรูปแบบตารางที่ดูสะอาดตา (Industrial Look) เน้นการใช้สีจาก theme.ts และต้องเป็น Server Component"
