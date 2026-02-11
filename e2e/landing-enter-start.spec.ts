import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("landing Enter starts flow, creates currentRun, and enters /prepare", async ({ page }) => {
  await page.goto("/");

  const taskText = "enter-start-smoke";
  await page.getByPlaceholder("예: 밀린 강의 자료 정리하기").fill(taskText);
  await page.keyboard.press("Enter");

  await page.waitForURL("**/prepare");
  await expect(page).toHaveURL(/\/prepare$/);

  const currentRun = await page.evaluate(() => {
    const raw = window.localStorage.getItem("miruny.currentRun");
    return raw ? JSON.parse(raw) : null;
  });

  expect(currentRun).not.toBeNull();
  expect(currentRun.taskText).toBe(taskText);
  expect(currentRun.currentStepIndex).toBe(0);
  expect(Array.isArray(currentRun.steps)).toBeTruthy();
  expect(currentRun.steps.length).toBe(3);
});
