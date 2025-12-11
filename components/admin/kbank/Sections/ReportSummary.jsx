// components/admin/kbank/Sections/ReportSummary.jsx
import ReportCard from '../UI/ReportCard';

/**
 * ReportSummary
 * Presentation component: แสดงผลข้อมูลสรุปที่ได้รับมา
 * @param {object} props
 * @param {object} props.summaryData - ข้อมูลสรุปที่ถูกจัดรูปแล้ว
 * @param {number} props.summaryData.totalTransactions - ยอดรวมธุรกรรม
 * @param {number} props.summaryData.totalAmount - จำนวนเงินรวม
 * @param {number} props.summaryData.successRate - อัตราความสำเร็จ (%)
 */
export default function ReportSummary({ summaryData }) {
  if (!summaryData) return null;

  const { totalTransactions, totalAmount, successRate } = summaryData;

  // Helper function for display formatting
  // Note: ควรย้ายไปที่ utils หรือ lib เพื่อให้โค้ดเป็นระเบียบยิ่งขึ้น
  const formatCurrency = (value) => {
    // Assume THB currency based on context
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(value);
  };
  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  // Logic: กำหนดสีตามเกณฑ์ความสำเร็จ (Semantic Color)
  // ✅ ถูกต้อง: การกำหนด Semantic Color Logic อยู่ใน Presentation Layer เพราะเกี่ยวข้องกับการแสดงผล
  let successRateColor;
  if (successRate >= 98) {
    successRateColor = 'success'; // ดีมาก (เน้นด้วยสีเขียว)
  } else if (successRate >= 95) {
    successRateColor = 'warning'; // ควรระวัง (เน้นด้วยสีเหลือง)
  } else {
    successRateColor = 'destructive'; // ต่ำกว่าเกณฑ์ (เน้นด้วยสีแดง)
  }

  return (
    // ✅ ถูกต้อง: ใช้ Design Tokens (bg-card, text-foreground) ตามมาตรฐาน Layout
    <section className="rounded-lg bg-card p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Transaction Summary (Last 30 Days)
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 1. Total Transactions */}
        <ReportCard
          title="Total Transactions"
          value={totalTransactions.toLocaleString()}
          unit="รายการ"
          color="primary" // ✅ Semantic Color: Primary Brand Focus
        />

        {/* 2. Total Amount */}
        <ReportCard
          title="Total Amount"
          value={formatCurrency(totalAmount)}
          unit=""
          color="primary" // ✅ Semantic Color: Primary Brand Focus
        />

        {/* 3. Success Rate */}
        <ReportCard
          title="Success Rate"
          value={formatPercentage(successRate)}
          unit=""
          color={successRateColor} // ✅ Dynamic Semantic Color: ใช้สีตามเกณฑ์
        />
      </div>
    </section>
  );
}
