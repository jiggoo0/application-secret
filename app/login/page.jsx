// /app/login/page.js
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm'; // Import Client Component ที่สร้างใหม่

// นี่คือ Server Component โดยค่าเริ่มต้น (ไม่มี 'use client')
// แก้ไขปัญหา 'Missing Suspense with CSR Bailout'
export default function LoginPage() {
  return (
    // ✅ FIX: ใช้ Suspense ห่อหุ้ม LoginForm เพื่อระงับการเรนเดอร์ useSearchParams
    // ในระหว่างการ Build/Prerender บน Server
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading login interface...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
