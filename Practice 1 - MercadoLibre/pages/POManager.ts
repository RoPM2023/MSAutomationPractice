import { Page } from "@playwright/test";
import HomePage from '../pages/homePage';
import ResultsPage from './resultsPage';
import ProductPage from "./productPage";

export default class POManager {
    readonly page: Page;
    readonly homePage : HomePage;
    readonly resultsPage : ResultsPage;
    readonly productPage : ProductPage;

    constructor(page : Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.resultsPage = new ResultsPage(this.page);
        this.productPage = new ProductPage(this.page);
    }

    getHomePage() {
        return this.homePage;
    }
    getResultsPage() {
        return this.resultsPage;
    }
    getProductPage() {
        return this.productPage;
    }
}