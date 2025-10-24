// app/user/UserDashboardClient.jsx
'use client';

import Image from 'next/image';
import DashboardSection from '@/components/shared/DashboardSection';
import FileUploadForm from '@/components/user/FileUploadForm';
import RoadmapSummary from '@/components/user/RoadmapSummary';
import TargetBreakdown from '@/components/user/TargetBreakdown';
import RandomTransactionTable from '@/components/user/RandomTransactionTable';
import UserSessionHistory from '@/components/user/UserSessionHistory';
import SecurityNotice from '@/components/user/SecurityNotice';
import LogoutButton from '@/components/common/LogoutButton';
import ChatRoom from '@/components/ChatRoom/ChatRoom';
import ResultAnnouncement from '@/components/documents/ResultAnnouncement';

export default function UserDashboardClient({ user, roadmap, targets }) {
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

        <div className="w-full max-w-md rounded-md bg-gray-100 p-4 text-left dark:bg-gray-800">
          <p>
            <strong>ชื่อ:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
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
        <DashboardSection title="อัปโหลดเอกสารเพิ่มเติม" iconName="FileText">
          <FileUploadForm />
        </DashboardSection>

        <DashboardSection title="ประกาศผล" iconName="CheckCircle">
          <ResultAnnouncement />
        </DashboardSection>

        <DashboardSection title="ประวัติการเข้าใช้งาน" iconName="Clock">
          <UserSessionHistory userEmail={user.email} />
        </DashboardSection>

        <DashboardSection title="รายงานผลการดำเนินงาน" iconName="Shuffle">
          <RandomTransactionTable />
        </DashboardSection>

        <DashboardSection title="แผนงานโดยรวม" iconName="Map">
          <RoadmapSummary data={roadmap} />
        </DashboardSection>

        <DashboardSection title="เป้าหมายที่ตั้งไว้" iconName="Target">
          <TargetBreakdown data={targets} />
        </DashboardSection>

        <DashboardSection title="CHAT ROOM JP51I0" iconName="MessageCircle">
          <ChatRoom roomId="main-room" user={user} />
        </DashboardSection>
      </div>
    </main>
  );
}
