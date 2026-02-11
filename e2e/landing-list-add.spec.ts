import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing add-to-list appends item and keeps current input behavior", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("예: 밀린 강의 자료 정리하기");
  await input.fill("abc");
  await page.getByRole("button", { name: "할 일 목록에 추가" }).click();

  await expect(page.getByText("abc", { exact: true })).toBeVisible();
  await expect(input).toHaveValue("");
});
