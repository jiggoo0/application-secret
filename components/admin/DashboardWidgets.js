// components/admin/DashboardWidgets.js
// 💡 Server Component / Container Logic

// Import Client Component ด้วยชื่อ default Export
import DashboardWidgets from './DashboardWidgets.jsx';

/**
 * DashboardWidgetsContainer
 * Server Component / Container Logic
 */
export const DashboardWidgetsContainer = () => {
  // Data Preparation (Server Side)
  const adminFeatures = [
    {
      id: 'kbank',
      title: 'KBANK Transactions',
      description: 'View and manage KBank reports.',
      href: '/admin/kbank',
      iconName: 'Banknote',
      color: 'green',
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage user accounts.',
      href: '/admin/users',
      iconName: 'Users',
      color: 'blue',
    },
    {
      id: 'reports',
      title: 'System Reports',
      description: 'Generate operational reports.',
      href: '/admin/reports',
      iconName: 'BarChart3',
      color: 'purple',
    },
    {
      id: 'letters',
      title: 'Letter Service',
      description: 'Manage letter service orders.',
      href: '/admin/letters',
      iconName: 'Mail',
      color: 'indigo',
    },
  ];

  return <DashboardWidgets featureLinks={adminFeatures} />;
};

export default DashboardWidgetsContainer;
