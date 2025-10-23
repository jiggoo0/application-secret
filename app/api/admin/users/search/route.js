import { readUsers } from '@/lib/users';

/**
 * 🔍 ค้นหาผู้ใช้ตามคำค้น (email, name, หรือ id)
 * @route POST /api/admin/users/search
 * @body { query: string }
 * @returns { results: Array }
 */
export async function POST(req) {
  try {
    const { query } = await req.json();

    const isValid = typeof query === 'string' && query.trim().length >= 2;
    if (!isValid) {
      return Response.json({ error: 'กรุณาระบุคำค้นที่ถูกต้อง' }, { status: 400 });
    }

    const keyword = query.trim().toLowerCase();
    const users = await readUsers();

    const results = users.filter((user) =>
      [user.id, user.email, user.name]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(keyword)),
    );

    return Response.json({ results });
  } catch (err) {
    console.error('[API] ❌ POST /users/search failed:', err.message);
    return Response.json({ error: 'เกิดข้อผิดพลาดในการค้นหาผู้ใช้' }, { status: 500 });
  }
}
