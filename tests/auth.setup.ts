import { test as setup, expect } from '@playwright/test';
import path from 'path';
const username = process.env.USER_NAMETest ??'default_username';
const password = process.env.PASSWORD??'default_username';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');


setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://demoauthor.magnolia-cms.com/travel/');
  await page.getByRole('textbox', {name: 'Username'}).fill(username);
  await page.getByRole('textbox', {name: 'Password'}).fill(password);
  await page.getByRole('button', {name: 'Login'}).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //await page.waitForURL('https://demoauthor.magnolia-cms.com/travel/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('heading', { name: 'Hut to Hut in the Swiss Alps' }), 'Verify that the header is visible and contains the specified text').toBeVisible();

  // End of authentication steps.
  
  await page.context().storageState({ path: authFile });
});