#!/bin/bash

APP_DIR="./app"

# 🔍 ค้นหาไฟล์ทั้งหมดใน app
find "$APP_DIR" -type f | while read filepath; do
  filename=$(basename "$filepath")
  relative=$(realpath --relative-to=. "$filepath")

  # 🔍 ตรวจสอบว่าไฟล์ถูกเรียกใช้หรือไม่ (ยกเว้นตัวเอง)
  usage=$(grep -r --exclude="$filename" "$filename" . | grep -v "$relative")

  if [ -z "$usage" ]; then
    echo "❌ UNUSED: $relative"
  else
    echo "✅ USED:   $relative"
  fi
done
