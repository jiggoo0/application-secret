#!/bin/bash

# กำหนดชื่อไฟล์รายงาน
REPORT_FILE="pre-deploy-report.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# ✅ ขั้นตอน 0: ลบไฟล์รายงานเก่าทิ้งก่อนเริ่มทำงาน
if [ -f "$REPORT_FILE" ]; then
    rm "$REPORT_FILE"
    echo "🗑️  Old report removed."
fi

echo "🔍 Starting UnlinkTH Pre-deploy Inspection..."

# เริ่มเขียนไฟล์ Markdown ใหม่
echo "# 🚀 Pre-deploy Inspection Report" > $REPORT_FILE
echo "Generated at: $TIMESTAMP" >> $REPORT_FILE
echo "Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'N/A')" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# 1. เช็คไฟล์ .env
echo "## 🔐 1. Environment Check" >> $REPORT_FILE
if [ ! -f .env ]; then
    echo "❌ Status: .env file missing!" | tee -a $REPORT_FILE
    echo "Critical failure: Deployment halted." >> $REPORT_FILE
    exit 1
else
    echo "✅ Status: .env file exists and verified." >> $REPORT_FILE
fi

# 2. ขั้นตอน Auto-Fix (Smart Repair)
echo "🛠️  Attempting to Auto-fix Linting issues..."
echo "## 🛠️  2. Auto-Fix Procedure" >> $REPORT_FILE
pnpm lint --fix > fix_output.txt 2>&1
FIX_EXIT_CODE=$?

if [ $FIX_EXIT_CODE -eq 0 ]; then
    echo "✅ Status: Auto-fix completed or no issues found." >> $REPORT_FILE
else
    echo "⚠️  Note: Some issues could not be fixed automatically." >> $REPORT_FILE
fi
rm fix_output.txt

# 3. เช็ค Linting (Code Hygiene)
echo "🧹 Running Final Linting Check..."
echo "## 🧹 3. Code Linting (ESLint)" >> $REPORT_FILE
pnpm lint > lint_output.txt 2>&1
LINT_EXIT_CODE=$?

if [ $LINT_EXIT_CODE -eq 0 ]; then
    echo "✅ Status: Linting passed." >> $REPORT_FILE
else
    echo "❌ Status: Linting failed." | tee -a $REPORT_FILE
    echo "### 🔍 Remaining Linting Errors:" >> $REPORT_FILE
    echo "\`\`\`bash" >> $REPORT_FILE
    cat lint_output.txt >> $REPORT_FILE
    echo "\`\`\`" >> $REPORT_FILE
fi
rm lint_output.txt

# 4. เช็ค Types
echo "⌨️ Checking Types..."
echo "## ⌨️ 4. Type Safety Check" >> $REPORT_FILE
pnpm type-check > type_output.txt 2>&1
TYPE_EXIT_CODE=$?

if [ $TYPE_EXIT_CODE -eq 0 ]; then
    echo "✅ Status: TypeScript verified." >> $REPORT_FILE
else
    echo "❌ Status: Type errors detected!" | tee -a $REPORT_FILE
    echo "### 🔍 TypeScript Errors:" >> $REPORT_FILE
    echo "\`\`\`bash" >> $REPORT_FILE
    cat type_output.txt >> $REPORT_FILE
    echo "\`\`\`" >> $REPORT_FILE
fi
rm type_output.txt

# 5. ขั้นตอน Build (Production Readiness)
echo "🏗️  Executing Production Build..."
echo "## 🏗️  5. Production Build Test" >> $REPORT_FILE
# ใช้ 'tee' เพื่อแสดงผลบนหน้าจอพร้อมบันทึกลงไฟล์
pnpm run build 2>&1 | tee build_output.txt
BUILD_EXIT_CODE=${PIPESTATUS[0]}

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✅ Status: Build successfully optimized." >> $REPORT_FILE
    echo "### 📊 Route Statistics & Bundle Size" >> $REPORT_FILE
    echo "\`\`\`text" >> $REPORT_FILE
    # ดึงเฉพาะส่วนที่เป็นตารางสรุป Route จากไฟล์ build_output
    sed -n '/Route (app)/,$p' build_output.txt >> $REPORT_FILE
    echo "\`\`\`" >> $REPORT_FILE
else
    echo "❌ Status: Build failed!" | tee -a $REPORT_FILE
    echo "### 🔍 Build Logs (Failure Analysis):" >> $REPORT_FILE
    echo "\`\`\`bash" >> $REPORT_FILE
    tail -n 50 build_output.txt >> $REPORT_FILE
    echo "\`\`\`" >> $REPORT_FILE
fi
rm build_output.txt

# สรุปผลลัพธ์สุดท้าย
echo "" >> $REPORT_FILE
echo "---" >> $REPORT_FILE
echo "## 🏆 Summary Result" >> $REPORT_FILE

if [ $LINT_EXIT_CODE -eq 0 ] && [ $TYPE_EXIT_CODE -eq 0 ] && [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "### ✅ READY FOR DEPLOY" >> $REPORT_FILE
    echo "All protocols verified: Lint passed, Types safe, and Build successful. Deployment is highly recommended." >> $REPORT_FILE
else
    echo "### 🚫 FIX REQUIRED BEFORE DEPLOY" >> $REPORT_FILE
    echo "Please resolve the errors in the failed stages above." >> $REPORT_FILE
fi

echo "🚀 Inspection complete. Full report generated: $REPORT_FILE"
