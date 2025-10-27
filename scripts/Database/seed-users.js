#!/usr/bin/env node

/**
 * seedAllUsers.js
 * ✅ Hash password, update table users, insert/update users.json
 * ✅ Create users in Supabase Auth (admin + user)
 */

import fs from 'fs';
import path from 'path';
import { hash } from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

// Supabase server
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env');
  process.exit(1);
}

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

// Path users.json
const filePath = path.join(process.cwd(), 'data', 'users.json');

async function seedAllUsers() {
  if (!fs.existsSync(filePath)) {
    console.error('❌ users.json not found at', filePath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(rawData);

  console.log(`ℹ️ Found ${users.length} users in users.json`);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // 1️⃣ Hash password สำหรับ database
    const hashedPassword = await hash(user.password, 10);
    users[i].password = hashedPassword;

    // 2️⃣ Insert/Update database table `users`
    try {
      const { data: existing, error: fetchError } = await supabaseServer
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('❌ Error fetching from table:', user.email, fetchError.message);
        continue;
      }

      if (!existing) {
        const { error: insertError } = await supabaseServer
          .from('users')
          .insert([
            { email: user.email, password: hashedPassword, role: user.role, name: user.name },
          ]);
        if (insertError) console.error('❌ Insert failed:', user.email, insertError.message);
        else console.log('✅ Inserted into DB:', user.email);
      } else {
        const { error: updateError } = await supabaseServer
          .from('users')
          .update({ password: hashedPassword, role: user.role, name: user.name })
          .eq('email', user.email);
        if (updateError) console.error('❌ Update failed:', user.email, updateError.message);
        else console.log('🔄 Updated DB user:', user.email);
      }
    } catch (err) {
      console.error('❌ DB operation failed for', user.email, err.message);
    }

    // 3️⃣ สร้าง user ใน Supabase Auth
    try {
      const { error } = await supabaseServer.auth.admin.createUser({
        email: user.email,
        password: user.password, // ใช้รหัสผ่านเดิม (plain text)
        email_confirm: true,
      });

      if (error) {
        if (error.message.includes('already exists')) {
          console.log('🔹 Already exists in Auth:', user.email);
        } else {
          console.error('❌ Error creating Auth user:', user.email, error.message);
        }
      } else {
        console.log('✅ Created in Auth:', user.email);
      }
    } catch (err) {
      console.error('❌ Auth create exception for', user.email, err.message);
    }
  }

  // 4️⃣ บันทึก users.json ใหม่ (hashed password)
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  console.log('🎉 Seed complete! Users updated in DB, Auth, and users.json');
}

// Run script
seedAllUsers();
