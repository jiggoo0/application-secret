#!/bin/bash

# ==============================================================================
# 🚀 JP-VISOUL-DOCS: Full Context & Code Analysis Script (Enhanced)
# ==============================================================================
# Description: Compiles architectural structure and critical source code into
# a single markdown file for AI context or technical audits.
# ==============================================================================

# ⚙️ CONFIGURATION
OUTPUT_FILE="project-summary-with-code.md"
REPORT_FILE="pre-deploy-report.md"

# Comprehensive Whitelist for Next.js 15 Enterprise Structure
WHITELIST_DIRS=(
  "app" 
  "actions" 
  "components" 
  "lib" 
  "hooks" 
  "types" 
  "scripts" 
  "public" 
  "data" 
  "constants" 
  "providers" 
  "content" 
  "styles" 
  "services" 
  "config"
)

# Critical files for AI context analysis (Included SupabaseSQL.md)
SCAN_FILES=(
  "ai-context.md"
  "SupabaseSQL.md"
  "$REPORT_FILE"
  "app/globals.css"
  "app/layout.tsx"
  "app/page.tsx"
  "mdx-components.tsx"
  "constants/navigation.ts"
  "constants/theme.ts"
  "constants/services-data.ts"
  "actions/documentActions.ts"
  "tsconfig.json"
  "package.json"
  "next.config.ts"
  "components.json"
  "lib/mdx.ts"
  "types/database.types.ts"
  "types/index.ts"
  ".env"
)

# ✅ 1. INITIALIZATION
rm -f "$OUTPUT_FILE"
echo "🚀 Initiating Full Context Scan for Unlink TH Project..."

{
  echo "# 📑 Project Context Summary (Full Scan)"
  echo "_Generated on: **$(date '+%Y-%m-%d %H:%M:%S')**_"
  echo "> **Status:** Production-Ready Analysis | Full System Context | De-indexing Focus"
  echo ""

  # --- 1. PROJECT HEALTH STATUS ---
  echo "## 🔴 1. Project Health & Deployment Readiness"
  if [ -f "$REPORT_FILE" ]; then
    if grep -q "### ✅ READY FOR DEPLOY" "$REPORT_FILE"; then
      echo "✅ **READY FOR DEPLOY:** The project meets all production standards."
    else
      echo "❌ **FIX REQUIRED:** Issues detected. Refer to the Issue Highlight section."
    fi
    echo ""

    if grep -q "### 📊 Route Statistics" "$REPORT_FILE"; then
      echo "### 📍 Production Route Map"
      echo '```text'
      sed -n '/### 📊 Route Statistics/,/---/p' "$REPORT_FILE" | \
      grep -v "###" | grep -v -- "---" | sed '/^$/d'
      echo '```'
    fi
  else
    echo "⚠️ *Warning: \`$REPORT_FILE\` not found. Run \`pre-deploy-check.sh\` for health metrics.*"
  fi
  echo ""

  # --- 2. FILE TYPE DISTRIBUTION ---
  echo "## 📊 2. File Statistics by Extension"
  echo '```text'
  find "${WHITELIST_DIRS[@]}" -type f 2>/dev/null \
    | sed 's/.*\.//' | sort | uniq -c | sort -nr
  echo '```'
  echo ""

  # --- 3. ARCHITECTURAL TREE ---
  echo "## 📁 3. Directory Structure (Architecture Tree)"
  echo '```text'
  for dir in "${WHITELIST_DIRS[@]}"; do
    if [ -d "$dir" ]; then
      echo "📂 $dir/"
      find "$dir" -maxdepth 5 -not -path '*/.*' | while read -r path; do
          depth=$(temp="${path//[^\/]/}"; echo "${#temp}")
          indent=$(printf '%*s' $((depth * 2)) "")
          name=$(basename "$path")
          if [ -d "$path" ]; then
            [[ "$path" != "$dir" ]] && echo "${indent}📂 $name/"
          else
            echo "${indent}📄 $name"
          fi
      done
    fi
  done
  echo '```'
  echo ""

  # --- 4. SOURCE CODE & TECHNICAL CONTEXT ---
  echo "## 📄 4. Critical Code Analysis & Environment"
  for file in "${SCAN_FILES[@]}"; do
    if [ -f "$file" ]; then
      echo "#### 🔍 Path: \`$file\`"
      
      # Smart Language Detection
      ext="${file##*.}"
      lang="text"
      case "$ext" in
        ts|tsx) lang="typescript" ;;
        js|mjs) lang="javascript" ;;
        json) lang="json" ;;
        md) lang="markdown" ;;
        css) lang="css" ;;
        sql) lang="sql" ;;
      esac

      # Special Case: หากเป็น SupabaseSQL.md ให้ใช้ syntax sql ใน block
      [[ "$file" == *"SupabaseSQL.md"* ]] && lang="sql"

      echo '```'"$lang"
      if [[ "$file" == *".env"* ]]; then
        # Security: Redact sensitive values (Privacy First)
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

  echo "## 📝 Summary"
  echo "Architecture scan and context compilation completed successfully. Focus maintained on Privacy & Security."

} > "$OUTPUT_FILE"

echo "✅ Full Scan Complete! Report saved to → $OUTPUT_FILE"
