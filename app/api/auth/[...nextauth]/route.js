import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from '@/lib/passwordUtils';
import { supabaseServer } from '@/lib/supabase/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/users.json');

// โหลดผู้ใช้จากไฟล์ JSON
async function loadUsersFromFile() {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(raw);
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

// โหลดผู้ใช้จาก Supabase
async function loadUserFromSupabase(email) {
  const { data, error } = await supabaseServer
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  return error ? null : data;
}

// รวมการค้นหาผู้ใช้จากไฟล์หรือ DB
async function findUser(email) {
  const fileUsers = await loadUsersFromFile();
  const userFromFile = fileUsers.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (userFromFile) return { source: 'file', user: userFromFile };

  const userFromDb = await loadUserFromSupabase(email);
  if (userFromDb) return { source: 'db', user: userFromDb };

  return null;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await findUser(credentials.email);
        if (!result || !result.user?.password) return null;

        const isValid = await comparePassword(credentials.password, result.user.password);
        if (!isValid) return null;

        const { user } = result;
        return {
          id: user.id || user.email,
          email: user.email,
          name: user.name || user.email,
          role: user.role || 'user',
          source: result.source,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },

  pages: {
    signIn: '/login',
    error: '/login?error=auth',
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) Object.assign(token, user);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name || token.email,
        role: token.role || 'user',
        source: token.source,
      };
      return session;
    },
    async signIn({ user }) {
      try {
        // บันทึก session ลง Supabase
        await supabaseServer.from('user_sessions').insert({
          user_id: user.email,
          action: 'login',
        });
      } catch (err) {
        console.error('Supabase session error:', err);
      }
      return true;
    },
    async redirect({ baseUrl, token }) {
      if (token?.role === 'admin') return `${baseUrl}/admin`;
      if (token?.role === 'user') return `${baseUrl}/user`;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
