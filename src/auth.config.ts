import type { NextAuthConfig } from "next-auth";

// This config is shared between the Edge (Middleware) and Node.js (API/Actions)
export default {
  providers: [], // We will add providers in the Node.js-only auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.tenantId = (user as any).tenantId;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).tenantId = token.tenantId as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
