#!/usr/bin/env bash

# 📁 Path ไปยัง Keylock.json (สัมพัทธ์จากตำแหน่งสคริปต์)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEYLOCK_PATH="$SCRIPT_DIR/../../data/Keylock.json"

# 🔐 รับรหัสจาก argument หรือ prompt
INPUT_CODE="$1"
RESET_FLAG="$2" # ถ้าใส่ "reset" จะล้างทั้งหมด

# ✅ ตรวจสอบว่าใส่รหัสหรือยัง
if [[ -z "$INPUT_CODE" ]]; then
  read -p "กรุณาใส่รหัสปลดล็อก: " INPUT_CODE
fi

# 🔄 แปลงรหัสเป็น base64
ENCODED_CODE=$(echo -n "$INPUT_CODE" | base64)

# 🧹 ถ้าใส่ "reset" ให้ล้างไฟล์ก่อน
if [[ "$RESET_FLAG" == "reset" ]]; then
  echo "[]" > "$KEYLOCK_PATH"
  echo "🧹 ล้าง Keylock.json แล้วเริ่มใหม่"
fi

# 📦 สร้างรหัสใหม่ในรูปแบบ JSON (ไม่มี expiresAt แล้ว)
NEW_ENTRY=$(cat <<EOF
{
  "hashedCode": "$ENCODED_CODE",
  "used": false
}
EOF
)

# 🧩 รวมกับรหัสเดิมอย่างปลอดภัย
if [[ -f "$KEYLOCK_PATH" && -s "$KEYLOCK_PATH" ]]; then
  EXISTING=$(cat "$KEYLOCK_PATH")
  if echo "$EXISTING" | jq 'type == "array"' | grep -q true; then
    UPDATED=$(echo "$EXISTING" | jq ". + [$NEW_ENTRY]")
  else
    echo "❌ รูปแบบ Keylock.json ไม่ใช่ array — ล้างไฟล์ก่อนหรือแก้ไขด้วยมือ"
    exit 1
  fi
else
  UPDATED="[$NEW_ENTRY]"
fi

# 💾 เขียนกลับลงไฟล์
echo "$UPDATED" > "$KEYLOCK_PATH"

# ✅ แสดงผลลัพธ์
echo ""
echo "✅ เพิ่มรหัสใหม่เข้า Keylock.json สำเร็จ"
echo "🔐 รหัส (base64): $ENCODED_CODE"
echo "📄 Path: $KEYLOCK_PATH"
echo ""