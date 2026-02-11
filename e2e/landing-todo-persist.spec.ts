import { expect, test } from "@playwright/test";

test("landing todos persist after refresh", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("예: 밀린 강의 자료 정리하기");
  const addButton = page.getByRole("button", { name: "할 일 목록에 추가" });

  await input.fill("persist-a");
  await addButton.click();
  await input.fill("persist-b");
  await addButton.click();

  await expect(page.getByText("persist-a", { exact: true })).toHaveCount(1);
  await expect(page.getByText("persist-b", { exact: true })).toHaveCount(1);

  await page.reload();

  await expect(page.getByText("persist-a", { exact: true })).toHaveCount(1);
  await expect(page.getByText("persist-b", { exact: true })).toHaveCount(1);
});
