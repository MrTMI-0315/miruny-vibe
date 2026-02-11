import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("run exit returns to landing and blocks direct re-entry without currentRun", async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem("__run_exit_seeded")) {
      return;
    }

    const now = Date.now();
    const seededRun = {
      taskText: "E2E run exit",
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
    sessionStorage.setItem("__run_exit_seeded", "1");
  });

  await page.goto("/run");
  await page.getByRole("button", { name: "처음으로 나가기" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();

  await page.goto("/run");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "지금 바로 시작" })).toBeVisible();
});
