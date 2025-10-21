#!/bin/bash
# check-utils-usage.sh
# ตรวจสอบว่าไฟล์ในโฟลเดอร์ utils ถูกใช้งานหรือไม่

UTILS_DIR="./utils"
PROJECT_DIR="."  # root project

if [ ! -d "$UTILS_DIR" ]; then
  echo "❌ Directory $UTILS_DIR ไม่พบ"
  exit 1
fi

echo "🔍 Checking usage of files in $UTILS_DIR ..."

# loop ทุกไฟล์ใน utils
for file in "$UTILS_DIR"/*.{js,ts,jsx,tsx}; do
  [ -e "$file" ] || continue  # skip ถ้าไม่มีไฟล์
  filename=$(basename "$file")
  name_no_ext="${filename%.*}"

  # search ใน project ทั้งหมด ยกเว้น node_modules, .next
  usage_count=$(grep -r --exclude-dir={node_modules,.next} "$name_no_ext" "$PROJECT_DIR" | wc -l)

  if [ "$usage_count" -gt 0 ]; then
    echo "✅ $filename ถูกใช้งาน $usage_count ครั้ง"
  else
    echo "⚠️ $filename ไม่ถูกใช้งาน"
  fi
done

echo "🔹 ตรวจสอบเสร็จสิ้น"