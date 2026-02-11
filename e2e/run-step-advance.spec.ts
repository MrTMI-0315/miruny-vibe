import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("run advances from step1 to step2 when next is clicked", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E run step advance",
      steps: [
        { title: "1단계 바로 시작", durationSec: 10 },
        { title: "2단계 이어서 진행", durationSec: 20 },
        { title: "3단계 마무리", durationSec: 20 },
      ],
      currentStepIndex: 0,
      stepStartedAt: now,
      totalStartedAt: now,
      completedStepIndexes: [],
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/run");

  const step1Card = page.locator("li").filter({ hasText: "STEP 1" });
  const step2Card = page.locator("li").filter({ hasText: "STEP 2" });

  await expect(step1Card.getByRole("button", { name: "완료" })).toBeVisible();
  await page.getByRole("button", { name: "다음 단계로" }).click();

  await expect(step2Card.getByRole("button", { name: "완료" })).toBeVisible();
  await expect(step1Card.getByText("DONE")).toBeVisible();
});
