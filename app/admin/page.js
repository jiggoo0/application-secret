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

    const isAdmin = session?.user?.role === 'admin';
    setAuthorized(isAdmin);

    if (!isAdmin) {
      router.replace('/login?error=unauthorized');
    }
  }, [status, session, router]);

  // Loading state while checking session
  if (status === 'loading') {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🔐 กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...
        </p>
      </main>
    );
  }

  // Prevent flash before redirect
  if (!authorized) return null;

  const user = session?.user || {};

  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-red-600 dark:text-red-400">
            🛡️ Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            เลือกเมนูด้านบนเพื่อจัดการหรือ preview เอกสารต่างๆ
          </p>

          {/* User Info */}
          <div className="mt-4 inline-block rounded-md bg-gray-100 p-3 text-left dark:bg-gray-800">
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
        </header>

        {/* AdminClient: Top Tabs + Content */}
        <AdminClient />
      </div>
    </main>
  );
}
