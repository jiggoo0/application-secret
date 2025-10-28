'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import clsx from 'clsx';

/**
 * @typedef {Object} DashboardSectionProps
 * @property {string} title - Section title
 * @property {string} [iconName] - Lucide icon name as string
 * @property {React.ReactNode} children - Section content
 * @property {string} [className] - Optional wrapper class
 */

/**
 * DashboardSection รองรับ scrollable inner content
 * และ responsive layout บน mobile/desktop
 *
 * @param {DashboardSectionProps} props
 */
export default function DashboardSection({ title, iconName, children, className }) {
  const Icon = iconName ? LucideIcons[iconName] : null;

  const isEmpty =
    children === null ||
    children === undefined ||
    (Array.isArray(children) && children.length === 0) ||
    (typeof children === 'boolean' && !children);

  return (
    <motion.section
      className={clsx('space-y-4', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section Header */}
      <h2
        className="flex items-center gap-2 border-b border-gray-300 pb-2 text-xl font-semibold text-gray-700 dark:border-gray-700 dark:text-white"
        aria-label={title}
      >
        {Icon && <Icon className="h-5 w-5 text-blue-500" aria-hidden="true" />}
        <span>{title}</span>
      </h2>

      {/* Section Content */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full">
          {!isEmpty ? (
            children
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">ไม่มีข้อมูลในส่วนนี้</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
