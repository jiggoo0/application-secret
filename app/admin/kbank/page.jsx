// app/admin/kbank/page.jsx
// 💡 Server Component: หน้าหลักของ KBank Feature (Dashboard/Transactions)

import { Suspense } from 'react';
import KBankAdminLayout from '@/components/admin/kbank/Layout/KBankAdminLayout';
import { ReportSummaryContainer } from '@/components/admin/kbank/Sections/ReportSummary'; // Client Container
import { TransactionListContainer } from '@/components/admin/kbank/Sections/TransactionList'; // Client Container

export default function KBankMainPage() {
  return (
    <KBankAdminLayout title="KBank Transaction Dashboard">
      <div className="space-y-8">
        {/* Summary Section */}
        <Suspense
          fallback={
            <div className="h-28 animate-pulse rounded-lg border border-border bg-muted">
              Loading summary...
            </div>
          }
        >
          <ReportSummaryContainer />
        </Suspense>

        <h2 className="pt-4 text-2xl font-bold text-foreground">Transaction History</h2>

        {/* Transaction List Section */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-muted-foreground">Loading transactions...</div>
          }
        >
          <TransactionListContainer />
        </Suspense>
      </div>
    </KBankAdminLayout>
  );
}
