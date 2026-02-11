import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing input starts flow and enters /prepare", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("예: 밀린 강의 자료 정리하기").fill("MIRUNY e2e smoke");
  await page.getByRole("button", { name: "지금 바로 시작" }).click();

  await page.waitForURL("**/prepare");
  await expect(page).toHaveURL(/\/prepare$/);
  await expect(page.getByText("작업을 분석하고 있어요...", { exact: false })).toBeVisible();
});
