import { test, expect } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { createUniqueAd } from "../../helpers/createUniqueAdHelper";

test("Поиск объявления с фильтром Дешевле", async ({ authedPage }) => {
    //arrange
    test.setTimeout(200_000);
    const mainPage = new MainPage(authedPage);
    //act
    await mainPage.openMainPage();
    await mainPage.openMyAdsPage();
    await createUniqueAd(authedPage, {titlePrefix:"dollahans-e2e",price: 0});
    await createUniqueAd(authedPage, {titlePrefix:"dollahans-e2e",price: 1});
    await createUniqueAd(authedPage, {titlePrefix:"dollahans-e2e",price: 10});
    await mainPage.openMainPage();
    await mainPage.searchAdByTitle("dollahans-e2e");
    await mainPage.sortByCheapest();
    //assert
    await expect(mainPage.advertisementPrice.nth(0)).toContainText("Бесплатно");
    await expect(mainPage.advertisementPrice.nth(1)).toContainText("1 ₽");
    await expect(mainPage.advertisementPrice.nth(2)).toContainText("10 ₽");
});
