// app/admin/page.jsx
// 💡 Server Component: หน้าหลัก (Entry Point) ของ Admin Dashboard

import DashboardWidgetsContainer from '@/components/admin/DashboardWidgets'; // Server Component Container

export default function AdminRootPage() {
  return (
    <div className="container mx-auto p-6 md:p-10">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Admin Feature Overview</h1>
      <DashboardWidgetsContainer />
    </div>
  );
}
