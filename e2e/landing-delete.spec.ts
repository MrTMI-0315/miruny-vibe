import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing delete removes todo item from list", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("예: 밀린 강의 자료 정리하기").fill("delete-me");
  await page.getByRole("button", { name: "할 일 목록에 추가" }).click();

  const row = page.locator("li").filter({ hasText: "delete-me" });
  await expect(row).toBeVisible();

  await row.getByRole("button", { name: /삭제/ }).click();
  await expect(page.getByText("delete-me", { exact: true })).toHaveCount(0);
});
