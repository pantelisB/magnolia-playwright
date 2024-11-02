import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

test.use({ storageState: 'playwright/.auth/user.json' });


test.beforeEach(async ({page})=>{
    await page.goto('https://demoauthor.magnolia-cms.com/travel/');


})
test('Search using the searchbox', async ({ page }) => {

    const pm = new PageManager(page)
    await pm.onHomePage().searchByText("Europe");
    //I need to verify that the results are more than 3
    //also its obvious there are several issues such us text out of the box
    // and german language among english
    await pm.onHomePage().expectingResultstoBeMoreThan(3);
    await pm.onResultPage().clickOnResultByText("An island")
    await pm.onTourPage().verifyTourPageHeader("Spectacular Ammouliani Island");
    await pm.onTourPage().verifyToursUrl();

    
});

test.afterEach(async ({page})=>{
    await page.close();
});
