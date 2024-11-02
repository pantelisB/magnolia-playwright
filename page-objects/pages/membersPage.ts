import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class MembersPage extends HelperBase{


    readonly contactHeader: Locator;

    pageText = {
        "eng":{
            membersHeader: "Members",
        },
        "ger":{
            membersHeader: "Mitglieder",
        }
    }
    constructor(page: Page){
        super(page);
        this.contactHeader = page.locator('.jumbotron').locator('h2');
    }


    async verifyElementisVisible(){
        await expect(this.contactHeader,"verify the member word to displayed").toBeVisible();
    }
    
    async verifyElementHeader(){
        const headerText = await this.contactHeader.textContent();
         expect(headerText,"verify the member word text on Header").toEqual(this.pageText["eng"].membersHeader);
    }

}