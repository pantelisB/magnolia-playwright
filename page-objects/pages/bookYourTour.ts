import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';
import exp from "constants";




export class BookYourTour extends HelperBase{


    readonly adultsInput: Locator;
    readonly youthInput: Locator;
    readonly airportPickupCheckbox: Locator;
    readonly carbonOffsetCheckbox: Locator;
    readonly supportLocalCommunityCheckbox: Locator;
    readonly specialMealSelect: Locator;
    readonly submitButton: Locator;
    readonly mealOptions: Locator;
    readonly aditionalMealReq: Locator;
    readonly title: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly city: Locator;
    readonly postal: Locator;
    readonly country: Locator;
    readonly province: Locator;
    readonly confirmBooking: Locator;
    readonly chooseFile: Locator;
    readonly textError: Locator;




    constructor(page: Page){
        super(page);
        this.adultsInput = page.locator('[name="adults"]');
        this.youthInput = page.locator('[name="youth"]');
        this.airportPickupCheckbox = page.locator('.form-item').filter({ hasText: "$39 Airport Pickup" }).getByRole('checkbox');
        this.carbonOffsetCheckbox = page.locator('.form-item').filter({ hasText: "$99 Carbon Offset" }).getByRole('checkbox');
        this.supportLocalCommunityCheckbox = page.locator('.form-item').filter({ hasText: "$299 Support local community social, environmental, small business, emergency relief." }).getByRole('checkbox');
        this.specialMealSelect = page.locator('.form-row').locator('[name=meal]');
        this.submitButton = page.locator('input[type="submit"]').filter({ hasText: "Next step" });
        this.confirmBooking = page.locator('input[type="submit"]').filter({ hasText: "Confirm Booking" });

        this.mealOptions = page.locator('.form-item');
        this.aditionalMealReq = page.locator('#additionalMealNotes');
        this.title = page.locator('#title');
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#email');
        this.phone = page.locator('#phone');
        this.city = page.locator('#city');
        this.postal = page.locator('#postalOrZip');
        this.country = page.locator('#country');
        this.province = page.locator('#province');
        this.chooseFile = page.locator('#photograph');
        this.textError = page.locator('.container').locator('.text').filter({ hasText: "error" });








    }
    /**
     * typing the numbers for adults and youts for the booking
     * @param adults 
     * @param youth 
     */
    async bookNumberOfTravellers(adults:string, youth:string){
        await this.adultsInput.fill(adults);
        await this.youthInput.fill(youth);
        
    }
    /**
     * a function that it gets arguments yes or not and it check the checkboxes
     * @param airportPickUp 
     * @param carbonOffset 
     * @param supportLocalCommunity 
     * @param mealRequir 
     */
    async bookTripOptions(airportPickUp:string, carbonOffset:string,supportLocalCommunity:string, mealRequir:string){

        //await this.airportPickupCheckbox.check();
        await this.checkBoxHandler(airportPickUp,this.airportPickupCheckbox);
        await this.checkBoxHandler(carbonOffset,this.carbonOffsetCheckbox);
        await this.checkBoxHandler(supportLocalCommunity,this.supportLocalCommunityCheckbox);
        await this.specialMealSelect.selectOption(mealRequir.toLowerCase()); 
    }
    /**
     * Verify if all numbers on adults and youth inputs are types as expected
     * @param adults 
     * @param youth 
     * @returns 
     */
    async verifyIfNumberOfTravellersAreCorrect(adults:string, youth:string){

        await this.page.waitForSelector('[name="adults"]');
        await this.page.waitForSelector('[name="youth"]');
        
        const typedAdults = await this.adultsInput.inputValue();
        const typedYouth = await this.youthInput.inputValue();
        
        const correctDetails = typedAdults === adults && typedYouth === youth;
        return correctDetails;
    expect(correctDetails).toBeTruthy();
    }
    /**
     * verfy if all options are typed as expected
     * @param airportPickUp 
     * @param carbonOffset 
     * @param supportLocalCommunity 
     * @param mealRequir 
     */
    async verifyIfOptionsAreCorrect(airportPickUp:string, carbonOffset:string,supportLocalCommunity:string, mealRequir:string){

     
        await this.airportPickupCheckbox.waitFor();
        await this.carbonOffsetCheckbox.waitFor();
        await this.supportLocalCommunityCheckbox.waitFor();
        await this.specialMealSelect.waitFor();


        const airportInput = await this.airportPickupCheckbox.isChecked();
        const carbonInput = await this.carbonOffsetCheckbox.isChecked();
        const supportInput = await this.supportLocalCommunityCheckbox.isChecked();
        const mealInput = await this.specialMealSelect.inputValue();




        const airportCorrect = (airportPickUp.toLowerCase() === "yes" && airportInput) || (airportPickUp.toLowerCase() === "no" && !airportInput);
        const carbonCorrect = (carbonOffset.toLowerCase() === "yes" && carbonInput) || (carbonOffset.toLowerCase() === "no" && !carbonInput);
        const supportCorrect = (supportLocalCommunity.toLowerCase() === "yes" && supportLocalCommunity) || (supportLocalCommunity.toLowerCase() === "no" && !supportInput);
        const mealCorrect = (mealInput === mealRequir.toLowerCase())
        const correctDetails = airportCorrect && carbonCorrect && supportCorrect && mealCorrect;
        

    expect(correctDetails).toBeTruthy();
    }

    async clickNextButton(){
        await this.submitButton.click()
    }

    async selectMealOptionsAndNotes(mealOptionInput:string, notes: string){
        await this.mealOptions.filter({ hasText: mealOptionInput }).click();
        await this.aditionalMealReq.fill(notes);

    }

    async completePersonalDetailsInfo(title:string ,firstName:string ,lastName:string ,email:string ,phone:string  ){
        await this.title.fill(title)
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.phone.fill(phone)

    }
    async completemailingAddress(city:string ,postal:string ,country:string ,province:string ){
        await this.city.fill(city)
        await this.postal.fill(postal)
        await this.country.fill(country)
        await this.province.fill(province)

    }

    async uploadFile(){
        //await this.chooseFile.click();
 
        // Upload fixture.pdf
        await this.chooseFile.setInputFiles('C:/projects/test1.txt.txt');
     
        // Click text=fixture.pdf
        //await this.page.locator('text=test1.txt').click();

        //await this.page.getByLabel('Photograph for use on our').click();
        //await this.page.getByLabel('Photograph for use on our').setInputFiles('test1.txt.txt');
    }

    async confirmBookingLast(){
        await this.confirmBooking.click()
    }

    async verifySuccesfulBooking(){
        const iserrovisible = await this.textError.isVisible();
        expect(iserrovisible).toBeFalsy();
    }
}


