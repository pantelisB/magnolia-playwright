import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';


export class ResultPage extends HelperBase{


    readonly pagesResults: Locator;
    readonly searchBox: Locator;
    readonly pageResultByHeader: Locator;



    constructor(page: Page){
        super(page);
         
        this.searchBox = page.getByPlaceholder("Search");
        this.pagesResults = page.locator(".list-group").locator(".list-group-item");
        this.pageResultByHeader = page.locator(".list-group").locator(".list-group-item").locator('h4');
    }

    async clickOnResultByText(resultText:string){
        await this.pageResultByHeader.filter({ hasText: resultText }).click();
    }
}  