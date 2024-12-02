import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["html", { outputFolder: "test-report", open: "never" }],
  ],
  outputDir: "./test-results",
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: process.env.ENVIRONMENT_URL,
    headless: false, // Set to true to run tests headlessly
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'on', // Record video of each test ('on', 'off', 'retain-on-failure')
  },
  reportSlowTests: null,
  timeout: 90000,
  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }, // Configure device to use Firefox
    // },
  ],
});
