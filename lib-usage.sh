#!/bin/bash

LIB_DIR="$HOME/project/lib"
OUTPUT_FILE="$HOME/project/lib-usage-report.md"

echo "🧩 Generating usage report for: $LIB_DIR"
echo "----------------------------------------"

# สร้างหรือเคลียร์ไฟล์ก่อนเริ่ม
echo "# 📊 รายงานการใช้งานไฟล์ในโฟลเดอร์ lib" > "$OUTPUT_FILE"
echo "_อัปเดตเมื่อ: $(date)_\n" >> "$OUTPUT_FILE"

# Loop ทุกไฟล์ .js ใน lib/
find "$LIB_DIR" -type f -name "*.js" | while read -r file; do
  filename=$(basename "$file")
  name="${filename%.*}" # ตัด .js ออก

  usage=$(grep -r "$name" "$HOME/project" --exclude-dir=".git" --exclude="$file" --include \*.{js,jsx,ts,tsx})

  {
    echo "## 📄 $filename"
    echo "**ตำแหน่งไฟล์:** \`$file\`"
    echo

    if [ -n "$usage" ]; then
      echo "✅ **ถูกเรียกใช้งานในโปรเจกต์**"
      echo '```'
      echo "$usage" | head -n 10
      echo '```'
    else
      echo "⚠️ **ไม่พบการใช้งานในโปรเจกต์**"
    fi

    echo
    echo "---"
    echo
  } >> "$OUTPUT_FILE"
done

echo "✅ สร้างรายงานเสร็จสิ้น: $OUTPUT_FILE"