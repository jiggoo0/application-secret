import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseServer } from '@/lib/supabase/server';
import { compare } from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

async function authorize(credentials) {
  const email = credentials?.email?.toLowerCase().trim();
  const password = credentials?.password;

  if (!email || !password) {
    throw new Error('Missing email or password');
  }

  let user = null;

  // 1️⃣ ตรวจสอบจาก Supabase
  try {
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (data && !error) {
      user = data;
    }
  } catch (err) {
    console.error('❌ Supabase error:', err.message);
  }

  // 2️⃣ Fallback: local JSON
  if (!user) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'users.json');
      const raw = await fs.readFile(filePath, 'utf-8');
      const users = JSON.parse(raw);
      user = users.find((u) => u.email?.toLowerCase() === email) || null;
    } catch (err) {
      console.error('❌ JSON fallback error:', err.message);
    }
  }

  if (!user) {
    throw new Error('No user found with this email');
  }

  // 3️⃣ ตรวจสอบรหัสผ่าน
  let isValid = false;
  try {
    if (typeof user.password === 'string' && user.password.startsWith('$2')) {
      isValid = await compare(password, user.password);
    } else {
      isValid = password === user.password;
    }
  } catch (err) {
    console.error('❌ Password check error:', err.message);
  }

  if (!isValid) {
    throw new Error('Invalid password');
  }

  // 4️⃣ คืนค่า user object
  return {
    id: user.id || email,
    email: user.email,
    name: user.name || email.split('@')[0],
    role: user.role || 'user',
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
