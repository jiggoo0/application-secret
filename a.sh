#!/bin/bash

# =========================================================
# 1. CLEANUP: ลบไฟล์ Template Logic เก่าที่ถูกแทนที่
#    - ไฟล์เหล่านี้เป็นแบบ Monolithic (HTML + CSS) และถูกแทนที่ด้วยระบบ Modular
# =========================================================
echo "1. Deleting old monolithic template files..."
rm -f lib/html_templates/generateTourVerifiedHtml.js
rm -f lib/html_templates/generateFlightVerifiedHtml.js
rm -f lib/html_templates/generateHotelVerifiedHtml.js


# =========================================================
# 2. CREATE/REPLACE: สร้างไฟล์ Not Found กลับมา
#    - ไฟล์นี้เป็น Special Case Template ที่มี Layout ในตัวเอง
#    - ต้องสร้างใหม่เพื่อให้พร้อมสำหรับการใส่โค้ด generateNotFoundContent() ที่ Refactor แล้ว
# =========================================================
echo "2. Ensuring the special-case Not Found template exists..."
touch lib/html_templates/generateNotFoundHtml.js

echo "✅ File structure adjusted successfully. Ready for content replacement."
