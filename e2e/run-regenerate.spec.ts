import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("run regenerate keeps /run, resets to step1 active, and clears progress UI", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E run regenerate",
      steps: [
        { title: "1단계", durationSec: 10 },
        { title: "2단계", durationSec: 20 },
        { title: "3단계", durationSec: 20 },
      ],
      currentStepIndex: 2,
      stepStartedAt: now - 12_000,
      totalStartedAt: now - 45_000,
      completedStepIndexes: [0, 1],
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/run");
  await expect(page.getByRole("button", { name: "다시 생성하기" })).toBeVisible();
  await page.getByRole("button", { name: "다시 생성하기" }).click();

  await expect(page).toHaveURL(/\/run$/);
  const step1Card = page.locator("li").filter({ hasText: "STEP 1" });
  const step2Card = page.locator("li").filter({ hasText: "STEP 2" });

  await expect(step1Card.getByRole("button", { name: "완료" })).toBeVisible();
  await expect(step2Card.getByText("대기")).toBeVisible();
});
