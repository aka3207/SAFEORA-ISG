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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Geçerli bir e-posta ve şifre giriniz.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { tenant: true },
        });

        if (!user || !user.password) {
          throw new Error("Kullanıcı bulunamadı.");
        }

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          throw new Error("Şifre hatalı.");
        }

        // Check if tenant is active
        if (user.role !== "SUPER_ADMIN") {
          if (!user.tenant) {
            throw new Error("Kullanıcı bir şirkete bağlı değil.");
          }
          if (!user.tenant.isActive) {
            throw new Error("Şirket hesabınız askıya alınmıştır. Lütfen yönetici ile iletişime geçin.");
          }
        }

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
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
});
