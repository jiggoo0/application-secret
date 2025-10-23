import { createClient } from '@supabase/supabase-js';
import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// 1️⃣ ตั้งค่า Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase env variables!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 2️⃣ อ่าน users.json
const filePath = path.join(process.cwd(), 'data', 'users.json');
if (!fs.existsSync(filePath)) {
  console.error('users.json not found!');
  process.exit(1);
}

const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// 3️⃣ กรอง admin users
const admins = jsonData.filter((u) => u.role === 'admin');

async function addAdmins() {
  for (const admin of admins) {
    try {
      // Hash password
      const hashedPassword = await hash(admin.password, 10);

      // เพิ่มลง Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true,
      });

      if (authError) {
        if (authError.message.includes('User already registered')) {
          console.log(`Admin already exists in Supabase Auth: ${admin.email}`);
        } else {
          throw authError;
        }
      } else {
        console.log(`Added admin to Supabase Auth: ${admin.email}`);
      }

      // เพิ่มหรืออัปเดตใน users table
      const { data: dbData, error: dbError } = await supabase.from('users').upsert(
        {
          email: admin.email,
          password: hashedPassword,
          role: admin.role,
          name: admin.name,
        },
        { onConflict: ['email'] },
      );

      if (dbError) throw dbError;

      console.log(`Added/updated admin in users table: ${admin.email}`);
    } catch (err) {
      console.error(`Error adding admin ${admin.email}:`, err.message);
    }
  }

  console.log('✅ All admins processed!');
}

// เรียกใช้งาน
addAdmins();
