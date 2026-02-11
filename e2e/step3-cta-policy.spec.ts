import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test("step3 keeps bottom CTA disabled and uses card complete as progress action", async ({ page }) => {
  await page.addInitScript(() => {
    const now = Date.now();
    const seededRun = {
      taskText: "E2E step3 CTA policy",
      steps: [
        { title: "1단계", durationSec: 10 },
        { title: "2단계", durationSec: 20 },
        { title: "3단계", durationSec: 20 },
      ],
      currentStepIndex: 2,
      stepStartedAt: now,
      totalStartedAt: now,
      completedStepIndexes: [0, 1],
    };

    localStorage.setItem("miruny.currentRun", JSON.stringify(seededRun));
  });

  await page.goto("/run");

  const step3Card = page.locator("li").filter({ hasText: "STEP 3" });
  const step3CompleteButton = step3Card.getByRole("button", { name: "완료" });
  const bottomDisabledCta = page.getByRole("button", {
    name: "마지막 단계는 카드 완료 버튼을 눌러주세요",
  });

  await expect(step3CompleteButton).toBeVisible();
  await expect(step3CompleteButton).toBeEnabled();
  await expect(bottomDisabledCta).toBeVisible();
  await expect(bottomDisabledCta).toBeDisabled();
  await expect(page.getByRole("button", { name: /다음 단계로/ })).toHaveCount(0);
});
