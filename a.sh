#!/bin/bash

echo "🚀 Finalizing project architecture..."

# 1. สร้าง middleware.ts (สำคัญมากสำหรับ Auth)
if [ ! -f "middleware.ts" ]; then
  cat <<EOF > middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // เพิ่ม Logic ตรวจสอบ Session ที่นี่
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
EOF
  echo "📄 Created: middleware.ts"
fi

# 2. สร้างโครงสร้าง Supabase Server-side (Next.js 15 ต้องแยก Client/Server)
touch lib/supabase/server.ts
touch lib/supabase/middleware.ts

# 3. จัดการโฟลเดอร์ hooks (สร้างไฟล์ตัวอย่าง)
if [ -z "$(ls -A hooks)" ]; then
  touch hooks/use-auth.ts
  echo "⚓ Created: hooks/use-auth.ts"
fi

# 4. เพิ่มไฟล์สำหรับการตั้งค่าระบบ (Config)
touch next.config.ts

echo "✅ All essential files are in place."
