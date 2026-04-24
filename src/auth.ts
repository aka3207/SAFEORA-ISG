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
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          throw new Error("Geçerli bir e-posta ve şifre giriniz.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { tenant: true },
        });

        if (!user) {
          console.error("User not found:", credentials.email);
          throw new Error("Kullanıcı bulunamadı.");
        }

        console.log("User found, comparing password...");
        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          console.error("Invalid password for:", credentials.email);
          throw new Error("Şifre hatalı.");
        }

        console.log("Password valid, checking tenant/role...");
        // Check if tenant is active
        if (user.role !== "SUPER_ADMIN") {
          if (!user.tenant) {
            console.error("User has no tenant:", credentials.email);
            throw new Error("Kullanıcı bir şirkete bağlı değil.");
          }
          if (!user.tenant.isActive) {
            console.error("Tenant inactive for user:", credentials.email);
            throw new Error("Şirket hesabınız askıya alınmıştır. Lütfen yönetici ile iletişime geçin.");
          }
        }

        console.log("Authorize successful for:", credentials.email);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
        } as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
});
