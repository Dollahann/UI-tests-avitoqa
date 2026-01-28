import { Page, expect } from "@playwright/test";
import { CreateAdPage } from "../pages/createAdPage/createAdPage";

export type CreateUniqueAdOptions = {
  titlePrefix?: string;
  description?: string;
  price?: number;
  quantity?: number;
  photoPath?: string;
};

export type CreatedAd = {
  title: string;
  description: string;
  price: number;
  quantity?: number;
};

function makeUniqueId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function createUniqueAd(
    page: Page,
    opts: CreateUniqueAdOptions = {}
): Promise<CreatedAd> {
    const {
        titlePrefix = "e2e-ad",
        description = "e2e description",
        price = 123,
        quantity,
        photoPath = "resources/test_image.jpg",
    } = opts;

    const title = `${titlePrefix}-${makeUniqueId()}`;

    const createAdPage = new CreateAdPage(page);

    await createAdPage.openCreateAdPage();

    await createAdPage.fillAdName(title);
    await createAdPage.fillAdDescription(description);
    await createAdPage.fillAdPrice(String(price));

    if (typeof quantity === "number") {
        await createAdPage.clickQuantityToggle();
        await createAdPage.fillQuantityInput(String(quantity));
    }
    await createAdPage.adPhotoInput.setInputFiles(photoPath);

    await createAdPage.clickSubmitBtn();

    await expect(page).not.toHaveURL(/\/advertisements\/create/);

    return { title, description, price, ...(quantity ? { quantity } : {}) };
}
