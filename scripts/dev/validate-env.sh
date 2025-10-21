#!/bin/bash
# ===================================================
# ✅ Environment Validator + Vercel Project Token Tester
# ===================================================

# --- สีข้อความ ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Reset color

# --- ตัวแปรที่จำเป็น ---
REQUIRED_KEYS=("NEXTAUTH_SECRET" "NEXTAUTH_URL" "VERCEL_TOKEN" "VERCEL_API" "VERCEL_PROJECT_ID")

# --- โหลดไฟล์ .env.local หรือ .env ---
echo -e "${BLUE}\n🔍 Loading environment file...${NC}"
set -a
if [ -f .env.local ]; then
  source .env.local
  echo -e "${GREEN}✅ Loaded .env.local${NC}"
elif [ -f .env ]; then
  source .env
  echo -e "${YELLOW}⚠️  .env.local not found — loaded .env instead${NC}"
fi
set +a

# --- ตรวจสอบตัวแปร ---
echo -e "\n${BLUE}🔎 Checking required environment variables...${NC}"
missing_keys=()

for key in "${REQUIRED_KEYS[@]}"; do
  if [[ -z "${!key}" ]]; then
    missing_keys+=("$key")
  fi
done

if [ ${#missing_keys[@]} -ne 0 ]; then
  echo -e "\n${RED}❌ Missing the following environment variables:${NC}"
  for key in "${missing_keys[@]}"; do
    echo "   - $key"
  done
  echo -e "${YELLOW}👉 Please fill in these values inside your .env.local file.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ All required environment variables are set!${NC}"
fi

# --- ตรวจสอบว่า VERCEL_TOKEN ใช้งานได้กับ project ---
echo -e "\n${BLUE}🔐 Testing Vercel Project Token...${NC}"

if ! command -v curl &> /dev/null; then
  echo -e "${RED}❌ curl not found!${NC} Please install curl before running this test."
  exit 1
fi

response=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
                 "$VERCEL_API/v9/projects/$VERCEL_PROJECT_ID")
status=$?

if [ $status -ne 0 ]; then
  echo -e "${RED}❌ Failed to connect to Vercel API${NC}"
  echo "Check your internet connection or VERCEL_API URL."
  exit 1
fi

# ตรวจสอบว่าคืนข้อมูล project ได้หรือไม่
if echo "$response" | grep -q '"id"'; then
  project_name=$(echo "$response" | grep -o '"name":"[^"]*"' | head -1 | cut -d':' -f2 | tr -d '"')
  echo -e "${GREEN}✅ Vercel project token is valid!${NC}"
  echo -e "${BLUE}📦 Project name:${NC} ${project_name:-<unknown>}"
else
  echo -e "${RED}❌ Invalid or unauthorized Vercel token for project${NC}"
  echo -e "${YELLOW}👉 Please check your VERCEL_TOKEN and VERCEL_PROJECT_ID in .env.local${NC}"
  exit 1
fi

echo -e "\n${GREEN}🎉 Environment validation completed successfully!${NC}"