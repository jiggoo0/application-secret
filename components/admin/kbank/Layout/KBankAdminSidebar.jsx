// components/admin/kbank/Layout/KBankAdminSidebar.jsx
'use client';

import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', path: '/admin/kbank/dashboard', key: 'dashboard' },
  { name: 'Transactions', path: '/admin/kbank/transactions', key: 'transactions' },
  { name: 'Settings', path: '/admin/kbank/settings', key: 'settings' },
];

/**
 * KBankAdminSidebar
 * เมนูนำทางด้านข้างสำหรับ KBank Feature
 */
export default function KBankAdminSidebar({ activeSection }) {
  return (
    <nav className="rounded-lg border border-border bg-card p-4 shadow-md">
      <h3 className="mb-3 text-base font-semibold text-foreground">KBank Services</h3>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.path}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                item.key === activeSection
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
