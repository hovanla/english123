import { expect, test } from "@playwright/test";

test.describe("learner pilot flow", () => {
  test.skip(!process.env.E2E_DATABASE_READY, "Requires an isolated PostgreSQL database with seeded curriculum.");
  test("parent can register and reach the learner dashboard", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("Tên phụ huynh").fill("Phụ huynh thử nghiệm");
    await page.getByLabel("Email").fill(`pilot-${Date.now()}@example.test`);
    await page.getByLabel("Mật khẩu (ít nhất 8 ký tự)").fill("Pilot123!");
    await page.getByLabel("Tên hiển thị của học sinh").fill("An");
    await page.getByLabel("Năm sinh").fill("2018");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Tạo tài khoản" }).click();
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole("heading", { name: /Xin chào, An/ })).toBeVisible();
  });
});
