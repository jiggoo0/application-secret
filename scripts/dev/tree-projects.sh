#!/bin/bash

# === CONFIG ===
OUTPUT_FILE="project-structure.md"
PRE_DEPLOY_REPORT="pre-deploy-report.md"
WHITELIST_DIRS=("app" "components" "lib" "hooks" "types" "scripts" "public" "data")

# ✅ 1. ลบไฟล์เก่าทิ้งก่อนเริ่มงาน
rm -f "$OUTPUT_FILE"

# === EXECUTE ===
echo "🚀 กำลังสแกนโครงสร้างโฟลเดอร์และวิเคราะห์โปรเจกต์..."

{
  echo "# 📁 รายงานโครงสร้างโปรเจกต์"
  echo "_สร้างเมื่อ: $(date)_"
  echo ""

  # --- 2. โครงสร้างโฟลเดอร์ ---
  echo "## 🌳 Folder Structure"
  for dir in "${WHITELIST_DIRS[@]}"; do
    if [ -d "$dir" ]; then
      echo "📂 $dir"
      find "$dir" -maxdepth 10 -mindepth 1 \
        -path "*/node_modules" -prune -o \
        -path "*/.*" -prune -o \
        -print | while read -r path; do
          depth=$(echo "$path" | tr -cd '/' | wc -c)
          indent=$(printf '%*s' $((depth * 2)) "")
          name=$(basename "$path")
          if [ -d "$path" ]; then
            echo "${indent}📂 $name"
          else
            echo "${indent}📄 $name"
          fi
        done
    fi
  done

  echo ""
  echo "## 📦 ตรวจหา package.json"
  echo '```json'
  if [ -f "package.json" ]; then
    echo "พบ package.json ที่ root ของโปรเจกต์"
    echo ""
    if command -v jq >/dev/null 2>&1; then
      jq '{name, version, scripts, dependencies, devDependencies}' package.json
    else
      cat package.json
    fi
  else
    echo "ไม่พบ package.json"
  fi
  echo '```'
  echo ""

  # --- 3. ส่วนวิเคราะห์ปัญหา (ดึงมาจาก Pre-deploy Report) ---
  echo "## 📝 ผลการวิเคราะห์และปัญหาที่พบ"
  echo "________"
  
  if [ -f "$PRE_DEPLOY_REPORT" ]; then
    echo "🔍 ตรวจพบรายงานการตรวจสอบล่าสุด:"
    echo ""
    
    # 3.1 ตรวจสอบสถานะภาพรวม
    if grep -q "### ✅ READY FOR DEPLOY" "$PRE_DEPLOY_REPORT"; then
      echo "✅ สถานะปัจจุบัน: **READY FOR DEPLOY**"
    else
      echo "❌ สถานะปัจจุบัน: **FIX REQUIRED**"
    fi
    echo ""

    # 3.2 ดึงรายละเอียด Route Statistics
    if grep -q "### 📊 Route Statistics" "$PRE_DEPLOY_REPORT"; then
      echo "### 📍 Production Route Map"
      echo "\`\`\`text"
      # ✅ แก้ไข: ใช้ -- เพื่อป้องกัน grep เข้าใจผิดเรื่อง Option
      # และใช้ sed เพื่อดึงเนื้อหาที่อยู่ระหว่างหัวข้อ
      sed -n '/### 📊 Route Statistics/,/---/p' "$PRE_DEPLOY_REPORT" | \
      grep -v "###" | \
      grep -v -- "---" | \
      sed '/^$/d'
      echo "\`\`\`"
    fi

    # 3.3 ดึง Error/Warning
    echo "### ⚠️ Issues Highlight"
    # ✅ แก้ไข: ใส่ -- หลัง grep -E เพื่อความปลอดภัย
    ERRORS=$(grep -E -- "❌|⚠️|error|warning" "$PRE_DEPLOY_REPORT")
    if [ -z "$ERRORS" ]; then
      echo "✅ ไม่พบปัญหาสำคัญในรายงานล่าสุด"
    else
      echo "$ERRORS"
    fi
  else
    echo "⚠️ ไม่พบไฟล์ $PRE_DEPLOY_REPORT กรุณารัน pre-deploy-check.sh ก่อน"
  fi

  echo ""
  echo "---"
  echo "Status: Scanning process completed successfully."

} > "$OUTPUT_FILE"

echo "✅ แก้ไขคำสั่งและสแกนเสร็จสิ้น → $OUTPUT_FILE"
