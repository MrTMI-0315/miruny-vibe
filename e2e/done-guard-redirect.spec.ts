import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("direct /done navigation redirects to landing when completion info is missing", async ({ page }) => {
  await page.goto("/done");

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();
});
