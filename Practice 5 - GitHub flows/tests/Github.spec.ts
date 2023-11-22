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
    await expect(page).toHaveURL("https://github.com/explore");
    await page.screenshot({path : "./screenshots/explore.png"});
    await explorePage.goToTopicsCategory();
    await expect(page).toHaveURL("https://github.com/topics");
    await page.screenshot({path : "./screenshots/exploreTopics.png"});
    await explorePage.goToTrendingCategory();
    await expect(page).toHaveURL("https://github.com/trending");
    await page.screenshot({path : "./screenshots/exploreTrending.png"});
    await explorePage.goToCollectionsCategory();
    await expect(page).toHaveURL("https://github.com/collections");
    await page.screenshot({path : "./screenshots/exploreCollections.png"});
    await explorePage.goToEventsCategory();
    await expect(page).toHaveURL("https://github.com/events");
    await page.screenshot({path : "./screenshots/exploreEvents.png"});
    await explorePage.goToSponsorsCategory();
    await expect(page).toHaveURL("https://github.com/sponsors/explore");
    await page.screenshot({path : "./screenshots/exploreSponsors.png"});


})