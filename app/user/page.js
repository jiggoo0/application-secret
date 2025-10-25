// app/user/page.server.jsx

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRoadmap } from '@/lib/services/roadmap/RoadmapService';
import { getTargets } from '@/lib/services/target/TargetService';
import UserDashboardClient from './UserDashboardClient';
import { redirect } from 'next/navigation';

export default async function UserDashboardPageServer() {
  // ตรวจสอบ session ผู้ใช้
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  // สร้างข้อมูลผู้ใช้จาก session
  const user = {
    name: session.user.name || session.user.email || 'ผู้ใช้งาน',
    email: session.user.email || '-',
    role: session.user.role || 'user',
    image: session.user.image || null,
  };

  // ดึงข้อมูล roadmap และ targets พร้อมกัน
  let roadmap = [];
  let targets = [];

  try {
    [roadmap, targets] = await Promise.all([getRoadmap(), getTargets()]);
  } catch (err) {
    console.error('[UserDashboardPageServer] Failed to fetch roadmap/targets:', err);
    roadmap = [];
    targets = [];
  }

  // ส่งข้อมูลไปยัง client component
  return <UserDashboardClient user={user} roadmap={roadmap} targets={targets} />;
}
