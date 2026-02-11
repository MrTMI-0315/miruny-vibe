import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("prepare shows loading text then auto-navigates to run with valid currentRun", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E prepare positive",
      steps: [
        { title: "1단계", durationSec: 10 },
        { title: "2단계", durationSec: 20 },
        { title: "3단계", durationSec: 20 },
      ],
      currentStepIndex: 0,
      stepStartedAt: now,
      totalStartedAt: now,
      completedStepIndexes: [],
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/prepare");

  await expect(page.getByText("작업을 분석하고 있어요...", { exact: false })).toBeVisible();
  await expect(page).toHaveURL(/\/run$/, { timeout: 6000 });
  await expect(page.getByText("STEP 1")).toBeVisible();
});
