// scripts/seedRoom.js
// ===========================================
// ใช้สำหรับ Seed ข้อมูลห้องแชทใน Supabase
// ใช้ Supabase client ฝั่ง Server (SERVICE_ROLE_KEY)
// ===========================================

import { createClient } from '@supabase/supabase-js';

// ✅ ตรวจสอบ environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('❌ Missing Supabase env variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// สร้าง Supabase client สำหรับ server
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ============================
// กำหนดห้องสาธารณะ
// ============================
const publicRooms = [
  { id: 'admin-contact', title: 'ติดต่อ Addmin' },
  { id: 'payment', title: 'ชำระเงิน' },
  { id: 'jp-direct', title: 'พูดคุยเจ้าป่าโดยตรง' },
  { id: 'jp-hash', title: 'ตรวจสอบรหัส JPHASHPASSWORD' },
  { id: 'report-issue', title: 'แจ้งปัญหา' },
];

// ============================
// กำหนดห้องส่วนตัว
// ============================
const privateRoomIds = [
  'JP51I0',
  'JP52I0',
  'JP53I0',
  'JP54I0',
  'JP55I0',
  'JP56I0',
  'JP57I0',
  'JP58I0',
  'JP59I0',
  'JP60I0',
  'JP61I0',
  'JP62I0',
  'JP63I0',
  'JP64I0',
  'JP65I0',
];

const privateRooms = privateRoomIds.map((id) => ({
  id,
  title: id,
  room_password: '999001', // รหัสเข้าห้อง
  is_private: true,
}));

// ============================
// Seed ข้อมูลลงใน Supabase
// ============================
async function seedChatRooms() {
  try {
    const allRooms = [
      ...publicRooms.map((room) => ({
        ...room,
        room_password: null,
        is_private: false,
      })),
      ...privateRooms,
    ];

    // upsert: ถ้ามี id ซ้ำจะอัปเดต, ถ้าไม่มีก็ insert
    const { error } = await supabase.from('chat_rooms').upsert(allRooms, {
      onConflict: 'id',
    });

    if (error) throw error;

    console.log('✅ Chat rooms seeded successfully');
  } catch (err) {
    console.error('❌ Failed to seed chat_rooms:', err.message);
  }
}

// ============================
// เรียกใช้ function
// ============================
seedChatRooms();
