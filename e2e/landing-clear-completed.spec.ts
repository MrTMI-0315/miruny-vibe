import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing clear completed removes only completed todos", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("예: 밀린 강의 자료 정리하기");
  const addButton = page.getByRole("button", { name: "할 일 목록에 추가" });

  await input.fill("keep-me");
  await addButton.click();
  await input.fill("remove-me");
  await addButton.click();

  const removeRow = page.locator("li").filter({ hasText: "remove-me" });
  await removeRow.getByRole("button", { name: "remove-me 완료 토글" }).click();

  await page.getByRole("button", { name: "완료된 항목 삭제하기" }).click();

  await expect(page.getByText("remove-me", { exact: true })).toHaveCount(0);
  await expect(page.getByText("keep-me", { exact: true })).toHaveCount(1);
});
