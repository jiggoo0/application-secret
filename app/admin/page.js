'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminClient from '@/components/AdminClient';
import {
  Loader2,
  ShieldAlert,
  ShieldCheck,
  User2,
  Mail,
  BadgeCheck,
  LayoutDashboard,
} from 'lucide-react';

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

  // 🔄 Loading
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

  // 🚫 Unauthorized
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

  // ✅ Authorized
  const user = session?.user || {};

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* 🧭 Header */}
        <header className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
            <ShieldCheck className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            จัดการข้อมูลเอกสาร ระบบ และการตั้งค่าผู้ใช้ทั้งหมดในระบบเดียว
          </p>
        </header>

        {/* 👤 User Info */}
        <section className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            <User2 className="h-5 w-5" />
            ข้อมูลผู้ดูแลระบบ
          </h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <User2 className="h-4 w-4" />
              <strong>ชื่อ:</strong> {user.name || '-'}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <strong>Email:</strong> {user.email || '-'}
            </p>
            <p className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <strong>Role:</strong>{' '}
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-800 dark:text-green-200">
                {user.role || 'unknown'}
              </span>
            </p>
          </div>
        </section>

        {/* ⚙️ Admin Client */}
        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            <LayoutDashboard className="h-5 w-5" />
            ระบบจัดการทั้งหมด
          </div>
          <AdminClient />
        </section>
      </div>
    </main>
  );
}
