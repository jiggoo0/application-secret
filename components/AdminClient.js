'use client';

import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Card } from '@/components/ui/card';

// 🧩 Admin Components
import Uploads from './admin/Uploads';
import Users from './admin/Users';
import FileList from './admin/FileList';
import UserSessionsTable from './admin/UserSessionsTable';
import KbankLive from './admin/KbankLive';

// 📄 Document Components
import CompanyAccount from './documents/CompanyAccount';
import MedicalCertificate from './documents/MedicalCertificate';
import SalaryCertificate from './documents/SalaryCertificate';
import { RegistrationPreview } from './documents/RegistrationPreview';

// 💬 ChatRoom
import ChatRoom from '@/components/ChatRoom/ChatRoom';

// 👆 เมนูด้านบน
const menuItems = [
  { key: 'uploads', label: 'อัปโหลด' },
  { key: 'users', label: 'ผู้ใช้งาน' },
  { key: 'files', label: 'รายการไฟล์' },
  { key: 'user-sessions', label: 'ประวัติผู้ใช้' },
  { key: 'company', label: 'บัญชีบริษัท' },
  { key: 'medical', label: 'ใบรับรองแพทย์' },
  { key: 'salary', label: 'ใบรับรองเงินเดือน' },
  { key: 'registration', label: 'ทะเบียนพาณิชย์' },
  { key: 'kbank', label: 'KBank Live Demo' },
  { key: 'chat', label: 'Chat Room' },
];

// 👆 Map key -> component
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
  chat: <ChatRoom roomId="main-room" user={{ name: 'Admin', email: 'admin@example.com' }} />,
};

export default function AdminClient() {
  const [activeKey, setActiveKey] = useState('uploads');

  const renderContent = () => (
    <Card className="min-h-[400px] rounded-2xl bg-white p-4 shadow-md transition-all dark:bg-gray-800 sm:p-6 lg:p-8">
      {componentsMap[activeKey] || (
        <p className="text-center text-gray-500 dark:text-gray-400">⚙️ กรุณาเลือกเมนูด้านบน</p>
      )}
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="no-scrollbar flex overflow-x-auto py-2 sm:justify-center">
            {menuItems.map(({ key, label }) => {
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`relative mx-1 rounded-md px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:text-base ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md dark:from-blue-500 dark:to-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  } `}
                >
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
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Admin Dashboard • Next.js + Tailwind
      </footer>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        richColors
        expand
        closeButton
        duration={3000}
        toastOptions={{
          classNames: {
            toast: 'text-sm sm:text-base rounded-lg shadow-md dark:shadow-gray-700',
          },
        }}
      />
    </div>
  );
}
