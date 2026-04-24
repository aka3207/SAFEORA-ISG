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
        token.isFounder = (user as any).isFounder;
        token.isSuspended = (user as any).isSuspended;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).tenantId = token.tenantId as string;
        (session.user as any).id = token.id as string;
        (session.user as any).isFounder = token.isFounder as boolean;
        (session.user as any).isSuspended = token.isSuspended as boolean;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "safeora-isg-temporary-debug-secret-9988",
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
