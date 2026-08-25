import { expect, test } from "@playwright/test";

test.describe("learner pilot flow", () => {
  test.skip(!process.env.E2E_DATABASE_READY, "Requires an isolated PostgreSQL database with seeded curriculum.");
  test("parent can register and reach the learner dashboard", async ({ page }) => {
    await page.goto("/register");
    const login = `pilot-${Date.now()}`;
    await page.getByLabel("Tên đăng nhập").fill(login);
    await page.getByLabel("Mật khẩu").fill("1234");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole("heading", { name: new RegExp(`Xin chào, ${login}`) })).toBeVisible();
  });
});
