// scripts/Database/importKeylock.js
import fs from 'fs';
import path from 'path';
import { supabaseServer } from '../../lib/supabase/server.js';

/**
 * สคริปต์นี้ทำ 2 อย่างพร้อมกัน:
 * 1. แปลงรหัสปกติจาก plain-codes.txt เป็น Base64
 * 2. สร้างไฟล์ Keylock.json สำรอง
 * 3. อัปโหลดลง Supabase keylocks table
 */

// Paths
const plainFile = path.join(process.cwd(), 'data', 'plain-codes.txt');
const jsonFile = path.join(process.cwd(), 'data', 'Keylock.json');

// ตรวจสอบไฟล์
if (!fs.existsSync(plainFile)) {
  console.error('❌ Input file not found:', plainFile);
  process.exit(1);
}

// อ่านรหัสปกติ
const lines = fs
  .readFileSync(plainFile, 'utf-8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

// แปลงเป็น Base64 + สร้างโครงสร้าง JSON
const keylockData = lines.map((code) => ({
  hashed_code: Buffer.from(code, 'utf-8').toString('base64'),
  used: false,
}));

// เขียนไฟล์ Keylock.json
fs.writeFileSync(jsonFile, JSON.stringify(keylockData, null, 2));
console.log(`✅ Wrote ${keylockData.length} keys to ${jsonFile}`);

// อัปโหลดเข้า Supabase
async function uploadToSupabase() {
  try {
    for (const key of keylockData) {
      const { error } = await supabaseServer
        .from('keylocks')
        .upsert(key, { onConflict: ['hashed_code'] });

      if (error) console.error('❌ Error inserting key:', key.hashed_code, error);
      else console.log('✅ Inserted key:', key.hashed_code);
    }
    console.log('🎉 All keys uploaded to Supabase!');
  } catch (err) {
    console.error('❌ Unexpected error during upload:', err);
  }
}

// รัน
uploadToSupabase();
