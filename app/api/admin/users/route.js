// app/api/admin/users/route.js
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/users.json');

// โหลดผู้ใช้จาก JSON
async function loadUsers() {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    if (!raw.trim()) return [];
    const users = JSON.parse(raw);
    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.warn('[Users API] ⚠️ Load users.json failed:', err);
    return [];
  }
}

// บันทึกผู้ใช้กลับไปยัง JSON
async function saveUsers(users) {
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[Users API] ❌ Save users.json failed:', err);
    return false;
  }
}

// 🔹 GET: ดึงผู้ใช้ทั้งหมด
export async function GET() {
  const users = await loadUsers();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 🔹 POST: เพิ่มผู้ใช้ใหม่
export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
      });
    }

    const users = await loadUsers();
    const exists = users.find((u) => u.email.toLowerCase() === body.email.toLowerCase());
    if (exists) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }

    const newUser = {
      id: Date.now().toString(),
      email: body.email,
      password: body.password, // ⚠️ สำหรับ production ให้ hash password ก่อนบันทึก
      name: body.name || body.email.split('@')[0],
      role: body.role || 'user',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Users API] POST error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// 🔹 PUT: แก้ไขผู้ใช้ (ต้องส่ง body.id)
export async function PUT(req) {
  try {
    const body = await req.json();
    if (!body.id) {
      return new Response(JSON.stringify({ error: 'User ID required' }), { status: 400 });
    }

    const users = await loadUsers();
    const index = users.findIndex((u) => u.id === body.id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    users[index] = {
      ...users[index],
      ...body,
      updated_at: new Date().toISOString(),
    };

    await saveUsers(users);

    return new Response(JSON.stringify(users[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Users API] PUT error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// 🔹 DELETE: ลบผู้ใช้ (ต้องส่ง query ?id=)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'User ID required' }), { status: 400 });
    }

    const users = await loadUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await saveUsers(filtered);

    return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 });
  } catch (err) {
    console.error('[Users API] DELETE error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
