#!/bin/bash

# =========================================
# delete-supabase-all.sh
# ลบข้อมูลทั้งหมดใน Supabase ทุก table ทุก environment
# =========================================

# -------------------- Dependencies --------------------
command -v curl >/dev/null 2>&1 || { echo >&2 "❌ curl ต้องติดตั้งก่อน"; exit 1; }

# -------------------- Load Environment --------------------
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# -------------------- Configuration --------------------
declare -A ENV_URLS
declare -A ENV_KEYS

ENV_URLS["dev"]=${DEV_SUPABASE_URL:-""}
ENV_KEYS["dev"]=${DEV_SUPABASE_SERVICE_ROLE_KEY:-""}

ENV_URLS["staging"]=${STAGING_SUPABASE_URL:-""}
ENV_KEYS["staging"]=${STAGING_SUPABASE_SERVICE_ROLE_KEY:-""}

ENV_URLS["prod"]=${PROD_SUPABASE_URL:-""}
ENV_KEYS["prod"]=${PROD_SUPABASE_SERVICE_ROLE_KEY:-""}

# ตารางที่จะลบ
TABLES=("users" "uploads" "licenses" "certificates" "thai_photo_links")

# -------------------- Terminal Colors --------------------
GREEN="\e[32m"
RED="\e[31m"
YELLOW="\e[33m"
RESET="\e[0m"

# -------------------- Functions --------------------
confirm() {
    read -p "$1 [y/N]: " answer
    case "$answer" in
        [yY]*) return 0 ;;
        *) return 1 ;;
    esac
}

delete_table() {
    local url=$1
    local key=$2
    local env=$3
    local table=$4

    # ลบข้อมูลทั้งหมด
    status=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE \
        -H "apikey: $key" \
        -H "Authorization: Bearer $key" \
        "$url/rest/v1/$table?select=*")

    if [ "$status" -eq 204 ] || [ "$status" -eq 200 ]; then
        echo -e "${GREEN}✅ [$env] ลบข้อมูล table '$table' เรียบร้อย${RESET}"
    else
        echo -e "${RED}❌ [$env] ลบ table '$table' ไม่สำเร็จ (HTTP $status)${RESET}"
    fi
}

# -------------------- Main Script --------------------
echo -e "${YELLOW}⚠️  WARNING: คุณกำลังจะลบข้อมูลทั้งหมดใน Supabase ทุก environment${RESET}"

if ! confirm "คุณแน่ใจหรือไม่ว่าจะลบข้อมูลทั้งหมด?"; then
    echo "ยกเลิกการลบ"
    exit 0
fi

for env in "${!ENV_URLS[@]}"; do
    url=${ENV_URLS[$env]}
    key=${ENV_KEYS[$env]}

    echo -e "\n${YELLOW}=== ลบข้อมูล environment: $env ===${RESET}"

    for table in "${TABLES[@]}"; do
        delete_table "$url" "$key" "$env" "$table"
    done
done

echo -e "\n${GREEN}🎉 ลบข้อมูลทุก environment เสร็จสิ้น${RESET}"