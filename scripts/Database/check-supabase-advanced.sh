#!/bin/bash
# ======================================================================
# 📦 Script: check-supabase-advanced.sh
# 🧩 Purpose: ตรวจสอบการเชื่อมต่อและข้อมูล Supabase (Production Ready)
# 🧑‍💻 Author: JP Visual & Docs DevOps (ปรับปรุง)
# ======================================================================

# ------------------------------------------------------------
# 🔧 การตั้งค่าเบื้องต้น
# ------------------------------------------------------------
ENV_FILE=".env"
TABLES=("users" "keylocks" "uploads")  # เพิ่ม uploads table
TMP_DIR="./scripts/tmp"
TMP_BUCKETS="$TMP_DIR/sb_buckets.json"

# สร้างโฟลเดอร์ชั่วคราว
mkdir -p "$TMP_DIR"

# ------------------------------------------------------------
# 🧩 โหลดค่าจาก .env
# ------------------------------------------------------------
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ ไม่พบไฟล์ $ENV_FILE"
  exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "⚠️ ไม่พบ SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY"
  exit 1
fi

# ------------------------------------------------------------
# 🕒 เริ่มตรวจสอบ
# ------------------------------------------------------------
START_TIME=$(date +%s)
echo "======================================================================"
echo "🧠 Supabase Deep Health Check"
echo "📅 $(date)"
echo "======================================================================"
echo "🔗 URL: $SUPABASE_URL"
echo "======================================================================"

# ------------------------------------------------------------
# [1/5] ตรวจสอบ Auth API
# ------------------------------------------------------------
echo -e "\n🔍 [1/5] ตรวจสอบ Auth API..."
AUTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  "$SUPABASE_URL/auth/v1/health")

if [ "$AUTH_STATUS" -eq 200 ]; then
  echo "✅ Auth API พร้อมใช้งาน (HTTP 200)"
else
  echo "❌ Auth API มีปัญหา (HTTP $AUTH_STATUS)"
fi

# ------------------------------------------------------------
# [2/5] ตรวจสอบ Database API
# ------------------------------------------------------------
echo -e "\n🔍 [2/5] ตรวจสอบ Database API..."
DB_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  "$SUPABASE_URL/rest/v1/")

if [ "$DB_STATUS" -eq 200 ]; then
  echo "✅ Database API พร้อมใช้งาน (HTTP 200)"
else
  echo "❌ Database API ล้มเหลว (HTTP $DB_STATUS)"
fi

# ------------------------------------------------------------
# [3/5] ตรวจสอบตาราง
# ------------------------------------------------------------
for TABLE_NAME in "${TABLES[@]}"; do
  TMP_DATA="$TMP_DIR/${TABLE_NAME}.json"
  echo -e "\n🔍 [3/5] ตรวจสอบตาราง: $TABLE_NAME..."
  
  HTTP_CODE=$(curl -s -w "%{http_code}" \
    -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
    "$SUPABASE_URL/rest/v1/$TABLE_NAME?select=*&limit=3" \
    -o "$TMP_DATA")

  if [ "$HTTP_CODE" -eq 200 ]; then
    COUNT=$(curl -s -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
      -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
      "$SUPABASE_URL/rest/v1/$TABLE_NAME?select=id" | jq '. | length')

    echo "✅ ดึงข้อมูลจาก '$TABLE_NAME' สำเร็จ (HTTP 200) - จำนวน record: $COUNT"
    
    if command -v jq >/dev/null 2>&1 && [ -s "$TMP_DATA" ]; then
      FIELDS=$(jq -r '.[0] | keys[]?' "$TMP_DATA" 2>/dev/null | wc -l)
      echo "📄 พบ $FIELDS fields:"
      jq -r '.[0] | keys[]?' "$TMP_DATA" | sed 's/^/   - /'
      echo "📊 ตัวอย่างข้อมูล (1 record):"
      jq '.[0]' "$TMP_DATA"
    fi
  else
    echo "⚠️ CRUD Test ไม่สำเร็จ (HTTP $HTTP_CODE) สำหรับ '$TABLE_NAME'"
  fi
done

# ------------------------------------------------------------
# [4/5] ตรวจสอบ Storage Service (List Buckets)
# ------------------------------------------------------------
echo -e "\n🔍 [4/5] ตรวจสอบ Storage Service..."
STORAGE_CODE=$(curl -s -w "%{http_code}" -o "$TMP_BUCKETS" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/storage/v1/bucket")

if [ "$STORAGE_CODE" -eq 200 ]; then
  echo "✅ Storage Service พร้อมใช้งาน (HTTP 200)"
  if command -v jq >/dev/null 2>&1; then
    BUCKET_COUNT=$(jq '. | length' "$TMP_BUCKETS" 2>/dev/null)
    echo "📦 พบ $BUCKET_COUNT bucket(s):"
    jq -r '.[] | "   - \(.name) [public=\(.public)]"' "$TMP_BUCKETS"
  fi
else
  echo "⚠️ Storage Service ล้มเหลว (HTTP $STORAGE_CODE)"
fi

# ------------------------------------------------------------
# [5/5] สรุปผลรวม
# ------------------------------------------------------------
END_TIME=$(date +%s)
RUNTIME=$((END_TIME - START_TIME))

echo -e "\n======================================================================"
echo "🧾 สรุปผลการตรวจสอบ:"
echo " - Auth API:        $AUTH_STATUS"
echo " - Database API:    $DB_STATUS"
for TABLE_NAME in "${TABLES[@]}"; do
  echo " - Table $TABLE_NAME: checked"
done
echo " - Storage Service: $STORAGE_CODE"
echo " - Runtime:         ${RUNTIME}s"
echo "======================================================================"
echo "✅ ตรวจสอบเสร็จสมบูรณ์ที่ $(date)"
echo "======================================================================"

# ------------------------------------------------------------
# 🧹 ลบ temp file
# ------------------------------------------------------------
rm -f "$TMP_BUCKETS" "$TMP_DIR"/*.json