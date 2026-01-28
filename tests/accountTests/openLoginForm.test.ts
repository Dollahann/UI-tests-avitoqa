import { test, expect } from "../../fixtures/auth.fixture";
import { LoginPopupPage } from "../../pages/loginPopupPage/loginPopupPage";
import { MainPage } from "../../pages/mainPage/mainPage";
import { LoginPage } from "../../pages/loginPage/loginPage.ts";

test.describe("Проверки попапа с авторизацией и страницы авторизации", () => {
    test("Успешная авторизация", async ({ authedPage }) => {
        // arrange
        const mainPage = new MainPage(authedPage);

        // act
        await mainPage.openMainPage();

        // assert
        await mainPage.assertUserIsLoggedIn();
    });

    test("Переход на регистрацию по кнопке", async ({ page }) => {
        //arrange
        const mainPage = new MainPage(page);
        const loginPopup = new LoginPopupPage(page);
        const loginPage = new LoginPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.waitForOpen();
        await loginPopup.clickRegisterBtn();

        //assert
        await expect(page).toHaveURL("/auth/register");

        //act
        await loginPage.openLoginPage();
        await loginPage.clickRegisterBtn();

        //assert
        await expect(page).toHaveURL("/auth/register");
    });

    test("Логин с пустыми полями через попап и страницу авторизации не должен увести на главную", async ({
        page,
    }) => {
        //arrange
        const mainPage = new MainPage(page);
        const loginPopup = new LoginPopupPage(page);
        const loginPage = new LoginPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.waitForOpen();
        await loginPopup.clickLoginBtn();

        //assert
        await loginPopup.assertEmailErrorIsVisible();
        await loginPopup.assertPasswordErrorIsVisible();

        //act
        await loginPage.openLoginPage();
        await loginPage.clickLoginBtn();

        //assert
        await loginPage.assertEmailErrorIsVisible();
        await loginPage.assertPasswordErrorIsVisible();
    });
});
