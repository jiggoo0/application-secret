#!/bin/bash

# ----------------------------------------------------------------------
# Script: find_unused_generic.sh
# Description: ค้นหาไฟล์ที่ไม่ได้ถูก import/เรียกใช้ ในไดเรกทอรีที่กำหนด
# ----------------------------------------------------------------------

# ⚠️ 1. กำหนดไดเรกทอรีที่ต้องการตรวจสอบ (ต้องเปลี่ยนค่านี้ทุกครั้ง)
# *** แก้ไขเป็น "hooks" แล้ว ***
SOURCE_DIR="hooks"

# 2. กำหนดไดเรกทอรีที่ต้องการค้นหาการใช้งาน (ค้นหาในทุกส่วนของโค้ด)
SEARCH_DIRS="./app ./components ./lib ./hooks ./data ./config ./utils ./types"

# 3. สร้างไฟล์ Log สำหรับเก็บผลลัพธ์
LOG_FILE="unused_${SOURCE_DIR}_report.txt"

# ตรวจสอบว่าได้กำหนด SOURCE_DIR แล้ว
if [ "$SOURCE_DIR" == "[SET_YOUR_DIRECTORY_HERE]" ]; then
    # บรรทัดนี้จะถูกข้ามไปเพราะเราตั้งค่า SOURCE_DIR แล้ว
    echo "ERROR: Please set the SOURCE_DIR variable (e.g., 'hooks', 'data') inside the script before running."
    exit 1
fi

# ล้างไฟล์ log เก่า
> "$LOG_FILE"
echo "--- ${SOURCE_DIR} Usage Report (Generated: $(date)) ---" >> "$LOG_FILE"
echo "Searching for unused files in: $SOURCE_DIR" >> "$LOG_FILE"
echo "--------------------------------------------------------" >> "$LOG_FILE"


# 4. ค้นหาไฟล์ทั้งหมดในไดเรกทอรีที่กำหนด
find "$SOURCE_DIR" -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" \) | while read TARGET_FILE; do

    # 4.1. สกัดชื่อไฟล์ (เช่น useAuth.ts -> useAuth)
    FILENAME=$(basename "$TARGET_FILE")
    FILENAME_NO_EXT="${FILENAME%.*}"
    
    # 4.2. กำหนดคำที่ใช้ค้นหา (ใช้ชื่อไฟล์ที่ไม่มีนามสกุลในการค้นหา)
    SEARCH_TERM="$FILENAME_NO_EXT"
    
    # 4.3. ค้นหาการอ้างอิงของชื่อไฟล์นั้นใน Source Files
    
    # เราใช้ .ts, .tsx, .js, .jsx, .json ในการค้นหา
    RAW_COUNT=$(grep -r -h -F -i --include=\*.{ts,tsx,js,jsx,json} "$SEARCH_TERM" $SEARCH_DIRS | grep -v 'import type')

    # กรองการอ้างอิงในไฟล์ตัวเองออก:
    USAGE_COUNT=$(echo "$RAW_COUNT" | grep -v "$TARGET_FILE" | wc -l)
    
    if [ "$USAGE_COUNT" -gt 0 ]; then
        echo "[✅ USED]: $TARGET_FILE (Found $USAGE_COUNT reference(s))" >> "$LOG_FILE"
    else
        echo "[❌ UNUSED]: $TARGET_FILE" >> "$LOG_FILE"
        echo "   -> (POTENTIAL DEAD CODE - Recommend review for deletion)" >> "$LOG_FILE"
    fi

done

# 5. แสดงผลลัพธ์
echo "--------------------------------------------------------" >> "$LOG_FILE"
echo "Script finished. Check $LOG_FILE for results." >> "$LOG_FILE"
echo ""

# แสดงสรุปผลลัพธ์ใน Terminal
echo "--- SUMMARY OF UNUSED FILES IN ${SOURCE_DIR}/ ---"
grep "\[❌ UNUSED\]" "$LOG_FILE" | sed 's/\[❌ UNUSED\]://g'
echo "-------------------------------------------------"
cat "$LOG_FILE"
