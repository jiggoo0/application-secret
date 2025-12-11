// components/admin/kbank/Sections/TransactionList.jsx
import TransactionRow from '../UI/TransactionRow';
import PaginationControls from '../UI/PaginationControls';

// ... (Interface Definitions) ...

/**
 * TransactionList
 * Presentation component: แสดงตารางรายการธุรกรรมพร้อม Pagination และ Filter UI
 * ... (Props Definition) ...
 */
export default function TransactionList({
  transactions,
  pagination,
  isLoading,
  error,
  currentStatus,
  onPageChange,
  onStatusChange,
}) {
  const statusOptions = ['ALL', 'SUCCESS', 'PENDING', 'FAILED'];

  return (
    // ✅ Theming: ใช้ bg-card เป็นพื้นหลังหลักของ Section
    <section className="rounded-lg bg-card p-6 shadow">
      {/* Header: ใช้ text-foreground */}
      <h2 className="mb-4 text-xl font-semibold text-foreground">Recent Transactions</h2>

      {/* Filter Controls: ใช้ Semantic Token เพื่อความยืดหยุ่น */}
      <div className="mb-4 flex space-x-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)} // ✅ ถูกต้อง: เรียก Handler ที่มาจาก Container
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentStatus.toUpperCase() === status.toUpperCase()
                ? // ✅ Active State: ใช้ bg-primary/text-primary-foreground (KBank Branding)
                  'bg-primary text-primary-foreground shadow-md'
                : // ✅ Inactive State: ใช้ bg-muted/text-muted-foreground (พื้นหลังรอง)
                  'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* State Rendering */}
      {isLoading && (
        <div className="p-8 text-center text-muted-foreground">Loading transactions...</div>
      )}
      {error && (
        // ✅ Error State: ใช้ text-destructive เพื่อสื่อสาร Error
        <div className="p-8 text-center text-destructive">Error loading data: {error.message}</div>
      )}

      {!isLoading && !error && (
        <>
          {/* Transaction Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                {/* Header: ใช้ bg-muted/text-muted-foreground */}
                <tr className="bg-muted">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                    Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase text-muted-foreground">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                    Details
                  </th>
                </tr>
              </thead>
              {/* Table Body: ใช้ bg-card/divide-border */}
              <tbody className="divide-y divide-border bg-card">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    // ✅ ถูกต้อง: Delegate การ Render แถวให้กับ Atomic Component
                    <TransactionRow key={tx.transactionId} transaction={tx} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-muted-foreground">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pt-4">
              {/* ✅ ถูกต้อง: Delegate การควบคุม Paging ให้ Atomic Component */}
              <PaginationControls
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange} // ✅ ถูกต้อง: ส่ง Handler จาก Container ลงมา
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
