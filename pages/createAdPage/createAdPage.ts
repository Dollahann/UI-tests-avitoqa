import { Locator, Page } from "@playwright/test";
import {BasePage} from "../basePage";

export class CreateAdPage extends BasePage {
    protected pageName = "Новое объявление";

    readonly header: Locator;
    readonly createAdPageTitle: Locator;
    readonly createAdSubmitButton: Locator;
    readonly createAdCancelButton: Locator;
    readonly adNameInput: Locator;
    readonly adDescriptionInput: Locator;
    readonly adPriceInput: Locator;
    readonly adPhotoButton: Locator;
    readonly adPhotoInput: Locator;
    readonly adQuantityToggle: Locator;
    readonly adQuantityInput: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.createAdPageTitle = page.getByRole("heading", { name: "Новое объявление" });
        this.createAdSubmitButton = page.locator("[data-marker=\"submit-button\"]");
        this.createAdCancelButton = page.locator("[data-marker=\"cancel-button\"]");
        this.adNameInput = page.locator("[data-marker=\"title-input\"]");
        this.adDescriptionInput = page.locator("[data-marker=\"description-input\"]");
        this.adPriceInput = page.locator("[data-marker=\"price-input\"]");
        this.adPhotoButton = page.locator("[data-marker=\"add-photo-button\"]");
        this.adPhotoInput = page.locator("[data-marker=\"photo-input\"]");
        this.adQuantityToggle = page.locator("[data-marker=\"quantity-toggle\"]");
        this.adQuantityInput = page.locator("[data-marker=\"quantity-input\"]");
    }

    protected root(): Locator {
        return this.createAdPageTitle;
    }

    async openCreateAdPage() {
        await this.page.goto("/advertisements/create");
        await this.waitForOpen();
    }

    async clickSubmitBtn() {
        await this.createAdSubmitButton.click();
    }

    async clickCancelBtn() {
        await this.createAdCancelButton.click();
    }

    async fillAdName(text: string){
        await this.adNameInput.fill(text);
    }

    async fillAdDescription(text: string){
        await this.adDescriptionInput.fill(text);
    }

    async fillAdPrice(text: string){
        await this.adPriceInput.fill(text);
    }

    async clickPhotoBtn() {
        await this.adPhotoButton.click();
    }

    async addPhoto(){
        await this.adPhotoInput.setInputFiles("resources/test_image.jpg");
    }

    async clickQuantityToggle(){
        await this.adQuantityToggle.click();
    }

    async fillQuantityInput(text: string){
        await this.adQuantityInput.fill(text);
    }
}
