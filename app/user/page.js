// app/user/page.server.jsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRoadmap } from '@/lib/services/roadmap/RoadmapService';
import { getTargets } from '@/lib/services/target/TargetService';
import UserDashboardClient from './UserDashboardClient';
import { redirect } from 'next/navigation';

export default async function UserDashboardPageServer() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  // ดึงข้อมูลพร้อมกัน
  const [roadmap, targets] = await Promise.all([getRoadmap(), getTargets()]);

  const user = {
    name: session.user.name || session.user.email || 'ผู้ใช้งาน',
    email: session.user.email || '-',
    role: session.user.role || 'user',
    image: session.user.image || null,
  };

  return <UserDashboardClient user={user} roadmap={roadmap} targets={targets} />;
}
