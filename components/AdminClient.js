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
import ChatAllRoom from '@/components/ChatRoom/Chat/ChatAllRoom';

// 🖼️ Icons
import {
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
  FolderKanban,
} from 'lucide-react';

// 🧭 เมนู
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
  { key: 'chat', label: 'Chat Room', icon: MessageSquare },
  { key: 'chat-all', label: 'All Chat Rooms', icon: FolderKanban },
];

// 🔗 Map key → component
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
  'chat-all': <ChatAllRoom />,
};

export default function AdminClient() {
  const [activeKey, setActiveKey] = useState('uploads');

  const renderContent = () => (
    <Card className="h-[calc(100vh-200px)] overflow-auto rounded-2xl bg-white p-4 shadow-md transition-all duration-300 dark:bg-gray-800 sm:p-6 lg:p-8">
      {componentsMap[activeKey] || (
        <p className="text-center text-gray-500 dark:text-gray-400">กรุณาเลือกเมนูจากด้านบน</p>
      )}
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {/* 🔝 Navbar */}
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

      {/* 🧩 Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* 🔔 Toast Notifications */}
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
