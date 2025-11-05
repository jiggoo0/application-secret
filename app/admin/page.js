'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Card } from '@/components/ui/card';
import {
  Loader2,
  ShieldAlert,
  ShieldCheck,
  User2,
  Mail,
  BadgeCheck,
  Upload,
  Users as UsersIcon,
  FileText,
  Clock,
  Building2,
  Stethoscope,
  Banknote,
  ScrollText,
  Landmark,
  MessageSquare,
} from 'lucide-react';

// 🧩 Admin Components
import Uploads from '@/components/admin/Uploads';
import Users from '@/components/admin/Users';
import FileList from '@/components/admin/FileList';
import UserSessionsTable from '@/components/admin/UserSessionsTable';
import KbankLive from '@/components/admin/KbankLive';

// 📄 Document Components
import CompanyAccount from '@/components/documents/CompanyAccount';
import MedicalCertificate from '@/components/documents/MedicalCertificate';
import SalaryCertificate from '@/components/documents/SalaryCertificate';
import { RegistrationPreview } from '@/components/documents/RegistrationPreview';

// 💬 Chat Admin Panel (Production-ready)
import AdminChatPage from '@/app/admin/chat/page';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeKey, setActiveKey] = useState('uploads');

  useEffect(() => {
    if (status === 'loading') return;
    const isAdmin = session?.user?.role === 'admin';
    setAuthorized(isAdmin);

    if (!isAdmin) {
      router.replace('/login?error=unauthorized');
    }
  }, [status, session, router]);

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

  const user = session?.user || {};

  const menuItems = [
    { key: 'uploads', label: 'อัปโหลด', icon: Upload },
    { key: 'users', label: 'ผู้ใช้งาน', icon: UsersIcon },
    { key: 'files', label: 'รายการไฟล์', icon: FileText },
    { key: 'user-sessions', label: 'ประวัติผู้ใช้', icon: Clock },
    { key: 'company', label: 'บัญชีบริษัท', icon: Building2 },
    { key: 'medical', label: 'ใบรับรองแพทย์', icon: Stethoscope },
    { key: 'salary', label: 'ใบรับรองเงินเดือน', icon: Banknote },
    { key: 'registration', label: 'ทะเบียนพาณิชย์', icon: ScrollText },
    { key: 'kbank', label: 'KBank Live Demo', icon: Landmark },
    { key: 'chat-admin', label: 'Chat Admin Panel', icon: MessageSquare },
  ];

  const componentsMap = {
    uploads: <Uploads />,
    users: <Users />,
    files: <FileList />,
    'user-sessions': <UserSessionsTable />,
    company: <CompanyAccount />,
    medical: <MedicalCertificate />,
    salary: <SalaryCertificate />,
    registration: <RegistrationPreview />,
    kbank: <KbankLive />,
    'chat-admin': <AdminChatPage />, // Production-ready Chat Admin
  };

  const renderContent = () => (
    <Card className="h-[calc(100vh-220px)] overflow-auto rounded-2xl bg-white p-4 shadow-md transition-all duration-300 dark:bg-gray-800 sm:p-6 lg:p-8">
      {componentsMap[activeKey] || (
        <p className="text-center text-gray-500 dark:text-gray-400">กรุณาเลือกเมนูจากด้านบน</p>
      )}
    </Card>
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
            <ShieldCheck className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            จัดการข้อมูลทั้งหมดของระบบได้จากที่นี่
          </p>
        </header>

        {/* User Info */}
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

        {/* Admin Menu */}
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-800/70">
          <div className="mx-auto max-w-7xl px-3 sm:px-6">
            <div className="no-scrollbar relative flex overflow-x-auto py-2 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-5">
              {menuItems.map(({ key, label, icon: Icon }) => {
                const isActive = activeKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveKey(key)}
                    className={`relative mx-1 flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:text-base ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md dark:from-blue-500 dark:to-indigo-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {renderContent()}

        {/* Toast */}
        <Toaster position="bottom-right" richColors expand closeButton duration={3000} />
      </div>
    </main>
  );
}
