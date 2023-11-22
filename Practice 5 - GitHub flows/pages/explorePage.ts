import {Page, Locator,expect} from "@playwright/test";

export default class ExplorePage {
    readonly page: Page;
    readonly topics : Locator;
    readonly trending : Locator;
    readonly collections : Locator;
    readonly events : Locator;
    readonly sponsors : Locator;

    constructor(page: Page) {
        this.page = page;
        this.topics = this.page.locator("a[data-selected-links='topics_path /topics/ /topics']");
        this.trending = this.page.locator("a[data-selected-links='/trending /trending/developers /trending/developers /trending /trending']");
        this.collections = this.page.locator("a[data-selected-links='collections_path /collections/ /collections']");
        this.events = this.page.locator("a[data-selected-links='events_path /events/ /events']");
        this.sponsors = this.page.locator("a[data-selected-links='sponsors_explore_index_path /sponsors/explore /sponsors/explore']");
    };

    async exploreCategory() {
        await expect(this.page).toHaveURL("https://github.com/explore");
        await this.page.screenshot({path : "./screenshots/explore.png"});
    }

    async goToTopicsCategory () {
        await this.topics.click();
        await expect(this.page).toHaveURL("https://github.com/topics");
        await this.page.screenshot({path : "./screenshots/exploreTopics.png"});

    }

    async goToTrendingCategory () {
        await this.trending.click();
        await expect(this.page).toHaveURL("https://github.com/trending");
        await this.page.screenshot({path : "./screenshots/exploreTrending.png"});
    }

    async goToCollectionsCategory () {
        await this.collections.click();
        await expect(this.page).toHaveURL("https://github.com/collections");
        await this.page.screenshot({path : "./screenshots/exploreCollections.png"});
    }

    async goToEventsCategory () {
        await this.events.click();
        await expect(this.page).toHaveURL("https://github.com/events");
        await this.page.screenshot({path : "./screenshots/exploreEvents.png"});
    }

    async goToSponsorsCategory () {
        await this.sponsors.click();
        await expect(this.page).toHaveURL("https://github.com/sponsors/explore");
        await this.page.screenshot({path : "./screenshots/exploreSponsors.png"});

    }
}