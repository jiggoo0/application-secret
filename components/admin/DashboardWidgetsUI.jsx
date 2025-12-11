// components/admin/DashboardWidgetsUI.jsx
'use client';

import Link from 'next/link';
// ✅ อัปเดต Path การ Import
import { getIconComponent, getColorClasses } from './DashboardWidgetsLogic';

// ----------------------------------------------------
// 2.1 Atomic UI Component: FeatureCard
// ----------------------------------------------------

/**
 * @component FeatureCard
 * @description Card component for displaying individual features.
 */
function FeatureCard({ title, description, href, iconName, color }) {
  const colorClasses = getColorClasses(color);
  const IconComponent = getIconComponent(iconName);

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-xl border p-6 transition-all duration-300 ${colorClasses}`}
    >
      <div className="flex items-start space-x-4">
        {/* Icon Container (ปรับให้มีพื้นหลังเพื่อแยกจากพื้นหลังการ์ด) */}
        <span
          className={`flex-shrink-0 rounded-lg bg-white/50 p-3 transition-colors duration-200 group-hover:bg-white dark:bg-black/50 dark:group-hover:bg-black`}
        >
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </span>

        {/* Text content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold transition-colors duration-200 group-hover:underline">
            {title}
          </h3>
          <p className="mt-1 text-sm opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// 2.2 Main Presentation Component: DashboardWidgetsUI
// ----------------------------------------------------

/**
 * @component DashboardWidgetsUI
 * @description Displays a grid of feature links.
 */
export default function DashboardWidgetsUI({ featureLinks }) {
  if (!featureLinks || featureLinks.length === 0) {
    return (
      <div className="rounded-lg border bg-gray-50 p-8 text-center dark:bg-gray-800">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          ไม่พบรายการฟีเจอร์สำหรับการแสดงผล
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featureLinks.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  );
}
