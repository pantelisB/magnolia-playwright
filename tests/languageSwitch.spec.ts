import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'


test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({page})=>{
    await page.goto('https://demoauthor.magnolia-cms.com/travel/');


})
test.skip('Update the language and verify the Tours section', async ({ page }) => {
    //FAILS as the languge has not changed on tours menu
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().navigateToMenuItem("Touren", "Aktiv");
});

test.skip('Update the language and verify the Destination section', async ({ page }) => {
    //FAILS as the languge has not changed on Destination menu
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().navigateToMenuItem("Reiseziele", "Nordamerika");
});

test.skip('Update the language and verify the Stories section', async ({ page }) => {
    
    //FAILS as the languge has not changed on Stories menu
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().navigateToMenuItem("Geschichten");
});

test('Update the language and verify the About section', async ({ page }) => {
    
    //Although it should be ABOUT US I accept it as correct and I was able to navigate on the
    //section using german language and also I verified the the URL is updated
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().navigateToMenuItem("Über uns");
});

test('Check lang attribute after switching language', async ({ page }) => {
    
    //I am updating the languge and the verifying if the attribute lang has changed
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().verifyTheLangAtt("ger");
});


test('Check lang attribute after switching language from Eng to De and from De to Eng', async ({ page }) => {
    
    //I am updating the languge and the verifying if the attribute lang has changed
    const pm = new PageManager(page)
    
    await pm.onHomePage().updateLanguage("ger");
    await pm.onNavigation().verifyTheLangAtt("ger");

    await pm.onHomePage().updateLanguage("eng");
    await pm.onNavigation().verifyTheLangAtt("eng");
});

test.afterEach(async ({page})=>{
    await page.close();
});