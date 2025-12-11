// components/admin/kbank/UI/TransactionRow.jsx

/**
 * StatusPill
 * Component ย่อยสำหรับแสดงสถานะธุรกรรมด้วยสีเชิงความหมาย
 * @param {'SUCCESS' | 'FAILED' | 'PENDING'} props.status
 */
const StatusPill = ({ status }) => {
  let colorClass = 'text-muted-foreground bg-muted'; // Default fallback

  switch (status) {
    case 'SUCCESS':
      // ใช้ text-success และ bg-success/10 เพื่อความชัดเจนและอ่านง่าย
      colorClass = 'text-success bg-success/10';
      break;
    case 'FAILED':
      // ใช้ text-destructive และ bg-destructive/10
      colorClass = 'text-destructive bg-destructive/10';
      break;
    case 'PENDING':
      // ใช้ text-warning และ bg-warning/10
      colorClass = 'text-warning bg-warning/10';
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
};

/**
 * TransactionRow
 * @param {object} props
 * @param {Transaction} props.transaction
 */
export default function TransactionRow({ transaction }) {
  const { transactionId, amount, status, timestamp, details } = transaction;

  // Format amount to ensure high readability for financial data
  const formattedAmount = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    // hover:bg-muted เพื่อให้เห็นว่า Row สามารถคลิกได้ (actionable)
    <tr className="transition-colors hover:bg-muted/50">
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
        {transactionId}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
        {new Date(timestamp).toLocaleString()}
      </td>
      {/* เน้น Amount ด้วยสี Primary (KBank Green) หรือสีข้อความหลัก */}
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-primary">
        {formattedAmount}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-center">
        <StatusPill status={status} />
      </td>
      <td className="max-w-xs truncate px-6 py-4 text-sm text-muted-foreground">{details}</td>
    </tr>
  );
}
