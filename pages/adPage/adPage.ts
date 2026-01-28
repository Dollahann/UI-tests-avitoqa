import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class AdPage extends BasePage {
    protected pageName = "Страница объявления";

    readonly adTitle: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly deleteModalConfirm: Locator;

    constructor(page: Page) {
        super(page);
        this.adTitle = page.locator("[data-marker=\"ad-title\"]");
        this.editButton = page.locator("[data-marker=\"ad-actions-edit-button\"]");
        this.deleteButton = page.locator("[data-marker=\"ad-actions-delete-button\"]");
        this.deleteModalConfirm = page.locator("[data-marker=\"delete-modal-confirm\"]");
    }

    protected root(): Locator {
        return this.adTitle;
    }

    async deleteAdvertisement(){
        await this.deleteButton.click();
        await this.deleteModalConfirm.click();
    }
}
