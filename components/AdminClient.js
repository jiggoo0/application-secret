'use client';

import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Card } from '@/components/ui/card';

// 🧩 Admin Components (ลบ NotesAdmin และ Settings ออก)
import Uploads from './admin/Uploads';
import Users from './admin/Users';
import FileList from './admin/FileList';
import UserSessionsTable from './admin/UserSessionsTable';

// 📄 Document Components
import CompanyAccount from './documents/CompanyAccount';
import MedicalCertificate from './documents/MedicalCertificate';
import SalaryCertificate from './documents/SalaryCertificate';
import { RegistrationPreview } from './documents/RegistrationPreview';

// 👆 เมนูด้านบน (ลบ notes, settings)
const menuItems = [
  { key: 'uploads', label: 'อัปโหลด' },
  { key: 'users', label: 'ผู้ใช้งาน' },
  { key: 'files', label: 'รายการไฟล์' },
  { key: 'user-sessions', label: 'ประวัติผู้ใช้' },
  { key: 'company', label: 'บัญชีบริษัท' },
  { key: 'medical', label: 'ใบรับรองแพทย์' },
  { key: 'salary', label: 'ใบรับรองเงินเดือน' },
  { key: 'registration', label: 'ทะเบียนพาณิชย์' },
];

// 👆 map key -> component (ลบ notes, settings)
const componentsMap = {
  uploads: <Uploads />,
  users: <Users />,
  files: <FileList />,
  'user-sessions': <UserSessionsTable />,
  company: <CompanyAccount />,
  medical: <MedicalCertificate />,
  salary: <SalaryCertificate />,
  registration: <RegistrationPreview />,
};

export default function AdminClient() {
  const [activeKey, setActiveKey] = useState('uploads');

  const renderContent = () => (
    <Card className="min-h-[400px] rounded-xl bg-white p-6 shadow-lg">
      {componentsMap[activeKey] || (
        <p className="text-center text-gray-500">กรุณาเลือกเมนูด้านบน</p>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="mb-6 bg-white shadow">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {menuItems.map(({ key, label }) => {
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`whitespace-nowrap rounded-t-lg px-4 py-2 font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4">{renderContent()}</main>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
