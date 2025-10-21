import fs from 'fs';
import path from 'path';
import { supabaseServer } from '../../lib/supabase/server.js';
import { hash } from 'bcryptjs';

// Path ไปยัง users.json
const filePath = path.join('/data/data/com.termux/files/home/project/data', 'users.json');

async function seedUsers() {
  try {
    // อ่านไฟล์ users.json
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(rawData);

    // Loop ทุก user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // Hash password
      const hashedPassword = await hash(user.password, 10);
      users[i].password = hashedPassword; // อัพเดตใน array เดิม

      // ตรวจสอบว่ามี user อยู่แล้ว
      const { data: existing, error: fetchError } = await supabaseServer
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('❌ Error fetching', user.email, fetchError.message);
        continue;
      }

      if (!existing) {
        // Insert user ใหม่
        const { error: insertError } = await supabaseServer.from('users').insert([
          {
            email: user.email,
            password: hashedPassword,
            role: user.role,
            name: user.name,
          },
        ]);

        if (insertError) console.error('❌ Insert failed for', user.email, insertError.message);
        else console.log('✅ Inserted', user.email);
      } else {
        // Update user เดิม
        const { error: updateError } = await supabaseServer
          .from('users')
          .update({
            password: hashedPassword,
            role: user.role,
            name: user.name,
          })
          .eq('email', user.email);

        if (updateError) console.error('❌ Update failed for', user.email, updateError.message);
        else console.log('🔄 Updated', user.email);
      }
    }

    // บันทึก array users กลับลงไฟล์เดิม
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    console.log('🎉 Seed complete! Passwords hashed and saved in users.json');
  } catch (err) {
    console.error('❌ Seed script failed:', err);
  }
}

// Run seed script
seedUsers();
