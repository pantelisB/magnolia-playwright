import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class AboutPage extends HelperBase{


    readonly aboutHeader: Locator;

    pageText = {
        "eng":{
            aboutHeader: "About Magnolia Travels",
        },
        "ger":{
            aboutHeader: "Über Magnolia Travels",
        }
    }
    constructor(page: Page){
        super(page);
        this.aboutHeader = page.locator('.jumbotron').locator('h2');
    }

    /**
     * we validate that the header on About page is visible
     */
    async verifyHeaderIsVisible(){
        await expect(this.aboutHeader,'Verify that the header is visible').toBeVisible();
    }
    /**
     * V
     */
    async verifyElementHeader(){
        const headerText = await this.aboutHeader.textContent();
         expect(headerText, "Verify header's text for About page is correct").toEqual(this.pageText["eng"].aboutHeader);
    }

}