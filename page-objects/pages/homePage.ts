import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class HomePage extends HelperBase{

    readonly mainHeader: Locator;
    readonly mainHeaderWithoutText: Locator;
    readonly magnoliaTravelsLogo: Locator;
    readonly germanButton: Locator;
    readonly englishButton: Locator;
    readonly searchBox: Locator;
    readonly pagesResults: Locator;
    readonly headerText: string;

    constructor(page: Page){
        super(page);
        this.mainHeader = page.getByRole('heading', { name: 'Hut to Hut in the Swiss Alps' });
        this.mainHeaderWithoutText = page.locator('.carousel-caption h1').first();
        this.magnoliaTravelsLogo = page.locator('.navbar-brand img');
        this.germanButton = page.getByTitle("German");
        this.englishButton = page.getByTitle("English");
        this.searchBox = page.getByPlaceholder("Search");
        this.pagesResults = page.locator(".list-group").locator(".list-group-item");
        this.headerText = "Hut to Hut in the Swiss Alps";
    }

    /**
     * we validate that the header on homepage is visible
     */
    async verifyHeaderisVisible(){
        await expect(this.mainHeader, 'Verify that the header is visible').toBeVisible();
    }
   
    /**
     * we verify the hoe page header text is as expected
     */
    async verifyHeadersText(){

         expect(await this.mainHeaderWithoutText.textContent(),'Verify that the header has the following text: Hut to Hut in the Swiss Alps').toContain(this.headerText);
    }
    /**
     * verify logos attribute
     */
    async verifyLogosSrc(){
        await expect(this.magnoliaTravelsLogo, 'Verify the attribute of headers Logo').toHaveAttribute('src', "/.resources/travel-demo-theme/img/logo-white.png");

    }

    /**
     * Use this function to change the langua by hitting the proper button
     * @param lang 
     */
    async updateLanguage(lang:string){

        if(lang==="eng"){
            this.clickOn(this.englishButton);
        }
        else if(lang==="ger"){
            this.clickOn(this.germanButton);
        }
    }
    /**
     * Type text on searchbar and hit enter. We hit enter as there is no button to click
     * @param searchText 
     */
    async searchByText(searchText:string){
        await this.searchBox.fill(searchText);
        //need to use keyboard as there in button that I can click
        await this.page.keyboard.press("Enter");
        

    }
    /**
     * After searching will expect a number of results
     * we use this function to verify that at least the results we expecting diplayed
     * @param results 
     */
    async expectingResultstoBeMoreThan(results:number){

        await this.searchBox.click();

        const numberOfResults = await this.pagesResults.all();
        var countListedItems = 0;
        numberOfResults.forEach(async element => {
            countListedItems++;
        });
        console.log(countListedItems);
        expect(countListedItems, 'Results should be more than what we expect, and we expect: '+results).toBeGreaterThan(results)
    }
   
}