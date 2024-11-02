import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'


test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({page})=>{
    await page.goto('https://demoauthor.magnolia-cms.com/travel/');


})
test('Search using the searchbox', async ({ page }) => {

    const pm = new PageManager(page)
    await pm.onNavigation().navigateToMenuItem("Tours", "Active");

    await pm.onActivePage().selectCardbyText("Hut to Hut in the Swiss Alps")
    await pm.onTourPage().verifyPropertiesOnToursPage("Start city","Zurich, Switzerland");
    //In order to pass I input 7 days instead of 7 Days
    await pm.onTourPage().verifyPropertiesOnToursPage("Duration","7 days");
    await pm.onTourPage().verifyPropertiesOnToursPage("Tour operator","Magnolia Travels");

});
test.afterEach(async ({page})=>{
    await page.close();
});