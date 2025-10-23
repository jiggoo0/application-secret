🚀 **Saitourmairunwongkarn Maker** เป็นโปรเจกต์เว็บที่สร้างด้วย **Next.js** พร้อม **NextAuth** สำหรับการจัดการ authentication, ใช้ **Tailwind CSS / DaisyUI** สำหรับดีไซน์ UI, และ **Vercel** สำหรับ deployment

---

## 🌟 Features

- Next.js (v15)
- NextAuth for authentication
- Tailwind CSS + DaisyUI for UI
- React + Framer Motion for animations
- TypeScript support
- PNPM package manager
- Vercel deployment ready

---

## 🛠 Prerequisites

- Node.js (>=20.x)
- PNPM (>=10.x)
- Git
- Termux / Linux / macOS / Windows

---

## ⚡ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/saitourmairunwongkarn-maker/saitourmairunwongkarn-maker.git
cd saitourmairunwongkarn-maker

2. Install dependencies



pnpm install

3. Create .env file in the root folder



NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://application-secret.vercel.app

# Optional: Vercel CLI deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_API=https://api.vercel.com
VERCEL_PROJECT_ID=your_vercel_project_id
VERCEL_ORG_ID=your_vercel_team_id

4. Run development server



pnpm dev

Open http://localhost:3000 in your browser.


---

🏗 Available Scripts

Command	Description

pnpm dev	Start development server
pnpm build	Build production bundle
pnpm start	Start production server
pnpm lint	Run ESLint on all files
pnpm lint:fix	Fix lint issues automatically
pnpm format	Format code using Prettier



---

🔧 Technologies Used

Next.js

React

NextAuth

Tailwind CSS

DaisyUI

Framer Motion

Twind

Vercel



---

📦 Deployment

This project is Vercel-ready:

vercel --prod

Make sure your .env variables are set correctly in Vercel dashboard.


---

📝 License

This project is private.


```
