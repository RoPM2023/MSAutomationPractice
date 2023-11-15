import { test, expect } from '@playwright/test';
import { customTest } from '../Utils/myFixture';
import POManager from '../pages/POManager';

test.describe.configure({ mode: 'serial' });

customTest("Search by searchbar", async ({page, myProductTitle, myProductSearch}) => {

    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    const resultsPage = poManager.getResultsPage();
    const productPage = poManager.getProductPage();

    //Home
    await homePage.goTo();
    //Search
    await resultsPage.searchByFilters(myProductSearch);
    await resultsPage.selectProduct(myProductTitle);
    //Product
    await productPage.selectQuantity();
    await expect(page.locator("h1.ui-pdp-title")).toContainText(myProductTitle);
});
