#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { hashPassword } from '../../lib/passwordUtils.js'; // ใช้ relative path สำหรับ Node.js

const FILE_PATH = path.join(process.cwd(), 'data', 'newuser.json');
const BACKUP_PATH = path.join(process.cwd(), 'data', 'newuser.backup.json');

async function main() {
  try {
    // อ่านไฟล์
    const raw = await fs.readFile(FILE_PATH, 'utf8');
    if (!raw.trim()) {
      console.error('❌ newuser.json ว่างเปล่า');
      return;
    }

    let users;
    try {
      users = JSON.parse(raw);
      if (!Array.isArray(users)) throw new Error('ไม่ใช่ Array');
    } catch {
      console.error('❌ โครงสร้าง newuser.json ต้องเป็น Array');
      return;
    }

    // สำรองไฟล์เก่า
    await fs.writeFile(BACKUP_PATH, JSON.stringify(users, null, 2), 'utf8');

    // แปลงรหัสผ่านทุก user
    for (const user of users) {
      if (user.password && typeof user.password === 'string') {
        user.password = await hashPassword(user.password);
      }
    }

    // เขียนกลับไฟล์ใหม่
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), 'utf8');

    console.log(`✅ แปลงรหัสผ่านเรียบร้อย! สำรองไฟล์ไว้ที่ ${path.basename(BACKUP_PATH)}`);
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาด:', err);
  }
}

main();
