#!/bin/bash

# 📁 โฟลเดอร์ที่ต้องตรวจสอบ
LIB_DIR="./lib"

# 🔍 ค้นหาไฟล์ทั้งหมดใน lib
find "$LIB_DIR" -type f | while read filepath; do
  filename=$(basename "$filepath")
  relative=$(realpath --relative-to=. "$filepath")

  # 🔍 ตรวจสอบว่าไฟล์ถูกเรียกใช้หรือไม่
  usage=$(grep -r --exclude-dir=lib "$filename" .)

  if [ -z "$usage" ]; then
    echo "❌ UNUSED: $relative"
  else
    echo "✅ USED:   $relative"
  fi
done
