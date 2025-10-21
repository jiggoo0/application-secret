// app/api/auth/[...nextauth]/route.js
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import fs from 'fs';
import path from 'path';
import { compare } from 'bcryptjs';
import { supabaseServer } from '@/lib/supabase/server';

async function authorize(credentials) {
  console.log('Login attempt:', credentials.email);

  let user = null;

  // 1️⃣ Supabase first
  try {
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (data) user = data;
    if (error) console.warn('Supabase fetch error:', error.message);

    console.log('Fetched user from Supabase:', user);
  } catch (err) {
    console.error('Supabase fetch error:', err.message);
  }

  // 2️⃣ fallback users.json
  if (!user) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'users.json');
      if (fs.existsSync(filePath)) {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        user = jsonData.find((u) => u.email === credentials.email) || null;
        console.log('Fetched user from users.json:', user);
      }
    } catch (err) {
      console.error('Error reading users.json:', err.message);
    }
  }

  if (!user) {
    console.error('User not found:', credentials.email);
    throw new Error('No user found with this email');
  }

  // 3️⃣ ตรวจสอบ password
  let isValid = false;
  try {
    if (user.password.startsWith('$2')) {
      isValid = await compare(credentials.password, user.password);
    } else {
      isValid = credentials.password === user.password;
    }
  } catch (err) {
    console.error('Password compare error:', err.message);
  }

  if (!isValid) {
    console.error('Invalid password for user:', credentials.email);
    throw new Error('Invalid password');
  }

  // 4️⃣ คืนค่า user object
  return {
    id: user.id || user.email,
    email: user.email,
    role: user.role || 'user',
    name: user.name || user.email.split('@')[0],
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

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        name: token.name,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
