import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'



test.beforeEach(async ({page})=>{
    await page.goto('https://demoauthor.magnolia-cms.com/travel/');

});
/**
 * We run a successful login doing some validation when home page loading
 */
test('Test: successful login', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.onLoginPage().login();
    await pm.onLoginPage().validateErrorIsNoDisplayed();
    await pm.onHomePage().verifyHeaderisVisible();
    await pm.onHomePage().verifyHeadersText();
    await pm.onHomePage().verifyLogosSrc();  
});

test.afterEach(async ({page})=>{
    await page.close();
});