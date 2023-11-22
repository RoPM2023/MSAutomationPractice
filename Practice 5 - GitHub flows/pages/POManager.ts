import { Page } from "@playwright/test";
import HomePage from '../pages/homePage';
import ProfilePage from "./profilePage";
import ExplorePage from "./explorePage";

export default class POManager {
    readonly page: Page;
    readonly homePage : HomePage;
    readonly profilePage : ProfilePage;
    readonly explorePage : ExplorePage;

    constructor(page : Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.profilePage = new ProfilePage(this.page);
        this.explorePage = new ExplorePage(this.page);
    }

    getHomePage() {
        return this.homePage;
    };

    getProfilePage() {
        return this.profilePage;
    };

    getExplorePage() {
        return this.explorePage;
    }

}