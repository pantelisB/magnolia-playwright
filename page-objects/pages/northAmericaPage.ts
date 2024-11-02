import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';



export class NorthAmericaPage extends HelperBase{

    readonly containerHeader: Locator;
    readonly northAmericaToursCard: Locator

    pageText = {
        "eng":{
            northAmericaPageContainerHeader: "Featured North America Tours",
        },
        "ger":{
            northAmericaPageContainerHeader: "Ausgewählte Nordamerika Reisen",
        }
    }
    constructor(page: Page){
        super(page);
        this.containerHeader = page.locator('.after-category-header').locator('h2');
        this.northAmericaToursCard = page.locator('.card').locator('h3');
    }

    
    /**
     * on this one we validate the header of the container not the main one
     * @param lang 
     */
    async validateContainerHeader(lang: string){
        const headerText = await this.containerHeader.textContent();
        if(headerText)
        expect(this.compareElementTextWithAString(headerText , this.pageText[lang].northAmericaPageContainerHeader)).toBeTruthy();
    }

    /**
     * we select by text any tour from the any container
     * @param tourName 
     */
    async selectTourByText(tourName:string){
        this.northAmericaToursCard.getByText(tourName).click();

    }

}