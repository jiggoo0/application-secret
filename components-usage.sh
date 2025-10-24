#!/bin/bash
# 🧩 components-usage.sh — ตรวจสอบการใช้งานไฟล์ใน components/ และสร้างรายงาน Markdown

COMP_DIR="$HOME/project/components"
OUTPUT_FILE="$HOME/project/components-usage-report.md"

echo "🔍 กำลังสร้างรายงานการใช้งานไฟล์ใน: $COMP_DIR"
echo "----------------------------------------"

# รีเซ็ตไฟล์รายงาน
{
  echo "# 📊 รายงานการใช้งานไฟล์ในโฟลเดอร์ components"
  echo "_อัปเดตเมื่อ: $(date)_"
  echo
  echo "---"
  echo
} > "$OUTPUT_FILE"

# Loop ทุกไฟล์ .js .jsx .tsx ใน components/
find "$COMP_DIR" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.tsx" \) | while read -r file; do
  filename=$(basename "$file")
  name="${filename%.*}"

  usage=$(grep -r "$name" "$HOME/project" --exclude-dir=".git" --exclude="$file" --include \*.{js,jsx,ts,tsx})

  {
    echo "## 🧱 $filename"
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

echo "✅ สร้างรายงานสำเร็จ → $OUTPUT_FILE"