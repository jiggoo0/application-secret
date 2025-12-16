Application Secret

ระบบจัดการเอกสารพร้อมการยืนยันความถูกต้องผ่าน QR Token พัฒนาด้วย Next.js App Router, Supabase, และ TypeScript รองรับการสร้างเอกสาร ตรวจสอบสถานะเอกสารแบบเรียลไทม์ และดาวน์โหลดไฟล์ PDF ที่ผ่านการยืนยันแล้ว

---

✨ Features

📄 สร้างเอกสาร (Document Initialization)

🔐 สร้าง QR Token สำหรับการยืนยันเอกสาร

✅ ตรวจสอบสถานะเอกสารแบบ Server-to-Server

📥 ดาวน์โหลดไฟล์ PDF หลังผ่านการยืนยัน

🧾 Mapping ข้อมูลจาก metadata ไปยัง UI อย่างเป็นระบบ

🚀 รองรับ Production (Vercel) และ Local Development

---

🧱 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Database: Supabase (PostgreSQL)

Auth / API: Next.js Route Handlers

Deployment: Vercel (แนะนำ)

---

📁 Project Structure

app/
├─ api/
│ └─ documents/
│ ├─ route.ts # POST: สร้าง document ใหม่
│ ├─ verify/[token]/route.ts # GET: ตรวจสอบเอกสารด้วย token
│ └─ [document_id]/route.ts # PATCH: อัปเดตสถานะ / pdf_url
│
├─ verify/[token]/
│ └─ page.tsx # หน้าแสดงผลการยืนยันเอกสาร
│
lib/
└─ supabase/
└─ server.ts # Supabase server client

.env.example
README.md

---

🗄 Database Schema (Supabase)

ตารางหลัก: documents

create table public.documents (
id uuid not null default gen_random_uuid (),
type text not null,
ref_id text not null,
status text not null default 'pending',
qr_token text not null,
pdf_url text null,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
metadata jsonb null,
constraint documents_pkey primary key (id),
constraint documents_qr_token_key unique (qr_token)
);

Status ที่รองรับ:

pending

paid

verified

revoked

---

🔌 API Endpoints

1️⃣ Create Document

POST /api/documents

{
"type": "eticket",
"ref_id": "PNR123456",
"metadata": {}
}

Response:

{
"document_id": "uuid",
"qr_token": "uuid",
"verify_url": "https://your-domain/verify/{token}"
}

---

2️⃣ Verify Document

GET /api/documents/verify/{token}

Response:

{
"status": "verified",
"document": {
"document_id": "uuid",
"ref_id": "PNR123456",
"status": "verified",
"pdf_url": "https://...",
"created_at": "2025-01-01",
"details": {}
}
}

---

3️⃣ Update Document

PATCH /api/documents/{document_id}

{
"status": "verified",
"pdf_url": "https://storage/file.pdf"
}

---

🖥 Verification Page

เส้นทาง: /verify/[token]

หน้าเว็บจะแสดง:

สถานะเอกสาร (Pending / Verified / Revoked)

Document ID

Booking Reference (ref_id)

รายละเอียดจาก metadata (ถ้ามี)

ปุ่มดาวน์โหลด PDF เมื่อสถานะเป็น verified

---

⚙️ Environment Variables

สร้างไฟล์ .env.local

SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

> ⚠️ ห้าม commit .env.local

---

🧪 Scripts

pnpm dev # Run development server
pnpm build # Typecheck + Lint + Build
pnpm lint # ESLint
pnpm typecheck # TypeScript check

---

🚀 Deployment

แนะนำใช้ Vercel

ตั้งค่า Environment Variables ใน Vercel Dashboard

เชื่อมต่อ Supabase Project

Deploy ได้ทันที

---

🛡 Security Notes

ใช้ Service Role Key เฉพาะฝั่ง Server

Route Handlers ทำงานแบบ Server-only

QR Token เป็น UUID (เดาสุ่มไม่ได้)

---

📜 License

MIT License

---

👤 Author

GitHub: https://github.com/jiggoo0

---

> โปรเจกต์นี้ออกแบบมาเพื่อเป็น Document Verification Core สามารถนำไปต่อยอดเป็น e-Ticket, Invoice, Certificate, หรือระบบตรวจสอบเอกสารราชการได้
