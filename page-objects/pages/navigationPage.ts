
import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
export{}
import { test, expect } from '@playwright/test';
import {setTimeout} from "node:timers/promises";


export class NavigationPage extends HelperBase {

    readonly dropDown: Locator;
    readonly dropDownSubMenu: Locator;
    readonly language: Locator;


    toursUrls = {
        ACTIVE: "https://demoauthor.magnolia-cms.com/travel/tour-type~active~.html",
        BEACH: "https://demoauthor.magnolia-cms.com/travel/tour-type~beach~.html",
        CULTURAL: "https://demoauthor.magnolia-cms.com/travel/tour-type~cultural~.html",
        "ECOTOURISM, NATURE & WILDLIFE": "https://demoauthor.magnolia-cms.com/travel/tour-type~ecotourism~.html",
        FAMILY: "https://demoauthor.magnolia-cms.com/travel/tour-type~family~.html",
        "OFF THE BEATEN PATH": "https://demoauthor.magnolia-cms.com/travel/tour-type~offPath~.html"
    };
    toursUrlsDe = {
        Aktiv: "https://demoauthor.magnolia-cms.com/travel/de/tour-type~active~.html",
        BEACH: "https://demoauthor.magnolia-cms.com/travel/tour-type~beach~.html",
        CULTURAL: "https://demoauthor.magnolia-cms.com/travel/tour-type~cultural~.html",
        "ECOTOURISM, NATURE & WILDLIFE": "https://demoauthor.magnolia-cms.com/travel/tour-type~ecotourism~.html",
        FAMILY: "https://demoauthor.magnolia-cms.com/travel/tour-type~family~.html",
        "OFF THE BEATEN PATH": "https://demoauthor.magnolia-cms.com/travel/tour-type~offPath~.html"
    };

    destinationUrls = {
        "NORTH AMERICA": "https://demoauthor.magnolia-cms.com/travel/destination~northAmerica~.html",
        "CENTRAL & SOUTH AMERICA " : "https://demoauthor.magnolia-cms.com/travel/destination~southAmerica~.html",
        EUROPE: "https://demoauthor.magnolia-cms.com/travel/tour-type~cultural~.html",
        "AFRICA & THE MIDDLE EAST": "https://demoauthor.magnolia-cms.com/travel/destination~africa~.html",
        "ASIA & THE PACIFIC": "https://demoauthor.magnolia-cms.com/travel/destination~asia~.html",
        "Polar": "https://demoauthor.magnolia-cms.com/travel/destination~polar~.html"
    };
    destinationUrlsDe = {
        "NORTH AMERICA": "https://demoauthor.magnolia-cms.com/travel/de/destination~northAmerica~.html",
        "CENTRAL & SOUTH AMERICA " : "https://demoauthor.magnolia-cms.com/travel/destination~southAmerica~.html",
        EUROPE: "https://demoauthor.magnolia-cms.com/travel/tour-type~cultural~.html",
        "AFRICA & THE MIDDLE EAST": "https://demoauthor.magnolia-cms.com/travel/destination~africa~.html",
        "ASIA & THE PACIFIC": "https://demoauthor.magnolia-cms.com/travel/destination~asia~.html",
        "Polar": "https://demoauthor.magnolia-cms.com/travel/destination~polar~.html"
    };
    restUrls = {
        STORIES: "https://demoauthor.magnolia-cms.com/travel/stories.html",
        ABOUT: "https://demoauthor.magnolia-cms.com/travel/about.html",
        CONTACT: "https://demoauthor.magnolia-cms.com/travel/contact.html",
        MEMBERS: "https://demoauthor.magnolia-cms.com/travel/members.html"
    };
    restUrlsDe = {
        STORIES: "https://demoauthor.magnolia-cms.com/travel/de/stories.html",
        "Über uns": "https://demoauthor.magnolia-cms.com/travel/de/about.html",
        CONTACT: "https://demoauthor.magnolia-cms.com/travel/de/contact.html",
        MEMBERS: "https://demoauthor.magnolia-cms.com/travel/de/members.html"
    }
    tours = [
        "ACTIVE",
        "BEACH",
        "CULTURAL",
        "ECOTOURISM, NATURE & WILDLIFE",
        "FAMILY",
        "OFF THE BEATEN PATH",
    ]

    constructor(page: Page){
        super(page);
        this.dropDown = page.locator('.navbar-right');
        this.dropDownSubMenu = page.locator('.open').getByRole('link');
        this.language = page.locator("html");
    }
    /**
     * We use this function to navigate through the menu. Upon successfully navigating,
     * we call the verifyExpectedUrl function to validate that the URL matches the expected destination.
     * @param menu 
     * @param submenu 
     */
    async navigateToMenuItem(menu: string, submenu?: string) {
        await this.dropDown.getByText(menu).click();
        
        const lang = await this.language.getAttribute('lang')??null;
        
        if (submenu) {
            await this.dropDownSubMenu.getByText(submenu).click();
            await this.verifyExpectedUrl(lang, menu, submenu);
        } else {
            await this.verifyExpectedUrl(lang, menu);
        }
    }
    /**
     * This function, navigateToMenuItem, is used to navigate through the menu and then calls verifyExpectedUrl to confirm the URL is as expected.
     *  Additionally, we validate the URL based on the language attribute to ensure it aligns with the specified locale.
     * @param lang 
     * @param menu 
     * @param submenu 
     */
    async verifyExpectedUrl(lang: string|null, menu: string, submenu?: string) {
        if ((menu.toUpperCase() === "TOURS" || menu.toUpperCase() === "TOUREN") && submenu) {
            if (lang === "en") {
            expect(this.page.url()).toEqual(this.toursUrls[submenu.toUpperCase()]);
            } else {
            expect(this.page.url()).toEqual(this.toursUrlsDe[submenu.toUpperCase()]);
            }
        } else if ((menu.toUpperCase() === "DESTINATIONS" || menu.toUpperCase() === "REISEZIELE") && submenu) {
            if (lang === "en") {
            expect(this.page.url(),"Verify the URL if it is the expected one and if includes the correct language").toEqual(this.destinationUrls[submenu.toUpperCase()]);
            } else {
            expect(this.page.url(),"Verify the URL if it is the expected one and if includes the correct language").toEqual(this.destinationUrlsDe[submenu.toUpperCase()]);
            }
        } else {
            if (lang === "en") {
            expect(this.page.url(),"Verify the URL if it is the expected one and if includes the correct language").toEqual(this.restUrls[menu.toUpperCase()]);
            } else {
            expect(this.page.url(),"Verify the URL if it is the expected one and if includes the correct language").toEqual(this.restUrlsDe[menu]);
            }
        }
    }
    /**
     * We use this one in order to validate if the lang attribute has changed on DOM as expected
     * @param language 
     */
    async verifyTheLangAtt(language:string){
        await setTimeout(1000);
        const lang = await this.language.getAttribute('lang');
        if(language === "eng"){
            expect(lang,'Verify if the language attribute has been updated').toEqual("en");
        }
        else if(language === "ger"){
            expect(lang,'Verify if the language attribute has been updated').toEqual("de");
        }

    }

   
    
}