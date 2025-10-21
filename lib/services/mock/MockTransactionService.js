// lib/services/mock/MockTransactionService.js
import Papa from 'papaparse';

const USERS_CSV =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/UsersStatus.csv';
const PRODUCTS_CSV =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/productItems.csv';
const ADMINS_CSV =
  'https://tgzgjuqawhwsqwrlidpo.supabase.co/storage/v1/object/public/user-uploads/Databessuser%20/adminStatus.csv';

// ตั้งค่าเปอร์เซ็นต์โอกาสสถานะ (รวมกัน = 100)
const STATUS_PROBABILITY = {
  กำลังดำเนินการ: 50,
  เสร็จสิ้น: 35,
  รอดำเนินการ: 15,
};

export async function getMockTransactions(count = 10) {
  const [users, products, admins] = await Promise.all([
    fetchCsv(USERS_CSV),
    fetchCsv(PRODUCTS_CSV),
    fetchCsv(ADMINS_CSV),
  ]);

  const transactions = Array.from({ length: count }, () => {
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const admin = admins[Math.floor(Math.random() * admins.length)];

    const status = randomStatus();
    const date = randomDate(60); // 🔹ย้อนหลังไม่เกิน 60 วัน (ISO string)

    return {
      customer: formatCustomer(user),
      product: formatProduct(product),
      status,
      date, // ✅ ISO string
      team: formatTeam(admin),
    };
  });

  return transactions;
}

// 🔹 ดึงข้อมูล CSV
async function fetchCsv(url) {
  const res = await fetch(url);
  const text = await res.text();
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return data;
}

// 🔹 ฟังก์ชันสุ่มสถานะตามเปอร์เซ็นต์
function randomStatus() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const [status, prob] of Object.entries(STATUS_PROBABILITY)) {
    cumulative += prob;
    if (rand <= cumulative) return status;
  }
  return 'กำลังดำเนินการ';
}

// 🔹 ฟังก์ชันสุ่มวันที่ย้อนหลังไม่เกิน N วัน (ISO string)
function randomDate(maxDaysBack = 60) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - maxDaysBack);
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString();
}

// ✅ ป้องกัน JSX error ด้วยการแปลงเป็น string
function formatCustomer(user) {
  if (!user) return '—';
  return [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || '—';
}

function formatProduct(product) {
  if (!product) return '—';
  return typeof product === 'string' ? product : product.name || '—';
}

function formatTeam(admin) {
  if (!admin) return '—';
  return admin.owner || admin.name || '—';
}
