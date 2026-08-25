import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { loginIdentifierSchema, MIN_PASSWORD_LENGTH } from "@/lib/login-identifier";

const credentialsSchema = z.object({
  login: loginIdentifierSchema,
  password: z.string().min(MIN_PASSWORD_LENGTH).max(128),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        login: { label: "Tên đăng nhập hoặc email", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.login } });
        if (!user?.passwordHash || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role, sessionVersion: user.sessionVersion };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.sessionVersion = user.sessionVersion;
      } else if (token.id) {
        const current = await prisma.user.findUnique({ where: { id: String(token.id) }, select: { sessionVersion: true } });
        if (!current || current.sessionVersion !== token.sessionVersion) token.invalid = true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.invalid ? "" : String(token.id || token.sub);
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});
