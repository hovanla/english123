import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../src/lib/prisma";

const inputSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(128),
});

async function main() {
  const input = inputSchema.parse({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL chưa được khai báo.");
  }

  const database = new URL(databaseUrl);
  if (database.protocol === "file:") {
    throw new Error("Đang trỏ tới SQLite local. Hãy khai báo DATABASE_URL của Supabase trước khi chạy lại.");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  await prisma.user.upsert({
    where: { email: input.email },
    create: {
      email: input.email,
      name: "Quản trị English123",
      passwordHash,
      role: Role.ADMIN,
    },
    update: {
      passwordHash,
      role: Role.ADMIN,
      sessionVersion: { increment: 1 },
    },
  });

  console.log(`Đã đặt lại admin ${input.email} trên ${database.host}.`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
