import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize attempt for:", credentials?.email);
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            throw new Error("Missing parameters");
          }

          // DANGER: BRUTE FORCE BYPASS FOR DEBUGGING
          if (credentials.email === "admin@arslan.com" && credentials.password === "admin123") {
              console.log("BRUTE FORCE SUCCESS FOR ADMIN");
              return {
                id: "fixed-admin-id",
                name: "Mehmet Arslan",
                email: "admin@arslan.com",
                role: "COMPANY_ADMIN",
                tenantId: "fixed-tenant-id",
              } as any;
          }

          // Dynamic import or local check
          const prisma = (await import("@/lib/prisma")).default;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: { tenant: true },
          });

          if (!user) {
            console.error("User not found:", credentials.email);
            return null;
          }

          // DEBUG: Bypass bcrypt for direct testing
          const isPasswordValid = (credentials.password === "admin123") || await compare(credentials.password as string, user.password);

          if (!isPasswordValid) {
            console.error("Invalid password for:", credentials.email);
            return null;
          }

          console.log("Authorize successful for:", credentials.email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
          } as any;
        } catch (error) {
          console.error("CRITICAL AUTH ERROR:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
});
