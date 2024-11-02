import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'


test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({page})=>{
    await page.goto('https://demoauthor.magnolia-cms.com/travel/');


})
test('Test: Navigation testing menu and submenus URLS', async ({ page }) => {
    
    const pm = new PageManager(page)
    await pm.onNavigation().navigateToMenuItem("Tours", "Active");
    await pm.onNavigation().navigateToMenuItem("Destinations", "North America");
    await pm.onNorthAmericaPage().selectTourByText("West Coast - Highway 101");
    await pm.onNavigation().navigateToMenuItem("Stories");
    await pm.onStoriesPage().checkStoriesHeaders();
    await pm.onNavigation().navigateToMenuItem("About");
    await pm.onAboutPage().verifyElementHeader();
    await pm.onAboutPage().verifyHeaderIsVisible();
    await pm.onNavigation().navigateToMenuItem("Contact");
    await pm.onContactPage().verifyHeaderIsVisible();
    await pm.onContactPage().verifyElementHeader();
    await pm.onNavigation().navigateToMenuItem("Members");
});


test.afterEach(async ({page})=>{
    await page.close();
});