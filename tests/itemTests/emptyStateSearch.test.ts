import { test } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { createUniqueAd } from "../../helpers/createUniqueAdHelper";

test("Проверка заглушки Ничего не найдено", async ({authedPage}) => {
    //arrange
    const mainPage = new MainPage(authedPage);
    const myAdsPage = new MyAdsPage(authedPage);
    //act
    await mainPage.openMainPage();
    const deleted_ad = await createUniqueAd(authedPage, {price: 0});
    await myAdsPage.openMyAdsPage();
    await myAdsPage.deleteAd(0);
    await authedPage.waitForTimeout(1000);
    await mainPage.openMainPage();
    await mainPage.searchAdByTitle(deleted_ad.title);
    //assert
    await mainPage.assertEmptyStateTitleIsVisible();
});
