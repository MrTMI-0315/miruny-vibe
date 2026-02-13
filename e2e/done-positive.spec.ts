import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("done page renders when finished info exists", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E done positive",
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

  await expect(page).toHaveURL(/\/done$/);
  await expect(page.getByText("83 완료!")).toBeVisible();
  await expect(page.getByRole("button", { name: "1단계부터 다시 시작" })).toBeVisible();

  const currentRunAfterLoad = await page.evaluate(() => {
    return window.localStorage.getItem("miruny.currentRun");
  });
  expect(currentRunAfterLoad).toBeNull();
});
