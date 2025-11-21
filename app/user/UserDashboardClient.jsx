'use client';

import Image from 'next/image';
import { FileText, Clock, Shuffle, Map, Target, User2, Mail, BadgeCheck } from 'lucide-react';

import DashboardSection from '@/components/shared/DashboardSection';
import FileUploadForm from '@/components/user/FileUploadForm';
import RoadmapSummary from '@/components/user/RoadmapSummary';
import TargetBreakdown from '@/components/user/TargetBreakdown';
import RandomTransactionTable from '@/components/user/RandomTransactionTable';
import UserSessionHistory from '@/components/user/UserSessionHistory';
import SecurityNotice from '@/components/user/SecurityNotice';
import LogoutButton from '@/components/common/LogoutButton';

// 📄 เอกสารระบบ
import CompanyAccount from '@/components/documents/CompanyAccount';
import CompanyAccount1 from '@/components/documents/CompanyAccount1'; // สำหรับบัตรเครดิตทั่วไป

/**
 * @param {{ user: any, roadmap: any[], targets: any[] }} props
 */
export default function UserDashboardClient({ user, roadmap, targets }) {
  const DASHBOARD_SECTIONS = [
    { title: 'อัปโหลดเอกสารเพิ่มเติม', icon: FileText, component: <FileUploadForm user={user} /> },
    { title: 'ประวัติการเข้าใช้งาน', icon: Clock, component: <UserSessionHistory user={user} /> },
    { title: 'รายงานผลการดำเนินงาน', icon: Shuffle, component: <RandomTransactionTable /> },
    { title: 'แผนงานโดยรวม', icon: Map, component: <RoadmapSummary roadmap={roadmap} /> },
    { title: 'เป้าหมายที่ตั้งไว้', icon: Target, component: <TargetBreakdown targets={targets} /> },
    { title: 'สถานะคำขอสินเชื่อ SME', icon: FileText, component: <CompanyAccount /> }, // ใช้งาน CompanyAccount
    { title: 'สถานะคำขอบัตรเครดิต', icon: FileText, component: <CompanyAccount1 /> }, // ใช้งาน CompanyAccount1
  ];

  return (
    <main className="min-h-screen space-y-12 bg-white px-4 py-10 dark:bg-gray-900 md:px-12 lg:px-24">
      {/* Header */}
      <section className="flex flex-col items-center space-y-6 text-center">
        {user.image && (
          <Image
            src={user.image}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full border-4 border-blue-500 object-cover shadow-md"
            priority
            unoptimized
          />
        )}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          ยินดีต้อนรับ <span className="text-blue-600 dark:text-blue-400">{user.name}</span>
        </h1>

        <div className="w-full max-w-md space-y-2 rounded-md bg-gray-100 p-4 text-left dark:bg-gray-800">
          <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <User2 className="h-4 w-4" />
            <strong>ชื่อ:</strong> {user.name}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Mail className="h-4 w-4" />
            <strong>Email:</strong> {user.email}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <BadgeCheck className="h-4 w-4" />
            <strong>Role:</strong>{' '}
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-800 dark:text-green-200">
              {user.role}
            </span>
          </p>
        </div>

        <LogoutButton />
        <div className="w-full max-w-2xl">
          <SecurityNotice />
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/signatureเจ้าป่า.webp"
            alt="เจ้าป่า"
            width={128}
            height={128}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {DASHBOARD_SECTIONS.map(({ title, icon: Icon, component }) => (
          <DashboardSection key={title} title={title} icon={<Icon className="h-5 w-5" />}>
            {component}
          </DashboardSection>
        ))}
      </div>
    </main>
  );
}
