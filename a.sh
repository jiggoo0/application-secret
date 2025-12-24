#!/bin/bash

# --- 🏗️ STEP 1: สร้างโฟลเดอร์โครงสร้างใหม่ ---
echo "📂 Creating new directory structure..."
mkdir -p app/\(main\)
mkdir -p app/\(business\)/\[biz_type\]/_components/templates

# --- 🏗️ STEP 2: ย้ายหน้าเว็บหลักเข้ากลุ่ม (main) ---
# ระบบจะข้ามไฟล์ layout.tsx หลักเพื่อรักษา Provider และ CSS
echo "🚀 Moving main site routes to (main) group..."

# รายชื่อโฟลเดอร์หน้าเว็บหลัก
MAIN_PAGES=("about" "blog" "contact" "services" "works" "reviews" "dti" "fb" "flight-booking" "letter-service" "verify")

for page in "${MAIN_PAGES[@]}"; do
    if [ -d "app/$page" ]; then
        mv "app/$page" "app/(main)/"
        echo "✅ Moved: app/$page -> app/(main)/$page"
    fi
done

# ย้ายไฟล์หน้าแรกและไฟล์เสริม
[ -f "app/page.tsx" ] && mv app/page.tsx app/\(main\)/
[ -f "app/loading.tsx" ] && mv app/loading.tsx app/\(main\)/
[ -f "app/favicon.ico" ] && mv app/favicon.ico app/\(main\)/

# --- 🏗️ STEP 3: สร้างไฟล์ Template เริ่มต้นสำหรับธุรกิจ ---
echo "📝 Generating business template files..."

# สร้างไฟล์ Dispatcher Page
cat <<EOF > app/\(business\)/\[biz_type\]/page.tsx
import { notFound } from 'next/navigation';

export default async function BusinessPage({ params }: { params: Promise<{ biz_type: string }> }) {
    const { biz_type } = await params;
    const allowedBiz = ['visa', 'loan', 'property']; // เพิ่มชื่อธุรกิจที่พี่ต้องการที่นี่
    
    if (!allowedBiz.includes(biz_type.toLowerCase())) return notFound();

    return (
        <div className="p-20 text-center">
            <h1 className="text-7xl font-black uppercase italic tracking-tighter">
                {biz_type} <span className="text-blue-600">Portal</span>
            </h1>
            <p className="mt-4 font-mono text-xs text-slate-400">STATUS: SYSTEM_READY_FOR_CUSTOM_UI</p>
        </div>
    );
}
EOF

# สร้างไฟล์ Layout สำหรับฝั่งธุรกิจ (แยก Header/Footer)
cat <<EOF > app/\(business\)/\[biz_type\]/layout.tsx
import React from 'react';

export default async function BusinessLayout({ 
    children, 
    params 
}: { 
    children: React.ReactNode, 
    params: Promise<{ biz_type: string }> 
}) {
    const { biz_type } = await params;
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="border-b-4 border-slate-900 p-6 flex justify-between items-center bg-white sticky top-0 z-50">
                <div className="font-black text-2xl italic uppercase tracking-tighter">
                    {biz_type}_Operations
                </div>
                <div className="font-mono text-[10px] bg-slate-900 text-white px-2 py-1">
                    SECURE_ACCESS
                </div>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="border-t-4 border-slate-900 p-10 bg-slate-50 font-mono text-[9px] text-center">
                © 2025 JP-VISOUL // BUSINESS_UNIT: {biz_type.toUpperCase()}
            </footer>
        </div>
    );
}
EOF

echo "---------------------------------------------------"
echo "✅ RESTRUCTURE COMPLETE: โปรเจกต์พร้อมขยายตัวแล้ว!"
echo "---------------------------------------------------"
