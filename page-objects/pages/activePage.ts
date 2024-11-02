import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class ActivePage extends HelperBase{

    readonly containerHeader: Locator;
    readonly cards: Locator;


    
    pageText = {
        "eng":{
            activePageContainerHeader: "Featured Active Tours",
        },
        "ger":{
            activePageContainerHeader: "Ausgewählte Aktiv Reisen",
        }
    }
    constructor(page: Page){
        super(page);
        this.containerHeader = page.locator('.after-category-header').locator('h2');
        this.cards = page.locator('.card').locator('h3');

    }


    async validateContainerHeader(lang: string){
        const headerText = await this.page.locator('.after-category-header').locator('h2').textContent();
        if(headerText)
        expect(this.compareElementTextWithAString(headerText,this.pageText[lang].activePageContainerHeader)).toBeTruthy();
    }
    /**
     * 
     * @param cardName clicks on card just using the card(tour) title as text
     */
    async selectCardbyText(cardName:string){
        this.clickOn(this.cards.filter({ hasText: cardName }))
    }

}

