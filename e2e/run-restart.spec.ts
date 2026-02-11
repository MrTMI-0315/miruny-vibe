import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("run restart resets to step1 active and clears progressed state", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E run restart",
      steps: [
        { title: "1단계", durationSec: 10 },
        { title: "2단계", durationSec: 20 },
        { title: "3단계", durationSec: 20 },
      ],
      currentStepIndex: 2,
      stepStartedAt: now - 10_000,
      totalStartedAt: now - 40_000,
      completedStepIndexes: [0, 1],
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/run");
  await expect(page.getByRole("button", { name: "1단계부터 다시 시작" })).toBeVisible();
  await page.getByRole("button", { name: "1단계부터 다시 시작" }).click();

  const step1Card = page.locator("li").filter({ hasText: "STEP 1" });
  const step2Card = page.locator("li").filter({ hasText: "STEP 2" });

  await expect(step1Card.getByRole("button", { name: "완료" })).toBeVisible();
  await expect(step2Card.getByText("대기")).toBeVisible();
});
