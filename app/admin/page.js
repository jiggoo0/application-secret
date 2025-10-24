'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminClient from '@/components/AdminClient';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    console.log('🔹 AdminPage session:', session);

    const isAdmin = session?.user?.role === 'admin';
    setAuthorized(isAdmin);

    if (!isAdmin) {
      router.replace('/login?error=unauthorized');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
          🔐 กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...
        </p>
      </main>
    );
  }

  if (!authorized) return null;

  const user = session?.user || {};

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 sm:text-3xl">
            🛡️ Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            จัดการข้อมูลเอกสาร ระบบ หรือดูตัวอย่างการแสดงผลได้จากแท็บด้านล่าง
          </p>
        </header>

        {/* User Info Card */}
        <section className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            👤 ข้อมูลผู้ใช้
          </h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>ชื่อ:</strong> {user.name || '-'}
            </p>
            <p>
              <strong>Email:</strong> {user.email || '-'}
            </p>
            <p>
              <strong>Role:</strong> {user.role || '-'}
            </p>
          </div>
        </section>

        {/* Admin Client Section */}
        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <AdminClient />
        </section>
      </div>
    </main>
  );
}
