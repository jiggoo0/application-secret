#!/bin/bash

# ==============================================================================
# 🧹 UNLINK-TH: Development Environment Reset Script
# ==============================================================================
# Description: Purges build artifacts, dependencies, and lockfiles to ensure 
# a clean state before re-installation and execution.
# ==============================================================================

# 🎨 Colors for Terminal Output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Initiating System Purge for Unlink TH...${NC}"

# 1. 🗑️ Remove Build Artifacts & Cache
echo -e "🧹 Clearing Next.js ..."
rm -rf .next

# 2. 🗑️ Remove Dependencies
echo -e "🧹 Purging node_modules..."
rm -rf node_modules

# 3. 🗑️ Remove Lockfile
echo -e "🧹 Deleting pnpm-lock.yaml..."
rm -rf pnpm-lock.yaml

# 4. 📦 Fresh Installation
echo -e "${BLUE}📦 Re-installing dependencies with pnpm...${NC}"
pnpm install

# 5. 🛠️ Start Development Server
echo -e "${GREEN}✅ System ready. Launching development server...${NC}"
pnpm run dev
