#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const DATA_FILE = path.resolve('data/users.json');
const TABLE_NAME = 'users';
const SALT_ROUNDS = 10;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY ไม่ถูกตั้งค่า');
  process.exit(1);
}

if (!fs.existsSync(DATA_FILE)) {
  console.error(`❌ ไม่พบไฟล์ ${DATA_FILE}`);
  process.exit(1);
}

async function main() {
  const rawUsers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const updatedUsers = [];

  console.log('======================================================================');
  console.log('🧠 Hash Passwords & Upload Users to Supabase');
  console.log('======================================================================');

  for (const user of rawUsers) {
    const email = user.email;
    const password = user.password;

    // hash password ด้วย bcryptjs
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // update user object
    const userPayload = { ...user, password: hashedPassword };
    updatedUsers.push(userPayload);

    // ส่งขึ้น Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: hashedPassword,
      }),
    });

    if (response.status === 201) {
      console.log(`✅ สร้าง user: ${email} สำเร็จ`);
    } else {
      console.warn(`⚠️ ล้มเหลวในการสร้าง user: ${email} (HTTP ${response.status})`);
      const text = await response.text();
      console.warn(text);
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedUsers, null, 2), 'utf-8');
  console.log('✅ อัปเดตรหัสผ่านเป็น hashed ใน users.json');
  console.log('======================================================================');
  console.log('✅ Upload Users เสร็จสิ้น');
  console.log('======================================================================');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
