// 🚀 File: components/admin/DashboardWidgetsLogic.js

import * as LucideIcons from 'lucide-react';

/**
 * Logic: Dynamically resolves the Lucide icon component by name.
 * @param {string} iconName - Name of the Lucide icon (e.g., 'FileText').
 * @returns {React.ComponentType | null} The React component for the icon, or null if not found.
 */
export const getIconComponent = (iconName) => {
  // @ts-ignore - LucideIcons is dynamically accessed
  const Icon = LucideIcons[iconName];
  return Icon || null;
};

/**
 * Logic: Provides Tailwind CSS classes based on a predefined color key.
 * @param {string} color - Predefined color key ('green', 'blue', 'purple', etc.).
 * @returns {string} Tailwind CSS class string including background, text, and hover effects.
 */
export const getColorClasses = (color) => {
  switch (color) {
    case 'green':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:shadow-lg hover:border-emerald-500';
    case 'blue':
      return 'bg-blue-100 text-blue-700 border-blue-300 hover:shadow-lg hover:border-blue-500';
    case 'purple':
      return 'bg-violet-100 text-violet-700 border-violet-300 hover:shadow-lg hover:border-violet-500';
    case 'indigo':
      return 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:shadow-lg hover:border-indigo-500';

    // 🟢 NEW: เพิ่ม logic สำหรับสี Orange
    case 'orange':
      return 'bg-orange-100 text-orange-700 border-orange-300 hover:shadow-lg hover:border-orange-500';

    default:
      return 'bg-gray-100 text-gray-700 border-gray-300 hover:shadow-lg hover:border-gray-500';
  }
};
