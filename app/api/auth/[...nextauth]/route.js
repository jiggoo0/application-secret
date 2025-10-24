import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import fs from 'fs';
import path from 'path';
import { compare } from 'bcryptjs';
import { supabaseServer } from '@/lib/supabase/server';

async function authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error('Missing credentials');
  }

  let user = null;

  // 1️⃣ Fetch from Supabase
  try {
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (error && error.code !== 'PGRST116') console.warn('Supabase error:', error.message);
    if (data) user = data;
  } catch (err) {
    console.error('Supabase fetch failed:', err.message);
  }

  // 2️⃣ Fallback: users.json
  if (!user) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'users.json');
      if (fs.existsSync(filePath)) {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        user = jsonData.find((u) => u.email === credentials.email) || null;
      }
    } catch (err) {
      console.error('Error reading users.json:', err.message);
    }
  }

  if (!user) throw new Error('No user found with this email');

  // 3️⃣ Validate password
  let isValid = false;
  try {
    if (user.password?.startsWith?.('$2')) {
      isValid = await compare(credentials.password, user.password);
    } else {
      isValid = credentials.password === user.password;
    }
  } catch {
    throw new Error('Password verification failed');
  }

  if (!isValid) throw new Error('Invalid password');

  // 4️⃣ Return safe user object
  return {
    id: user.id || user.email,
    email: user.email || 'unknown@example.com',
    role: user.role || 'user',
    name: user.name || user.email?.split('@')[0] || 'Unknown',
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
    maxAge: 7 * 24 * 60 * 60, // 7 วัน
  },

  pages: { signIn: '/login' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) Object.assign(token, user);
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, email: token.email, role: token.role, name: token.name };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
};

// ✅ Export for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
