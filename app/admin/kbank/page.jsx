// app/admin/kbank/page.jsx (Server Component)

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ReportSummary from '@/components/admin/kbank/Sections/ReportSummary';
import TransactionList from '@/components/admin/kbank/Sections/TransactionList';

export default async function KBankAdminPage({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // 1. ดึงข้อมูลรายการธุรกรรม
  // Note: อาจพบปัญหา RLS/การเชื่อมต่อ หากพบ error ควรตรวจสอบสิทธิ์
  const { data: transactions, error } = await supabase.from('kbank_transactions').select('*');

  // 2. 💡 FIX: การคำนวณ summaryData (ตัวแปรที่ขาดหายไป)
  const safeTransactions = transactions || [];

  const summaryData = safeTransactions.reduce(
    (summary, tx) => {
      // สมมติฐาน: ตารางมีคอลัมน์ 'amount' ที่เป็นบวก (รายรับ) หรือลบ (รายจ่าย)
      const amount = tx.amount || 0;

      if (amount > 0) {
        summary.totalIncome += amount;
      } else {
        // ใช้ Math.abs เพื่อแสดงรายจ่ายเป็นค่าบวกในการสรุปผล
        summary.totalExpense += Math.abs(amount);
      }

      summary.netBalance += amount;
      return summary;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
      transactionCount: safeTransactions.length,
      // ส่ง Error ไปยัง Component เพื่อให้ Admin ทราบถึงปัญหา RLS/การเชื่อมต่อ
      fetchError: error ? JSON.stringify(error) : null,
    },
  );

  // 3. จัดการ Error กรณี Fetch ล้มเหลวทั้งหมด
  if (error && !transactions) {
    console.error('Critical KBank Data Fetch Error:', JSON.stringify(error));
    // อาจ return เป็น Error UI หรือ Empty State ชั่วคราวที่นี่
  }

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <h1 className="mb-8 text-4xl font-extrabold text-indigo-700">
        KBank Transaction Administration
      </h1>

      {/* 💡 ส่ง summaryData ที่ถูกคำนวณแล้ว */}
      <ReportSummary data={summaryData} />

      <TransactionList transactions={safeTransactions} searchParams={searchParams} />
    </div>
  );
}
