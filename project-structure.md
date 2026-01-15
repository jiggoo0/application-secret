# 📁 Project Structure Report: JP-VISOUL-DOCS
> Generated on: **2026-01-16 03:08:57**

## 🌳 Directory Tree
The following structure represents the core business logic and UI layers.

### 📂 app
  📂 **partner/**
    📄 page.tsx
  📂 **services/**
    📄 page.tsx
    📂 **[slug]/**
      📄 page.tsx
  📂 **api/**
  📄 layout.tsx
  📄 page.tsx
  📄 globals.css
  📄 sitemap.ts
  📂 **blog/**
    📄 page.tsx
    📂 **[slug]/**
      📄 page.tsx
    📂 **test-article/**
      📄 page.mdx
  📂 **(marketing)/**
    📂 **about/**
      📄 page.tsx
    📂 **contact/**
      📄 page.tsx
  📂 **privacy/**
    📄 page.tsx
  📂 **support/**
    📄 page.tsx
  📂 **faq/**
    📄 page.tsx
  📄 favicon.ico
  📄 robots.ts

### 📂 actions

### 📂 components
  📂 **ui/**
    📄 button.tsx
    📄 card.tsx
    📄 typography.tsx
    📄 accordion.tsx
    📄 badge.tsx
    📄 input.tsx
    📄 textarea.tsx
    📄 skeleton.tsx
    📄 navigation-menu.tsx
    📄 sonner.tsx
    📄 tabs.tsx
    📄 label.tsx
    📄 form.tsx
    📄 checkbox.tsx
    📄 tooltip.tsx
    📄 sheet.tsx
    📄 select.tsx
    📄 dropdown-menu.tsx
    📄 scroll-area.tsx
    📄 table.tsx
  📂 **shared/**
    📄 Navbar.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 HeroSection.tsx
    📄 FaqSection.tsx
    📄 Icons.tsx
    📄 ProtocolStepper.tsx
    📄 Logo.tsx
    📄 ServiceCard.tsx
    📄 BlogSection.tsx
  📂 **home/**
    📄 ServiceSection.tsx
    📄 ValuePropositionSection.tsx
    📄 CTASection.tsx
    📄 ProcessSection.tsx
  📂 **templates/**
    📄 CategoryArchiveTemplate.tsx
  📂 **seo/**
    📄 JsonLd.tsx

### 📂 lib
  📄 utils.ts
  📂 **supabase/**
    📄 client.ts
    📄 server.ts
  📄 mdx.ts
  📂 **utils/**
    📄 line-link.ts

### 📂 hooks

### 📂 types
  📄 index.ts
  📄 database.types.ts

### 📂 scripts
  📂 **dev/**
    📄 backup-project.sh
    📄 project-summary.sh
    📄 tree-projects.sh
  📄 pre-deploy-check.sh
  📄 tree.sh
  📄 clean-project.sh

### 📂 public
  📂 **fonts/**
  📂 **images/**
    📂 **blog/**
      📄 visa-prep.jpg
      📄 business-reg.jpg
      📄 Jpblog.webp
    📄 noise.png
    📄 about-vision.jpg
    📄 default-avatar.webp
  📄 og-image.jpg

### 📂 constants
  📄 navigation.ts
  📄 services-data.ts
  📄 contact.ts
  📄 site-config.ts

### 📂 providers
  📄 AppProvider.tsx

### 📂 content
  📂 **guides/**
  📂 **blog/**
    📄 sample-post.mdx
    📄 first-post.md
    📄 financial-protocol-schengen-2026.mdx
    📄 home-loan-structuring-protocol.mdx
    📄 corporate-documentation-integrity.mdx
    📄 data-privacy-security-standard.mdx
  📄 faq-data.ts

## 📦 Project Dependencies
Current configuration in `package.json`:
```json
{
  "name": "JP-Online",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@img/sharp-wasm32": "^0.34.5",
    "@next/mdx": "^16.1.1",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.90.1",
    "@types/mdx": "^2.0.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.25.0",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.562.0",
    "next": "15.5.7",
    "next-themes": "^0.4.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.3.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.3",
    "@eslint/js": "^9.39.2",
    "@mdx-js/loader": "^3.1.1",
    "@mdx-js/react": "^3.1.1",
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5.19",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.23",
    "eslint": "^9",
    "eslint-config-next": "15.5.7",
    "postcss": "^8.5.6",
    "prettier": "^3.7.4",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
```

## 📝 Deployment Status & Issues
---
### ✅ Final Status: **READY FOR DEPLOY**

#### 📍 Production Route Map
```text
```text
Route (app)                                 Size  First Load JS
┌ ○ /                                    9.44 kB         173 kB
├ ○ /_not-found                            994 B         103 kB
├ ○ /about                                 492 B         107 kB
├ ○ /blog                                  174 B         110 kB
├ ƒ /blog/[slug]                           492 B         107 kB
├ ○ /blog/test-article                     492 B         107 kB
├ ○ /contact                               129 B         102 kB
├ ○ /faq                                 3.62 kB         159 kB
├ ○ /partner                             1.05 kB         151 kB
├ ○ /privacy                             1.03 kB         148 kB
├ ○ /robots.txt                            129 B         102 kB
├ ○ /services                            10.9 kB         172 kB
├ ƒ /services/[slug]                     9.07 kB         127 kB
├ ○ /sitemap.xml                           129 B         102 kB
└ ○ /support                             1.05 kB         151 kB
+ First Load JS shared by all             102 kB
  ├ chunks/7f97a788-70f696b0503e8e6b.js  54.2 kB
  ├ chunks/919-cb094919e5c4c4d2.js       45.5 kB
  └ other shared chunks (total)          1.93 kB
ƒ Middleware                             33.7 kB
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
```
#### ⚠️ Critical Issues Highlight
Everything looks clean. No significant issues found in the latest report.

---
_Report generated by JP-VISOUL Internal Automation._
