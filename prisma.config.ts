import "dotenv/config";
import { defineConfig } from "prisma/config";

const cliDatabaseUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma CLI dùng kết nối trực tiếp/session pooler cho migration.
    // Ứng dụng vẫn dùng DATABASE_URL (transaction pooler) ở runtime.
    url: cliDatabaseUrl,
  },
});
