// lib/auth.ts
import type { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';

interface TokenWithId extends JWT {
  id?: string;
}

interface SessionWithId extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // 🔹 CUSTOM AUTH LOGIC: Database Lookup, API call, etc.
        const user: User | null = { id: '1', name: 'Test User', email: 'test@example.com' };

        return user ?? null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const t = token as TokenWithId;
      if (user) t.id = user.id;
      return t;
    },
    async session({ session, token }) {
      const s = session as SessionWithId;
      const t = token as TokenWithId;
      if (t?.id) s.user.id = t.id;
      return s;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
