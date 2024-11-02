import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class ContactPage extends HelperBase{


    readonly contactHeader: Locator;

    pageText = {
        "eng":{
            contactHeader: "Contact",
        },
        "ger":{
            contactHeader: "Kontakt",
        }
    }
    constructor(page: Page){
        super(page);
        this.contactHeader = page.locator('.jumbotron').locator('h2');
    }

    /**
     * we verify if the header on specific page is visible
     */
    async verifyHeaderIsVisible(){
        await expect(this.contactHeader,'Verify Contacts header is visible').toBeVisible();
    }
    /**
     * verify elements headed if is as expected under the page
     */
    async verifyElementHeader(){
        const headerText = await this.contactHeader.textContent();
        expect(headerText,"Verify header's text for Contact Page is correct").toEqual(this.pageText["eng"].contactHeader);
    }

}