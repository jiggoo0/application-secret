# 📁 Project Structure Report: JP-VISOUL-DOCS
> Generated on: **2026-01-15 03:42:20**

## 🌳 Directory Tree
The following structure represents the core business logic and UI layers.

### 📂 app
  📂 **(auth)/**
  📂 **(dashboard)/**
  📂 **services/**
    📄 page.tsx
    📂 **[slug]/**
      📄 page.tsx
    📂 **request/**
      📄 page.tsx
    📂 **_archive/**
      📂 **visa/**
        📄 page.tsx
      📂 **legal/**
        📄 page.tsx
  📂 **api/**
    📂 **auth/**
      📂 **callback/**
        📄 route.ts
  📄 layout.tsx
  📄 page.tsx
  📄 globals.css
  📄 sitemap.ts
  📂 **blog/**
    📄 page.tsx
    📂 **[slug]/**
      📄 page.tsx
  📂 **(marketing)/**
    📂 **about/**
      📄 page.tsx
    📂 **contact/**
      📄 page.tsx
  📂 **privacy/**
    📄 page.tsx
  📂 **careers/**
    📄 page.tsx
  📂 **support/**
    📄 page.tsx
  📂 **faq/**
    📄 page.tsx

### 📂 actions
  📄 documentActions.ts
  📄 authActions.ts

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
  📂 **shared/**
    📄 Navbar.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 HeroSection.tsx
    📄 FaqSection.tsx
    📄 AboutSection.tsx
    📄 Icons.tsx
  📂 **forms/**
    📄 ServiceRequestForm.tsx
  📂 **cards/**
    📄 ServiceCard.tsx
  📂 **templates/**
    📄 CategoryArchiveTemplate.tsx
  📂 **seo/**
    📄 JsonLd.tsx

### 📂 lib
  📂 **validations/**
    📄 documentSchema.ts
  📄 utils.ts
  📂 **supabase/**
    📄 client.ts
    📄 server.ts
    📄 middleware.ts
  📄 mdx.ts

### 📂 hooks
  📄 use-auth.ts

### 📂 types
  📄 index.ts
  📄 database.types.ts

### 📂 scripts
  📂 **dev/**
    📄 backup-project.sh
    📄 project-summary.sh
    📄 tree-projects.sh
  📄 pre-deploy-check.sh

### 📂 public
  📂 **fonts/**
  📂 **images/**
    📂 **blog/**
      📄 visa-prep.jpg
      📄 business-reg.jpg
    📄 about-team.jpg

### 📂 data

### 📂 constants
  📄 theme.ts
  📄 navigation.ts
  📄 services-data.ts

### 📂 providers
  📄 AppProvider.tsx

### 📂 content
  📂 **guides/**
  📂 **blog/**
    📄 sample-post.mdx
    📄 first-post.md
  📄 faq-data.ts

## 📦 Project Dependencies
Current configuration in `package.json`:
```json
{
  "name": "test",
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
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-navigation-menu": "^1.2.14",
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
    "framer-motion": "^12.25.0",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.562.0",
    "next": "15.5.7",
    "next-mdx-remote": "^5.0.0",
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



---
