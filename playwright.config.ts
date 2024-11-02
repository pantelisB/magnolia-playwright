import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    trace: 'on',
    // Capture screenshot after each test failure.
    screenshot: 'on',
    // Record video only when retrying a test for the first time.
    video: 'on',
    contextOptions: {
      recordVideo: {
        dir: "/videos"
      },
    },
    launchOptions: {
      
    
      //it might cause issues on github
      args: ["--start-maximized"],


    },
 
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', 
      testMatch: [
        /.*\.setup\.ts/,
        '!tests/login.spec.ts',
      ]
    },

   /* {
      name: 'chromium1',
      use: {
        //...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
        viewport: null,
      },
      dependencies: ['setup'],
    },
    */
    /*{
      name: 'firefox',
      use: {
        //...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
        viewport: null,

      },
      dependencies: ['setup'],
    },
*/
    /*{
      name: 'chromium',
      use: { 
        //...devices['Desktop Chrome'],
        viewport: null,
       },
    },
    */
    {
      name: 'chromium',
      //testMatch: 'login.spec.ts', // Match specific test file
      use: {
          //...devices['Desktop Chrome'],
        //storageState: 'playwright/.auth/user.json',
        viewport: null,
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      //testMatch: 'login.spec.ts', // Match specific test file
      //use: { ...devices['Desktop Firefox'] },
      use: {
        //...devices['Desktop Chrome'],
      //storageState: 'playwright/.auth/user.json',
      viewport: null,
      },
      dependencies: ['setup'],


    },
    /*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
