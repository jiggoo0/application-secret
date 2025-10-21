import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

// 🧩 Components
import FileUploadForm from '@/components/user/FileUploadForm';
import RoadmapSummary from '@/components/user/RoadmapSummary';
import TargetBreakdown from '@/components/user/TargetBreakdown';
import RandomTransactionTable from '@/components/user/RandomTransactionTable';
import UserSessionHistory from '@/components/user/UserSessionHistory';
import DashboardSection from '@/components/shared/DashboardSection';
import SecurityNotice from '@/components/user/SecurityNotice';
import ErrorFallback from '@/components/shared/ErrorFallback';
import LogoutButton from '@/components/common/LogoutButton';

// 🔧 Services
import { getRoadmap } from '@/lib/services/roadmap/RoadmapService';
import { getTargets } from '@/lib/services/target/TargetService';

// 🌐 Metadata
import { userDashboardMetadata as metadata } from '@/lib/metadata/th';
export { metadata };

export default async function UserDashboardPage() {
  // ตรวจสอบ session
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  try {
    const [roadmap, targets] = await Promise.all([getRoadmap(), getTargets()]);

    const user = {
      name: session.user.name || session.user.email || 'ผู้ใช้งาน',
      email: session.user.email || '-',
      role: session.user.role || 'user',
      image: session.user.image || null,
    };

    return (
      <main className="min-h-screen space-y-12 bg-white px-4 py-10 dark:bg-gray-900 md:px-8">
        {/* Header Section */}
        <section className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
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

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              ยินดีต้อนรับ <span className="text-blue-600 dark:text-blue-400">{user.name}</span>
            </h1>

            <div className="mt-2 inline-block rounded-md bg-gray-100 p-3 text-left dark:bg-gray-800">
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
          </div>

          <div className="mx-auto max-w-2xl">
            <SecurityNotice />
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/signatureเจ้าป่า.webp"
              alt="เจ้าป่า"
              width={128}
              height={128}
              priority
              className="object-contain"
              unoptimized
            />
          </div>
        </section>

        {/* Upload Documents */}
        <DashboardSection title="อัปโหลดเอกสารเพิ่มเติม" iconName="FileText">
          <FileUploadForm />
        </DashboardSection>

        {/* User Session History */}
        <DashboardSection title="ประวัติการเข้าใช้งาน" iconName="Clock">
          <UserSessionHistory userEmail={user.email} />
        </DashboardSection>

        {/* Random Transactions */}
        <DashboardSection title="รายงานผลการดำเนินงาน" iconName="Shuffle">
          <RandomTransactionTable />
        </DashboardSection>

        {/* Roadmap Overview */}
        <DashboardSection title="แผนงานโดยรวม" iconName="Map">
          <RoadmapSummary data={roadmap} />
        </DashboardSection>

        {/* Target Breakdown */}
        <DashboardSection title="เป้าหมายที่ตั้งไว้" iconName="Target">
          <TargetBreakdown data={targets} />
        </DashboardSection>
      </main>
    );
  } catch (error) {
    console.error('[UserDashboardPage] ❌ Failed to load user data:', error);
    return <ErrorFallback />;
  }
}
