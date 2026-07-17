import { PrismaClient } from "@prisma/client";
import { PrismaClient as LocalPrismaClient } from "@prisma/client-local";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const PrismaClientForEnvironment = (process.env.DATABASE_URL?.startsWith("file:") ? LocalPrismaClient : PrismaClient) as typeof PrismaClient;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClientForEnvironment({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
