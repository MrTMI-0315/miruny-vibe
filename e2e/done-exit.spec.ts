import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("done home exit returns to landing and blocks direct run re-entry", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("__done_exit_seeded")) {
      return;
    }

    const now = Date.now();
    const seededRun = {
      taskText: "E2E done exit",
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
    sessionStorage.setItem("__done_exit_seeded", "1");
  });

  await page.goto("/done");
  await expect(page.getByRole("button", { name: "홈으로" })).toBeVisible();
  await page.getByRole("button", { name: "홈으로" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();

  await page.goto("/run");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();
});
