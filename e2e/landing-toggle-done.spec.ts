import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing todo toggle updates completed state and can be toggled back", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("예: 밀린 강의 자료 정리하기").fill("toggle-me");
  await page.getByRole("button", { name: "할 일 목록에 추가" }).click();

  const row = page.locator("li").filter({ hasText: "toggle-me" });
  const toggleButton = row.getByRole("button", { name: "toggle-me 완료 토글" });
  const taskText = row.getByText("toggle-me", { exact: true });

  await expect(toggleButton).toHaveAttribute("aria-pressed", "false");
  await toggleButton.click();
  await expect(toggleButton).toHaveAttribute("aria-pressed", "true");
  await expect(taskText).toHaveClass(/line-through/);

  await toggleButton.click();
  await expect(toggleButton).toHaveAttribute("aria-pressed", "false");
  await expect(taskText).not.toHaveClass(/line-through/);
});
