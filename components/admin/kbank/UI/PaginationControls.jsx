// components/admin/kbank/UI/PaginationControls.jsx

/**
 * PaginationControls
 * Atomic component: แสดงปุ่มควบคุมการเปลี่ยนหน้า
 * @param {object} props
 * @param {number} props.currentPage - หน้าปัจจุบัน (1-based index)
 * @param {number} props.totalPages - จำนวนหน้ารวมทั้งหมด
 * @param {(page: number) => void} props.onPageChange - Handler เมื่อมีการกดเปลี่ยนหน้า
 */
export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    // ใช้ text-foreground/text-muted-foreground สำหรับข้อความ
    <div className="flex items-center justify-between text-foreground">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`rounded-md border px-3 py-1 text-sm font-medium transition-colors ${
          isFirstPage
            ? // ✅ Disabled State: ใช้ bg-muted/text-muted-foreground
              'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-60'
            : // ✅ Active State: ใช้ bg-card/text-primary/border-border
              'border-border bg-card text-primary hover:bg-muted'
        }`}
      >
        Previous
      </button>

      <span className="text-sm text-muted-foreground">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{' '}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`rounded-md border px-3 py-1 text-sm font-medium transition-colors ${
          isLastPage
            ? // ✅ Disabled State: ใช้ bg-muted/text-muted-foreground
              'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-60'
            : // ✅ Active State: ใช้ bg-card/text-primary/border-border
              'border-border bg-card text-primary hover:bg-muted'
        }`}
      >
        Next
      </button>
    </div>
  );
}
