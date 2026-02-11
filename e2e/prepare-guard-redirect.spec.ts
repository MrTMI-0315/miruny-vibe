import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("direct /prepare navigation redirects to landing when currentRun is missing", async ({ page }) => {
  await page.goto("/prepare");

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();
});
