import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

const authOptions: NextAuthOptions = {
  providers: [
    // Add your authentication providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };