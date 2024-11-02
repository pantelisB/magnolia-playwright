import { Page, expect } from "@playwright/test";
import { clearScreenDown } from "readline";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/homePage";
import { NavigationPage } from "./pages/navigationPage";
import { ActivePage } from "./pages/activePage";
import { NorthAmericaPage } from "./pages/northAmericaPage";
import { StoriesPage } from "./pages/storiesPage";
import { AboutPage } from "./pages/aboutPage";
import { ContactPage } from "./pages/contactPage";
import { MembersPage } from "./pages/membersPage";
import { ResultPage } from "./pages/resultsPage";
import { TourPage } from "./pages/tourPage";
import { BookYourTour } from "./pages/bookYourTour";

export class PageManager{

    private readonly page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly navigation: NavigationPage;
    private readonly activePage: ActivePage;
    private readonly northAmericaPage: NorthAmericaPage;
    private readonly storiesPage: StoriesPage;
    private readonly aboutPage: AboutPage;
    private readonly contactPage: ContactPage;
    private readonly membersPage: MembersPage;
    private readonly resultsPage: ResultPage;
    private readonly tourPage: TourPage;
    private readonly bookYourTour: BookYourTour;


    










    constructor(page:Page){

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.navigation = new NavigationPage(this.page);
        this.activePage = new ActivePage(this.page);
        this.northAmericaPage = new NorthAmericaPage(this.page);
        this.storiesPage = new StoriesPage(this.page);
        this.aboutPage = new AboutPage(this.page);
        this.contactPage = new ContactPage(this.page);
        this.membersPage = new MembersPage(this.page);
        this.resultsPage = new ResultPage(this.page);
        this.tourPage = new TourPage(this.page);
        this.bookYourTour = new BookYourTour(this.page);





    }

    onLoginPage(){
        return this.loginPage;
    }

    onHomePage(){
        return this.homePage;
    }
    onNavigation(){
        return this.navigation;
    }
    onActivePage(){
        return this.activePage;
    }
    onNorthAmericaPage(){
        return this.northAmericaPage;
    }
    onStoriesPage(){
        return this.storiesPage;
    }
    onAboutPage(){
        return this.aboutPage;
    }
    onContactPage(){
        return this.contactPage;
    }
    onMembersPage(){
        return this.membersPage;
    }
    onResultPage(){
        return this.resultsPage;
    }
    onTourPage(){
        return this.tourPage;
    }
    onBookTourPage(){
        return this.bookYourTour;
    }
}