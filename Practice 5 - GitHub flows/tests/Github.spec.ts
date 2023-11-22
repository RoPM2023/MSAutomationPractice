import { test, expect } from "@playwright/test";
import { myTest } from "../fixture/myFixture";
import POManager from '../pages/POManager';
import exp from "constants";

myTest("Add and Delete Status", async ({page, URL})=> {
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();

    await homePage.gotoLandPage(URL);
    await homePage.openAccountMenu();
    await homePage.setAndDeleteStatus();
    await homePage.closeAccountMenu()

    await expect(page).toHaveURL(URL);
});

myTest("Go to Profile and print every starred repository", async ({page, URL}) => {

    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    const profilePage = poManager.getProfilePage();

    await homePage.gotoLandPage(URL);
    await homePage.openAccountMenu();
    await homePage.goToStarred();
    await expect(page).toHaveURL("https://github.com/TestingGit2023?tab=stars");
    await profilePage.printEveryRepo();
});

myTest.only("Go to Explore and screenshot each Category", async ({page, URL}) => {

    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    const explorePage = poManager.getExplorePage();

    await homePage.gotoLandPage(URL);
    await homePage.openSideMenu();
    await homePage.goToExplore();
    
    await explorePage.exploreCategory();
    await explorePage.goToTopicsCategory();
    await explorePage.goToTrendingCategory(); 
    await explorePage.goToCollectionsCategory();
    await explorePage.goToEventsCategory();
    await explorePage.goToSponsorsCategory();
    
});

myTest("Go To Profile and Block CSS elements",async ({page, URL}) => {

    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    const profilePage = poManager.getProfilePage();

    await page.pause();

    await homePage.gotoLandPage(URL);
    await homePage.openAccountMenu();
    await profilePage.showBrokenProfile();
    await expect(page).toHaveURL("https://github.com/TestingGit2023");

})