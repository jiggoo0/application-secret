🔐 application-secret

ระบบจัดการไฟล์ลับและการอัปโหลดสำหรับแอดมิน พร้อมระบบ preview, approve, และ session tracking  
สร้างด้วย Next.js + Supabase + React + Tailwind CSS

📦 เทคโนโลยีที่ใช้

- Next.js 15+
- Supabase (Storage + Auth)
- React
- Tailwind CSS
- Axios
- ESLint + Prettier + Vite (ถ้ามี)

🚀 วิธีติดตั้ง

`bash
git clone https://github.com/jiggoo0/application-secret.git
cd application-secret
npm install
`

ตั้งค่า .env.local สำหรับ Supabase:

`env
SUPABASE_URL=your-supabase-url
SUPABASEANONKEY=your-anon-key
SUPABASESERVICEROLE_KEY=your-service-role-key
`

จากนั้นรัน:

`bash
npm run dev
`

🛠️ โครงสร้างโปรเจกต์

`project/
├── app/                  # Next.js routing
│   └── api/              # API routes for admin uploads
├── components/
│   └── admin/            # UI components (FileList, PreviewModal)
├── services/             # Client-side API logic
├── lib/                  # Supabase client
├── public/               # Static assets
├── jsconfig.json         # Path alias config
└── README.md`

📂 ฟีเจอร์หลัก

- ✅ อัปโหลดไฟล์ไปยัง Supabase Storage
- ✅ แสดงรายการไฟล์ทั้งหมด (admin dashboard)
- ✅ Preview ไฟล์ (image, video, PDF)
- ✅ อนุมัติไฟล์ (approve)
- ✅ รองรับ pagination และ fallback
- ✅ ใช้ alias path (@/components, @/services, etc.)

📸 ตัวอย่างหน้าจอ

> เพิ่มภาพหน้าจอในโฟลเดอร์ public/screenshots/ แล้วใส่ลิงก์ที่นี่

🧪 การทดสอบ

`bash
npm run lint
npm run build
`

🙋‍♂️ ผู้พัฒนา

- Jiggoo0 (ดิเรก)
- 📧 jiggo0@outlook.co.th
- GitHub: @jiggoo0

📄 License

MIT © jiggoo0
`
