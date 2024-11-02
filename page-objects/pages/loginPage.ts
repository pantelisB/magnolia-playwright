import {Locator, Page} from "@playwright/test"
import { HelperBase } from "../helperBase";
import { test, expect } from '@playwright/test';

const username = process.env.USER_NAMETest ??'default_username';
const password = process.env.PASSWORD??'default_username';

export class LoginPage extends HelperBase{

    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;



    constructor(page: Page){
        super(page);   
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'});
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.loginError = page.locator('#validation-bubble');



    }
    /**
     * login method using Creadentials saved
     */
    async login(){

        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
    /*
    async login(username: string, password: string){

        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();


    }*/

    /**
     * when you login with incorrect credentials an error mesage is displayed.
     * we verify that it is not visible
     */
    async validateErrorIsNoDisplayed(){
        await expect(this.loginError, "When you succesfully login the error message shouldnt displayed").not.toBeVisible();
    }

}