import { defineConfig, devices } from "@playwright/test";

const webServerUrl = process.env.PLAYWRIGHT_TEST_COMMAND?.includes("tanstack-ssr")
  ? "http://localhost:4174"
  : "http://localhost:4173";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_TEST_COMMAND || "pnpm react:preview",
    url: webServerUrl,
    reuseExistingServer: !process.env.CI,
  },
});
