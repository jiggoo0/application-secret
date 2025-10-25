'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminClient from '@/components/AdminClient';
import { Loader2, ShieldAlert } from 'lucide-react';

/**
 * 🛡️ AdminPage — หน้าจัดการระบบผู้ดูแล
 * ป้องกันการเข้าถึงโดยผู้ใช้ทั่วไป (ตรวจสอบ role)
 */
export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    console.info('🔹 AdminPage session:', session);

    const isAdmin = session?.user?.role === 'admin';
    setAuthorized(isAdmin);

    if (!isAdmin) {
      router.replace('/login?error=unauthorized');
    }
  }, [status, session, router]);

  // ============================
  // 🔄 Loading State
  // ============================
  if (status === 'loading') {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...</span>
        </div>
      </main>
    );
  }

  // ============================
  // 🚫 Unauthorized
  // ============================
  if (!authorized) {
    return (
      <main className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ShieldAlert className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          ไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแล
        </p>
      </main>
    );
  }

  // ============================
  // ✅ Authorized Admin
  // ============================
  const user = session?.user || {};

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* 🧭 Page Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">🛡️ Admin Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            จัดการข้อมูลเอกสาร ระบบ และการตั้งค่าผู้ใช้ทั้งหมดในระบบเดียว
          </p>
        </header>

        {/* 👤 User Info */}
        <section className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
            ข้อมูลผู้ดูแลระบบ
          </h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>ชื่อ:</strong> {user.name || '-'}
            </p>
            <p>
              <strong>Email:</strong> {user.email || '-'}
            </p>
            <p>
              <strong>Role:</strong>{' '}
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-800 dark:text-green-200">
                {user.role || 'unknown'}
              </span>
            </p>
          </div>
        </section>

        {/* ⚙️ Admin Client (Dynamic Component) */}
        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <AdminClient />
        </section>
      </div>
    </main>
  );
}
