import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("done restart moves to run and activates step1", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E done restart",
      steps: [
        { title: "1단계", durationSec: 10 },
        { title: "2단계", durationSec: 20 },
        { title: "3단계", durationSec: 20 },
      ],
      currentStepIndex: 2,
      stepStartedAt: now - 83_000,
      totalStartedAt: now - 83_000,
      completedStepIndexes: [0, 1, 2],
      finishedAt: now,
      totalElapsedSec: 83,
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/done");
  await page.getByRole("button", { name: "1단계부터 다시 시작" }).click();

  await expect(page).toHaveURL(/\/run$/);
  const step1Card = page.locator("li").filter({ hasText: "STEP 1" });
  await expect(step1Card.getByRole("button", { name: "완료" })).toBeVisible();
});
