#!/bin/bash
# Next.js Architectural Refactoring Script - FINAL EXECUTION
# WARNING: MANUAL CODE REFACTORING (Import Paths/Logic) IS REQUIRED AFTER THIS.

echo "--- Performance Optimizer: FINAL Refactoring Run ---"

# --- 1. Component Architect: Module Centralization (Document Service) ---
echo -e "\n[STEP 1/2] Module Centralization (Document Service: letter-service -> modules/document-service)"

TARGET_DIR="components/modules/document-service"
LETTER_SERVICE_DIR="app/letter-service"

# สร้างโฟลเดอร์ปลายทาง
mkdir -p "${TARGET_DIR}/hooks"

# 1.1 ย้าย Component (DocumentControls)
if [ -f "${LETTER_SERVICE_DIR}/components/DocumentControls.jsx" ]; then
    echo "Moving DocumentControls.jsx..."
    mv "${LETTER_SERVICE_DIR}/components/DocumentControls.jsx" "${TARGET_DIR}/DocumentControls.jsx"
else
    echo "DocumentControls.jsx not found in old location. Skipping move."
fi

# 1.2 ย้าย Hooks (useDocumentGeneration, useDocumentControlsLogic)
if [ -f "${LETTER_SERVICE_DIR}/hooks/useDocumentGeneration.js" ]; then
    echo "Moving useDocumentGeneration.js..."
    mv "${LETTER_SERVICE_DIR}/hooks/useDocumentGeneration.js" "${TARGET_DIR}/hooks/useDocumentGeneration.js"
else
    echo "useDocumentGeneration.js not found. Skipping move."
fi

if [ -f "${LETTER_SERVICE_DIR}/hooks/useDocumentControlsLogic.js" ]; then
    echo "Moving useDocumentControlsLogic.js..."
    mv "${LETTER_SERVICE_DIR}/hooks/useDocumentControlsLogic.js" "${TARGET_DIR}/hooks/useDocumentControlsLogic.js"
else
    echo "useDocumentControlsLogic.js not found. Skipping move."
fi

echo "!! MANUAL ACTION: แก้ไข Import Paths ใน app/letter-service/page.jsx และไฟล์ที่เกี่ยวข้อง ให้ชี้ไปที่ components/modules/document-service/..."


# --- 2. Component Architect: Provider Consolidation (Cleanup) ---
echo -e "\n[STEP 2/2] Provider Consolidation (Cleanup)"

PROVIDER_DIR="app/providers"
ROOT_PROVIDER="app/providers/RootProvider.jsx"
LEGACY_PROVIDER="app/providers.jsx"

# 2.1 สร้าง RootProvider.jsx เปล่าสำหรับเริ่มต้น (ต้องใส่ Logic เอง)
if [ ! -f "${ROOT_PROVIDER}" ]; then
    echo "Creating empty RootProvider.jsx as consolidation target."
    echo "// app/providers/RootProvider.jsx" > "${ROOT_PROVIDER}"
    echo "// ⚠️ MANUAL ACTION: Move all provider logic here and uncomment 'use client'." >> "${ROOT_PROVIDER}"
fi

# 2.2 ลบ Providers ที่กระจายตัวอยู่ (Legacy)
echo "Removing legacy provider files (ClientProviders.js, SessionProviderClient.js)."
rm -f "${PROVIDER_DIR}/ClientProviders.js"
rm -f "${PROVIDER_DIR}/SessionProviderClient.js"

# 2.3 ลบ app/providers.jsx
if [ -f "${LEGACY_PROVIDER}" ]; then
    echo "Removing app/providers.jsx..."
    rm "${LEGACY_PROVIDER}"
else
    echo "app/providers.jsx not found. Skipping delete."
fi

echo "!! MANUAL ACTION: ย้าย Logic ของ Providers ทั้งหมดไปที่ app/providers/RootProvider.jsx"
echo "!! MANUAL ACTION: ตรวจสอบ app/layout.jsx ว่ามีการ Import และใช้ RootProvider อย่างถูกต้อง"

echo -e "\n--- ✅ Refactoring script execution complete. ---"
