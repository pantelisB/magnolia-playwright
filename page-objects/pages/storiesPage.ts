import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class StoriesPage extends HelperBase{


    readonly storiesHeadersH1: Locator;

    pageText = {
        "eng":{
            firstHeader: "STORIES",
            secondHeader: "DISCOVER"
        },
        "ger":{
            firstHeader: "Geschichten",
            secondHeader: "ENTDECKEN"
        }
    }
    h1onStoriesPage = ["STORIES","DISCOVER"]
    constructor(page: Page){
        super(page);
        this.storiesHeadersH1 = page.locator('.stories-header').locator('h1');
    }
    /**
     * On Stories page there are two headers so I compare the array of the two headers
     */
    async checkStoriesHeaders() {
        const h1Array =  await this.storiesHeadersH1.allInnerTexts();
        expect(h1Array).toEqual(expect.arrayContaining(this.h1onStoriesPage));
    }
    

}