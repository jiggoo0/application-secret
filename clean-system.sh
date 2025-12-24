#!/bin/bash

# 🏗️ JP-VISOUL: Lib Data Hunter
# ตรวจสอบไฟล์ที่ไม่ได้ถูกเรียกใช้ในโฟลเดอร์ lib/

BACKUP_DIR="_trash_lib_vault_$(date +%Y%m%d_%H%M%S)"
UNUSED_COUNT=0

echo "---------------------------------------------------"
echo "🛰️  SCANNING_LIB_VAULT: lib/ (Logic Trace)"
echo "---------------------------------------------------"

# ค้นหาไฟล์ .ts และ .js ทั้งหมดใน lib
FILES=$(find lib -type f \( -name "*.ts" -o -name "*.js" \))

for FILE in $FILES; do
    # 1. ดึงชื่อไฟล์ (เช่น utils)
    FILENAME=$(basename "$FILE" | cut -d. -f1)
    
    # ข้ามไฟล์ที่จำเป็นต้องมี
    if [[ "$FILENAME" == "index" || "$FILENAME" == "fonts" ]]; then
        continue
    fi

    # 🔍 2. ค้นหาการเรียกใช้ใน app, components, lib
    # เช็คการ import ทั้งแบบชื่อไฟล์ และ path
    SEARCH_RESULT=$(grep -rE "from.*['\"].*/$FILENAME['\"]|import.*['\"].*/$FILENAME['\"]" app components lib \
        --exclude-dir=".next" \
        --exclude-dir="node_modules" \
        --exclude-dir="$BACKUP_DIR" \
        --exclude="$FILE" \
        -l)

    if [ -z "$SEARCH_RESULT" ]; then
        echo "🚩 [UNUSED_LOGIC]: $FILE"
        
        # ย้ายไปที่ Vault สำรอง
        mkdir -p "$BACKUP_DIR/$(dirname "$FILE")"
        mv "$FILE" "$BACKUP_DIR/$FILE"
        
        ((UNUSED_COUNT++))
    fi
done

echo "---------------------------------------------------"
if [ $UNUSED_COUNT -eq 0 ]; then
    echo "✅ LIB_IS_LEAN: โฟลเดอร์ lib สะอาดเรียบร้อย"
else
    echo "💀 LIB_PURGE_COMPLETE: ย้ายไฟล์ขยะ $UNUSED_COUNT ไฟล์ไปที่ $BACKUP_DIR"
fi
echo "---------------------------------------------------"
