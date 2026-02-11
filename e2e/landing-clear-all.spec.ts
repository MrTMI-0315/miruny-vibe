import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing clear all removes every todo item", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("예: 밀린 강의 자료 정리하기");
  const addButton = page.getByRole("button", { name: "할 일 목록에 추가" });

  await input.fill("a");
  await addButton.click();
  await input.fill("b");
  await addButton.click();

  await expect(page.getByText("a", { exact: true })).toHaveCount(1);
  await expect(page.getByText("b", { exact: true })).toHaveCount(1);

  await page.getByRole("button", { name: "전체 삭제하기" }).click();

  await expect(page.getByText("a", { exact: true })).toHaveCount(0);
  await expect(page.getByText("b", { exact: true })).toHaveCount(0);
});
