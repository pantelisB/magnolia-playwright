import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';
import exp from "constants";




export class TourPage extends HelperBase{

    readonly tourTitleHeader: Locator
    readonly properties: Locator
    readonly bookButton: Locator
    readonly pageUrl: string




    constructor(page: Page){
        super(page);
        this.tourTitleHeader = page.locator('.lead-caption').locator("h1");
        this.properties = page.locator(".product-properties");
        this.bookButton = page.getByRole('button', { name: 'Book Tour' });
        this.pageUrl = "https://demoauthor.magnolia-cms.com/travel/tours/magnolia-travels/Spectacular-Ammouliani-Island.html"
    }

    /**
     * We verify the header
     * @param expectedText 
     */
    async verifyTourPageHeader(expectedText:string){
        
        expect(this.verifyTextwithLocator(this.tourTitleHeader, expectedText),"Verify tours header").toBeTruthy();
    }

    async verifyToursUrl(){
        expect(this.page.url(),"Verify the URL if it is the expected one and if includes the correct language").toEqual(this.pageUrl);

    }
    

    /**
     * Use the values you want to compare
     * then we go through to find the property name. When we find it we search for parent element
     * and then we are looking for the property value. So if the property value match we pass the test
     * @param propertyName 
     * @param propertyValue 
     */
    async verifyPropertiesOnToursPage(propertyName:string, propertyValue:string ){
        let propertyValueText;
        await this.tourTitleHeader.click();
        const propertyNameToLowerCase = propertyName.toLowerCase();
        const props = await this.properties.locator(".product-property").locator('.property-label').all();
        
        const promises = props.map(async (element) => {
            const propertyText = await element.textContent();
            if (propertyText === propertyNameToLowerCase) {
                propertyValueText = await element.locator('xpath=..').locator('.property-value').textContent();
            }
          });
        await Promise.all(promises);
        expect(propertyValueText,"Verify Properties on tour card, property checked: "+propertyName).toEqual(propertyValue);
    }
    /**
     * click on book button
     */
    async clickBookButton(){
        await this.bookButton.click();
    }

        
}