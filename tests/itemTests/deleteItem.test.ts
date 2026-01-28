import { test } from "../../fixtures/auth.fixture";
import {MyAdsPage} from "../../pages/myAdsPage/myAdsPage";
import { MainPage } from "../../pages/mainPage/mainPage";
import { createUniqueAd } from "../../helpers/createUniqueAdHelper";

test("Удаление объявления", async ({ authedPage }) => {
    //arrange
    const mainPage = new MainPage(authedPage);
    const myAdsPage = new MyAdsPage(authedPage);

    //act
    await mainPage.openMainPage();
    await mainPage.openMyAdsPage();
    await myAdsPage.waitForOpen();
    const adToDelete = await createUniqueAd(authedPage, {price: 100});
    await authedPage.waitForTimeout(1000);
    await myAdsPage.openMyAdsPage();
    await myAdsPage.deleteAd(0);
    await authedPage.waitForTimeout(1500);
    await myAdsPage.openMyAdsPage();

    //assert
    if(myAdsPage.myAdAdvertisementCardTitle){
        myAdsPage.adsDoNotContains(adToDelete.title);
    }
    else{
        myAdsPage.assertEmptyStateTitleIsVisible();
    }

    //act
    await mainPage.openMainPage();
    await mainPage.searchAdByTitle(adToDelete.title);

    //assert
    await mainPage.assertEmptyStateTitleIsVisible();
});
