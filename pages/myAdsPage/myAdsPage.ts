import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MyAdsPage extends BasePage {
    protected pageName = "Мои объявления";

    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;
    readonly myAdvertisementCard: Locator;
    readonly myAdAdvertisementCardTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.myAdsTitle = page.locator("[data-marker=\"my-ads-title\"]");
        this.emptyStateTitle = page.locator("[data-marker=\"empty-state-title\"]");
        this.myAdvertisementCard = page.locator("[data-marker=\"my-ad-card\"]");
        this.myAdAdvertisementCardTitle = page.locator("[data-marker=\"my-ad-card-title\"]");
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async openMyAdsPage() {
        await this.page.goto("/my/advertisements");
        await this.waitForOpen();
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается",
        ).toBeVisible();
    }

    async deleteAd(number: number){
        await Promise.all([
            this.page.waitForURL(/\/advertisements\/\d+/, { waitUntil: "domcontentloaded" }),
            this.myAdvertisementCard.nth(number).click(),
            await this.page.locator("[data-marker=\"ad-actions-delete-button\"]").click(),
            await this.page.locator("[data-marker=\"delete-modal-confirm\"]").click(),
        ]);
    }

    async adsDoNotContains(title: string){
        const ads = this.myAdAdvertisementCardTitle;
        const target = ads.filter({ hasText: title });
        await expect(target, `Объявление "${title}" найдено в списке`).toHaveCount(0);
    }

    async clearAds() { //не отрабатывает полностью
        const cards = this.myAdvertisementCard;
        while (await cards.count() > 0) {
            await this.deleteAd(0);
            await this.page.waitForTimeout(500); 
            await this.openMyAdsPage();
        }
    }
}
