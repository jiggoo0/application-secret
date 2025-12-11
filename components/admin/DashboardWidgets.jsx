// components/admin/DashboardWidgets.jsx
'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

// --- Helper Functions (แก้ไข: ใช้ export const เพื่อแก้ ReferenceError) ---

export const getIconComponent = (name) => {
  // @ts-ignore
  const Icon = LucideIcons[name];
  return Icon || null;
};

export const getColorClasses = (color) => {
  switch (color) {
    case 'green':
      return 'bg-success/10 text-success border-success/50 hover:shadow-lg hover:border-success';
    case 'blue':
      return 'bg-primary/10 text-primary border-primary/50 hover:shadow-lg hover:border-primary';
    case 'purple':
      return 'bg-secondary/10 text-secondary border-secondary/50 hover:shadow-lg hover:border-secondary';
    case 'indigo':
      return 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:shadow-lg hover:border-indigo-500';
    default:
      return 'bg-muted/50 text-foreground border-border hover:shadow-lg hover:border-foreground';
  }
};

// ----------------------------------------------------
// 2.1 Atomic UI Component: FeatureCard (แก้ไข: ใช้ function เพื่อแก้ ReferenceError)
// ----------------------------------------------------

function FeatureCard({ title, description, href, iconName, color }) {
  // ✅ เรียกใช้ Helper Function ที่ถูก Export แล้ว
  const colorClasses = getColorClasses(color);
  const IconComponent = getIconComponent(iconName);

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-xl border p-6 transition-all duration-300 ${colorClasses}`}
    >
      <div className="flex items-start space-x-4">
        <span
          className={`flex-shrink-0 rounded-full bg-card p-3 transition-colors duration-200 group-hover:bg-card/90`}
        >
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </span>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// 2.2 Main Presentation Component: DashboardWidgets
// ----------------------------------------------------

export default function DashboardWidgets({ featureLinks }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featureLinks.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  );
}
