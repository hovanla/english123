import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "node", exclude: ["tests/e2e/**", "node_modules/**", "mobile/**"], coverage: { provider: "v8", reporter: ["text", "html"], include: ["src/lib/activities.ts", "src/lib/authorization.ts", "src/lib/progress.ts"] } },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
