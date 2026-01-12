#!/bin/bash

# === CONFIG ===
OUTPUT_FILE="project-summary-with-code.md"
REPORT_FILE="pre-deploy-report.md"
WHITELIST_DIRS=("app" "components" "lib" "hooks" "types" "scripts" "public" "data" "config")

# รายชื่อไฟล์สำคัญสำหรับส่งให้ AI วิเคราะห์
SCAN_FILES=(
  "ai-context.md"
  "$REPORT_FILE"
  "app/globals.css"
  "app/layout.tsx"
  "scripts/generate-ai-context.ts"
  "config/site.ts"
  "config/navigation.ts"
  "config/theme.ts"
  "config/showcase-types.ts"
  "app/actions/lead-actions.ts"
  "components/services/serviceData.ts"
  "tailwind.config.ts"
  "tsconfig.json"
  "package.json"
  "next.config.ts"
  "components.json"
  "lib/supabase.ts"
  ".env"
)

# ✅ 1. เคลียร์ไฟล์เก่า
rm -f "$OUTPUT_FILE"

# === EXECUTE ===
echo "🚀 เริ่มปฏิบัติการสแกน Full Context: https://www.jpvisouldocs.online ..."

{
  echo "# 📑 รายงานสรุปโปรเจกต์และบริบท AI (Full Context)"
  echo "_สร้างเมื่อ: $(date '+%Y-%m-%d %H:%M:%S')_"
  echo "> **Status:** Fresh Scan | รวมข้อมูลวิเคราะห์ Route & Code"
  echo ""

  # --- 1. วิเคราะห์สุขภาพโปรเจกต์ (Logic จากสคริปต์โครงสร้าง) ---
  echo "## 🔴 1. สถานะสุขภาพโปรเจกต์ล่าสุด"
  if [ -f "$REPORT_FILE" ]; then
    # 1.1 ตรวจสอบสถานะภาพรวม
    if grep -q "### ✅ READY FOR DEPLOY" "$REPORT_FILE"; then
      echo "✅ **READY FOR DEPLOY** (ผ่านการตรวจสอบทุกขั้นตอน)"
    else
      echo "❌ **FIX REQUIRED** (โปรดตรวจสอบข้อผิดพลาดด้านล่าง)"
    fi
    echo ""

    # 1.2 ดึงรายละเอียด Route Map
    if grep -q "### 📊 Route Statistics" "$REPORT_FILE"; then
      echo "### 📍 Production Route Map"
      echo '```text'
      sed -n '/### 📊 Route Statistics/,/---/p' "$REPORT_FILE" | \
      grep -v "###" | grep -v -- "---" | sed '/^$/d'
      echo '```'
    fi
  else
    echo "⚠️ *ไม่พบไฟล์ $REPORT_FILE: กรุณารัน pre-deploy-check.sh*"
  fi
  echo ""

  # --- 2. สถิติไฟล์ ---
  echo "## 📊 2. สถิติไฟล์แบ่งตามนามสกุล"
  echo '```text'
  find "${WHITELIST_DIRS[@]}" -type f 2>/dev/null \
    | sed 's/.*\.//' | sort | uniq -c | sort -nr
  echo '```'
  echo ""

  # --- 3. โครงสร้างโฟลเดอร์ ---
  echo "## 📁 3. โครงสร้างโฟลเดอร์ (Tree)"
  echo '```text'
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
            [ -d "$path" ] && echo "${indent}📂 $name" || echo "${indent}📄 $name"
          done
    fi
  done
  echo '```'
  echo ""

  # --- 4. สแกนเนื้อหาโค้ดไฟล์สำคัญ ---
  echo "## 📄 4. เนื้อหาโค้ดและบริบททางเทคนิค"
  for file in "${SCAN_FILES[@]}"; do
    if [ -f "$file" ]; then
      echo "#### 🔍 Path: $file"
      ext="${file##*.}"
      lang="text"
      case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|mjs) lang="javascript" ;;
        json) lang="json" ;;
        md) lang="markdown" ;;
        css) lang="css" ;;
      esac

      echo '```'"$lang"
      if [ "$file" = ".env" ]; then
        # ปิดบังความลับใน .env
        sed 's/=.*/= "********"/' "$file"
      elif [ "$file" = "package.json" ] && command -v jq >/dev/null 2>&1; then
        jq '{name, version, scripts, dependencies, devDependencies}' package.json
      else
        cat "$file"
      fi
      echo '```'
      echo "---"
      echo ""
    fi
  done

  echo "## 📝 บทสรุป"
  echo "การสแกนเสร็จสิ้น ข้อมูลถูกจัดรูปแบบให้ AI ประมวลผลได้ทันที"
  echo ". Format code in: Optimized"

} > "$OUTPUT_FILE"

echo "✅ สแกนเสร็จสิ้น! รายงานฉบับสมบูรณ์อยู่ที่ → $OUTPUT_FILE"
