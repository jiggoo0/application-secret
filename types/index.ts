import { LucideIcon } from "lucide-react";

/**
 * 🛠️ Navigation Types
 */
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon: LucideIcon;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

/**
 * 📑 Service Types
 */
export type ServiceCategory = "visa" | "legal" | "translation" | "business";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ServiceCategory;
  iconName: string; // เก็บชื่อไอคอนเพื่อดึงจาก Icons.tsx หรือ Lucide
  price?: {
    amount: number;
    unit: string;
    isStartingPrice: boolean;
  };
  features?: string[];
}

/**
 * 💬 Content Types
 */
export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
  category: string;
}
