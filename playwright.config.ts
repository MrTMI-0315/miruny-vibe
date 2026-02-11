import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "/tmp/miruny-playwright-results",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:3310",
    screenshot: "off",
    video: "off",
    trace: "off",
  },
  webServer: {
    command: "npm run start -- -p 3310",
    url: "http://127.0.0.1:3310",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
});
