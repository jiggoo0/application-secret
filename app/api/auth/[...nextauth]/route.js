// app/api/auth/[...nextauth]/route.js
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { compare } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { supabaseServer } from '@/lib/supabase/server'; // ใช้ service key จริง

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // ✅ ตรวจสอบจาก Supabase ก่อน
        let user = null;

        try {
          const { data } = await supabaseServer
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (data) user = data;
        } catch (err) {
          console.error('❌ Supabase fetch error:', err.message);
        }

        // ✅ ถ้า Supabase ไม่เจอ → ตรวจจาก users.json
        if (!user) {
          try {
            const filePath = path.join(process.cwd(), 'data', 'users.json');
            if (fs.existsSync(filePath)) {
              const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              const found = jsonData.find((u) => u.email === credentials.email);
              if (found) user = found;
            }
          } catch (err) {
            console.error('⚠️ Error reading users.json:', err.message);
          }
        }

        if (!user) {
          console.error('❌ User not found in Supabase or users.json');
          throw new Error('No user found with this email');
        }

        // ✅ ตรวจสอบรหัสผ่าน
        let isValid = false;
        try {
          if (user.password.startsWith('$2')) {
            isValid = await compare(credentials.password, user.password);
          } else {
            isValid = credentials.password === user.password;
          }
        } catch (err) {
          console.error('⚠️ Password compare error:', err.message);
        }

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // ✅ คืนค่าผู้ใช้ให้ NextAuth
        return {
          id: user.id || user.email, // fallback ถ้าไม่มี id
          email: user.email,
          role: user.role || 'user',
          name: user.name || user.email.split('@')[0],
        };
      },
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
