import { Locator, Page, expect } from "@playwright/test";



export class HelperBase{
    readonly page:Page

    constructor(page: Page){
        this.page=page;
    }



    compareElementTextWithAString(locator: string, existingText: string) :boolean {
        return locator===existingText;
    }

    async clickOn(locator:Locator){
        await locator.click({force:true});
    }

    async verifyTextwithLocator(locator:Locator, expectedText:string){
        const trueFalse = await locator.textContent() === expectedText ? true : false
        //await expect(locator).toHaveText(/Welcome, .*/);
        //need to try above instead of checking text
        return trueFalse;

    }
    async verifyElementsText(element:string, expectedText:string){
        expect(expectedText).toEqual(element);
    }
    /**
     * Get as parameter answer Yes or No and  a locator
     * if the answer is yes and the checkbox is not checked it is checking it
     * if the asnwer is no and the checkbox is not checked it does nothing
     * @param answer 
     * @param locator 
     */
    async checkBoxHandler(answer:string, locator:Locator){
        
        if(answer.toLocaleLowerCase() === "yes"){
            const isCheckboxChecked = await locator.isChecked();
            if (!isCheckboxChecked) {
                await locator.check();
            }
        }else if(answer.toLocaleLowerCase() === "no"){
            const isCheckboxChecked = await locator.isChecked();
            if(isCheckboxChecked)
                await locator.check();
        }
    }
}