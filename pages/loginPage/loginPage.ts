import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class LoginPage extends BasePage {
    protected pageName = "Страница входа";

    readonly header: Locator;
    readonly loginPageTitle: Locator;
    readonly mobileMenuButton: Locator;
    readonly loginSubmitButton: Locator;
    readonly registerButton: Locator;
    readonly userMenuBtn: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.loginPageTitle = page.locator("[data-marker=\"login-header\"]");
        this.mobileMenuButton = page.locator("[data-marker=\"mobile-menu-button\"]");
        this.loginSubmitButton = page.locator("[data-marker=\"login-submit-button\"]");
        this.registerButton = page.locator("[data-marker=\"register-link\"]");
        this.userMenuBtn = page.locator("[data-marker=\"user-menu-button\"]");
        this.emailError = page.locator("[data-marker=\"email-error\"]");
        this.passwordError = page.locator("[data-marker=\"password-error\"]");
    }

    protected root(): Locator {
        return this.loginPageTitle;
    }

    async openLoginPage() {
        await this.page.goto("/auth/login");
        await this.waitForOpen();
    }

    async clickLoginBtn() {
        await this.loginSubmitButton.click();
    }

    async clickRegisterBtn() {
        await this.registerButton.click();
    }

    async assertEmailErrorIsVisible() {
        await expect(
            this.emailError,
            "Ошибка для поля email не отображается"
        ).toBeVisible();
    }

    async assertPasswordErrorIsVisible() {
        await expect(
            this.passwordError,
            "Ошибка для поля пароля не отображается")
            .toBeVisible();
    }
}
