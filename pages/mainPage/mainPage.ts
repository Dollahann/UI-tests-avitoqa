import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly header: Locator;
    readonly mobileMenuButton: Locator;
    readonly loginButtonDesktop: Locator;
    readonly loginButtonMobile: Locator;
    readonly myAdsBtn: Locator;
    readonly userMenuBtn: Locator;
    readonly loginModal: Locator;
    readonly searchInput: Locator;
    readonly sortButton: Locator;
    readonly sortOptionCheapest: Locator;
    readonly emptyStateTitle: Locator;
    readonly advertisementCard: Locator;
    readonly advertisementPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.mobileMenuButton = page.locator("[data-marker=\"mobile-menu-button\"]");
        this.loginButtonDesktop = page.locator("[data-marker=\"login-button-desktop\"]");
        this.loginButtonMobile = page.locator("[data-marker=\"login-button-mobile\"]");
        this.myAdsBtn = page.locator("[data-marker=\"my-ads-link\"]");
        this.userMenuBtn = page.locator("[data-marker=\"user-menu-button\"]");
        this.loginModal = page.locator("[data-marker=\"login-modal-content\"]");
        this.searchInput = page.locator("[data-marker=\"search-input\"]");
        this.sortButton = page.locator("[data-marker=\"sort-button\"]");
        this.sortOptionCheapest = page.locator("[data-marker=\"sort-option-cheapest\"]");
        this.emptyStateTitle= page.getByRole("heading", { name: "Ничего не найдено" });
        this.advertisementCard= page.locator("[data-marker=\"advertisement-card\"]");
        this.advertisementPrice = page.locator("[data-marker=\"ad-card-price\"]");
    }

    protected root(): Locator {
        return this.header;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async openMyAdsPage() {
        await this.myAdsBtn.click();
    }

    async openLoginDesktop() {
        await this.loginButtonDesktop.click();
    }
    async openLoginMobile() {
        await this.loginButtonMobile.click();
    }

    async assertUserIsLoggedIn() {
        await expect(
            this.userMenuBtn,
            "Пользователь не авторизован")
            .toBeVisible();
    }

    async searchAdByTitle(title: string){
        await this.searchInput.fill(title);
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается",
        ).toBeVisible();
    }
    
    async sortByCheapest(){
        await this.sortButton.click();
        await this.sortOptionCheapest.click();
    }

    // async mokEmpty(){
    //     await this.page.route('**/api/v1/advertisements', async route =>{
    //         const response = await route.fetch();
    //         const json = await response.json();
    //         json.push({ items: [], has_next: false, total: 0 });
    //         await route.fulfill({ response, json });
    //     });
    // }
}
