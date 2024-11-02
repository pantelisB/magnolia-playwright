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

  await pm.onTourPage().clickBookButton();
  await pm.onBookTourPage().bookNumberOfTravellers("9999","1");
  await pm.onBookTourPage().bookTripOptions("yes","YES","no","Yes");
  await pm.onBookTourPage().verifyIfNumberOfTravellersAreCorrect("9999","1");
  await pm.onBookTourPage().verifyIfOptionsAreCorrect("yes","YES","no","Yes");
  await pm.onBookTourPage().clickNextButton();
  await pm.onBookTourPage().selectMealOptionsAndNotes("Vegan", "Notes for my order please follow my dietary instrunctions that follow");
  await pm.onBookTourPage().clickNextButton();
  await pm.onBookTourPage().completePersonalDetailsInfo("Mr", "Pantelis", "Bantis","pantelisbantis@yahoo.gr","6942778927");

  await pm.onBookTourPage().completemailingAddress("Thessaloniki","53200","United Kingdom", "Florina");
  await pm.onBookTourPage().clickNextButton();
  await pm.onBookTourPage().uploadFile();
  await pm.onBookTourPage().confirmBookingLast();
  //comment out that as error message shouldnt be displayed
  //await pm.onBookTourPage().verifySuccesfulBooking();
});

test.afterEach(async ({page})=>{
  await page.close();
});